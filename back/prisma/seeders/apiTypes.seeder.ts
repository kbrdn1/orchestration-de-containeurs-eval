// Seeder for Apis Types - apiTypes.seeder.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  console.info("Seeding Apis Types 🏷️");

  await prisma.apiType.create({
    data: {
      name: "Woocommerce",
    },
  });

  console.info("Apis Types seeded ✅");
};

export default seed;
