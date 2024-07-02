// Service for api types - apiType.service.ts
import { prisma } from "@/middlewares";
import { HTTPException } from "hono/http-exception";
import ressource from "./apiType.ressource";
import { capitalizeFirstLetterOfEachWord } from "@/utils";
import { getAll, count, get, create, update, destroy } from "@/types";
import { ApiType } from "@/types/models";
import AbstractCRUDService from "@/components/abstracts/AbstractCRUDService";

class ApiTypeService extends AbstractCRUDService<ApiType> {
  private apiType = prisma.apiType;

  public getAll = async ({
    filters,
    limit,
    offset,
    orderBy,
    order,
    trash,
  }: getAll) => {
    const { name } = filters ?? {};

    const apiTypes = await this.apiType.findMany({
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

    return await this.manyRessource(apiTypes);
  };

  public count = async ({ filters, trash }: count) => {
    const { name } = filters ?? {};

    return await this.apiType.count({
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

    const apiType = await this.apiType.findUnique({ where: { id } });

    if (!apiType)
      throw new HTTPException(404, { message: "Api type not found" });

    return await this.ressource(apiType);
  };

  public create = async (data: create) => {
    const { name } = data;

    if (!name)
      throw new HTTPException(400, {
        message: "Name is required",
      });

    data.name = this.formatName(name);

    const apiType = await this.apiType.create({ data });

    if (!apiType)
      throw new HTTPException(500, { message: "Failed to create api type" });

    return this.ressource(apiType);
  };

  public update = async ({ id, data }: update) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const { name } = data;

    if (name) data.name = this.formatName(name);

    const apiType = await this.apiType.update({ where: { id }, data });

    if (!apiType)
      throw new HTTPException(500, { message: "Failed to update api type" });

    return this.ressource(apiType);
  };

  public destroy = async (id: destroy) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const apiType = await this.apiType.delete({ where: { id } });

    if (!apiType)
      throw new HTTPException(500, { message: "Failed to delete api type" });

    return this.ressource(apiType);
  };

  public destroyMany = async (ids: destroy[]) => {
    if (!ids) throw new HTTPException(400, { message: "IDs are required" });

    const apiTypes = await this.apiType.deleteMany({
      where: { id: { in: ids } },
    });

    if (!apiTypes)
      throw new HTTPException(500, { message: "Failed to delete api types" });

    return {
      message: "Api types deleted",
      ids,
    };
  };

  private formatName = (str: string) => {
    return capitalizeFirstLetterOfEachWord(str);
  };

  protected manyRessource = (apis: any) => {
    return apis.map((api: any) => ressource(api));
  };

  protected ressource = async (api: any) => {
    return ressource(api);
  };
}

export default new ApiTypeService();
