// Service for users - users.service.ts
// import { env } from "bun";
import { prisma } from "@/middlewares";
import { HTTPException } from "hono/http-exception";
import ressource from "./users.ressource";
import { getAll, count, get, create, update, destroy} from "@/types";
import { User } from "@/types/models";
import { capitalizeFirstLetterAndLetterAfterEachHyphen } from "@/utils";
import crypto from "crypto-js/sha256";
import AbstractCRUDService from "@/components/abstracts/AbstractCRUDService";

class UsersService extends AbstractCRUDService<User> {
  private users = prisma.users;
  private saltRounds = process.env.SALT_ROUNDS;

  public getAll = async ({
    filters,
    limit,
    offset,
    orderBy,
    order,
    trash,
  }: getAll) => {
    const { name, website } = filters ?? {};

    const users = await this.users.findMany({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          website
            ? {
                website: {
                  id: { equals: Number(website) },
                },
              }
            : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
      skip: offset ?? undefined,
      orderBy: [{ [orderBy ?? "created_at"]: order ?? "desc" }],
      take: limit ? Number(limit) : undefined,
    });

    return await this.manyRessource(users);
  };

  public count = async ({ filters, trash }: count) => {
    const { name, website } = filters ?? {};
    return await this.users.count({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          website
            ? {
                website: {
                  id: { equals: Number(website) },
                },
              }
            : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
    });
  };

  public get = async (id: get) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const user = await this.users.findUnique({ where: { id } });

    if (!user) throw new HTTPException(404, { message: "User not found" });

    return await this.ressource(user);
  };

  public create = async (data: create) => {
    const { websiteId, name } = data;

    if (!websiteId && !name)
      throw new HTTPException(400, {
        message: "Website ID and name are required",
      });

    data.name = this.formatName(name);

    const token = await this.createToken();

    const user = await this.users.create({
      data: { ...data, token: token.hash },
    });

    if (!user)
      throw new HTTPException(500, { message: "Failed to create user" });

    user.token = token.origin;

    return this.ressource(user, true);
  };

  public update = async ({ id, data }: update) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    if (data.name) data.name = this.formatName(data.name);

    const user = await this.users.findUnique({ where: { id } });

    if (!user) throw new HTTPException(404, { message: "User not found" });

    if (data.reset) {
      const info = { name: user.name, websiteId: user.websiteId };
      const updatedUser = await this.updateToken(id, info);

      if (!updatedUser)
        throw new HTTPException(500, { message: "Failed to update user" });

      return this.ressource(updatedUser, true);
    }

    if (data.websiteId === user.websiteId || !data.websiteId) {
      const updatedUser = await this.users.update({ where: { id }, data });

      if (!updatedUser)
        throw new HTTPException(500, { message: "Failed to update user" });

      return this.ressource(updatedUser);
    }

    const updatedUser = await this.updateToken(id, data);

    if (!updatedUser)
      throw new HTTPException(500, { message: "Failed to update user" });

    const formatedUser = { ...updatedUser, token: updatedUser.token };

    return this.ressource(formatedUser);
  };

  public destroy = async (id: destroy) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const user = await this.users.delete({ where: { id } });

    if (!user)
      throw new HTTPException(500, { message: "Failed to delete user" });

    return this.ressource(user);
  };

  public destroyMany = async (ids: destroy[]) => {
    if (!ids) throw new HTTPException(400, { message: "IDs are required" });

    const users = await this.users.deleteMany({ where: { id:  ids } });

    if (!users)
      throw new HTTPException(500, { message: "Failed to delete users" });

    return {
      message: "Users deleted",
      ids,
    };
  };

  private formatName = (name: string) => {
    return capitalizeFirstLetterAndLetterAfterEachHyphen(name);
  };

  private updateToken = async (id: number, data: any) => {
    const user = await this.get(id);

    const token = await this.createToken();

    const updatedUser = await this.users.update({
      where: { id: user.id },
      data: { ...data, token: token.hash },
    });

    if (!updatedUser)
      throw new HTTPException(500, {
        message: "Failed to update Api Key",
      });

    return this.ressource({ ...updatedUser, token: token.origin }, true);
  };

  private createToken = async () => {
    if (!this.saltRounds)
      throw new HTTPException(500, { message: "Salt rounds not set" });

    const token = await this.generateToken();

    try {
      // const hash = await Bun.password.hash(token, {
      //   algorithm: "bcrypt",
      //   cost: Number(this.saltRounds),
      // });
      const hash = await crypto(token).toString();

      return { origin: token, hash };
    } catch (err) {
      throw new HTTPException(500, { message: "Failed to create API Key" });
    }
  };

  private generateToken = async () => {
    let usersCount = await this.users.count();

    if (usersCount === 0) usersCount = 1;

    let token = `${usersCount}|`;

    for (let i = 0; i < 3; i++) {
      token += Math.random().toString(36).substring(2, 15);
    }

    return token;
  };

  protected manyRessource = async (users: any[]) => {
    const result = users.map(async (user: any) => await ressource(user));
    return await Promise.all(result);
  };

  protected ressource = async (user: any, displayToken?: boolean) => {
    return await ressource(user, displayToken);
  };
}

export default new UsersService();
