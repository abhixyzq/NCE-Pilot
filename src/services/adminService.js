/**
 * Admin Service - Clean Platform Oversight & Action Logs
 */

let TEACHERS_LIST = [];
let STUDENTS_LIST = [];
let DEPARTMENTS = [];
let AUDIT_LOGS = [];

export class AdminService {
  static getPlatformStats() {
    return {
      totalUsers: TEACHERS_LIST.length + STUDENTS_LIST.length,
      totalTeachers: TEACHERS_LIST.length,
      totalStudents: STUDENTS_LIST.length,
      totalExams: 0,
      systemUptime: '99.99%',
      activeSessions: 0
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

  static addLog(actor, action, details) {
    AUDIT_LOGS.unshift({
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor,
      action,
      details
    });
  }
}
