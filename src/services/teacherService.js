/**
 * Teacher Service - Exam Management, Question Bank, Manual Review, & Analytics Engine
 */

// Initial mock state for Exams
let EXAMS_STORE = [
  {
    id: 'exam_101',
    code: 'CT-9824',
    name: 'Data Structures & Algorithms Midterm',
    subject: 'Computer Science',
    department: 'CS & Engineering',
    semester: 'Fall 2026',
    durationMinutes: 60,
    totalMarks: 100,
    passingMarks: 60,
    startDate: '2026-07-20T09:00',
    endDate: '2026-07-25T18:00',
    instructions: '1. Fullscreen mode required.\n2. 5 MCQ Questions (40 Marks) + 1 Coding Problem (60 Marks).\n3. 25% negative marking for wrong MCQs.',
    randomize: true,
    negativeMarking: true,
    negativeRatio: 0.25,
    autoSubmit: true,
    visibility: 'Public',
    status: 'PUBLISHED',
    creator: 'Prof. Sarah Jenkins',
    questionsCount: 6,
    activeStudents: 42,
    createdAt: '2026-07-18T10:00:00Z'
  },
  {
    id: 'exam_102',
    code: 'CT-4109',
    name: 'System Design & Async Queue Final',
    subject: 'Software Architecture',
    department: 'CS & Engineering',
    semester: 'Fall 2026',
    durationMinutes: 90,
    totalMarks: 100,
    passingMarks: 70,
    startDate: '2026-07-24T10:00',
    endDate: '2026-07-28T20:00',
    instructions: '1. Advanced Concurrency Assessment.\n2. Manual Review Required for Code Submissions.',
    randomize: false,
    negativeMarking: false,
    negativeRatio: 0.0,
    autoSubmit: true,
    visibility: 'Private',
    status: 'SCHEDULED',
    creator: 'Prof. Sarah Jenkins',
    questionsCount: 4,
    activeStudents: 18,
    createdAt: '2026-07-21T14:00:00Z'
  }
];

// Initial Question Bank
let QUESTION_BANK = [
  {
    id: 'qb_1',
    type: 'MCQ',
    subject: 'Data Structures',
    topic: 'Hash Tables',
    difficulty: 'Easy',
    marks: 8,
    prompt: 'What is the average time complexity of insertion in a Hash Map?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 0,
    explanation: 'A hash table offers O(1) constant average time complexity for lookup and insertion.'
  },
  {
    id: 'qb_2',
    type: 'MCQ',
    subject: 'Algorithms',
    topic: 'Sorting',
    difficulty: 'Medium',
    marks: 8,
    prompt: 'Which sorting algorithm is guaranteed to run in O(n log n) worst-case time?',
    options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Insertion Sort'],
    correctAnswer: 1,
    explanation: 'Merge sort always runs in O(n log n) time in worst, average, and best cases.'
  },
  {
    id: 'qb_3',
    type: 'CODING',
    subject: 'Algorithms',
    topic: 'Arrays & Two Pointers',
    difficulty: 'Easy',
    marks: 60,
    title: 'Two Sum Algorithm',
    statement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    publicTestCases: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', weight: 20 }
    ],
    hiddenTestCases: [
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', weight: 20 },
      { input: 'nums = [3,3], target = 6', output: '[0,1]', weight: 20 }
    ]
  }
];

