// Seeder for admin table - admin.seeder.ts
import { PrismaClient } from "@prisma/client";
import crypto from "crypto-js/sha256";

const prisma = new PrismaClient();

const seed = async () => {
  console.info("Seeding admins 👮🏻‍♂️");

  await prisma.admin.create({
    data: {
      email: Bun.env.ADMIN_EMAIL ?? "kylian@flippad.com",
      password: await hashPassword(Bun.env.ADMIN_PASSWORD ?? "@Admin123"),
    },
  });

  console.info("Admins seeded ✅");
};

const hashPassword = async (password: string) => {
  // return await Bun.password.hash(password, { algorithm: "bcrypt", cost: Bun.env.SALT_ROUNDS ?? 10 });
  return await crypto(password).toString();
};

export default seed;
