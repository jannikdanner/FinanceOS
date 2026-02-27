// ══════════════════════════════════════════════════════════════
// FinanceOS — Main Application Entry Point (v2)
// ══════════════════════════════════════════════════════════════

import { initHeader } from './components/header.js';
import { initTicker } from './components/ticker.js';
import { initMarketOverview } from './components/marketOverview.js';
import { initWatchlist } from './components/watchlist.js';
import { initStockChart, setChartSymbol } from './components/stockChart.js';
import { initNewsFeed } from './components/newsFeed.js';
import { initCryptoPanel } from './components/cryptoPanel.js';
import { initFXPanel } from './components/fxPanel.js';
import { initHeatmap } from './components/heatmap.js';
import { initCommandBar } from './components/commandBar.js';
import { initNavigation, switchView } from './components/navigation.js';
import { initMapView, onMapVisible } from './pages/mapView.js';
import { initEquityView, searchCompany } from './pages/equityView.js';
import { initIntelView } from './pages/camsView.js';
import { initMacroView } from './pages/macroView.js';
import { initOsintView } from './pages/osintView.js';
import { checkHealth } from './api/client.js';

// ─── Boot Sequence ───
async function boot() {
    console.log('%c FinanceOS Intelligence Terminal', 'color: #ff8c00; font-size: 18px; font-weight: bold;');
    console.log('%c v2.0 — Initializing...', 'color: #888; font-size: 11px;');

    // Check API server health
    const health = await checkHealth();
    const isLive = health && health.status === 'ok';

    // Initialize navigation
    initNavigation(handleViewChange);

    // Initialize global components
    initHeader();
    initTicker();
    initCommandBar();

    // Initialize terminal view components
    initMarketOverview();
    initWatchlist(handleSymbolClick);
    initStockChart();
    initNewsFeed();
    await initCryptoPanel();
    initFXPanel();
    initHeatmap();

    // Setup panel maximize/minimize
    setupPanelControls();

    // Update data mode badge
    if (isLive && (health.keys?.finnhub || health.keys?.alphaVantage)) {
        const badge = document.getElementById('data-mode-badge');
        if (badge) {
            badge.textContent = 'LIVE';
            badge.style.color = '#00d26a';
            badge.style.borderColor = '#00d26a';
        }
    }

    console.log('%c FinanceOS Ready', 'color: #00d26a; font-size: 14px; font-weight: bold;');
}

// ─── View Change Handler ───
function handleViewChange(viewId) {
    switch (viewId) {
        case 'map':
            initMapView();
            onMapVisible();
            break;
        case 'equity':
            initEquityView();
            break;
        case 'intel':
            initIntelView();
            break;
        case 'macro':
            initMacroView();
            break;
        case 'osint':
            initOsintView();
            break;
        case 'terminal':
            // Chart might need resize
            setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
            break;
    }
}

// ─── Handle clicking a symbol in watchlist ───
function handleSymbolClick(symbol) {
    setChartSymbol(symbol);
}

// ─── Panel Maximize / Minimize Toggle ───
function setupPanelControls() {
    document.querySelectorAll('.panel-btn[data-action="maximize"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const panel = btn.closest('.panel');
            if (!panel) return;

            const isMaximized = panel.classList.contains('maximized');
            document.querySelectorAll('.panel.maximized').forEach(p => p.classList.remove('maximized'));

            if (!isMaximized) {
                panel.classList.add('maximized');
                btn.textContent = '✕';
                if (panel.id === 'panel-chart') {
                    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
                }
            } else {
                btn.textContent = '⬜';
                if (panel.id === 'panel-chart') {
                    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
                }
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.panel.maximized').forEach(p => {
                p.classList.remove('maximized');
                const btn = p.querySelector('.panel-btn[data-action="maximize"]');
                if (btn) btn.textContent = '⬜';
            });
        }
    });
}

// ─── Exported for command bar ───
export { switchView, searchCompany };

// ─── Start ───
document.addEventListener('DOMContentLoaded', boot);
