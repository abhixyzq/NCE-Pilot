const STARTER_CODES = {
  python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Hash map to store index of seen values
        seen = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in seen:
                return [seen[diff], i]
            seen[num] = i
        return []`,
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
  cpp: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
  java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`
};

export function renderEditor() {
  return `
    <!-- TopAppBar -->
    <header class="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 px-4 py-3 flex justify-between items-center h-16">
      <div class="flex items-center gap-3">
        <button class="p-1.5 hover:bg-surface-container-high rounded-lg transition-colors text-on-surface-variant flex items-center gap-1 text-xs font-semibold" onclick="window.location.hash = 'dashboard'">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          Dashboard
        </button>
        <div class="h-4 w-px bg-outline-variant/40"></div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">terminal</span>
          <span class="font-bold text-sm text-primary tracking-tight">CodeTest IDE</span>
          <span class="text-xs text-on-surface-variant font-mono">/ Two Sum</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- Timer -->
        <div class="bg-surface-container-high px-3 py-1.5 rounded-full flex items-center gap-2 border border-outline-variant/30">
          <span class="material-symbols-outlined text-on-surface-variant text-sm">timer</span>
          <span class="font-mono text-xs font-bold text-on-surface" id="ide-timer">44:59</span>
        </div>

        <button class="bg-primary/10 text-primary border border-primary/30 px-4 py-1.5 rounded-xl font-semibold text-xs hover:bg-primary/20 transition-all" onclick="runCode()">
          Run Code
        </button>
        <button class="bg-primary text-on-primary px-5 py-1.5 rounded-xl font-semibold text-xs glow-button shadow" onclick="submitSolution()">
          Submit Solution
        </button>
      </div>
    </header>

    <main class="flex-1 mt-16 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
      <!-- Left Pane: Problem Description -->
      <section class="w-full md:w-1/2 bg-surface border-r border-outline-variant/30 p-6 overflow-y-auto space-y-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-on-surface">1. Two Sum</h1>
            <span class="bg-green-500/15 text-green-700 text-xs font-extrabold px-3 py-0.5 rounded-full uppercase">Easy</span>
          </div>
          <button class="text-on-surface-variant hover:text-primary p-1.5 rounded-lg" title="Bookmark problem" onclick="alert('Problem bookmarked!')">
            <span class="material-symbols-outlined text-lg">bookmark</span>
          </button>
        </div>

        <div class="flex gap-2">
          <span class="bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-md text-[11px] font-mono">Array</span>
          <span class="bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-md text-[11px] font-mono">Hash Table</span>
        </div>

        <div class="text-sm text-on-surface-variant leading-relaxed space-y-3">
          <p>
            Given an array of integers <code class="bg-surface-container px-1.5 py-0.5 rounded font-mono text-primary font-bold">nums</code> and an integer <code class="bg-surface-container px-1.5 py-0.5 rounded font-mono text-primary font-bold">target</code>, return <em>indices of the two numbers</em> such that they add up to <code class="bg-surface-container px-1.5 py-0.5 rounded font-mono text-primary font-bold">target</code>.
          </p>
          <p>
            You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
          </p>
          <p>You can return the answer in any order.</p>
        </div>

        <!-- Examples -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-on-surface">Example 1:</h3>
          <div class="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 font-mono text-xs space-y-1">
            <p><span class="text-on-surface-variant font-bold">Input:</span> nums = [2,7,11,15], target = 9</p>
            <p><span class="text-on-surface-variant font-bold">Output:</span> [0,1]</p>
            <p><span class="text-on-surface-variant font-bold">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
          </div>

          <h3 class="text-xs font-bold uppercase tracking-wider text-on-surface">Example 2:</h3>
          <div class="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 font-mono text-xs space-y-1">
            <p><span class="text-on-surface-variant font-bold">Input:</span> nums = [3,2,4], target = 6</p>
            <p><span class="text-on-surface-variant font-bold">Output:</span> [1,2]</p>
          </div>

          <h3 class="text-xs font-bold uppercase tracking-wider text-on-surface">Example 3:</h3>
          <div class="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 font-mono text-xs space-y-1">
            <p><span class="text-on-surface-variant font-bold">Input:</span> nums = [3,3], target = 6</p>
            <p><span class="text-on-surface-variant font-bold">Output:</span> [0,1]</p>
          </div>
        </div>

        <!-- Constraints -->
        <div class="space-y-2 pt-4 border-t border-outline-variant/30">
          <h3 class="text-xs font-bold uppercase tracking-wider text-on-surface">Constraints:</h3>
          <ul class="list-disc list-inside text-xs font-mono text-on-surface-variant space-y-1">
            <li>2 &le; nums.length &le; 10<sup>4</sup></li>
            <li>-10<sup>9</sup> &le; nums[i] &le; 10<sup>9</sup></li>
            <li>-10<sup>9</sup> &le; target &le; 10<sup>9</sup></li>
            <li><strong>Only one valid answer exists.</strong></li>
          </ul>
        </div>
      </section>

      <!-- Right Pane: Code Editor & Execution Panel -->
      <section class="w-full md:w-1/2 flex flex-col bg-[#0f172a] text-white h-full overflow-hidden">
        <!-- Editor Header Toolbar -->
        <div class="bg-[#1e293b] px-4 py-2.5 flex items-center justify-between border-b border-white/10 text-xs">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary-fixed-dim">code</span>
            <select id="language-select" onchange="changeLanguage(this.value)" class="bg-[#0f172a] text-white border border-white/20 rounded-lg px-2.5 py-1 text-xs font-mono outline-none focus:border-primary">
              <option value="python" selected>Python 3</option>
              <option value="javascript">JavaScript (ES6)</option>
              <option value="cpp">C++20</option>
              <option value="java">Java 17</option>
            </select>
          </div>

          <div class="flex items-center gap-2">
            <button class="text-white/60 hover:text-white p-1 rounded" title="Reset Code" onclick="resetCode()">
              <span class="material-symbols-outlined text-sm">refresh</span>
            </button>
            <button class="text-white/60 hover:text-white p-1 rounded" title="Format Code" onclick="alert('Code formatted!')">
              <span class="material-symbols-outlined text-sm">auto_fix_high</span>
            </button>
          </div>
        </div>

        <!-- Code Area -->
        <div class="flex-1 flex font-mono text-xs overflow-hidden relative">
          <!-- Line Numbers -->
          <div class="w-10 bg-[#0b1120] text-white/30 text-right pr-3 py-4 select-none border-r border-white/5 space-y-1 font-mono text-[11px]">
            ${Array.from({ length: 22 }, (_, i) => `<div>${i + 1}</div>`).join('')}
          </div>

          <!-- Code Textarea -->
          <textarea 
            id="code-editor-input"
            spellcheck="false"
            class="w-full h-full bg-transparent text-emerald-300 p-4 font-mono leading-relaxed outline-none resize-none font-medium border-none focus:ring-0"
          >${STARTER_CODES.python}</textarea>
        </div>

        <!-- Execution Panel -->
        <div class="h-56 bg-[#1e293b] border-t border-white/10 flex flex-col font-sans">
          <div class="bg-[#0f172a] px-4 py-2 flex justify-between items-center border-b border-white/10 text-xs">
            <div class="flex gap-4">
              <button id="tab-testcase" class="text-primary-fixed font-bold border-b-2 border-primary pb-0.5" onclick="switchConsoleTab('testcase')">Test Cases</button>
              <button id="tab-output" class="text-white/60 hover:text-white font-medium pb-0.5" onclick="switchConsoleTab('output')">Execution Output</button>
            </div>
            <span class="text-[10px] text-white/40 font-mono">Sandbox: Ubuntu 22.04 LTS</span>
          </div>

          <div id="console-body" class="p-4 text-xs font-mono overflow-y-auto flex-1 space-y-2">
            <div class="text-white/70">Test Case 1: nums = [2,7,11,15], target = 9</div>
            <div class="text-white/70">Test Case 2: nums = [3,2,4], target = 6</div>
            <div class="text-white/40 text-[11px]">Click "Run Code" to compile and execute solution against test suite.</div>
          </div>
        </div>
      </section>
    </main>

    <!-- Assessment Submission Modal -->
    <div id="submit-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 max-w-md w-full text-center space-y-6 ambient-shadow-lg">
        <div class="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
          <span class="material-symbols-outlined text-4xl">verified</span>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-on-surface">Assessment Completed!</h2>
          <p class="text-xs text-on-surface-variant mt-1">All test cases evaluated with 100% precision.</p>
        </div>

        <div class="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 space-y-2 text-xs font-medium">
          <div class="flex justify-between">
            <span class="text-on-surface-variant">Score:</span>
            <span class="text-primary font-bold">100 / 100</span>
          </div>
          <div class="flex justify-between">
            <span class="text-on-surface-variant">Runtime:</span>
            <span class="font-mono text-green-600 font-bold">42 ms (Faster than 96.4%)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-on-surface-variant">XP Earned:</span>
            <span class="text-amber-600 font-bold">+150 XP 🔥</span>
          </div>
        </div>

        <div class="flex gap-3">
          <button class="flex-1 bg-surface-container text-on-surface border border-outline-variant/50 py-3 rounded-xl font-semibold text-xs hover:bg-surface-container-high transition-all" onclick="closeModal()">
            Continue Practice
          </button>
          <button class="flex-1 bg-primary text-on-primary py-3 rounded-xl font-semibold text-xs glow-button" onclick="window.location.hash = 'dashboard'">
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  `;
}

