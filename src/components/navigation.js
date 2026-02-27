// ══════════════════════════════════════════════════════════════
// FinanceOS — Navigation Component
// ══════════════════════════════════════════════════════════════

const VIEWS = [
  { id: 'terminal', label: 'TERMINAL', icon: '▣', key: 'F1', desc: 'Market Terminal' },
  { id: 'map', label: 'MAP', icon: '◎', key: 'F2', desc: 'Global Intelligence Map' },
  { id: 'equity', label: 'EQUITY', icon: '◆', key: 'F3', desc: 'Company Research' },
  { id: 'intel', label: 'INTEL', icon: '◉', key: 'F4', desc: 'Live Feeds & Cams' },
  { id: 'macro', label: 'MACRO', icon: '◷', key: 'F5', desc: 'Macro Dashboard' },
  { id: 'osint', label: 'OSINT', icon: '◬', key: 'F6', desc: 'Open Source Intelligence' },
];

let activeView = 'terminal';
let onViewChange = null;

export function initNavigation(callback) {
  onViewChange = callback;
  const nav = document.getElementById('terminal-nav');
  if (!nav) return;

  nav.innerHTML = `
    <div class="nav-tabs">
      ${VIEWS.map(v => `
        <button class="nav-tab ${v.id === activeView ? 'active' : ''}" data-view="${v.id}" title="${v.desc} (${v.key})">
          <span class="nav-icon">${v.icon}</span>
          <span class="nav-label">${v.label}</span>
          <span class="nav-key">${v.key}</span>
        </button>
      `).join('')}
    </div>
    <div class="nav-breadcrumb">
      <span class="nav-path" id="nav-path">FINANCEOS > TERMINAL</span>
    </div>
  `;

  // Click handlers
  nav.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  // F-key shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F1') { e.preventDefault(); switchView('terminal'); }
    if (e.key === 'F2') { e.preventDefault(); switchView('map'); }
    if (e.key === 'F3') { e.preventDefault(); switchView('equity'); }
    if (e.key === 'F4') { e.preventDefault(); switchView('intel'); }
    if (e.key === 'F5') { e.preventDefault(); switchView('macro'); }
    if (e.key === 'F6') { e.preventDefault(); switchView('osint'); }
  });
}

export function switchView(viewId) {
  if (!VIEWS.find(v => v.id === viewId)) return;
  activeView = viewId;

  // Update tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.view === viewId);
  });

  // Update views
  document.querySelectorAll('.terminal-view').forEach(view => {
    view.classList.toggle('active', view.id === `view-${viewId}`);
  });

  // Update breadcrumb
  const path = document.getElementById('nav-path');
  const view = VIEWS.find(v => v.id === viewId);
  if (path && view) path.textContent = `FINANCEOS > ${view.label}`;

  // Callback
  if (onViewChange) onViewChange(viewId);
}

export function getActiveView() {
  return activeView;
}
