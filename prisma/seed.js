import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Prisma Database Seed...');

  // 1. Create Roles
  const studentRole = await prisma.role.upsert({
    where: { name: 'STUDENT' },
    update: {},
    create: { name: 'STUDENT', description: 'Student role for taking exams' }
  });

  const teacherRole = await prisma.role.upsert({
    where: { name: 'TEACHER' },
    update: {},
    create: { name: 'TEACHER', description: 'Teacher role for authoring & reviewing exams' }
  });

  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN', description: 'System Administrator role' }
  });

  // 2. Create College
  const college = await prisma.college.upsert({
    where: { code: 'STANFORD_CS' },
    update: {},
    create: {
      name: 'Stanford Institute of Technology',
      code: 'STANFORD_CS',
      domain: 'stanford.edu'
    }
  });

  // 3. Create Users
  const student = await prisma.user.upsert({
    where: { email: 'alex.rivera@example.com' },
    update: {},
    create: {
      email: 'alex.rivera@example.com',
      fullName: 'Alex Rivera',
      passwordHash: '$2b$10$EpRvmqqKbeVU86y01STh3.aXp5F3X1u69N7wKk3G7W6sW4a6f', // demo hash
      roleId: studentRole.id,
      collegeId: college.id
    }
  });

  const teacher = await prisma.user.upsert({
    where: { email: 'sarah.j@techcorp.io' },
    update: {},
    create: {
      email: 'sarah.j@techcorp.io',
      fullName: 'Prof. Sarah Jenkins',
      passwordHash: '$2b$10$EpRvmqqKbeVU86y01STh3.aXp5F3X1u69N7wKk3G7W6sW4a6f',
      roleId: teacherRole.id,
      collegeId: college.id
    }
  });

  // 4. Create Sample Languages
  const pythonLang = await prisma.language.upsert({
    where: { judge0Id: 71 },
    update: {},
    create: {
      name: 'Python 3',
      judge0Id: 71,
      monacoLang: 'python',
      templateCode: 'class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        pass'
    }
  });

  // 5. Create Sample Exam
  const exam = await prisma.test.create({
    data: {
      title: 'Data Structures & Algorithms Midterm',
      description: 'Official CS Midterm exam featuring Hash Maps, Big O notation, and array pointers.',
      status: 'PUBLISHED',
      durationMinutes: 60,
      enableFullscreen: true,
      enableRandomize: true,
      enableNegativeMarks: true,
      creatorId: teacher.id,
      collegeId: college.id,
      sections: {
        create: [
          {
            title: 'MCQ & Fundamentals',
            orderIndex: 1,
            questions: {
              create: [
                {
                  type: 'MCQ_SINGLE',
                  prompt: 'What is the average time complexity of insertion in a Hash Map?',
                  marks: 8,
                  negativeMarks: 2,
                  explanation: 'A hash map offers O(1) constant average time complexity.',
                  mcqOptions: {
                    create: [
                      { optionText: 'O(1)', isCorrect: true },
                      { optionText: 'O(n)', isCorrect: false },
                      { optionText: 'O(log n)', isCorrect: false },
                      { optionText: 'O(n^2)', isCorrect: false }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('✅ Seed completed successfully!');
  console.log(`- Roles created: STUDENT, TEACHER, ADMIN`);
  console.log(`- Created Student: ${student.email}`);
  console.log(`- Created Teacher: ${teacher.email}`);
  console.log(`- Created Sample Exam: ${exam.title} (ID: ${exam.id})`);
}

main()
  .catch(e => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
