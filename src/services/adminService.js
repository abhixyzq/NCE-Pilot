/**
 * Admin Service - Platform Oversight, User Management, & System Logs
 */

let TEACHERS_LIST = [
  { id: 'tch_1', name: 'Prof. Sarah Jenkins', email: 'sarah.j@techcorp.io', department: 'Computer Science', examsCreated: 8, status: 'ACTIVE' },
  { id: 'tch_2', name: 'Dr. Robert Vance', email: 'r.vance@stanford.edu', department: 'Software Engineering', examsCreated: 12, status: 'ACTIVE' },
  { id: 'tch_3', name: 'Prof. Elena Rostova', email: 'elena.r@mit.edu', department: 'Data Science', examsCreated: 5, status: 'ACTIVE' }
];

let STUDENTS_LIST = [
  { id: 'std_1', name: 'Alex Rivera', email: 'alex.rivera@example.com', department: 'Computer Science', testsTaken: 42, avgScore: 94.2, status: 'ACTIVE' },
  { id: 'std_2', name: 'Jordan Lee', email: 'jordan.lee@example.com', department: 'Computer Science', testsTaken: 28, avgScore: 82.0, status: 'ACTIVE' },
  { id: 'std_3', name: 'Taylor Morgan', email: 'taylor.m@example.com', department: 'Software Engineering', testsTaken: 19, avgScore: 78.5, status: 'ACTIVE' }
];

let DEPARTMENTS = [
  { id: 'dept_1', name: 'Computer Science', code: 'CS', head: 'Dr. Robert Vance', studentCount: 420 },
  { id: 'dept_2', name: 'Software Engineering', code: 'SE', head: 'Prof. Sarah Jenkins', studentCount: 310 },
  { id: 'dept_3', name: 'Data Science & AI', code: 'DS', head: 'Prof. Elena Rostova', studentCount: 280 }
];

let AUDIT_LOGS = [
  { id: 'log_1', timestamp: '2026-07-22 14:32:00', actor: 'Prof. Sarah Jenkins', action: 'PUBLISHED_EXAM', details: 'Published exam "CT-9824"' },
  { id: 'log_2', timestamp: '2026-07-22 14:15:00', actor: 'Alex Rivera', action: 'SUBMITTED_EXAM', details: 'Completed "Data Structures Midterm" (Score: 100/100)' },
  { id: 'log_3', timestamp: '2026-07-22 13:45:00', actor: 'System Admin', action: 'UPDATE_SYSTEM_SETTINGS', details: 'Updated Judge0 compiler sandbox time limits' }
];

export class AdminService {
  static getPlatformStats() {
    return {
      totalUsers: 1420,
      totalTeachers: TEACHERS_LIST.length,
      totalStudents: STUDENTS_LIST.length,
      totalExams: 34,
      systemUptime: '99.99%',
      activeSessions: 184
    };
  }

  static getTeachers() {
    return [...TEACHERS_LIST];
  }

  static getStudents() {
    return [...STUDENTS_LIST];
  }

  static getDepartments() {
    return [...DEPARTMENTS];
  }

  static getLogs() {
    return [...AUDIT_LOGS];
  }
}
