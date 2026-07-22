export function renderAuth() {
  return `
    <header class="fixed top-0 w-full z-50 glass-nav bg-surface/80 border-b border-outline-variant/30 px-6 md:px-margin-desktop py-4 flex justify-between items-center">
      <div class="flex items-center gap-2 cursor-pointer active:opacity-70" onclick="window.location.hash = 'landing'">
        <span class="material-symbols-outlined text-primary text-2xl">terminal</span>
        <span class="font-bold text-lg text-primary tracking-tight">CodeTest</span>
      </div>
      <div class="flex items-center gap-4">
        <a class="text-on-surface-variant font-medium text-xs hover:text-primary transition-colors" href="#" onclick="window.location.hash = 'landing'">Back to Home</a>
        <button class="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-all" onclick="window.location.hash = 'dashboard'">
          Direct Demo Login
        </button>
      </div>
    </header>

    <main class="flex-grow flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
      <!-- Background Ambient Blobs -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div class="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-secondary-container/20 rounded-full blur-[100px]"></div>
      </div>

      <div class="relative z-10 w-full max-w-[460px]">
        <div class="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl ambient-shadow-lg p-6 md:p-8">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-on-surface mb-1" id="auth-title">Welcome back</h1>
            <p class="text-xs text-on-surface-variant" id="auth-subtitle">Elevate your technical assessment experience.</p>
          </div>

          <!-- Auth Mode Tabs -->
          <div class="flex p-1 bg-surface-container-high rounded-xl mb-6" id="auth-tabs">
            <button class="flex-1 py-2 rounded-lg text-xs font-semibold transition-all bg-surface-container-lowest text-primary shadow-sm" id="btn-login-tab" onclick="switchAuthTab('login')">
              Sign In
            </button>
            <button class="flex-1 py-2 rounded-lg text-xs font-semibold transition-all text-on-surface-variant hover:text-on-surface" id="btn-register-tab" onclick="switchAuthTab('register')">
              Register
            </button>
          </div>

          <!-- Register Sub-Types (Hidden on Login) -->
          <div class="hidden flex gap-2 mb-6" id="register-roles">
            <button class="role-btn flex-1 py-2 border border-primary bg-primary/10 text-primary rounded-lg text-[11px] font-semibold text-center transition-all" onclick="selectRole(this, 'Student')">Student</button>
            <button class="role-btn flex-1 py-2 border border-outline-variant text-on-surface-variant rounded-lg text-[11px] font-semibold text-center transition-all hover:border-primary" onclick="selectRole(this, 'Recruiter')">Recruiter</button>
            <button class="role-btn flex-1 py-2 border border-outline-variant text-on-surface-variant rounded-lg text-[11px] font-semibold text-center transition-all hover:border-primary" onclick="selectRole(this, 'College')">College</button>
          </div>

          <!-- Social Logins -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <button class="flex items-center justify-center gap-2 py-2.5 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all text-xs font-medium text-on-surface" onclick="simulateOAuth('Google')">
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            <button class="flex items-center justify-center gap-2 py-2.5 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all text-xs font-medium text-on-surface" onclick="simulateOAuth('GitHub')">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
              </svg>
              GitHub
            </button>
          </div>

          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center"><span class="w-full border-t border-outline-variant/40"></span></div>
            <div class="relative flex justify-center text-[10px]">
              <span class="bg-surface-container-lowest px-3 text-on-surface-variant font-semibold uppercase tracking-widest">or continue with email</span>
            </div>
          </div>

          <!-- Form inputs -->
          <form onsubmit="handleAuthSubmit(event)" class="space-y-4">
            <div class="hidden" id="name-field-group">
              <label class="block text-xs font-semibold text-on-surface mb-1">Full Name</label>
              <input type="text" id="auth-name" placeholder="Alex Rivera" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"/>
            </div>

            <div>
              <label class="block text-xs font-semibold text-on-surface mb-1">Email Address</label>
              <input type="email" id="auth-email" required value="alex.rivera@example.com" placeholder="alex@example.com" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"/>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="block text-xs font-semibold text-on-surface">Password</label>
                <a href="#" class="text-[11px] text-primary hover:underline font-medium">Forgot password?</a>
              </div>
              <input type="password" id="auth-password" required value="••••••••••••" placeholder="Enter password" class="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"/>
            </div>

            <button type="submit" id="auth-submit-btn" class="w-full bg-primary text-on-primary py-3 rounded-xl font-semibold text-xs glow-button shadow-md">
              Sign In to CodeTest
            </button>
          </form>

          <p class="text-[11px] text-center text-on-surface-variant mt-6">
            By signing in, you agree to our <a href="#" class="text-primary underline">Terms of Service</a> and <a href="#" class="text-primary underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </main>
  `;
}

// Attach functions globally for inline HTML events
window.switchAuthTab = function(mode) {
  const loginTab = document.getElementById('btn-login-tab');
  const regTab = document.getElementById('btn-register-tab');
  const roles = document.getElementById('register-roles');
  const nameGroup = document.getElementById('name-field-group');
  const title = document.getElementById('auth-title');
  const subtitle = document.getElementById('auth-subtitle');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (mode === 'register') {
    loginTab.className = "flex-1 py-2 rounded-lg text-xs font-semibold transition-all text-on-surface-variant hover:text-on-surface";
    regTab.className = "flex-1 py-2 rounded-lg text-xs font-semibold transition-all bg-surface-container-lowest text-primary shadow-sm";
    roles.classList.remove('hidden');
    nameGroup.classList.remove('hidden');
    title.innerText = "Create an Account";
    subtitle.innerText = "Join over 10,000 developers mastering technical hiring.";
    submitBtn.innerText = "Create Free Account";
  } else {
    regTab.className = "flex-1 py-2 rounded-lg text-xs font-semibold transition-all text-on-surface-variant hover:text-on-surface";
    loginTab.className = "flex-1 py-2 rounded-lg text-xs font-semibold transition-all bg-surface-container-lowest text-primary shadow-sm";
    roles.classList.add('hidden');
    nameGroup.classList.add('hidden');
    title.innerText = "Welcome back";
    subtitle.innerText = "Elevate your technical assessment experience.";
    submitBtn.innerText = "Sign In to CodeTest";
  }
};

window.selectRole = function(el, roleName) {
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.className = "role-btn flex-1 py-2 border border-outline-variant text-on-surface-variant rounded-lg text-[11px] font-semibold text-center transition-all hover:border-primary";
  });
  el.className = "role-btn flex-1 py-2 border border-primary bg-primary/10 text-primary rounded-lg text-[11px] font-semibold text-center transition-all";
};

window.simulateOAuth = function(provider) {
  alert(`Connecting to ${provider} OAuth authentication... Redirecting to Dashboard.`);
  window.location.hash = 'dashboard';
};

window.handleAuthSubmit = function(e) {
  e.preventDefault();
  const btn = document.getElementById('auth-submit-btn');
  btn.innerHTML = `<span class="material-symbols-outlined text-sm animate-spin">progress_activity</span> Authenticating...`;
  setTimeout(() => {
    window.location.hash = 'dashboard';
  }, 600);
};
