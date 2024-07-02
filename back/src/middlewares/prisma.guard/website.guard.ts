// Middlewares to intercept prisma websites requests - website.guard.ts
import { PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const prisma = new PrismaClient();

const website = {
  delete: async (params: any) => {
    const website = await prisma.website.findUnique({
      where: { id: params.where.id },
    });

    if (!website)
      throw new HTTPException(404, { message: "Website not found" });

    const updatedWebsite = await prisma.website.update({
      where: { id: params.where.id },
      data: { deleted_at: new Date() },
    });

    if (!updatedWebsite)
      throw new HTTPException(500, { message: "Failed to delete website" });

    return updatedWebsite;
  },
  deleteMany: async (params: any) => {
    const websites = await prisma.website.findMany({
      where: { id: { in: params.where.id } },
    });

    if (!websites)
      throw new HTTPException(404, { message: "Websites not found" });

    const updatedWebsites = await prisma.website.updateMany({
      where: { id: { in: params.where.id } },
      data: { deleted_at: new Date() },
    });

    if (!updatedWebsites)
      throw new HTTPException(500, {
        message: "Failed to delete websites",
      });

    return updatedWebsites;
  },
};

export default website;
