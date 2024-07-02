import { createWebHashHistory, createRouter } from "vue-router";
import { Configurator, Forbiden, Login } from "@/pages";
import {
  Admins,
  Apis,
  ApiTypes,
  Configs,
  Dashboard,
  Users,
  Websites,
} from "@/pages/admin";

import { fetch as fetchAPI, verifyDomain } from "@/utils";

const routes = [
  {
    name: "login",
    path: "/",
    component: Login,
  },
  {
    name: "configurator",
    path: "/configurator/:brand/:collection/:model",
    component: Configurator,
  },
  {
    name: "dashboard",
    path: "/admin/dashboard",
    component: Dashboard,
  },
  {
    name: "websites",
    path: "/admin/websites",
    component: Websites,
  },
  {
    name: "users",
    path: "/admin/users",
    component: Users,
  },
  {
    name: "configs",
    path: "/admin/configs",
    component: Configs,
  },
  {
    name: "apis",
    path: "/admin/apis",
    component: Apis,
  },
  {
    name: "apiTypes",
    path: "/admin/api-types",
    component: ApiTypes,
  },
  {
    name: "admins",
    path: "/admin/admins",
    component: Admins,
  },
  {
    name: "forbiden",
    path: "/forbiden",
    component: Forbiden,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  if (to.path.includes("configurator")) {
    const domain = window.location.hostname;
    const token = to.query["token"];

    if (!token) return next({ name: "forbiden" });

    const data = await verifyDomain(token, domain);

    if (data?.ok) return next();
    return next({ name: "forbiden" });
  }

  if (to.path.includes("admin")) {
    const token = localStorage.getItem("token");
    if (!token) return next({ name: "login" });

    const data = await fetchAPI<{ message: string }>({
      method: "GET",
      endpoint: "auth/verify",
      token,
    });

    if (data.message === "Valid token") return next();

    localStorage.removeItem("token");
    return next({ name: "login" });
  }

  if (to.path.includes("login")) {
    const token = localStorage.getItem("token");
    if (token) return next({ name: "dashboard" });

    return next();
  }

  next();
});

export default router;
