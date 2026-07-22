import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning all dummy records from MongoDB Atlas database...');

  await prisma.codeSubmission.deleteMany({});
  await prisma.testAttempt.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.test.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('✨ All collections on MongoDB Atlas emptied successfully!');
}

main()
  .catch(e => {
    console.error('❌ Error during DB clean:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
