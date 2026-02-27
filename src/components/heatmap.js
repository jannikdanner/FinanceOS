// ══════════════════════════════════════════════════════════════
// FinanceOS — Sector Heatmap Component
// ══════════════════════════════════════════════════════════════

import { mockSectors, simulateUpdate } from '../api/mockData.js';
import { formatPct } from '../utils/formatter.js';

let sectorData = [...mockSectors];

export function initHeatmap() {
    renderHeatmap();

    // Update every 10 seconds
    setInterval(() => {
        sectorData = sectorData.map(s => {
            const delta = (Math.random() - 0.48) * 0.15;
            return { ...s, change: +(s.change + delta).toFixed(2) };
        });
        renderHeatmap();
    }, 10000);
}

function getHeatmapColor(change) {
    const abs = Math.abs(change);
    let intensity;

    if (abs > 2) intensity = 0.85;
    else if (abs > 1.5) intensity = 0.7;
    else if (abs > 1) intensity = 0.55;
    else if (abs > 0.5) intensity = 0.4;
    else if (abs > 0.2) intensity = 0.25;
    else intensity = 0.15;

    if (change > 0) {
        // Green gradient
        const r = Math.floor(10 * (1 - intensity));
        const g = Math.floor(80 + 130 * intensity);
        const b = Math.floor(30 + 40 * intensity);
        return `rgb(${r}, ${g}, ${b})`;
    } else if (change < 0) {
        // Red gradient
        const r = Math.floor(80 + 130 * intensity);
        const g = Math.floor(10 * (1 - intensity));
        const b = Math.floor(10 * (1 - intensity));
        return `rgb(${r}, ${g}, ${b})`;
    }
    return '#333';
}

function renderHeatmap() {
    const el = document.getElementById('heatmap-content');
    if (!el) return;

    el.innerHTML = `<div class="heatmap-grid">
    ${sectorData.map(sector => {
        const bg = getHeatmapColor(sector.change);
        return `
        <div class="heatmap-cell" style="background: ${bg};" title="${sector.name}: ${formatPct(sector.change)}">
          <span class="sector-name">${sector.name}</span>
          <span class="sector-change">${formatPct(sector.change)}</span>
        </div>
      `;
    }).join('')}
  </div>`;
}
