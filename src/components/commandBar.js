// ══════════════════════════════════════════════════════════════
// FinanceOS — Command Bar Component (v2 — with navigation)
// ══════════════════════════════════════════════════════════════

import { setChartSymbol } from './stockChart.js';
import { addToWatchlist, removeFromWatchlist } from './watchlist.js';
import { switchView } from './navigation.js';
import { searchCompany } from '../pages/equityView.js';

const COMMANDS = [
    // Navigation & Routing
    { name: 'TERMINAL', desc: 'Switch to Market Terminal', action: () => switchView('terminal') },
    { name: 'MAP', desc: 'Open Global Intelligence Map (e.g. MAP SUEZ)', action: (args) => { switchView('map'); if (args.length) addOutput(`> Routing MAP to ${args.join(' ')}...`, 'system'); else addOutput('> Opened Global Map', 'system'); } },
    { name: 'EQUITY', desc: 'Open Equity Research Terminal', action: () => switchView('equity') },
    { name: 'INTEL', desc: 'Open Live Feeds & Webcams', action: () => switchView('intel') },
    { name: 'MACRO', desc: 'Open Global Macro Dashboard', action: () => switchView('macro') },
    { name: 'ECO', desc: 'Economic Calendar & Rates (Bloomberg ECO)', action: () => { switchView('macro'); addOutput('> Loading Global Economic Calendar...', 'system'); } },
    { name: 'WIRP', desc: 'World Interest Rate Probabilities (Bloomberg WIRP)', action: () => { switchView('macro'); addOutput('> Routing to Fed Funds Futures Probabilities...', 'system'); } },
    { name: 'OSINT', desc: 'Open Source Intelligence Terminal', action: () => switchView('osint') },
    { name: 'CAMS', desc: 'View Live Feeds (e.g. CAMS TOKYO)', action: (args) => { switchView('intel'); if (args.length) addOutput(`> Tuning feed to ${args.join(' ')}...`, 'system'); else addOutput('> Opened Live Feeds', 'system'); } },

    // Equity research & Quotes
    { name: 'QUOTE', desc: 'View Stock Chart (e.g. QUOTE NVDA)', action: (args) => { if (args[0]) { switchView('terminal'); setChartSymbol(args[0].toUpperCase()); addOutput(`> Loading chart for ${args[0].toUpperCase()}`, 'success'); } else { addOutput('Usage: QUOTE <SYM>', 'error'); } } },
    { name: 'DES', desc: 'Company description (e.g. DES AAPL)', action: (args) => { switchView('equity'); if (args[0]) setTimeout(() => searchCompany(args[0]), 100); } },
    { name: 'FA', desc: 'Financial analysis (e.g. FA NVDA)', action: (args) => { switchView('equity'); if (args[0]) setTimeout(() => searchCompany(args[0]), 100); } },
    { name: 'SUPPLY', desc: 'Supply chain (e.g. SUPPLY TSLA)', action: (args) => { switchView('equity'); if (args[0]) setTimeout(() => searchCompany(args[0]), 100); } },

    // Watchlist
    { name: 'ADD', desc: 'Add symbol to watchlist (e.g. ADD PYPL)', action: (args) => handleAdd(args) },
    { name: 'DEL', desc: 'Remove from watchlist (e.g. DEL PYPL)', action: (args) => handleDel(args) },

    // Panel focus
    { name: 'NEWS', desc: 'Focus on news panel', action: () => { switchView('terminal'); scrollToPanel('panel-news'); } },
    { name: 'CRYPTO', desc: 'Focus on crypto panel', action: () => { switchView('terminal'); scrollToPanel('panel-crypto'); } },
    { name: 'FX', desc: 'Focus on FX panel', action: () => { switchView('terminal'); scrollToPanel('panel-fx'); } },

    // Utility & Settings
    { name: 'APIKEY', desc: 'Set API Key (e.g. APIKEY FINNHUB <key>)', action: (args) => handleApiKey(args) },
    { name: 'HELP', desc: 'Show all available commands', action: showHelp },
    { name: 'CLEAR', desc: 'Clear command output', action: clearOutput },
];

let commandHistory = [];
let historyIndex = -1;
let outputLines = [];

export function initCommandBar() {
    const el = document.getElementById('command-bar');

    el.innerHTML = `
    <div class="cmd-prompt">
      <span class="blink"></span>
      <span style="color: var(--orange); font-weight: 700;">GO</span>
    </div>
    <input type="text" class="cmd-input" id="cmd-input"
      placeholder="Command or ticker (MAP, EQUITY, DES AAPL, SUPPLY NVDA, HELP...)"
      autocomplete="off" spellcheck="false" />
    <div class="cmd-hints">
      <span class="cmd-hint"><span class="cmd-key">F1-F4</span> Views</span>
      <span class="cmd-hint"><span class="cmd-key">↵</span> Execute</span>
      <span class="cmd-hint"><span class="cmd-key">↑↓</span> History</span>
      <span class="cmd-hint"><span class="cmd-key">ESC</span> Clear</span>
    </div>
    <div class="cmd-suggestions" id="cmd-suggestions"></div>
    <div class="cmd-output" id="cmd-output"></div>
  `;

    const input = document.getElementById('cmd-input');
    const suggestions = document.getElementById('cmd-suggestions');

    input.addEventListener('input', () => {
        const val = input.value.trim().toUpperCase();
        if (val.length > 0) {
            const matches = COMMANDS.filter(c => c.name.startsWith(val));
            if (matches.length > 0 && val !== matches[0]?.name) {
                suggestions.innerHTML = matches.slice(0, 8).map(c => `
          <div class="cmd-suggestion" data-cmd="${c.name}">
            <span class="cmd-name">${c.name}</span>
            <span class="cmd-desc">${c.desc}</span>
          </div>
        `).join('');
                suggestions.classList.add('visible');

                suggestions.querySelectorAll('.cmd-suggestion').forEach(s => {
                    s.addEventListener('click', () => {
                        input.value = s.dataset.cmd;
                        suggestions.classList.remove('visible');
                        input.focus();
                    });
                });
            } else {
                suggestions.classList.remove('visible');
            }
        } else {
            suggestions.classList.remove('visible');
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = input.value.trim().toUpperCase();
            if (val) {
                executeCommand(val);
                commandHistory.unshift(val);
                historyIndex = -1;
                input.value = '';
                suggestions.classList.remove('visible');
            }
        } else if (e.key === 'Escape') {
            input.value = '';
            suggestions.classList.remove('visible');
            hideOutput();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                input.value = '';
            }
        }
    });

    // Global shortcut
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) {
            e.preventDefault();
            input.focus();
        }
    });
}

