import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL },
  },
});

async function main() {
  const email = 'demo@skillswap.local';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return;

  const password = await bcrypt.hash('password123', 12);
  await prisma.user.create({
    data: {
      name: 'Demo User',
      email,
      password,
      role: 'user',
      bio: 'Seeded account',
      location: 'Local',
    },
  });
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
