export function renderDashboard() {
  return `
    <!-- TopAppBar -->
    <header class="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-4 md:px-margin-desktop py-3">
      <div class="flex items-center gap-3">
        <button class="p-2 hover:bg-surface-container-high rounded-lg transition-colors md:hidden" onclick="toggleSidebar()">
          <span class="material-symbols-outlined text-primary">menu</span>
        </button>
        <div class="flex items-center gap-2 cursor-pointer" onclick="window.location.hash = 'landing'">
          <span class="material-symbols-outlined text-primary text-2xl">terminal</span>
          <span class="font-bold text-lg text-primary tracking-tight">CodeTest</span>
        </div>
      </div>

      <div class="hidden md:flex flex-1 max-w-md mx-8">
        <div class="relative w-full group">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
          <input 
            id="dash-search-input"
            oninput="filterAssessments()"
            class="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xs"
            placeholder="Search tests, topics (e.g. Two Sum, Dynamic Programming)..." 
            type="text"
          />
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button class="relative p-2 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-high transition-colors" onclick="alert('You have 2 upcoming test assignments!')">
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        </button>
        
        <div class="flex items-center gap-3 pl-3 border-l border-outline-variant/40">
          <div class="text-right hidden sm:block">
            <p class="font-semibold text-xs text-on-surface">Alex Rivera</p>
            <p class="text-[11px] text-on-surface-variant font-mono">Beta Tier • 1,250 XP</p>
          </div>
          <div class="w-9 h-9 rounded-full border-2 border-primary bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs">
            AR
          </div>
        </div>
      </div>
    </header>

    <div class="flex pt-16 min-h-screen">
      <!-- Sidebar Drawer -->
      <aside id="sidebar-drawer" class="w-64 fixed md:sticky top-16 left-0 h-[calc(100vh-64px)] bg-surface border-r border-outline-variant/30 flex flex-col justify-between p-4 z-40 transition-transform md:translate-x-0 -translate-x-full">
        <div class="space-y-1">
          <div class="px-3 py-2 mb-2 bg-surface-container-low rounded-xl flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
              AR
            </div>
            <div>
              <p class="font-bold text-xs text-on-surface">Alex Rivera</p>
              <p class="text-[10px] text-on-surface-variant">Student Account</p>
            </div>
          </div>

          <a href="#" class="bg-primary-container text-on-primary-container rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs font-semibold">
            <span class="material-symbols-outlined text-lg">dashboard</span>
            Dashboard
          </a>
          <a href="#editor" class="text-on-surface-variant hover:bg-surface-container-high rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs font-medium transition-all">
            <span class="material-symbols-outlined text-lg">code</span>
            Code Editor (IDE)
          </a>
          <a href="#" class="text-on-surface-variant hover:bg-surface-container-high rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs font-medium transition-all" onclick="alert('Assessments archive loaded')">
            <span class="material-symbols-outlined text-lg">assignment</span>
            Assigned Tests
          </a>
          <a href="#" class="text-on-surface-variant hover:bg-surface-container-high rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs font-medium transition-all" onclick="alert('Analytics report generating...')">
            <span class="material-symbols-outlined text-lg">insights</span>
            Analytics & XP
          </a>
          <a href="#" class="text-on-surface-variant hover:bg-surface-container-high rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs font-medium transition-all" onclick="alert('Global Leaderboard Rank #482')">
            <span class="material-symbols-outlined text-lg">leaderboard</span>
            Leaderboard
          </a>
        </div>

        <div class="pt-4 border-t border-outline-variant/30 space-y-1">
          <button class="w-full text-left text-on-surface-variant hover:bg-surface-container-high rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs font-medium transition-all" onclick="window.location.hash = 'landing'">
            <span class="material-symbols-outlined text-lg">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      <!-- Main Dashboard Content -->
      <main class="flex-1 p-6 md:p-8 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        <!-- Welcome Header Banner -->
        <div class="bg-gradient-to-r from-primary via-primary-container to-surface-tint rounded-2xl p-6 md:p-8 text-white relative overflow-hidden ambient-shadow-lg">
          <div class="relative z-10 max-w-xl space-y-2">
            <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Active Assessment Season</span>
            <h1 class="text-2xl md:text-3xl font-extrabold">Welcome back, Alex!</h1>
            <p class="text-white/80 text-xs leading-relaxed">
              You have 2 pending technical assessments scheduled this week. Your streak is at 14 days! Keep solving to unlock Senior Tier.
            </p>
            <div class="pt-2 flex gap-3">
              <button class="bg-white text-primary px-5 py-2 rounded-xl text-xs font-bold shadow hover:bg-surface-container-low transition-all" onclick="window.location.hash = 'editor'">
                Start Practice IDE &rarr;
              </button>
            </div>
          </div>
        </div>

        <!-- Metrics Overview Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
            <div class="flex justify-between items-center mb-3">
              <span class="text-xs text-on-surface-variant font-medium">Tests Completed</span>
              <span class="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg text-lg">task_alt</span>
            </div>
            <p class="text-2xl font-extrabold text-on-surface">42</p>
            <p class="text-[11px] text-green-600 font-semibold mt-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">trending_up</span> +12% from last month
            </p>
          </div>

          <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
            <div class="flex justify-between items-center mb-3">
              <span class="text-xs text-on-surface-variant font-medium">Avg Pass Rate</span>
              <span class="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg text-lg">speed</span>
            </div>
            <p class="text-2xl font-extrabold text-on-surface">94.2%</p>
            <p class="text-[11px] text-green-600 font-semibold mt-1">Top 5% Global Percentile</p>
          </div>

          <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
            <div class="flex justify-between items-center mb-3">
              <span class="text-xs text-on-surface-variant font-medium">Coding Streak</span>
              <span class="material-symbols-outlined text-amber-500 bg-amber-500/10 p-2 rounded-lg text-lg">local_fire_department</span>
            </div>
            <p class="text-2xl font-extrabold text-on-surface">14 Days 🔥</p>
            <p class="text-[11px] text-amber-600 font-semibold mt-1">Personal Best Streak</p>
          </div>

          <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 ambient-shadow">
            <div class="flex justify-between items-center mb-3">
              <span class="text-xs text-on-surface-variant font-medium">Global Ranking</span>
              <span class="material-symbols-outlined text-tertiary bg-tertiary/10 p-2 rounded-lg text-lg">military_tech</span>
            </div>
            <p class="text-2xl font-extrabold text-on-surface">#482</p>
            <p class="text-[11px] text-on-surface-variant font-medium mt-1">Out of 10,400+ Candidates</p>
          </div>
        </div>

        <!-- Assigned Assessments Section -->
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl font-bold text-on-surface">Assigned Coding Assessments</h2>
              <p class="text-xs text-on-surface-variant">Select an assessment to begin your timed coding session in the IDE.</p>
            </div>

            <!-- Category Filters -->
            <div class="flex gap-2 flex-wrap" id="filter-pills">
              <button class="filter-btn active bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-semibold" onclick="setFilter(this, 'all')">All Tests</button>
              <button class="filter-btn border border-outline-variant/60 text-on-surface-variant px-3 py-1.5 rounded-lg text-xs font-medium hover:border-primary" onclick="setFilter(this, 'Easy')">Easy</button>
              <button class="filter-btn border border-outline-variant/60 text-on-surface-variant px-3 py-1.5 rounded-lg text-xs font-medium hover:border-primary" onclick="setFilter(this, 'Medium')">Medium</button>
              <button class="filter-btn border border-outline-variant/60 text-on-surface-variant px-3 py-1.5 rounded-lg text-xs font-medium hover:border-primary" onclick="setFilter(this, 'Hard')">Hard</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="assessments-grid">
            <!-- Assessment Card 1 -->
            <div class="assessment-item bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 ambient-shadow hover:border-primary/50 transition-all space-y-4" data-diff="Easy" data-title="Two Sum Algorithm">
              <div class="flex justify-between items-start">
                <span class="bg-green-500/15 text-green-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Easy</span>
                <span class="text-xs text-on-surface-variant font-mono font-medium">45 Minutes</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-on-surface">Two Sum Algorithm Assessment</h3>
                <p class="text-xs text-on-surface-variant line-clamp-2 mt-1">Given an array of integers, find two numbers such that they add up to a specific target number. Test memory and hash maps.</p>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-outline-variant/30">
                <div class="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span class="material-symbols-outlined text-sm text-primary">code</span>
                  <span>Python, JS, C++, Java</span>
                </div>
                <button class="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold glow-button" onclick="window.location.hash = 'editor'">
                  Launch IDE &rarr;
                </button>
              </div>
            </div>

            <!-- Assessment Card 2 -->
            <div class="assessment-item bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 ambient-shadow hover:border-primary/50 transition-all space-y-4" data-diff="Medium" data-title="LRU Cache Implementation">
              <div class="flex justify-between items-start">
                <span class="bg-amber-500/15 text-amber-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Medium</span>
                <span class="text-xs text-on-surface-variant font-mono font-medium">60 Minutes</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-on-surface">LRU Cache Implementation</h3>
                <p class="text-xs text-on-surface-variant line-clamp-2 mt-1">Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) time complexity.</p>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-outline-variant/30">
                <div class="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span class="material-symbols-outlined text-sm text-primary">data_object</span>
                  <span>Doubly Linked List + Map</span>
                </div>
                <button class="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold glow-button" onclick="window.location.hash = 'editor'">
                  Launch IDE &rarr;
                </button>
              </div>
            </div>

            <!-- Assessment Card 3 -->
            <div class="assessment-item bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 ambient-shadow hover:border-primary/50 transition-all space-y-4" data-diff="Hard" data-title="System Design & Async Queue">
              <div class="flex justify-between items-start">
                <span class="bg-red-500/15 text-red-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Hard</span>
                <span class="text-xs text-on-surface-variant font-mono font-medium">90 Minutes</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-on-surface">System Design & Async Task Queue</h3>
                <p class="text-xs text-on-surface-variant line-clamp-2 mt-1">Build a concurrent rate-limited task processor with exponential backoff retry and worker pool orchestration.</p>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-outline-variant/30">
                <div class="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span class="material-symbols-outlined text-sm text-primary">memory</span>
                  <span>Concurrency & Threads</span>
                </div>
                <button class="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold glow-button" onclick="window.location.hash = 'editor'">
                  Launch IDE &rarr;
                </button>
              </div>
            </div>

            <!-- Assessment Card 4 -->
            <div class="assessment-item bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 ambient-shadow hover:border-primary/50 transition-all space-y-4" data-diff="Medium" data-title="Binary Tree Level Order Traversal">
              <div class="flex justify-between items-start">
                <span class="bg-amber-500/15 text-amber-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Medium</span>
                <span class="text-xs text-on-surface-variant font-mono font-medium">45 Minutes</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-on-surface">Binary Tree Level Order Traversal</h3>
                <p class="text-xs text-on-surface-variant line-clamp-2 mt-1">Return the level order traversal of binary tree node values from left to right, level by level using breadth-first search.</p>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-outline-variant/30">
                <div class="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span class="material-symbols-outlined text-sm text-primary">account_tree</span>
                  <span>BFS & Queues</span>
                </div>
                <button class="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold glow-button" onclick="window.location.hash = 'editor'">
                  Launch IDE &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Submissions History -->
        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 ambient-shadow space-y-4">
          <h2 class="text-lg font-bold text-on-surface">Recent Assessment Submissions</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="border-b border-outline-variant/40 text-on-surface-variant">
                <tr>
                  <th class="py-3 px-4">Problem Name</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4">Runtime</th>
                  <th class="py-3 px-4">Score</th>
                  <th class="py-3 px-4">Language</th>
                  <th class="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/20 font-medium">
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-4 font-bold text-on-surface">Two Sum</td>
                  <td class="py-3 px-4 text-green-600 flex items-center gap-1 font-semibold">
                    <span class="material-symbols-outlined text-sm">check_circle</span> Accepted
                  </td>
                  <td class="py-3 px-4 font-mono">42 ms</td>
                  <td class="py-3 px-4 text-primary font-bold">100 / 100</td>
                  <td class="py-3 px-4 font-mono">Python 3</td>
                  <td class="py-3 px-4 text-on-surface-variant">Just now</td>
                </tr>
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-4 font-bold text-on-surface">Valid Palindrome II</td>
                  <td class="py-3 px-4 text-green-600 flex items-center gap-1 font-semibold">
                    <span class="material-symbols-outlined text-sm">check_circle</span> Accepted
                  </td>
                  <td class="py-3 px-4 font-mono">38 ms</td>
                  <td class="py-3 px-4 text-primary font-bold">100 / 100</td>
                  <td class="py-3 px-4 font-mono">JavaScript</td>
                  <td class="py-3 px-4 text-on-surface-variant">Yesterday</td>
                </tr>
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-4 font-bold text-on-surface">Merge K Sorted Lists</td>
                  <td class="py-3 px-4 text-amber-600 flex items-center gap-1 font-semibold">
                    <span class="material-symbols-outlined text-sm">warning</span> Time Limit Exceeded
                  </td>
                  <td class="py-3 px-4 font-mono">2050 ms</td>
                  <td class="py-3 px-4 text-amber-600 font-bold">60 / 100</td>
                  <td class="py-3 px-4 font-mono">C++20</td>
                  <td class="py-3 px-4 text-on-surface-variant">3 days ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `;
}

window.toggleSidebar = function() {
  const sidebar = document.getElementById('sidebar-drawer');
  sidebar.classList.toggle('-translate-x-full');
};

window.setFilter = function(el, diff) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.className = "filter-btn border border-outline-variant/60 text-on-surface-variant px-3 py-1.5 rounded-lg text-xs font-medium hover:border-primary";
  });
  el.className = "filter-btn active bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-semibold";

  const items = document.querySelectorAll('.assessment-item');
  items.forEach(item => {
    if (diff === 'all' || item.getAttribute('data-diff') === diff) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};

window.filterAssessments = function() {
  const query = document.getElementById('dash-search-input').value.toLowerCase();
  const items = document.querySelectorAll('.assessment-item');
  items.forEach(item => {
    const title = item.getAttribute('data-title').toLowerCase();
    if (title.includes(query)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};
