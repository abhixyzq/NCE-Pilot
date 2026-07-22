import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { EvaluationEngine } from './src/services/evaluator.js';
import { Judge0PipelineService } from './src/services/judge0Pipeline.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'codetest_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// Middleware: Authenticate Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CodeTest Pro Backend Server API Running', timestamp: new Date() });
});

// 2. Authentication: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });

    // Auto-seed if user doesn't exist for demo ease
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          fullName: email.split('@')[0].replace('.', ' '),
          passwordHash: '$2b$10$EpRvmqqKbeVU86y01STh3.aXp5F3X1u69N7wKk3G7W6sW4a6f',
          role: role === 'Teacher' ? 'TEACHER' : 'STUDENT',
          collegeName: 'Stanford Institute of Technology'
        }
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        xp: user.xp
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. Exams: List Published Exams
app.get('/api/exams', async (req, res) => {
  try {
    const exams = await prisma.test.findMany({
      where: { status: 'PUBLISHED' },
      include: { questions: true }
    });
    res.json({ exams });
  } catch (error) {
    console.error('Fetch exams error:', error);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});

// 4. Exams: Get Exam by Code
app.get('/api/exams/code/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const exam = await prisma.test.findUnique({
      where: { code: code.toUpperCase() },
      include: { questions: true }
    });

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json({ exam });
  } catch (error) {
    console.error('Fetch exam by code error:', error);
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
});

// 5. Exams: Create Exam (Teacher)
app.post('/api/exams', async (req, res) => {
  try {
    const { title, subject, department, durationMinutes, totalMarks, passingMarks, creatorEmail } = req.body;
    const code = 'CT-' + Math.floor(1000 + Math.random() * 9000);

    const exam = await prisma.test.create({
      data: {
        code,
        title: title || 'Untitled Exam',
        subject: subject || 'General CS',
        department: department || 'Computer Science',
        durationMinutes: parseInt(durationMinutes) || 60,
        totalMarks: parseInt(totalMarks) || 100,
        passingMarks: parseInt(passingMarks) || 60,
        status: 'PUBLISHED',
        creatorEmail: creatorEmail || 'sarah.j@techcorp.io'
      }
    });

    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    console.error('Create exam error:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

// 6. Submissions: Run Code Sandbox
app.post('/api/submissions/run', async (req, res) => {
  try {
    const { language, sourceCode, testCases } = req.body;
    const result = await Judge0PipelineService.executeSubmission({
      language,
      sourceCode,
      testCases: testCases || [{ input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]', marks: 20 }]
    });

    res.json({ result });
  } catch (error) {
    console.error('Run code error:', error);
    res.status(500).json({ error: 'Failed to execute code' });
  }
});

// 7. Submissions: Submit Full Exam
app.post('/api/submissions/submit', async (req, res) => {
  try {
    const { examId, userId, responses, codeSubmissions } = req.body;

    const exam = await prisma.test.findUnique({
      where: { id: examId },
      include: { questions: true }
    });

    if (!exam) return res.status(404).json({ error: 'Exam not found' });

    // Mock sections structure for evaluation engine
    const mockTest = {
      sections: [{ id: 'sec_1', title: 'Main Section', questions: exam.questions }],
      enableNegativeMarks: exam.enableNegativeMarks,
      negativeMarkRatio: exam.negativeRatio
    };

    const evaluation = EvaluationEngine.evaluateAttempt(mockTest, responses || [], codeSubmissions || []);

    // Record attempt in MongoDB
    const attempt = await prisma.testAttempt.create({
      data: {
        testId: exam.id,
        userId: userId || '660ed29292c1f6d25c33e100', // Default Mongo ID
        status: 'SUBMITTED',
        mcqScore: evaluation.mcqScore,
        codingScore: evaluation.codingScore,
        totalScore: evaluation.totalScore,
        accuracy: evaluation.accuracy,
        timeTakenSec: 1122
      }
    });

    res.json({
      message: 'Exam submitted & auto-graded successfully',
      attemptId: attempt.id,
      result: evaluation
    });
  } catch (error) {
    console.error('Submit exam error:', error);
    res.status(500).json({ error: 'Failed to evaluate submission' });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 CodeTest Pro Backend REST API Server running on http://localhost:${PORT}`);
});
