import { TeacherService } from '../services/teacherService.js';

let activeTab = 'dash';
let activeQuestionType = 'MCQ';

export function renderTeacherPortal() {
  const content = document.getElementById('teacher-content');
  if (!content) return;

  if (activeTab === 'dash') {
    content.innerHTML = renderDashboardView();
  } else if (activeTab === 'create') {
    content.innerHTML = renderCreateExamView();
  } else if (activeTab === 'bank') {
    content.innerHTML = renderQuestionBankView();
  } else if (activeTab === 'review') {
    content.innerHTML = renderManualReviewView();
  } else if (activeTab === 'analytics') {
    content.innerHTML = renderAnalyticsView();
  }
}

function renderDashboardView() {
  const metrics = TeacherService.getDashboardMetrics();
  const exams = TeacherService.getExams();

  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-on-surface">Teacher Overview & Exams</h1>
          <p class="text-xs text-on-surface-variant">Manage technical exams, author question banks, and review candidate submissions.</p>
        </div>
        <button onclick="switchTab('create')" class="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-semibold text-xs glow-button flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">add</span> Create New Exam
        </button>
      </div>

      <!-- Dashboard Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Total Exams</span>
          <p class="text-2xl font-extrabold text-on-surface mt-1">${metrics.totalExams}</p>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Active Exams</span>
          <p class="text-2xl font-extrabold text-green-600 mt-1">${metrics.activeExams}</p>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Total Students</span>
          <p class="text-2xl font-extrabold text-primary mt-1">${metrics.totalStudents}</p>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Pending Evaluation</span>
          <p class="text-2xl font-extrabold text-amber-600 mt-1">${metrics.pendingEvaluation}</p>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Average Score</span>
          <p class="text-2xl font-extrabold text-on-surface mt-1">${metrics.avgScore}%</p>
        </div>
      </div>

      <!-- Created Exams Table -->
      <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 ambient-shadow space-y-4">
        <h2 class="text-lg font-bold text-on-surface">Manage Exams</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="border-b border-outline-variant/40 text-on-surface-variant">
              <tr>
                <th class="py-3 px-4">Exam Code</th>
                <th class="py-3 px-4">Exam Title</th>
                <th class="py-3 px-4">Subject</th>
                <th class="py-3 px-4">Duration</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/20 font-medium">
              ${exams.map(e => `
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-4 font-mono font-bold text-primary">${e.code}</td>
                  <td class="py-3 px-4 font-bold text-on-surface">${e.name}</td>
                  <td class="py-3 px-4 text-on-surface-variant">${e.subject}</td>
                  <td class="py-3 px-4 font-mono">${e.durationMinutes} min</td>
                  <td class="py-3 px-4">
                    <span class="${e.status === 'PUBLISHED' ? 'bg-green-500/15 text-green-700' : 'bg-amber-500/15 text-amber-700'} text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                      ${e.status}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right space-x-2">
                    <button onclick="togglePublish('${e.id}')" class="text-xs font-semibold text-primary hover:underline">
                      ${e.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onclick="duplicateExam('${e.id}')" class="text-xs font-semibold text-on-surface-variant hover:underline">Duplicate</button>
                    <button onclick="deleteExam('${e.id}')" class="text-xs font-semibold text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderCreateExamView() {
  const code = TeacherService.generateExamCode();
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-on-surface">Create New Examination</h1>
          <p class="text-xs text-on-surface-variant">Configure assessment parameters, proctoring options, and add MCQ or Coding questions.</p>
        </div>
        <button type="button" onclick="openAddQuestionModal()" class="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-semibold text-xs glow-button flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">add_circle</span> Add Question
        </button>
      </div>

      <form onsubmit="handleCreateExam(event)" class="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 md:p-8 ambient-shadow space-y-6">
        <!-- Form Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Exam Name</label>
            <input type="text" id="ex-name" required value="Algorithms & Complexity Assessment 2026" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Exam Code (Auto-Generated)</label>
            <input type="text" id="ex-code" readonly value="${code}" class="w-full px-3.5 py-2.5 bg-surface-container border border-outline-variant/60 rounded-xl text-xs font-mono font-bold text-primary"/>
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Subject</label>
            <input type="text" id="ex-subject" required value="Computer Science" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Department & Semester</label>
            <input type="text" id="ex-dept" required value="CS & Engineering (Fall 2026)" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Duration (Minutes)</label>
            <input type="number" id="ex-duration" required value="60" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Total Marks / Passing Marks</label>
            <div class="flex gap-2">
              <input type="number" id="ex-total" required value="100" placeholder="Total" class="w-1/2 px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
              <input type="number" id="ex-passing" required value="60" placeholder="Passing" class="w-1/2 px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
            </div>
          </div>
        </div>

        <!-- Checkbox Options -->
        <div class="pt-4 border-t border-outline-variant/30 space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-on-surface">Proctoring & Assessment Rules</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked id="ex-rand" class="rounded text-primary focus:ring-primary"/>
              Randomize Questions
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked id="ex-neg" class="rounded text-primary focus:ring-primary"/>
              Negative Marking (25%)
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked id="ex-auto" class="rounded text-primary focus:ring-primary"/>
              Auto Submit on Timer
            </label>
          </div>
        </div>

        <!-- Questions Section Summary -->
        <div class="pt-4 border-t border-outline-variant/30 space-y-3">
          <div class="flex justify-between items-center">
            <h3 class="text-xs font-bold uppercase tracking-wider text-on-surface">Exam Questions (2 Configured)</h3>
            <button type="button" onclick="openAddQuestionModal()" class="text-xs font-bold text-primary hover:underline">+ Add Another Question</button>
          </div>

          <div class="space-y-2 text-xs">
            <div class="bg-surface-container-low p-3 rounded-xl flex justify-between items-center border border-outline-variant/30">
              <div>
                <span class="font-bold text-on-surface">1. What is the average time complexity of insertion in a Hash Map?</span>
                <p class="text-on-surface-variant text-[11px]">MCQ • Correct Answer: O(1)</p>
              </div>
              <span class="font-mono font-bold text-primary">40 Marks</span>
            </div>

            <div class="bg-surface-container-low p-3 rounded-xl flex justify-between items-center border border-outline-variant/30">
              <div>
                <span class="font-bold text-on-surface">2. Two Sum Algorithm Problem</span>
                <p class="text-on-surface-variant text-[11px]">Coding Problem • 3 Test Cases Attached</p>
              </div>
              <span class="font-mono font-bold text-primary">60 Marks</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-4 pt-4 border-t border-outline-variant/30">
          <button type="button" onclick="switchTab('dash')" class="flex-1 border border-outline-variant/60 py-3 rounded-xl font-semibold text-xs hover:bg-surface-container">
            Cancel
          </button>
          <button type="submit" class="flex-1 bg-primary text-on-primary py-3 rounded-xl font-semibold text-xs glow-button shadow-md">
            Save & Publish Exam
          </button>
        </div>
      </form>
    </div>
  `;
}

function renderQuestionBankView() {
  const questions = TeacherService.getQuestionBank();

  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-on-surface">Question Bank Repository</h1>
          <p class="text-xs text-on-surface-variant">Reuse, search, and author questions across exams.</p>
        </div>
        <button onclick="openAddQuestionModal()" class="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-semibold text-xs glow-button flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">add_circle</span> Create New Question
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 flex gap-3 flex-wrap items-center">
        <input type="text" placeholder="Search questions..." class="px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs flex-1 outline-none"/>
        <select class="px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none">
          <option>All Subjects</option>
          <option>Data Structures</option>
          <option>Algorithms</option>
        </select>
        <select class="px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none">
          <option>All Types</option>
          <option>MCQ</option>
          <option>Coding</option>
        </select>
      </div>

      <!-- Questions List -->
      <div class="space-y-3" id="qb-questions-list">
        ${questions.map(q => `
          <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow space-y-2">
            <div class="flex justify-between items-start">
              <span class="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">${q.type} • ${q.difficulty}</span>
              <span class="text-xs font-mono text-on-surface-variant font-bold">${q.marks} Marks</span>
            </div>
            <h3 class="text-sm font-bold text-on-surface">${q.prompt || q.title}</h3>
            <p class="text-xs text-on-surface-variant">${q.explanation || q.statement || ''}</p>
            <div class="pt-2 flex justify-between items-center text-xs">
              <span class="text-on-surface-variant font-mono">${q.subject} / ${q.topic}</span>
              <button onclick="alert('Question added to active exam!')" class="text-primary font-semibold hover:underline">Reuse in Exam +</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderManualReviewView() {
  const queue = TeacherService.getManualReviewQueue();
  const item = queue[0];

  return `
    <div class="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 class="text-2xl font-bold text-on-surface">Manual Code Review Queue</h1>
        <p class="text-xs text-on-surface-variant">Evaluate candidate submissions requiring manual teacher sign-off.</p>
      </div>

      ${item ? `
        <div class="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 md:p-8 ambient-shadow space-y-6">
          <div class="flex justify-between items-start border-b border-outline-variant/30 pb-4">
            <div>
              <span class="bg-amber-500/15 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Pending Review</span>
              <h2 class="text-xl font-bold text-on-surface mt-2">${item.studentName} (${item.studentEmail})</h2>
              <p class="text-xs text-on-surface-variant">Exam: ${item.examTitle} | Submitted: Just now</p>
            </div>
            <div class="text-right">
              <span class="text-xs font-mono font-bold text-primary">${item.language}</span>
              <p class="text-xs text-green-600 font-bold">Public Tests: ${item.publicTestResults}</p>
              <p class="text-xs text-green-600 font-bold">Hidden Tests: ${item.hiddenTestResults}</p>
            </div>
          </div>

          <!-- Code View -->
          <div class="space-y-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-on-surface">Student Code Submission</h3>
            <pre class="bg-[#0f172a] text-emerald-300 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-white/10">${item.sourceCode}</pre>
          </div>

          <!-- AI Evaluation Summary & Suggested Score -->
          <div class="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2 text-xs">
            <div class="flex justify-between items-center">
              <span class="font-bold text-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">auto_awesome</span> AI Code Analysis & Evaluation
              </span>
              <span class="bg-primary text-on-primary text-[11px] font-bold px-3 py-1 rounded-full">
                AI Suggested Score: ${item.aiSuggestedScore} / ${item.maxMarks}
              </span>
            </div>
            <p class="text-on-surface-variant leading-relaxed">${item.aiSummary}</p>
          </div>

          <!-- Teacher Feedback Form -->
          <form onsubmit="handleTeacherReview(event, '${item.id}')" class="space-y-4 pt-4 border-t border-outline-variant/30">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-on-surface mb-1">Final Awarded Marks (Max ${item.maxMarks})</label>
                <input type="number" id="review-marks" required value="${item.aiSuggestedScore}" max="${item.maxMarks}" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs font-bold text-primary outline-none focus:border-primary"/>
              </div>
              <div>
                <label class="block text-xs font-bold text-on-surface mb-1">Teacher Feedback & Comments</label>
                <input type="text" id="review-feedback" placeholder="Excellent solution with optimal hash map..." value="Great work! Efficient O(N) execution with zero memory overhead." class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
              </div>
            </div>

            <button type="submit" class="w-full bg-primary text-on-primary py-3 rounded-xl font-semibold text-xs glow-button shadow-md">
              Confirm & Submit Review Evaluation
            </button>
          </form>
        </div>
      ` : `<p class="text-xs text-on-surface-variant">No pending evaluations in queue.</p>`}
    </div>
  `;
}

function renderAnalyticsView() {
  const analytics = TeacherService.getAnalytics();

  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-on-surface">Exam Results & Analytics</h1>
          <p class="text-xs text-on-surface-variant">Deep insights into student accuracy, score distributions, and CSV export.</p>
        </div>
        <button onclick="downloadCSVReport()" class="bg-primary text-on-primary px-4 py-2 rounded-xl font-semibold text-xs glow-button flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">download</span> Export Excel / CSV Report
        </button>
      </div>

      <!-- Key Analytics Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Highest Score</span>
          <p class="text-2xl font-extrabold text-green-600 mt-1">${analytics.highestScore} / 100</p>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Average Score</span>
          <p class="text-2xl font-extrabold text-primary mt-1">${analytics.averageScore} / 100</p>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">MCQ Accuracy</span>
          <p class="text-2xl font-extrabold text-on-surface mt-1">${analytics.mcqAccuracy}%</p>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Coding Pass Rate</span>
          <p class="text-2xl font-extrabold text-on-surface mt-1">${analytics.codingSuccessRate}%</p>
        </div>
      </div>
    </div>
  `;
}

// Global Handlers
window.switchTab = function(tab) {
  activeTab = tab;
  renderTeacherPortal();
};

window.togglePublish = function(id) {
  TeacherService.togglePublish(id);
  renderTeacherPortal();
};

window.duplicateExam = function(id) {
  TeacherService.duplicateExam(id);
  renderTeacherPortal();
};

window.deleteExam = function(id) {
  TeacherService.deleteExam(id);
  renderTeacherPortal();
};

window.handleCreateExam = function(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById('ex-name').value,
    code: document.getElementById('ex-code').value,
    subject: document.getElementById('ex-subject').value,
    department: document.getElementById('ex-dept').value,
    durationMinutes: document.getElementById('ex-duration').value,
    totalMarks: document.getElementById('ex-total').value,
    passingMarks: document.getElementById('ex-passing').value,
    randomize: document.getElementById('ex-rand').checked,
    negativeMarking: document.getElementById('ex-neg').checked,
    autoSubmit: document.getElementById('ex-auto').checked,
    status: 'PUBLISHED'
  };

  TeacherService.createExam(data);
  alert(`Exam "${data.name}" created and published! Share Exam Code: ${data.code}`);
  window.switchTab('dash');
};

window.handleTeacherReview = function(e, reviewId) {
  e.preventDefault();
  const marks = document.getElementById('review-marks').value;
  const feedback = document.getElementById('review-feedback').value;

  TeacherService.submitTeacherReview(reviewId, marks, feedback);
  alert('Review submitted successfully! Results updated for student.');
  window.switchTab('dash');
};

window.downloadCSVReport = function() {
  const csv = TeacherService.exportResultsCSV();
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'CodeTest_Exam_Results_2026.csv';
  a.click();
};

window.openAddQuestionModal = function() {
  const modal = document.getElementById('add-question-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeAddQuestionModal = function() {
  const modal = document.getElementById('add-question-modal');
  if (modal) modal.classList.add('hidden');
};

window.switchQuestionTypeForm = function(type) {
  activeQuestionType = type;
  const mcqBtn = document.getElementById('qtype-btn-mcq');
  const codingBtn = document.getElementById('qtype-btn-coding');
  const mcqFields = document.getElementById('qform-mcq-fields');
  const codingFields = document.getElementById('qform-coding-fields');

  if (type === 'CODING') {
    codingBtn.className = "flex-1 py-2 rounded-lg text-xs font-semibold transition-all bg-surface-container-lowest text-primary shadow-sm";
    mcqBtn.className = "flex-1 py-2 rounded-lg text-xs font-semibold transition-all text-on-surface-variant hover:text-on-surface";
    codingFields.classList.remove('hidden');
    mcqFields.classList.add('hidden');
  } else {
    mcqBtn.className = "flex-1 py-2 rounded-lg text-xs font-semibold transition-all bg-surface-container-lowest text-primary shadow-sm";
    codingBtn.className = "flex-1 py-2 rounded-lg text-xs font-semibold transition-all text-on-surface-variant hover:text-on-surface";
    mcqFields.classList.remove('hidden');
    codingFields.classList.add('hidden');
  }
};

window.handleSaveNewQuestion = function(e) {
  e.preventDefault();

  if (activeQuestionType === 'MCQ') {
    const prompt = document.getElementById('q-mcq-prompt').value;
    const opt0 = document.getElementById('q-opt-0').value;
    const opt1 = document.getElementById('q-opt-1').value;
    const opt2 = document.getElementById('q-opt-2').value;
    const opt3 = document.getElementById('q-opt-3').value;
    const correctIdx = parseInt(document.getElementById('q-correct-idx').value);
    const marks = parseInt(document.getElementById('q-mcq-marks').value);
    const explanation = document.getElementById('q-mcq-explanation').value;

    TeacherService.saveQuestionToBank({
      type: 'MCQ',
      subject: 'Data Structures',
      topic: 'General',
      difficulty: 'Easy',
      marks,
      prompt,
      options: [opt0, opt1, opt2, opt3],
      correctAnswer: correctIdx,
      explanation
    });
  } else {
    const title = document.getElementById('q-code-title').value;
    const statement = document.getElementById('q-code-statement').value;
    const constraints = document.getElementById('q-code-constraints').value;
    const pubIn = document.getElementById('q-pub-input').value;
    const pubOut = document.getElementById('q-pub-output').value;
    const hidIn = document.getElementById('q-hid-input').value;
    const hidOut = document.getElementById('q-hid-output').value;
    const marks = parseInt(document.getElementById('q-code-marks').value);

    TeacherService.saveQuestionToBank({
      type: 'CODING',
      subject: 'Algorithms',
      topic: 'Logic',
      difficulty: 'Medium',
      marks,
      title,
      statement,
      constraints,
      publicTestCases: [{ input: pubIn, output: pubOut, weight: 20 }],
      hiddenTestCases: [{ input: hidIn, output: hidOut, weight: 40 }]
    });
  }

  alert('Question created & added to Question Bank / Exam successfully!');
  window.closeAddQuestionModal();
  renderTeacherPortal();
};

window.addEventListener('DOMContentLoaded', renderTeacherPortal);
