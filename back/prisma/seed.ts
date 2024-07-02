// Seed the database with data seeders - seed.ts
import { websites, config, configToWebsite, admin, users, apiTypes, apis } from "./seeders";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  console.info("Seeding data 🌱");

  await websites();
  await config();
  await configToWebsite();
  await admin();
  await users();
  await apiTypes();
  await apis();

  console.info("Data seeded ✅");
};

await seed()
  .then(async () => {
    console.log("Database seeded successfully 🚀");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