// Manual Review Queue
let MANUAL_REVIEW_QUEUE = [
  {
    id: 'rev_301',
    studentName: 'Alex Rivera',
    studentEmail: 'alex.rivera@example.com',
    examTitle: 'Data Structures & Algorithms Midterm',
    problemTitle: 'Two Sum Algorithm',
    submittedAt: '2026-07-22T14:15:00Z',
    status: 'PENDING_REVIEW',
    sourceCode: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in seen:\n                return [seen[diff], i]\n            seen[num] = i\n        return []`,
    language: 'Python 3',
    publicTestResults: '1/1 Passed',
    hiddenTestResults: '2/2 Passed',
    executionTimeMs: 42,
    memoryUsedKb: 14520,
    aiSummary: 'Optimal single-pass hash map implementation. Time complexity O(N), Space complexity O(N). No edge case vulnerabilities detected.',
    aiSuggestedScore: 60,
    maxMarks: 60,
    teacherMarks: null,
    teacherFeedback: ''
  }
];

export class TeacherService {
  /**
   * Dashboard Summary Cards Metrics
   */
  static getDashboardMetrics() {
    const totalExams = EXAMS_STORE.length;
    const activeExams = EXAMS_STORE.filter(e => e.status === 'PUBLISHED').length;
    const totalStudents = 148;
    const pendingEvaluation = MANUAL_REVIEW_QUEUE.filter(r => r.status === 'PENDING_REVIEW').length;
    const avgScore = 84.5;

    return { totalExams, activeExams, totalStudents, pendingEvaluation, avgScore };
  }

  static getExams() {
    return [...EXAMS_STORE];
  }

  static getExamByCode(code) {
    return EXAMS_STORE.find(e => e.code.toUpperCase() === code.trim().toUpperCase());
  }

  static generateExamCode() {
    return 'CT-' + Math.floor(1000 + Math.random() * 9000);
  }

  static createExam(examData) {
    const newExam = {
      id: 'exam_' + (Date.now()),
      code: examData.code || this.generateExamCode(),
      name: examData.name || 'Untitled Exam',
      subject: examData.subject || 'General CS',
      department: examData.department || 'Computer Science',
      semester: examData.semester || 'Fall 2026',
      durationMinutes: parseInt(examData.durationMinutes) || 60,
      totalMarks: parseInt(examData.totalMarks) || 100,
      passingMarks: parseInt(examData.passingMarks) || 60,
      startDate: examData.startDate || new Date().toISOString(),
      endDate: examData.endDate || new Date(Date.now() + 7*24*3600*1000).toISOString(),
      instructions: examData.instructions || 'Standard Proctoring Enabled.',
      randomize: !!examData.randomize,
      negativeMarking: !!examData.negativeMarking,
      negativeRatio: examData.negativeMarking ? 0.25 : 0.0,
      autoSubmit: true,
      visibility: examData.visibility || 'Public',
      status: examData.status || 'PUBLISHED',
      creator: 'Prof. Sarah Jenkins',
      questionsCount: examData.questions ? examData.questions.length : 5,
      activeStudents: 0,
      createdAt: new Date().toISOString()
    };

    EXAMS_STORE.unshift(newExam);
    return newExam;
  }

  static togglePublish(examId) {
    const exam = EXAMS_STORE.find(e => e.id === examId);
    if (exam) {
      exam.status = exam.status === 'PUBLISHED' ? 'UNPUBLISHED' : 'PUBLISHED';
    }
    return exam;
  }

  static duplicateExam(examId) {
    const original = EXAMS_STORE.find(e => e.id === examId);
    if (!original) return null;

    const copy = {
      ...original,
      id: 'exam_' + Date.now(),
      code: this.generateExamCode(),
      name: original.name + ' (Copy)',
      status: 'DRAFT',
      createdAt: new Date().toISOString()
    };

    EXAMS_STORE.unshift(copy);
    return copy;
  }

  static deleteExam(examId) {
    EXAMS_STORE = EXAMS_STORE.filter(e => e.id !== examId);
  }

  static getQuestionBank(filter = {}) {
    let list = [...QUESTION_BANK];
    if (filter.subject && filter.subject !== 'All') {
      list = list.filter(q => q.subject === filter.subject);
    }
    if (filter.difficulty && filter.difficulty !== 'All') {
      list = list.filter(q => q.difficulty === filter.difficulty);
    }
    if (filter.type && filter.type !== 'All') {
      list = list.filter(q => q.type === filter.type);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(item => (item.prompt || item.title || '').toLowerCase().includes(q));
    }
    return list;
  }

  static saveQuestionToBank(questionData) {
    const newQ = {
      id: 'qb_' + Date.now(),
      ...questionData
    };
    QUESTION_BANK.unshift(newQ);
    return newQ;
  }

  static getManualReviewQueue() {
    return [...MANUAL_REVIEW_QUEUE];
  }

  static submitTeacherReview(reviewId, marks, feedback) {
    const item = MANUAL_REVIEW_QUEUE.find(r => r.id === reviewId);
    if (item) {
      item.teacherMarks = parseFloat(marks);
      item.teacherFeedback = feedback;
      item.status = 'EVALUATED';
    }
    return item;
  }

  static getAnalytics() {
    return {
      highestScore: 100,
      lowestScore: 62,
      averageScore: 84.5,
      overallPassRate: 92.4,
      mcqAccuracy: 91.2,
      codingSuccessRate: 88.6,
      mostFailedQuestion: 'Binary Search Tree Balancing (Hard)',
      submissionTimeline: [
        { label: '0-15 Min', count: 5 },
        { label: '15-30 Min', count: 18 },
        { label: '30-45 Min', count: 24 },
        { label: '45-60 Min', count: 8 }
      ]
    };
  }

  static exportResultsCSV() {
    const rows = [
      ['Student Name', 'Email', 'Exam Title', 'MCQ Score', 'Coding Score', 'Total Score', 'Status', 'Timestamp'],
      ['Alex Rivera', 'alex.rivera@example.com', 'Data Structures Midterm', '40', '60', '100', 'PASSED', '2026-07-22 14:15'],
      ['Jordan Lee', 'jordan.lee@example.com', 'Data Structures Midterm', '32', '50', '82', 'PASSED', '2026-07-22 14:20'],
      ['Taylor Morgan', 'taylor.m@example.com', 'Data Structures Midterm', '28', '40', '68', 'PASSED', '2026-07-22 14:35']
    ];

    return rows.map(e => e.join(',')).join('\n');
  }
}
