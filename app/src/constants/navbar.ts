import { Navbar } from "@/types/constants";

export const navbar: Navbar[] = [
  {
    title: "Websites",
    url: "/admin/websites",
    icon: "Globe",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "Users",
  },
  {
    title: "Configs",
    url: "/admin/configs",
    icon: "Settings",
  },
  {
    title: "APIs",
    url: "/admin/apis",
    icon: "Code",
  },
  {
    title: "API Types",
    url: "/admin/api-types",
    icon: "ClipboardType",
  },
  {
    title: "Admins",
    url: "/admin/admins",
    icon: "UserCog",
  },
];

export default navbar;
