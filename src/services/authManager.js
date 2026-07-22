/**
 * AuthManager Service - Role-Based Authentication & Session Provider
 * Roles: Student, Recruiter, College, Admin
 */

const DEMO_USERS = {
  Student: {
    id: 'usr_student_1',
    fullName: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    role: 'STUDENT',
    college: 'Stanford Institute of Tech',
    xp: 1250,
    avatar: 'AR'
  },
  Recruiter: {
    id: 'usr_recruiter_1',
    fullName: 'Sarah Jenkins',
    email: 'sarah.j@techcorp.io',
    role: 'RECRUITER',
    company: 'TechCorp Global',
    createdTestsCount: 8,
    avatar: 'SJ'
  },
  College: {
    id: 'usr_college_1',
    fullName: 'Dean Marcus Vance',
    email: 'm.vance@stanford.edu',
    role: 'COLLEGE',
    college: 'Stanford University CS Dept',
    totalStudents: 1420,
    avatar: 'MV'
  },
  Admin: {
    id: 'usr_admin_1',
    fullName: 'System Administrator',
    email: 'admin@codetestpro.io',
    role: 'ADMIN',
    platformUptime: '99.99%',
    avatar: 'SA'
  }
};

export class AuthManager {
  static getSession() {
    const sessionStr = localStorage.getItem('codetest_session');
    if (sessionStr) {
      try {
        return JSON.parse(sessionStr);
      } catch (e) {
        // Fallback
      }
    }
    return DEMO_USERS.Student;
  }

  static loginAsRole(roleName) {
    const user = DEMO_USERS[roleName] || DEMO_USERS.Student;
    localStorage.setItem('codetest_session', JSON.stringify(user));
    return user;
  }

  static logout() {
    localStorage.removeItem('codetest_session');
    window.location.href = 'auth.html';
  }

  static isAuthorized(requiredRole) {
    const current = this.getSession();
    return current.role === requiredRole || current.role === 'ADMIN';
  }
}
