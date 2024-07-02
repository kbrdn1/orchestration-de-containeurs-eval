// Seeder for the apis table - apis.seeder.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  console.info("Seeding Apis 🔁");

  await prisma.apis.create({
    data: {
      name: "Godechot Pauliet WC API",
      url: "https://godechotpauliet.com/wp-json/wc/v3",
      publicKey: "ck_qsdfghjkjhgfdfsdfghjkjhgjfhdhghjl",
      privateKey: "cs_qsdfghjkjhgfdfsdfghjkjhgjfhdhghjl",
      addToCartEndpoint: "https://godechotpauliet.com/cart",
      typeId: 1,
    },
  });

  console.info("Apis seeded ✅");
}

export default seed;
