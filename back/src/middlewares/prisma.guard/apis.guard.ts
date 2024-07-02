// Middlewares to intercept prisma apis requests - apis.guard.ts
import { PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const prisma = new PrismaClient();

const apis = {
  delete: async (params: any) => {
    const api = await prisma.apis.findUnique({
      where: { id: params.where.id },
    });

    if (!api) throw new HTTPException(404, { message: "Api not found" });

    const updatedApi = await prisma.apis.update({
      where: { id: params.where.id },
      data: { deleted_at: new Date() },
    });

    if (!updatedApi)
      throw new HTTPException(500, { message: "Failed to delete api" });

    return updatedApi;
  },
  deleteMany: async (params: any) => {
    const apis = await prisma.apis.findMany({
      where: { id: { in: params.where.id } },
    });

    if (!apis) throw new HTTPException(404, { message: "Apis not found" });

    const updatedApis = await prisma.apis.updateMany({
      where: { id: { in: params.where.id } },
      data: { deleted_at: new Date() },
    });

    if (!updatedApis)
      throw new HTTPException(500, { message: "Failed to delete apis" });

    return updatedApis;
  },
};

export default apis;
