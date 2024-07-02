// Middlewares to intercept prisma requests - prisma.guard.ts
import { PrismaClient } from "@prisma/client";
import users from "./users.guard";
import admin from "./admin.guard";
import website from "./website.guard";
import apis from "./apis.guard";
import apiType from "./apiType.guard";
import config from "./config.guard";

const prismaMiddleware = new PrismaClient().$extends({
  model: { users, admin, website, apis, apiType, config },
});

export default prismaMiddleware;