function executeCommand(raw) {
    const parts = raw.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    const command = COMMANDS.find(c => c.name === cmd);
    if (command) {
        command.action(args);
        addOutput(`> ${raw}`, 'system');
        return;
    }

    // Try as ticker symbol
    if (/^[A-Z]{1,5}$/.test(cmd)) {
        switchView('terminal');
        setChartSymbol(cmd);
        addOutput(`> Chart: ${cmd} US Equity`, 'success');
        return;
    }

    addOutput(`> Unknown: ${raw}. Type HELP for commands.`, 'error');
}

function showHelp() {
    addOutput('═══ FinanceOS v2.0 COMMANDS ═══', 'system');
    addOutput('', '');
    addOutput('  NAVIGATION', 'system');
    addOutput('  TERMINAL     Market terminal view (F1)', '');
    addOutput('  MAP          Global intelligence map (F2)', '');
    addOutput('  EQUITY       Company research tool (F3)', '');
    addOutput('  INTEL        Live webcam feeds (F4)', '');
    addOutput('  MACRO        Global macro dashboard (F5)', '');
    addOutput('  OSINT        Open source intelligence (F6)', '');
    addOutput('', '');
    addOutput('  BLOOMBERG FUNCTIONS', 'system');
    addOutput('  ECO          Economic Calendars', '');
    addOutput('  WIRP         World Interest Rate Probabilities', '');
    addOutput('', '');
    addOutput('  EQUITY RESEARCH', 'system');
    addOutput('  DES <SYM>    Company description & details', '');
    addOutput('  FA <SYM>     Financial analysis', '');
    addOutput('  SUPPLY <SYM> Supply chain view', '');
    addOutput('', '');
    addOutput('  MARKET', 'system');
    addOutput('  <TICKER>     View stock chart (e.g. AAPL)', '');
    addOutput('  ADD <SYM>    Add to watchlist', '');
    addOutput('  DEL <SYM>    Remove from watchlist', '');
    addOutput('  NEWS         Focus news panel', '');
    addOutput('  CRYPTO       Focus crypto panel', '');
    addOutput('  FX           Focus FX panel', '');
    addOutput('', '');
    addOutput('  SETTINGS', 'system');
    addOutput('  APIKEY <PROV> <KEY>  Set API key (FINNHUB or ALPHAVANTAGE)', '');
    addOutput('', '');
    addOutput('  Press / or Ctrl+K to focus command bar', 'system');
    showOutput();
}

function handleAdd(args) {
    if (!args.length) { addOutput('Usage: ADD <SYMBOL>', 'error'); return; }
    const s = args[0].toUpperCase();
    addOutput(addToWatchlist(s) ? `Added ${s} to watchlist` : `${s} already in watchlist`, addToWatchlist(s) ? 'success' : 'error');
}

function handleDel(args) {
    if (!args.length) { addOutput('Usage: DEL <SYMBOL>', 'error'); return; }
    const s = args[0].toUpperCase();
    addOutput(removeFromWatchlist(s) ? `Removed ${s} from watchlist` : `${s} not found`, removeFromWatchlist(s) ? 'success' : 'error');
}

function handleApiKey(args) {
    if (args.length < 2) { addOutput('Usage: APIKEY <PROVIDER> <KEY>', 'error'); return; }
    const provider = args[0].toUpperCase();
    const key = args[1];
    if (provider === 'FINNHUB') {
        localStorage.setItem('financeos_finnhub_key', key);
        addOutput('✅ Finnhub API Key saved to local storage.', 'success');
    } else if (provider === 'ALPHAVANTAGE') {
        localStorage.setItem('financeos_av_key', key);
        addOutput('✅ AlphaVantage API Key saved to local storage.', 'success');
    } else {
        addOutput(`Unknown provider: ${provider}. Use FINNHUB or ALPHAVANTAGE.`, 'error');
    }
}

function scrollToPanel(id) {
    const panel = document.getElementById(id);
    if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        panel.style.boxShadow = '0 0 12px rgba(255,140,0,0.4)';
        setTimeout(() => { panel.style.boxShadow = ''; }, 2000);
    }
}

function addOutput(text, type = '') {
    outputLines.push({ text, type });
    if (outputLines.length > 50) outputLines.shift();
    showOutput();
}

function showOutput() {
    const el = document.getElementById('cmd-output');
    if (!el) return;
    el.innerHTML = outputLines.map(l => `<div class="cmd-output-line ${l.type}">${l.text}</div>`).join('');
    el.classList.add('visible');
    el.scrollTop = el.scrollHeight;
}

function hideOutput() {
    const el = document.getElementById('cmd-output');
    if (el) el.classList.remove('visible');
}

function clearOutput() {
    outputLines = [];
    hideOutput();
}
