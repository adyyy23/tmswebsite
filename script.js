/**
 * TRACKING & MONITORING SYSTEM (TMS) - APPLICATION LOGIC
 * High performance, zero runtime errors, accessible, interactive
 */

// Initial Data & State
const DEFAULT_TODOS = [
  { id: 1, text: 'Statistical Treatment of Data (Likert Scale)', completed: true, category: 'Chapter 3' },
  { id: 2, text: 'Senior High School (SHS) Survey Distribution (30 Respondents)', completed: true, category: 'Methodology' },
  { id: 3, text: 'Chapter 4 Data Interpretation & Charts', completed: true, category: 'Chapter 4' },
  { id: 4, text: 'Summary of Findings & Recommendations Draft', completed: true, category: 'Chapter 5' },
  { id: 5, text: 'Final Research Manuscript Defense Presentation', completed: false, category: 'Milestone' },
  { id: 6, text: 'Hardbound Manuscript Submission to AMA Santa Cruz', completed: false, category: 'Milestone' }
];

const CHAPTER_DATA = {
  chap1: {
    title: 'Chapter 1: The Problem and Its Background',
    subtitle: 'Tracking and Monitoring Student Research Activities in AMA Santa Cruz',
    wordCount: '2,450 words',
    status: 'Approved',
    sections: [
      {
        heading: 'Introduction',
        content: `Educational games and automated management systems have become increasingly vital tools for enhancing academic efficiency and performance among students. Research activities require systematic organization, deadline enforcement, and continuous progress tracking to prevent backlog and ensure methodological rigor.<br><br>At AMA Santa Cruz (P. Guevarra Ave, Santa Cruz, Laguna), Senior High School students face significant friction when logging, organizing, and tracking thesis milestones manually. The manual workflow lacks real-time visibility, leading to delayed adviser feedback and scattered revisions.`
      },
      {
        heading: 'Statement of the Problem',
        content: `This study aimed to develop and evaluate an automated Tracking and Monitoring System for Senior High School research activities at AMA Santa Cruz for the academic year 2022-2023. Specifically, it sought to answer:<br>
        1. What is the demographic profile of the respondents in terms of grade level and track?<br>
        2. What is the level of acceptability of the system in terms of Usability, Reliability, and Efficiency?<br>
        3. Is there a significant difference in student milestone completion rates before and after using the tracking system?`
      },
      {
        heading: 'Significance of the Study',
        content: `The findings of this study directly benefit:<br>
        • <strong>Students:</strong> Provides an intuitive interface to monitor chapter deadlines, submission statuses, and peer task allocations.<br>
        • <strong>Teachers and Research Advisers:</strong> Delivers instantaneous oversight of cohort progress without cumbersome paperwork.<br>
        • <strong>School Administration:</strong> Standardizes the research review protocol and provides data-backed archiving.`
      }
    ]
  },
  chap2: {
    title: 'Chapter 2: Review of Related Literature and Studies',
    subtitle: 'Theoretical Foundations, Local Context, and Foreign Research',
    wordCount: '3,820 words',
    status: 'Approved',
    sections: [
      {
        heading: 'Theoretical Framework',
        content: `This study is anchored on the <em>Technology Acceptance Model (TAM)</em> by Fred Davis (1989), which posits that perceived usefulness (PU) and perceived ease of use (PEOU) directly dictate user adoption. Furthermore, the system integrates Scrum-based agile task monitoring principles to support iterative research workflows.`
      },
      {
        heading: 'Foreign and Local Studies',
        content: `International literature emphasizes that computerized academic progress tracking reduces student attrition in thesis courses by up to 34% (Johnson & Miller, 2021). Locally, studies in Laguna and Calabarzon high schools revealed that 87% of research advisers reported administrative exhaustion due to unstructured manual submissions.`
      }
    ]
  },
  chap3: {
    title: 'Chapter 3: Research Methodology',
    subtitle: 'Research Design, Population, Instruments, and Statistical Treatment',
    wordCount: '1,950 words',
    status: 'Approved',
    sections: [
      {
        heading: 'Research Design & Population',
        content: `The researchers utilized a descriptive-developmental research design. The target population comprised thirty (30) Grade 11 and 12 ICT Senior High School students from AMA Santa Cruz, Laguna during the school year 2022-2023, selected through purposive sampling.`
      },
      {
        heading: 'Statistical Treatment of Data',
        content: `The collected responses were evaluated using a 5-point Likert Scale (5 - Very Satisfied/Highly Effective down to 1 - Very Dissatisfied). Mean, percentage distribution, and standard deviation were calculated to quantify usability, responsiveness, and user satisfaction.`
      }
    ]
  },
  chap4: {
    title: 'Chapter 4: Presentation, Analysis, and Interpretation of Data',
    subtitle: 'Quantitative Results, System Evaluation, and Feedback Analysis',
    wordCount: '4,100 words',
    status: 'Approved',
    sections: [
      {
        heading: 'Evaluation of System Effectiveness',
        content: `Out of 30 student respondents, 28 respondents (93.3%) rated the tracking system as 'Very Effective' in streamlining chapter deadlines and monitoring deliverables. 25 respondents (83.3%) reported high satisfaction with the interface clarity and notification feedback.`
      },
      {
        heading: 'Summary of User Acceptance Ratings',
        content: `• Usability: 4.72 / 5.00 (Outstanding)<br>• Reliability: 4.65 / 5.00 (Outstanding)<br>• Task Transparency: 4.88 / 5.00 (Outstanding)<br>Overall Composite Mean: <strong>4.75</strong>, denoting unequivocal operational success.`
      }
    ]
  },
  chap5: {
    title: 'Chapter 5: Summary, Findings, Conclusion, and Recommendations',
    subtitle: 'Actionable Insights and Institutional Recommendations',
    wordCount: '1,800 words',
    status: 'Finalized',
    sections: [
      {
        heading: 'Summary of Findings',
        content: `The developed Tracking and Monitoring System eliminated manual friction in tracking student research activities. Key milestones, such as questionnaire deployment and chapter drafting, were achieved on average 2.4 weeks faster than previous manual cohorts.`
      },
      {
        heading: 'Conclusion',
        content: `The system successfully met all technical and institutional specifications. It provides an effective, accountable, and transparent medium for senior high school students and advisers to coordinate research endeavors.`
      },
      {
        heading: 'Recommendations',
        content: `1. Implement the system school-wide across AMA Santa Cruz academic departments.<br>2. Provide brief orientation workshops for incoming Grade 11 students.<br>3. Introduce cloud document sync for real-time collaborative annotation.`
      }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTheme();
  initSidebar();
  initViewRouting();
  initTodos();
  initActivityFilter();
  initChapterReader();
  initSearch();
});

// ==========================================
// Theme Management
// ==========================================
function initTheme() {
  const switchMode = document.getElementById('switch-mode');
  const savedTheme = localStorage.getItem('tms_theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (switchMode) switchMode.checked = true;
  }

  if (switchMode) {
    switchMode.addEventListener('change', () => {
      if (switchMode.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('tms_theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('tms_theme', 'light');
      }
    });
  }
}

// ==========================================
// Sidebar & Mobile Navigation
// ==========================================
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
      } else {
        sidebar.classList.toggle('hide');
      }
    });
  }

  // Close mobile sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('mobile-open')) {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    }
  });
}

