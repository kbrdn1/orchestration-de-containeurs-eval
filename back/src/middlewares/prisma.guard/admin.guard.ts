// Middlewares to intercept prisma admin requests - admin.guard.ts
import { PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const prisma = new PrismaClient();

const admin = {
  delete: async (params: any) => {
    const admin = await prisma.admin.findUnique({
      where: { id: params.where.id },
    });

    if (!admin) throw new HTTPException(404, { message: "Admin not found" });

    const updatedAdmin = await prisma.admin.update({
      where: { id: params.where.id },
      data: { deleted_at: new Date() },
    });

    if (!updatedAdmin)
      throw new HTTPException(500, { message: "Failed to delete admin" });

    return updatedAdmin;
  },
  deleteMany: async (params: any) => {
    const admins = await prisma.admin.findMany({
      where: { id: { in: params.where.id } },
    });

    if (!admins) throw new HTTPException(404, { message: "Admins not found" });

    const updatedAdmins = await prisma.admin.updateMany({
      where: { id: { in: params.where.id } },
      data: { deleted_at: new Date() },
    });

    if (!updatedAdmins)
      throw new HTTPException(500, { message: "Failed to delete admins" });

    return updatedAdmins;
  },
};

export default admin;
