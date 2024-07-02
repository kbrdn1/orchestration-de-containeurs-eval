// Seeder for users table - users.seeder.ts
import { PrismaClient } from "@prisma/client";
import crypto from "crypto-js/sha256";

const prisma = new PrismaClient();

const seed = async () => {
  console.info("Seeding users 👥");

  await prisma.users.create({
    data: {
      name: "Godechot Pauliet User 1",
      token: await hashToken(process.env.USER_TOKEN ?? ""),
      websiteId: 1,
    },
  });

  console.info("Users seeded ✅");
};

const hashToken = async (token: string) => {
  // return await Bun.password.hash(token, { algorithm: "bcrypt", cost: Bun.env.SALT_ROUNDS ?? 10 });
  return await crypto(token).toString();
};
export default seed;
