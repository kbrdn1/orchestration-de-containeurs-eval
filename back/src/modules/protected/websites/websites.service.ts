// Service for websites - websites.service.ts
import { prisma } from "@/middlewares";
import { HTTPException } from "hono/http-exception";
import { capitalizeFirstLetterOfEachWord, domainRegex } from "@/utils";
import ressource from "./websites.ressource";
import { getAll, count, get, create, update, destroy } from "@/types";
import { Website } from "@/types/models";
import AbstractCRUDService from "@/components/abstracts/AbstractCRUDService";

class WebsitesService extends AbstractCRUDService<Website> {
  private websites = prisma.website;

  public getAll = async ({
    filters,
    limit,
    offset,
    orderBy,
    order,
    trash,
  }: getAll) => {
    const { name, domain, api } = filters ?? {};

    const websites = await this.websites.findMany({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          domain ? { domain: { contains: domain } } : {},
          api ? { apiId: { equals: Number(api) } } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
      skip: offset ?? undefined,
      orderBy: [{ [orderBy ?? "created_at"]: order ?? "desc" }],
      take: limit ? Number(limit) : undefined,
    });

    return await this.manyRessource(websites);
  };

  public count = async ({ filters, trash }: count) => {
    const { name, domain, api } = filters ?? {};

    return await this.websites.count({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          domain ? { domain: { contains: domain } } : {},
          api ? { apiId: { equals: Number(api) } } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
    });
  };

  public get = async (id: get) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const website = await this.websites.findUnique({ where: { id } });

    if (!website)
      throw new HTTPException(404, { message: "Website not found" });

    return await this.ressource(website);
  };

  public create = async (data: create) => {
    const { name, domain } = data;
    if (!name || !domain)
      throw new HTTPException(400, {
        message: "Name and domain are required",
      });

    await this.validateDomain(domain);
    data.name = this.formatName(data.name);

    const website = await this.websites.create({ data });

    if (!website)
      throw new HTTPException(500, { message: "Failed to create website" });

    return this.ressource(website);
  };

  public update = async ({ id, data }: update) => {
    const { name, domain } = data;
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    if (domain) this.validateDomain(domain);

    if (name) data.name = this.formatName(data.name);

    const website = await this.websites.update({ where: { id }, data });

    if (!website)
      throw new HTTPException(500, { message: "Failed to update website" });

    return this.ressource(website);
  };

  public destroy = async (id: destroy) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const website = await this.websites.delete({ where: { id } });

    if (!website)
      throw new HTTPException(500, { message: "Failed to delete admin" });

    return this.ressource(website);
  };

  public destroyMany = async (ids: destroy[]) => {
    if (!ids) throw new HTTPException(400, { message: "IDs are required" });

    const websites = await this.websites.deleteMany({
      where: { id: { in: ids } },
    });

    if (!websites)
      throw new HTTPException(500, { message: "Failed to delete websites" });

    return {
      message: "Websites deleted",
      ids,
    }
  };

  protected manyRessource = async (websites: any[]) => {
    const result = websites.map(
      async (website) => await ressource(website),
    );
    return await Promise.all(result);
  };

  protected ressource = async (website: any) => {
    return await ressource(website);
  };

  private formatName = (str: string) => {
    return capitalizeFirstLetterOfEachWord(str);
  };

  private validateDomain = async (domain: string) => {
    if (!domainRegex.test(domain))
      throw new HTTPException(400, { message: "Invalid domain" });

    const domainExists = await this.websites.findUnique({ where: { domain } });

    if (domainExists)
      throw new HTTPException(400, { message: "Domain already exists" });
  };
}

export default new WebsitesService();
