// Middlewares to intercept prisma api types requests - apiType.guard.ts
import { PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const prisma = new PrismaClient();

const apiType = {
  delete: async (params: any) => {
    const apiType = await prisma.apiType.findUnique({
      where: { id: params.where.id },
    });

    if (!apiType)
      throw new HTTPException(404, { message: "ApiType not found" });

    const updatedApiType = await prisma.apiType.update({
      where: { id: params.where.id },
      data: { deleted_at: new Date() },
    });

    if (!updatedApiType)
      throw new HTTPException(500, { message: "Failed to delete apiType" });

    return updatedApiType;
  },
  deleteMany: async (params: any) => {
    const apiTypes = await prisma.apiType.findMany({
      where: { id: { in: params.where.id } },
    });

    if (!apiTypes)
      throw new HTTPException(404, { message: "ApiTypes not found" });

    const updatedApiTypes = await prisma.apiType.updateMany({
      where: { id: { in: params.where.id } },
      data: { deleted_at: new Date() },
    });

    if (!updatedApiTypes)
      throw new HTTPException(500, {
        message: "Failed to delete apiTypes",
      });

    return updatedApiTypes;
  },
};

export default apiType;
