import { TeacherService } from '../services/teacherService.js';

let activeTab = 'dash';
let activeQuestionType = 'OBJECTIVE'; // OBJECTIVE, MCQ_MULTIPLE, SUBJECTIVE, CODING

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
                <th class="py-3 px-4">Total Marks (Auto)</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/20 font-medium">
              ${exams.length > 0 ? exams.map(e => `
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-4 font-mono font-bold text-primary">${e.code}</td>
                  <td class="py-3 px-4 font-bold text-on-surface">${e.name}</td>
                  <td class="py-3 px-4 text-on-surface-variant">${e.subject}</td>
                  <td class="py-3 px-4 font-mono">${e.durationMinutes} min</td>
                  <td class="py-3 px-4 font-mono font-bold text-primary">${e.totalMarks} Marks</td>
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
              `).join('') : `<tr><td colspan="7" class="py-8 text-center text-on-surface-variant">No exams created yet. Click "+ Create New Exam" to build your first exam.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderCreateExamView() {
  const code = TeacherService.generateExamCode();
  const qBank = TeacherService.getQuestionBank();

  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-on-surface">Create New Examination</h1>
          <p class="text-xs text-on-surface-variant">Configure parameters, pick Question IDs, and auto-calculate total marks.</p>
        </div>
        <button type="button" onclick="openAddQuestionModal()" class="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-semibold text-xs glow-button flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">add_circle</span> Author Question
        </button>
      </div>

      <form onsubmit="handleCreateExam(event)" class="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 md:p-8 ambient-shadow space-y-6">
        <!-- Form Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Exam Name</label>
            <input type="text" id="ex-name" required placeholder="e.g. Data Structures Midterm 2026" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Exam Code (Auto-Generated)</label>
            <input type="text" id="ex-code" readonly value="${code}" class="w-full px-3.5 py-2.5 bg-surface-container border border-outline-variant/60 rounded-xl text-xs font-mono font-bold text-primary"/>
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Subject</label>
            <input type="text" id="ex-subject" required placeholder="e.g. Computer Science" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Department & Semester</label>
            <input type="text" id="ex-dept" required placeholder="e.g. CS & Engineering (Fall 2026)" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Duration (Minutes)</label>
            <input type="number" id="ex-duration" required value="60" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none focus:border-primary"/>
          </div>

          <!-- Auto-Calculated Total Marks Badge -->
          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Total Marks (Auto-Calculated)</label>
            <div class="px-3.5 py-2.5 bg-primary/10 border border-primary/30 rounded-xl text-xs font-bold text-primary flex items-center justify-between">
              <span>Auto Count:</span>
              <span id="auto-total-marks-badge" class="text-sm font-mono font-extrabold">0 Marks</span>
            </div>
          </div>
        </div>

        <!-- Question Bank Picker Checklist -->
        <div class="pt-4 border-t border-outline-variant/30 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-on-surface">Select Questions from Question Bank</h3>
              <p class="text-[11px] text-on-surface-variant">Check questions by ID to include in this exam.</p>
            </div>
            <button type="button" onclick="openAddQuestionModal()" class="text-xs font-bold text-primary hover:underline">+ Create Question</button>
          </div>

          <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
            ${qBank.length > 0 ? qBank.map(q => `
              <label class="bg-surface-container-low p-3 rounded-xl flex justify-between items-center border border-outline-variant/30 hover:border-primary/40 cursor-pointer transition-all">
                <div class="flex items-center gap-3">
                  <input type="checkbox" name="selected-q-ids" value="${q.id}" data-marks="${q.marks}" onchange="recalculateTotalMarks()" class="rounded text-primary focus:ring-primary"/>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-mono text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">${q.id}</span>
                      <span class="bg-surface-container-high text-on-surface text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">${q.type}</span>
                    </div>
                    <p class="font-bold text-xs text-on-surface mt-0.5">${q.prompt || q.title}</p>
                  </div>
                </div>
                <span class="font-mono font-bold text-xs text-primary">${q.marks} Marks</span>
              </label>
            `).join('') : `
              <div class="p-6 text-center border-2 border-dashed border-outline-variant/40 rounded-xl space-y-2">
                <p class="text-xs text-on-surface-variant font-medium">Question Bank is empty.</p>
                <button type="button" onclick="openAddQuestionModal()" class="bg-primary text-on-primary px-3.5 py-1.5 rounded-xl font-semibold text-xs glow-button">
                  + Add First Question
                </button>
              </div>
            `}
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
          <p class="text-xs text-on-surface-variant">Author and manage Objective, Multiple Choice, Subjective, and Coding questions.</p>
        </div>
        <button onclick="openAddQuestionModal()" class="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-semibold text-xs glow-button flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">add_circle</span> Create New Question
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 flex gap-3 flex-wrap items-center">
        <input type="text" placeholder="Search by Question ID or Keyword..." class="px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs flex-1 outline-none"/>
        <select class="px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs outline-none">
          <option>All Question Types</option>
          <option>Objective (Single Choice)</option>
          <option>Multiple Choice (Multi-Correct)</option>
          <option>Subjective</option>
          <option>Coding</option>
        </select>
      </div>

      <!-- Questions List -->
      <div class="space-y-3" id="qb-questions-list">
        ${questions.length > 0 ? questions.map(q => `
          <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow space-y-2">
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-2">
                <span class="font-mono text-[11px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded">${q.id}</span>
                <span class="bg-surface-container-high text-on-surface text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">${q.type}</span>
              </div>
              <span class="text-xs font-mono text-primary font-extrabold">${q.marks} Marks</span>
            </div>
            <h3 class="text-sm font-bold text-on-surface">${q.prompt || q.title}</h3>
            <p class="text-xs text-on-surface-variant">${q.explanation || q.statement || q.subjectiveAnswer || ''}</p>
          </div>
        `).join('') : `
          <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-12 text-center space-y-3">
            <span class="material-symbols-outlined text-4xl text-on-surface-variant">quiz</span>
            <h3 class="text-sm font-bold text-on-surface">No Questions in Question Bank</h3>
            <p class="text-xs text-on-surface-variant max-w-sm mx-auto">Create questions to add them to your repository and build exams.</p>
            <button onclick="openAddQuestionModal()" class="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold glow-button">
              + Author First Question
            </button>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderManualReviewView() {
  const queue = TeacherService.getManualReviewQueue();
  return `
    <div class="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 class="text-2xl font-bold text-on-surface">Manual Review Queue</h1>
        <p class="text-xs text-on-surface-variant">Evaluate subjective text responses and code submissions.</p>
      </div>

      <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-8 text-center text-xs text-on-surface-variant">
        No pending subjective reviews in queue.
      </div>
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
          <p class="text-xs text-on-surface-variant">Export student performance data to Excel / CSV.</p>
        </div>
        <button onclick="downloadCSVReport()" class="bg-primary text-on-primary px-4 py-2 rounded-xl font-semibold text-xs glow-button flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">download</span> Export Report
        </button>
      </div>
    </div>
  `;
}

// Global Handlers
window.switchTab = function(tab) {
  activeTab = tab;
  renderTeacherPortal();
};

window.recalculateTotalMarks = function() {
  const checkboxes = document.querySelectorAll('input[name="selected-q-ids"]:checked');
  let total = 0;
  checkboxes.forEach(cb => {
    total += parseInt(cb.getAttribute('data-marks')) || 0;
  });

  const badge = document.getElementById('auto-total-marks-badge');
  if (badge) badge.innerText = `${total} Marks`;
};

window.handleCreateExam = function(e) {
  e.preventDefault();

  const selectedBoxes = document.querySelectorAll('input[name="selected-q-ids"]:checked');
  const questionIds = Array.from(selectedBoxes).map(cb => cb.value);

  if (questionIds.length === 0) {
    alert('Please select at least 1 Question from the Question Bank checklist.');
    return;
  }

  const data = {
    name: document.getElementById('ex-name').value,
    code: document.getElementById('ex-code').value,
    subject: document.getElementById('ex-subject').value,
    department: document.getElementById('ex-dept').value,
    durationMinutes: document.getElementById('ex-duration').value,
    questionIds,
    status: 'PUBLISHED'
  };

  const created = TeacherService.createExam(data);
  alert(`Exam "${created.name}" created successfully! Auto-Counted Total Marks: ${created.totalMarks} Marks. Share Exam Code: ${created.code}`);
  window.switchTab('dash');
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
  const types = ['OBJECTIVE', 'MCQ_MULTIPLE', 'SUBJECTIVE', 'CODING'];

  types.forEach(t => {
    const btn = document.getElementById(`qtype-btn-${t.toLowerCase()}`);
    const field = document.getElementById(`qform-${t.toLowerCase()}-fields`);

    if (t === type) {
      if (btn) btn.className = "flex-1 py-2 rounded-lg text-xs font-semibold transition-all bg-surface-container-lowest text-primary shadow-sm";
      if (field) field.classList.remove('hidden');
    } else {
      if (btn) btn.className = "flex-1 py-2 rounded-lg text-xs font-semibold transition-all text-on-surface-variant hover:text-on-surface";
      if (field) field.classList.add('hidden');
    }
  });
};

window.handleSaveNewQuestion = function(e) {
  e.preventDefault();

  if (activeQuestionType === 'OBJECTIVE') {
    const prompt = document.getElementById('q-obj-prompt').value;
    const opt0 = document.getElementById('q-obj-opt-0').value;
    const opt1 = document.getElementById('q-obj-opt-1').value;
    const opt2 = document.getElementById('q-obj-opt-2').value;
    const opt3 = document.getElementById('q-obj-opt-3').value;
    const correctIdx = parseInt(document.getElementById('q-obj-correct').value);
    const marks = parseInt(document.getElementById('q-obj-marks').value);

    TeacherService.saveQuestionToBank({
      type: 'OBJECTIVE',
      prompt,
      options: [opt0, opt1, opt2, opt3],
      correctAnswers: [correctIdx],
      marks
    });
  } else if (activeQuestionType === 'MCQ_MULTIPLE') {
    const prompt = document.getElementById('q-mcqmulti-prompt').value;
    const opt0 = document.getElementById('q-multi-opt-0').value;
    const opt1 = document.getElementById('q-multi-opt-1').value;
    const opt2 = document.getElementById('q-multi-opt-2').value;
    const opt3 = document.getElementById('q-multi-opt-3').value;
    const marks = parseInt(document.getElementById('q-multi-marks').value);

    TeacherService.saveQuestionToBank({
      type: 'MCQ_MULTIPLE',
      prompt,
      options: [opt0, opt1, opt2, opt3],
      correctAnswers: [0, 1],
      marks
    });
  } else if (activeQuestionType === 'SUBJECTIVE') {
    const prompt = document.getElementById('q-subj-prompt').value;
    const modelAns = document.getElementById('q-subj-model').value;
    const marks = parseInt(document.getElementById('q-subj-marks').value);

    TeacherService.saveQuestionToBank({
      type: 'SUBJECTIVE',
      prompt,
      subjectiveAnswer: modelAns,
      marks
    });
  } else { // CODING
    const title = document.getElementById('q-code-title').value;
    const statement = document.getElementById('q-code-statement').value;
    const pubIn = document.getElementById('q-pub-input').value;
    const pubOut = document.getElementById('q-pub-output').value;
    const marks = parseInt(document.getElementById('q-code-marks').value);

    TeacherService.saveQuestionToBank({
      type: 'CODING',
      title,
      statement,
      marks,
      publicTestCases: [{ input: pubIn, output: pubOut, weight: marks }]
    });
  }

  alert('Question authored & added to Question Bank!');
  window.closeAddQuestionModal();
  renderTeacherPortal();
};

window.addEventListener('DOMContentLoaded', renderTeacherPortal);
