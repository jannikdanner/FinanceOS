// ══════════════════════════════════════════════════════════════
// FinanceOS — Market Overview Component
// ══════════════════════════════════════════════════════════════

import { mockIndices, simulateUpdate } from '../api/mockData.js';
import { formatPrice, formatChange, formatPct, changeClass, createSparklineSVG } from '../utils/formatter.js';

let indicesData = [...mockIndices];

export function initMarketOverview() {
    renderMarketOverview();

    // Update every 5 seconds
    setInterval(() => {
        indicesData = simulateUpdate(indicesData);
        renderMarketOverview();
    }, 5000);
}

function renderMarketOverview() {
    const el = document.getElementById('market-overview-content');
    if (!el) return;

    el.innerHTML = indicesData.map(idx => {
        const cls = changeClass(idx.pctChange);
        const sparkline = createSparklineSVG(idx.history.slice(-20), 55, 18);

        return `
      <div class="index-row" data-symbol="${idx.symbol}">
        <div class="index-name">${idx.symbol}</div>
        <div class="index-value">${formatPrice(idx.value, idx.value > 10000 ? 0 : 2)}</div>
        <div class="index-change ${cls}">
          ${formatChange(idx.change, idx.value > 10000 ? 0 : 2)}<br/>
          <span style="font-size:9px">${formatPct(idx.pctChange)}</span>
        </div>
        <div class="index-sparkline">${sparkline}</div>
      </div>
    `;
    }).join('');
}

export function getIndicesData() {
    return indicesData;
}
