// Middlewares to intercept prisma config requests - config.guard.ts
import { PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const prisma = new PrismaClient();

const config = {
  // findUnique: async (params: any) => {
  //   const config = await prisma.config.findUnique({
  //     where: { id: params.where.id },
  //   });

  //   if (!config) throw new HTTPException(404, { message: "Config not found" });

  //   config.value = JSON.parse(config.value);

  //   return config;
  // },
  // findMany: async (params: any) => {
  //   const configs = await prisma.config.findMany({
  //     where: { deleted_at: null },
  //   });

  //   return configs.map((config) => {
  //     config.value = JSON.parse(config.value);
  //     return config;
  //   });
  // },
  create: async (params: any) => {
    const website = await prisma.website.findUnique({
      where: { id: params.data.websiteId },
    });
    if (!website)
      throw new HTTPException(404, { message: "No corresponding website" });

    const config = await prisma.config.create({
      data: {
        name: params.data.name,
        // value: JSON.stringify(params.data.value),
        value: params.data.value,
      },
    });

    const configToWebsite = await prisma.configToWebsite.create({
      data: {
        websiteId: params.data.websiteId,
        configId: config.id,
      },
    });

    if (!configToWebsite) {
      await new PrismaClient().config.delete({ where: { id: config.id } });
      throw new HTTPException(500, {
        message: "Failed to make relation between website and config",
      });
    }

    return config;
  },
  delete: async (params: any) => {
    const config = await prisma.config.findUnique({
      where: { id: params.where.id },
    });

    if (!config) throw new HTTPException(404, { message: "Config not found" });

    const updatedConfig = await prisma.config.update({
      where: { id: params.where.id },
      data: { deleted_at: new Date() },
    });

    if (!updatedConfig)
      throw new HTTPException(500, { message: "Failed to delete config" });

    return updatedConfig;
  },
  deleteMany: async (params: any) => {
    const configs = await prisma.config.findMany({
      where: { id: { in: params.where.id } },
    });

    if (!configs)
      throw new HTTPException(404, { message: "Configs not found" });

    const updatedConfigs = await prisma.config.updateMany({
      where: { id: { in: params.where.id } },
      data: { deleted_at: new Date() },
    });

    if (!updatedConfigs)
      throw new HTTPException(500, { message: "Failed to delete configs" });

    return updatedConfigs;
  },
};

export default config;
