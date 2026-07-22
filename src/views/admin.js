import { AdminService } from '../services/adminService.js';

let activeAdminTab = 'dash';

export function renderAdminPortal() {
  const content = document.getElementById('admin-content');
  if (!content) return;

  if (activeAdminTab === 'dash') {
    content.innerHTML = renderDashboard();
  } else if (activeAdminTab === 'teachers') {
    content.innerHTML = renderTeachers();
  } else if (activeAdminTab === 'students') {
    content.innerHTML = renderStudents();
  } else if (activeAdminTab === 'depts') {
    content.innerHTML = renderDepartments();
  } else if (activeAdminTab === 'logs') {
    content.innerHTML = renderLogs();
  }
}

function renderDashboard() {
  const stats = AdminService.getPlatformStats();

  return `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-on-surface">Platform Administration Dashboard</h1>
        <p class="text-xs text-on-surface-variant">Global system status, infrastructure health, user management, and audit logs.</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Total Registered Users</span>
          <p class="text-2xl font-extrabold text-on-surface mt-1">${stats.totalUsers}</p>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Teachers & Faculty</span>
          <p class="text-2xl font-extrabold text-primary mt-1">${stats.totalTeachers}</p>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">Enrolled Students</span>
          <p class="text-2xl font-extrabold text-secondary mt-1">${stats.totalStudents}</p>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
          <span class="text-xs text-on-surface-variant font-medium">System Uptime</span>
          <p class="text-2xl font-extrabold text-green-600 mt-1">${stats.systemUptime}</p>
        </div>
      </div>
    </div>
  `;
}

function renderTeachers() {
  const teachers = AdminService.getTeachers();
  return `
    <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 ambient-shadow space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-bold text-on-surface">Manage Faculty & Teachers</h2>
        <button onclick="alert('Invite Teacher dialog opened!')" class="bg-primary text-on-primary px-4 py-2 rounded-xl font-semibold text-xs glow-button">
          + Add Teacher
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-outline-variant/40 text-on-surface-variant">
            <tr>
              <th class="py-3 px-4">Name</th>
              <th class="py-3 px-4">Email</th>
              <th class="py-3 px-4">Department</th>
              <th class="py-3 px-4">Exams Created</th>
              <th class="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/20 font-medium">
            ${teachers.map(t => `
              <tr class="hover:bg-surface-container-low transition-colors">
                <td class="py-3 px-4 font-bold text-on-surface">${t.name}</td>
                <td class="py-3 px-4 font-mono text-on-surface-variant">${t.email}</td>
                <td class="py-3 px-4">${t.department}</td>
                <td class="py-3 px-4 font-bold text-primary">${t.examsCreated}</td>
                <td class="py-3 px-4">
                  <span class="bg-green-500/15 text-green-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full">${t.status}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderStudents() {
  const students = AdminService.getStudents();
  return `
    <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 ambient-shadow space-y-4">
      <h2 class="text-lg font-bold text-on-surface">Manage Enrolled Students</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-outline-variant/40 text-on-surface-variant">
            <tr>
              <th class="py-3 px-4">Student Name</th>
              <th class="py-3 px-4">Email</th>
              <th class="py-3 px-4">Department</th>
              <th class="py-3 px-4">Tests Taken</th>
              <th class="py-3 px-4">Avg Score</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/20 font-medium">
            ${students.map(s => `
              <tr class="hover:bg-surface-container-low transition-colors">
                <td class="py-3 px-4 font-bold text-on-surface">${s.name}</td>
                <td class="py-3 px-4 font-mono text-on-surface-variant">${s.email}</td>
                <td class="py-3 px-4">${s.department}</td>
                <td class="py-3 px-4 font-bold">${s.testsTaken}</td>
                <td class="py-3 px-4 text-green-600 font-bold">${s.avgScore}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderDepartments() {
  const depts = AdminService.getDepartments();
  return `
    <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 ambient-shadow space-y-4">
      <h2 class="text-lg font-bold text-on-surface">University Departments & Subjects</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${depts.map(d => `
          <div class="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 space-y-2">
            <span class="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded font-mono">${d.code}</span>
            <h3 class="font-bold text-sm text-on-surface">${d.name}</h3>
            <p class="text-xs text-on-surface-variant">Head: ${d.head}</p>
            <p class="text-xs font-semibold text-primary">${d.studentCount} Enrolled Students</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderLogs() {
  const logs = AdminService.getLogs();
  return `
    <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 ambient-shadow space-y-4">
      <h2 class="text-lg font-bold text-on-surface">Platform Audit & Action Logs</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-outline-variant/40 text-on-surface-variant">
            <tr>
              <th class="py-3 px-4">Timestamp</th>
              <th class="py-3 px-4">Actor</th>
              <th class="py-3 px-4">Action</th>
              <th class="py-3 px-4">Details</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/20 font-mono text-[11px]">
            ${logs.map(l => `
              <tr class="hover:bg-surface-container-low transition-colors">
                <td class="py-3 px-4 text-on-surface-variant">${l.timestamp}</td>
                <td class="py-3 px-4 font-bold text-on-surface">${l.actor}</td>
                <td class="py-3 px-4 text-primary font-bold">${l.action}</td>
                <td class="py-3 px-4 text-on-surface-variant">${l.details}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.switchAdminTab = function(tab) {
  activeAdminTab = tab;
  renderAdminPortal();
};

window.addEventListener('DOMContentLoaded', renderAdminPortal);
