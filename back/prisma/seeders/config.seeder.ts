// Seeder for config table - config.seeder.ts
import { PrismaClient } from "@prisma/client";
import FredForce10JSON from "./data/fred-force-10.json";

const prisma = new PrismaClient();

const seed = async () => {
  console.info("Seeding configs 🛠");

  await prisma.config.create({
    data: {
      name: "Fred Force 10",
      value: FredForce10JSON, // JSON.stringify(FredForce10JSON)
    },
  });

  console.info("Configs seeded ✅");
};

export default seed;
