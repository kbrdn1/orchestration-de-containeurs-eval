// Seeder for configToWebsite table - configToWebsite.seeder.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seed = async () => {
  console.info('Seeding configs related to Website 🔗')

  await prisma.configToWebsite.create({
    data: {
      configId: 1,
      websiteId: 1,
    },
  })

  console.info('Configs related to Website seeded ✅')
}

export default seed
