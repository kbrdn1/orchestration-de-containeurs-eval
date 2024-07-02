// Service for authentication - auth.services.ts
// import { env } from "bun";
import { HTTPException } from "hono/http-exception";
import { sign, verify } from "hono/jwt";
import { AuthBruteForceProtection, emailRegex, passwordRegex } from "@/utils";
import { AdminService, AdminRessource } from "@/modules/protected/admin";
import crypto from "crypto-js/sha256";

class AuthService extends AuthBruteForceProtection {
  private service = AdminService;
  private secret = process.env.JWT_SECRET;
  private saltRounds = process.env.SALT_ROUNDS;

  constructor() {
    super(
      Number(process.env.PASSWORD_ATTEMPTS),
      Number(process.env.PASSWORD_DURATION),
    );
  }

  public login = async (data: { email: string; password: string }) => {
    if (!this.secret)
      throw new HTTPException(500, {
        message: "JWT secret not set",
      });

    const { email, password } = data;

    this.validateEmail(email);
    this.has(email);
    this.validatePassword(password);

    const admin = await this.service.getByEmail(email);

    if (!admin) throw new HTTPException(404, { message: "Admin not found" });

    await this.comparePassword(password, admin.password, email);

    const token = await sign(this.ressource(admin), this.secret);

    if (!token)
      throw new HTTPException(500, { message: "Failed to sign token" });

    this.createTokenCreationDate(email);

    return token;
  };

  public register = async (data: any) => {
    data.password = await this.hashPassword(data.password);

    try {
      const admin = await this.service.create(data);
      return this.ressource(admin);
    } catch (err) {
      throw new HTTPException(500, { message: "Failed to create admin" });
    }
  };

  public verify = async (token: string) => {
    if (!this.secret)
      throw new HTTPException(500, {
        message: "JWT secret not set",
      });

    const decodedPayload = await verify(token, this.secret);

    if (!decodedPayload)
      throw new HTTPException(401, { message: "Invalid token" });

    await this.validateTokenExpiration(decodedPayload.email);

    return decodedPayload;
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

  private comparePassword = async (
    password: string,
    hash: string,
    email?: string,
  ) => {
    try {
      // const result = await Bun.password.verify(password, hash, "bcrypt");
      const result = (await crypto(password).toString()) === hash;
      if (!result) {
        if (email) {
          this.add(email);
          this.has(email);
        }
        throw new HTTPException(401, { message: "Invalid password" });
      }
    } catch (err) {
      throw new HTTPException(500, { message: "Failed to compare passwords" });
    }
  };

  private ressource = (admin: any) => {
    return AdminRessource(admin);
  };

  private validateEmail = (email: string) => {
    if (!emailRegex.test(email))
      throw new HTTPException(400, { message: "Invalid email" });
  };

  private validatePassword = (password: string) => {
    if (!passwordRegex.test(password))
      throw new HTTPException(400, {
        message:
          "Invalid password: It must contain at least 6 characters, including at least 1 letter, 1 uppercase letter and 1 number",
      });
  };

  private createTokenCreationDate = (email: string) => {
    this.service.updateTokenExpiration(email);
  };

  private getExpirationDate = (date: Date) => {
    return new Date(date.getTime() + 1000 * 60 * 60 * 24);
  };

  private validateTokenExpiration = async (email: string) => {
    const admin = await this.service.getByEmail(email);
    if (!admin) throw new HTTPException(404, { message: "Unauthorized: Admin not found" });

    if (!admin.token_created_at)
      throw new HTTPException(500, {
        message: "Token creation date not found",
      });

    if (this.getExpirationDate(admin.token_created_at) < new Date())
      throw new HTTPException(401, { message: "Unauthorized: Token expired" });
  };
}

export default new AuthService();
