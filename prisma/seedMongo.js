import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting MongoDB Atlas Seeding...');

  // 1. Seed Demo Student
  const student = await prisma.user.upsert({
    where: { email: 'alex.rivera@example.com' },
    update: {},
    create: {
      email: 'alex.rivera@example.com',
      fullName: 'Alex Rivera',
      passwordHash: '$2b$10$EpRvmqqKbeVU86y01STh3.aXp5F3X1u69N7wKk3G7W6sW4a6f',
      role: 'STUDENT',
      collegeName: 'Stanford Institute of Technology',
      xp: 1250
    }
  });

  // 2. Seed Demo Teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'sarah.j@techcorp.io' },
    update: {},
    create: {
      email: 'sarah.j@techcorp.io',
      fullName: 'Prof. Sarah Jenkins',
      passwordHash: '$2b$10$EpRvmqqKbeVU86y01STh3.aXp5F3X1u69N7wKk3G7W6sW4a6f',
      role: 'TEACHER',
      collegeName: 'Stanford Institute of Technology',
      xp: 0
    }
  });

  // 3. Seed Sample Exam (CT-9824)
  const exam = await prisma.test.upsert({
    where: { code: 'CT-9824' },
    update: {},
    create: {
      code: 'CT-9824',
      title: 'Data Structures & Algorithms Midterm',
      subject: 'Computer Science',
      department: 'CS & Engineering',
      durationMinutes: 60,
      totalMarks: 100,
      passingMarks: 60,
      status: 'PUBLISHED',
      instructions: '1. Fullscreen mode enabled.\n2. 1 MCQ Question (40 Marks) + 1 Coding Problem (60 Marks).\n3. 25% negative marking for wrong MCQs.',
      enableFullscreen: true,
      enableRandomize: true,
      enableNegativeMarks: true,
      negativeRatio: 0.25,
      autoSubmit: true,
      creatorEmail: teacher.email
    }
  });

  // 4. Seed Questions for Exam CT-9824
  const mcqQuestion = await prisma.question.create({
    data: {
      testId: exam.id,
      type: 'MCQ_SINGLE',
      subject: 'Data Structures',
      topic: 'Hash Tables',
      difficulty: 'Easy',
      prompt: 'What is the average time complexity of insertion in a Hash Map?',
      marks: 40,
      explanation: 'A hash table offers O(1) constant average time complexity for insertion.',
      mcqOptions: [
        { optionText: 'O(1)', isCorrect: true },
        { optionText: 'O(n)', isCorrect: false },
        { optionText: 'O(log n)', isCorrect: false },
        { optionText: 'O(n^2)', isCorrect: false }
      ]
    }
  });

  const codingQuestion = await prisma.question.create({
    data: {
      testId: exam.id,
      type: 'CODING',
      subject: 'Algorithms',
      topic: 'Arrays & Hash Maps',
      difficulty: 'Easy',
      prompt: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      marks: 60,
      codingTitle: 'Two Sum Algorithm',
      statement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      inputFormat: 'nums = [2,7,11,15], target = 9',
      outputFormat: '[0,1]',
      constraints: '2 <= nums.length <= 10^4',
      timeLimitMs: 2000,
      memoryLimitMb: 256,
      testCases: [
        { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]', isHidden: false, weight: 20 },
        { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]', isHidden: true, weight: 20 },
        { input: 'nums = [3,3], target = 6', expectedOutput: '[0,1]', isHidden: true, weight: 20 }
      ]
    }
  });

  console.log('✅ MongoDB Atlas Seed Completed Successfully!');
  console.log(`- Created Student: ${student.email}`);
  console.log(`- Created Teacher: ${teacher.email}`);
  console.log(`- Created Exam Code: ${exam.code} (${exam.title})`);
  console.log(`- Created Questions: MCQ (${mcqQuestion.id}), Coding (${codingQuestion.id})`);
}

main()
  .catch(e => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
