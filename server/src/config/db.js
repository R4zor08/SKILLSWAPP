import { prisma } from './prisma.js';
import { env } from './env.js';

export async function connectDb() {
  if (!env.databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
  }
  await prisma.$connect();
  await prisma.$queryRaw`SELECT 1`;
  return prisma;
}

export async function disconnectDb() {
  await prisma.$disconnect();
}
