// ══════════════════════════════════════════════════════════════
// FinanceOS — FX / Currency Panel
// ══════════════════════════════════════════════════════════════

import { mockFX, simulateUpdate } from '../api/mockData.js';
import { formatPrice, formatChange, formatPct, changeClass } from '../utils/formatter.js';

let fxData = [...mockFX];

export function initFXPanel() {
    renderFX();

    // Update every 6 seconds
    setInterval(() => {
        fxData = simulateUpdate(fxData);
        renderFX();
    }, 6000);
}

function renderFX() {
    const el = document.getElementById('fx-content');
    if (!el) return;

    el.innerHTML = fxData.map(pair => {
        const cls = changeClass(pair.pctChange);
        const decimals = pair.rate > 100 ? 2 : 4;

        return `
      <div class="fx-row">
        <span class="fx-pair">${pair.pair}</span>
        <span class="fx-rate">${formatPrice(pair.rate, decimals)}</span>
        <span class="fx-bid text-xs">${formatPrice(pair.bid, decimals)}</span>
        <span class="fx-change ${cls}">${formatPct(pair.pctChange)}</span>
      </div>
    `;
    }).join('');
}
