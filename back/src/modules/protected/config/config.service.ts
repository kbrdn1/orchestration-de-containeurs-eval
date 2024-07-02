// Service for config - config.service.ts
import { prisma } from "@/middlewares";
import { HTTPException } from "hono/http-exception";
import { capitalizeFirstLetterOfEachWord } from "@/utils";
import ressource from "./config.ressource";
import { getAll, count, get, create, update, destroy } from "@/types";
import { Config } from "@/types/models";
import AbstractCRUDService from "@/components/abstracts/AbstractCRUDService";

class ConfigService extends AbstractCRUDService<Config> {
  private config = prisma.config;
  private provider = process.env.DATABASE_PROVIDER;

  public getAll = async ({
    filters,
    limit,
    offset,
    orderBy,
    order,
    trash,
  }: getAll) => {
    const { name } = filters ?? {};

    const configs = await this.config.findMany({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
      skip: offset ?? undefined,
      orderBy: [{ [orderBy ?? "created_at"]: order ?? "desc" }],
      take: limit ? Number(limit) : undefined,
    });

    return this.manyRessource(configs);
  };

  public count = async ({ filters, trash }: count) => {
    const { name } = filters ?? {};

    return await this.config.count({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
    });
  };

  public get = async (id: get) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const config = await this.config.findUnique({ where: { id } });

    if (!config) throw new HTTPException(404, { message: "Config not found" });

    return this.ressource(config);
  };

  public create = async (data: create) => {
    const { name, value, websiteId } = data;
    if (!name || !value || !websiteId)
      throw new HTTPException(400, {
        message: "Name, value and websiteId are required",
      });

    data.name = this.formatName(name);

    data.value = this.formatValue(value);

    const config = await this.config.create({ data });

    if (!config)
      throw new HTTPException(500, { message: "Failed to create config" });

    return this.ressource(config);
  };

  public update = async ({ id, data }: update) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    if (data.name) data.name = this.formatName(data.name);
    if (data.value) data.value = this.formatValue(data.value);

    const config = await this.config.update({ where: { id }, data });

    if (!config)
      throw new HTTPException(500, { message: "Failed to update config" });

    return this.ressource(config);
  };

  public destroy = async (id: destroy) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const config = await this.config.delete({ where: { id } });

    if (!config)
      throw new HTTPException(500, { message: "Failed to delete config" });

    return this.ressource(config);
  };
  
  public destroyMany = async (ids: destroy[]) => {
      if (!ids) throw new HTTPException(400, { message: "IDs are required" });
  
      const configs = await this.config.deleteMany({
        where: { id: { in: ids } },
      });
  
      if (!configs)
        throw new HTTPException(500, { message: "Failed to delete configs" });
  
      return {
        message: "Configs deleted",
        ids,
      };
    };

  private formatName = (str: string) => {
    return capitalizeFirstLetterOfEachWord(str);
  };

  private formatValue = (str: string) => {
    if (!this.provider)
      throw new HTTPException(500, { message: "Database provider not set" });

    switch (this.provider) {
      case "sqlite":
        return str;
      case "mysql":
        return JSON.parse(str);
    }
  };

  protected manyRessource = (configs: any[]) => {
    return configs.map((config) => ressource(config));
  };

  protected ressource = (config: any) => {
    return ressource(config);
  };
}

export default new ConfigService();
