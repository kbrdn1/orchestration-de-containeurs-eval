// Ressource for the websites - websites.ressource.ts
import { Website } from "@/types/models";
import { prisma } from "@/middlewares";

const websiteRessource = async (website: any) => {
  return {
    id: website.id,
    name: website.name,
    domain: website.domain,
    apiId: website.apiId,
    api: website.apiId ? await getWebsiteApi(website.apiId) : undefined,
  } as Website;
};

const getWebsiteApi = async (id: number) => {
  const api = await prisma.apis.findUnique({ where: { id } });
  if (!api) return;

  return {
    id: api.id,
    name: api.name,
    endpoint: api.endpoint,
    publicKey: api.publicKey,
    privateKey: api.privateKey,
  };
};

export default websiteRessource;
