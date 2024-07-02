// Service for admins - admin.service.ts
// import { env } from "bun";
import { prisma } from "@/middlewares";
import { HTTPException } from "hono/http-exception";
import { emailRegex, passwordRegex } from "@/utils";
import ressource from "./admin.ressource";
import { getAll, count, get, create, update, destroy } from "@/types";
import { Admin } from "@/types/models";
import crypto from "crypto-js/sha256";
import AbstractCRUDService from "@/components/abstracts/AbstractCRUDService";

class AdminService extends AbstractCRUDService<Admin> {
  private admins = prisma.admin;
  private saltRounds = process.env.SALT_ROUNDS;

  public getAll = async ({
    filters,
    limit,
    offset,
    orderBy,
    order,
    trash,
  }: getAll) => {
    const { email } = filters ?? {};

    const admins = await this.admins.findMany({
      where: {
        AND: [
          email ? { email: { contains: email } } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
      skip: offset ?? undefined,
      orderBy: [{ [orderBy ?? "created_at"]: order ?? "desc" }],
      take: limit ? Number(limit) : undefined,
    });

    return this.manyRessource(admins);
  };

  public count = async ({ filters, trash }: count) => {
    const { email } = filters ?? {};

    return await this.admins.count({
      where: {
        AND: [
          email ? { email: { contains: email } } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
    });
  };

  public get = async (id: get) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const admin = await this.admins.findUnique({ where: { id } });

    if (!admin) throw new HTTPException(404, { message: "Admin not found" });

    return this.ressource(admin);
  };

  public getByEmail = async (email: string) => {
    if (!email) throw new HTTPException(400, { message: "Email is required" });

    this.validateEmail(email);

    const admin = await this.admins.findUnique({ where: { email: email } });

    if (!admin) throw new HTTPException(404, { message: "Admin not found" });

    return admin;
  };

  public create = async (data: create) => {
    const { email, password } = data;
    if (!email || !password)
      throw new HTTPException(400, {
        message: "Email and password are required",
      });

    this.validateEmail(email);
    this.validatePassword(password);

    data.email = this.formatEmail(data.email);
    data.password = await this.hashPassword(data.password);

    const admin = await this.admins.create({ data });

    if (!admin)
      throw new HTTPException(500, { message: "Failed to create admin" });

    return this.ressource(admin);
  };

  public update = async ({ id, data }: update) => {
    const { email, password } = data;
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    if (email) this.validateEmail(email);

    if (password) this.validatePassword(password);

    if (email) data.email = this.formatEmail(data.email);

    const admin = await this.admins.update({ where: { id }, data });

    if (!admin)
      throw new HTTPException(500, { message: "Failed to update admin" });

    return this.ressource(admin);
  };

  public destroy = async (id: destroy) => {
    if (!id) throw new HTTPException(400, { message: "ID is required" });

    const admin = await this.admins.delete({ where: { id } });

    if (!admin)
      throw new HTTPException(500, { message: "Failed to delete admin" });

    return this.ressource(admin);
  };
  
  public destroyMany = async (ids: destroy[]) => {
    if (!ids) throw new HTTPException(400, { message: "IDs are required" });

    const admins = await this.admins.deleteMany({
      where: { id: { in: ids } },
    });

    if (!admins)
      throw new HTTPException(500, { message: "Failed to delete admins" });

    return {
      message: "Admins deleted",
      ids,
    };
  };

  public updateTokenExpiration = async (email: string) => {
    const admin = await this.getByEmail(email);

    if (!admin) throw new HTTPException(404, { message: "Admin not found" });

    const updatedAdmin = await this.admins.update({
      where: { id: admin.id },
      data: { token_created_at: new Date() },
    });

    if (!updatedAdmin)
      throw new HTTPException(500, {
        message: "Failed to update token expiration",
      });

    return this.ressource(updatedAdmin);
  };

  private hashPassword = async (password: string) => {
    if (!this.saltRounds)
      throw new HTTPException(500, { message: "Salt rounds not set" });

    try {
      // return await Bun.password.hash(password, {
      //   algorithm: "bcrypt",
      //   cost: Number(this.saltRounds),
      // });
      return await crypto(password).toString();
    } catch (err) {
      throw new HTTPException(500, { message: "Failed to hash password" });
    }
  };

  protected manyRessource = (admins: any[]) => {
    return admins.map((admin) => ressource(admin));
  };

  protected ressource = (admin: any) => {
    return ressource(admin);
  };

  private formatEmail = (str: string) => {
    return str.toLowerCase();
  };

  private validateEmail = async (email: string) => {
    if (!emailRegex.test(email))
      throw new HTTPException(400, { message: "Invalid email" });

    // const userWithSameEmail = await this.admins.findUnique({
    //   where: { email },
    // });

    // if (userWithSameEmail)
    //   throw new HTTPException(400, { message: "Email already in use" });
  };

  private validatePassword = (password: string) => {
    if (!passwordRegex.test(password))
      throw new HTTPException(400, {
        message:
          "Invalid password: It must contain at least 6 characters, including at least 1 letter, 1 uppercase letter and 1 number",
      });
  };
}

export default new AdminService();
