// Ressource for users - users.ressource.ts
import { User, Website } from "@/types/models";
import { prisma } from "@/middlewares";
import { HTTPException } from "hono/http-exception";

const userRessource = async (
  user: any,
  displayToken?: boolean,
): Promise<User> => {
  return {
    id: user.id,
    name: user.name,
    token: displayToken ? user.token : undefined,
    websiteId: user.websiteId,
    website: user.websiteId ? await getUserWebsite(user.websiteId) : undefined,
  };
};

const getUserWebsite = async (id: number): Promise<Website | undefined> => {
  const website = await prisma.website.findUnique({ where: { id } });
  if (!website)
    throw new HTTPException(500, { message: "Failed to get user website" });

  return {
    id: website.id,
    name: website.name,
    domain: website.domain,
  };
};

export default userRessource;