// ==========================================
// View Routing & Navigation
// ==========================================
function initViewRouting() {
  const navItems = document.querySelectorAll('.sidebar-nav-item[data-view]');
  const views = document.querySelectorAll('.view-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');

      // Update Nav active
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Switch View
      views.forEach(v => {
        v.classList.remove('active');
        if (v.id === `view-${targetView}`) {
          v.classList.add('active');
        }
      });

      // If mobile, close sidebar
      const sidebar = document.getElementById('sidebar');
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// ==========================================
// Interactive Todos (CRUD with LocalStorage)
// ==========================================
function initTodos() {
  const todoContainer = document.getElementById('todo-list-items');
  const todoInput = document.getElementById('todo-new-input');
  const todoAddBtn = document.getElementById('todo-add-btn');
  const todoCountBadge = document.getElementById('todo-count-badge');

  let todos = [];
  try {
    const stored = localStorage.getItem('tms_todos');
    todos = stored ? JSON.parse(stored) : DEFAULT_TODOS;
  } catch (err) {
    todos = DEFAULT_TODOS;
  }

  function renderTodos() {
    if (!todoContainer) return;
    todoContainer.innerHTML = '';

    const pendingCount = todos.filter(t => !t.completed).length;
    if (todoCountBadge) todoCountBadge.textContent = `${pendingCount} open`;

    if (todos.length === 0) {
      todoContainer.innerHTML = `
        <div class="empty-state" style="padding: 24px 0;">
          <div class="empty-state-icon" style="width: 36px; height: 36px; margin-bottom: 8px;">
            <i data-lucide="check-circle" style="width: 18px; height: 18px;"></i>
          </div>
          <div class="empty-state-title" style="font-size: 0.9rem;">No Tasks Open</div>
          <div class="empty-state-description" style="font-size: 0.8rem; margin-bottom: 0;">All milestones have been completed!</div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    todos.forEach(todo => {
      const el = document.createElement('div');
      el.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      el.innerHTML = `
        <div class="todo-left">
          <div class="todo-checkbox" data-id="${todo.id}" role="checkbox" aria-checked="${todo.completed}">
            ${todo.completed ? '<i data-lucide="check" style="width: 12px; height: 12px;"></i>' : ''}
          </div>
          <div>
            <div class="todo-text">${escapeHtml(todo.text)}</div>
            ${todo.category ? `<span style="font-size: 0.7rem; color: var(--text-muted);">${escapeHtml(todo.category)}</span>` : ''}
          </div>
        </div>
        <div class="todo-actions">
          <button class="todo-del-btn" data-id="${todo.id}" title="Delete task" aria-label="Delete task">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      `;
      todoContainer.appendChild(el);
    });

    if (window.lucide) window.lucide.createIcons();
    attachTodoEvents();
  }

  function attachTodoEvents() {
    document.querySelectorAll('.todo-checkbox').forEach(cb => {
      cb.addEventListener('click', () => {
        const id = Number(cb.getAttribute('data-id'));
        todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveAndRender();
      });
    });

    document.querySelectorAll('.todo-del-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = Number(btn.getAttribute('data-id'));
        todos = todos.filter(t => t.id !== id);
        saveAndRender();
      });
    });
  }

  function saveAndRender() {
    localStorage.setItem('tms_todos', JSON.stringify(todos));
    renderTodos();
  }

  function addTodo() {
    if (!todoInput) return;
    const text = todoInput.value.trim();
    if (!text) return;

    todos.unshift({
      id: Date.now(),
      text: text,
      completed: false,
      category: 'Research Milestone'
    });

    todoInput.value = '';
    saveAndRender();
  }

  if (todoAddBtn) todoAddBtn.addEventListener('click', addTodo);
  if (todoInput) {
    todoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addTodo();
    });
  }

  renderTodos();
}

// ==========================================
// Recent Activity Filter
// ==========================================
function initActivityFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const rows = document.querySelectorAll('#activity-table-body tr');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      rows.forEach(row => {
        const status = row.getAttribute('data-status');
        if (filter === 'all' || status === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================
// Chapter Reader (Single Page App Reader)
// ==========================================
function initChapterReader() {
  const navBtns = document.querySelectorAll('.chapter-nav-btn');
  const contentCard = document.getElementById('chapter-content-display');

  window.openChapter = function(chapterKey) {
    // Switch to Works view
    const worksNav = document.querySelector('.sidebar-nav-item[data-view="works"]');
    if (worksNav) worksNav.click();

    // Activate chapter
    loadChapter(chapterKey);
  };

  function loadChapter(chapterKey) {
    const data = CHAPTER_DATA[chapterKey];
    if (!data || !contentCard) return;

    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-chapter') === chapterKey);
    });

    let sectionsHtml = '';
    data.sections.forEach(s => {
      sectionsHtml += `
        <h3>${s.heading}</h3>
        <p>${s.content}</p>
      `;
    });

    contentCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
        <div>
          <span class="chapter-pill" style="margin-bottom: 8px; display: inline-block;">${data.status}</span>
          <h2>${data.title}</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0;">${data.subtitle}</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block;">${data.wordCount}</span>
          <a href="data/Chapter-1.pdf" target="_blank" class="btn btn-secondary btn-sm" style="margin-top: 8px;">
            <i data-lucide="download" style="width: 14px; height: 14px;"></i> Download PDF
          </a>
        </div>
      </div>
      <div class="research-callout">
        <strong>Study Reference:</strong> Senior High School Research Activities Management System, AMA Computer College Santa Cruz.
      </div>
      ${sectionsHtml}
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chapterKey = btn.getAttribute('data-chapter');
      loadChapter(chapterKey);
    });
  });

  // Load Chapter 1 by default
  loadChapter('chap1');
}

// ==========================================
// Search Functionality
// ==========================================
function initSearch() {
  const searchInput = document.getElementById('global-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const activityRows = document.querySelectorAll('#activity-table-body tr');

    activityRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
