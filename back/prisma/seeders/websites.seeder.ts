// Seeder for websites table - websites.seeder.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seed = async () => {
  console.info('Seeding websites 🌐')

  await prisma.website.create({
    data: {
      name: "Godechot Pauliet",
      domain: "https://godechot-pauliet.com",
    },
  })

  console.info('Website seeded ✅')
}

export default seed
