// Ressource for the apis - apis.ressource.ts
import { Api, Website } from "@/types/models";
import { prisma } from "@/middlewares";
import { HTTPException } from "hono/http-exception";

const apiRessource = async (api: any): Promise<Api> => {
  return {
    id: api.id,
    name: api.name,
    url: api.url,
    publicKey: api.publicKey,
    privateKey: api.privateKey,
    addToCartEndpoint: api.addToCartEndpoint,
    website: api.id ? await getApiWebsite(api.id) : undefined,
    type: await getApiType(api.typeId),
  };
};

const getApiWebsite = async (id: number): Promise<Website | undefined> => {
  const website = await prisma.website.findUnique({ where: { apiId: id } });
  if (!website) return;

  return {
    id: website.id,
    name: website.name,
    domain: website.domain,
  };
};

const getApiType = async (id: number) => {
  const type = await prisma.apiType.findUnique({ where: { id } });
  if (!type)
    throw new HTTPException(500, { message: "Failed to get api type" });

  return type.name;
};

export default apiRessource;