let timerInterval = null;

export function initTimer() {
  if (timerInterval) clearInterval(timerInterval);
  let seconds = 45 * 60 - 1;
  timerInterval = setInterval(() => {
    const timerEl = document.getElementById('ide-timer');
    if (!timerEl) {
      clearInterval(timerInterval);
      return;
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (seconds > 0) seconds--;
  }, 1000);
}

window.changeLanguage = function(lang) {
  const textarea = document.getElementById('code-editor-input');
  if (textarea && STARTER_CODES[lang]) {
    textarea.value = STARTER_CODES[lang];
  }
};

window.resetCode = function() {
  const lang = document.getElementById('language-select').value;
  window.changeLanguage(lang);
};

window.runCode = function() {
  const consoleBody = document.getElementById('console-body');
  if (!consoleBody) return;
  
  consoleBody.innerHTML = `
    <div class="text-amber-400 flex items-center gap-2">
      <span class="material-symbols-outlined text-sm animate-spin">progress_activity</span> Compiling solution on cloud container...
    </div>
  `;

  setTimeout(() => {
    consoleBody.innerHTML = `
      <div class="text-green-400 font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">check_circle</span> Status: Accepted (Passed 3/3 Test Cases)
      </div>
      <div class="text-white/80 pt-2 border-t border-white/10 space-y-1">
        <p>Execution Time: <span class="text-green-400 font-bold">42 ms</span> (Top 96.4%)</p>
        <p>Memory Usage: <span class="text-primary-fixed font-bold">14.2 MB</span></p>
        <p class="pt-2 text-white/50">Output: [0, 1]</p>
        <p class="text-white/50">Expected: [0, 1]</p>
      </div>
    `;
  }, 800);
};

window.submitSolution = function() {
  window.runCode();
  setTimeout(() => {
    const modal = document.getElementById('submit-modal');
    if (modal) modal.classList.remove('hidden');
  }, 1000);
};

window.closeModal = function() {
  const modal = document.getElementById('submit-modal');
  if (modal) modal.classList.add('hidden');
};

window.switchConsoleTab = function(tab) {
  const tabCases = document.getElementById('tab-testcase');
  const tabOutput = document.getElementById('tab-output');
  if (tab === 'testcase') {
    tabCases.className = "text-primary-fixed font-bold border-b-2 border-primary pb-0.5";
    tabOutput.className = "text-white/60 hover:text-white font-medium pb-0.5";
  } else {
    tabOutput.className = "text-primary-fixed font-bold border-b-2 border-primary pb-0.5";
    tabCases.className = "text-white/60 hover:text-white font-medium pb-0.5";
  }
};
