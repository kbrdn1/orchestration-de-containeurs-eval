// Service for apis - apis.service.ts
import { prisma } from "@/middlewares";
import { HTTPException } from "hono/http-exception";
import ressource from "./apis.ressource";
import { apiUrlRegex, capitalizeFirstLetterOfEachWord } from "@/utils";
import { getAll, count, get, create, update, destroy } from "@/types";
import { Api } from "@/types/models";
import AbstractCRUDService from "@/components/abstracts/AbstractCRUDService";

class ApisService extends AbstractCRUDService<Api> {
  private apis = prisma.apis;

  public getAll = async ({
    filters,
    limit,
    offset,
    orderBy,
    order,
    trash,
  }: getAll) => {
    const { name, url, addToCartEndpoint, type } = filters ?? {};

    const apis = await this.apis.findMany({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          url ? { url: { contains: url } } : {},
          addToCartEndpoint
            ? { addToCartEndpoint: { contains: addToCartEndpoint } }
            : {},
          type ? { typeId: Number(type) } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
      skip: offset ?? undefined,
      orderBy: [{ [orderBy ?? "created_at"]: order ?? "desc" }],
      take: limit ? Number(limit) : undefined,
    });

    return await this.manyRessource(apis);
  };

  public count = async ({ filters, trash }: count) => {
    const { name, url, addToCartEndpoint, type } = filters ?? {};

    return await this.apis.count({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          url ? { url: { contains: url } } : {},
          addToCartEndpoint
            ? { addToCartEndpoint: { contains: addToCartEndpoint } }
            : {},
          type ? { typeId: Number(type) } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
    });
  };

  public get = async (id: get) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const api = await this.apis.findUnique({ where: { id } });

    if (!api) throw new HTTPException(404, { message: "Api not found" });

    return await this.ressource(api);
  };

  public create = async (data: create) => {
    const { name, url, publicKey, typeId } = data;

    if (!name || !url || !publicKey || !typeId)
      throw new HTTPException(400, {
        message: "Name, url, publicKey and typeId are required",
      });

    data.name = this.formatName(name);

    this.validateUrl(url);

    const api = await this.apis.create({ data });

    if (!api) throw new HTTPException(500, { message: "Failed to create api" });

    return this.ressource(api);
  };

  public update = async ({ id, data }: update) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const { name, url } = data;

    if (name) data.name = this.formatName(name);

    if (url) this.validateUrl(url);

    const api = await this.apis.update({ where: { id }, data });

    if (!api) throw new HTTPException(500, { message: "Failed to update api" });

    return this.ressource(api);
  };

  public destroy = async (id: destroy) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const api = await this.apis.delete({ where: { id } });

    if (!api) throw new HTTPException(500, { message: "Failed to delete api" });

    return this.ressource(api);
  };
  
  public destroyMany = async (ids: destroy[]) => {
    if (!ids) throw new HTTPException(400, { message: "IDs are required" });

    const apis = await this.apis.deleteMany({
      where: { id: { in: ids } },
    });

    if (!apis)
      throw new HTTPException(500, { message: "Failed to delete apis" });

    return {
      message: "Apis deleted",
      ids,
    };
  };

  private formatName = (str: string) => {
    return capitalizeFirstLetterOfEachWord(str);
  };

  private validateUrl = async (url: string) => {
    if (!apiUrlRegex.test(url))
      throw new HTTPException(400, { message: "Invalid url" });

    const apiExists = await this.apis.findUnique({ where: { url } });

    if (apiExists)
      throw new HTTPException(400, { message: "Api already exists" });
  };

  protected manyRessource = async (apis: any) => {
    const result = apis.map(async (api: any) => await ressource(api));
    return await Promise.all(result);
  };

  protected ressource = async (api: any) => {
    return await ressource(api);
  };
}

export default new ApisService();
