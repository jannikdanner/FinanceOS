// ══════════════════════════════════════════════════════════════
// FinanceOS — Macro-Economic Dashboard (F5)
// ══════════════════════════════════════════════════════════════

import { formatPrice, formatPct } from '../utils/formatter.js';

let initialized = false;

// Mock Macro Data
const macroData = {
  fedRate: { current: 4.50, change: -0.25, nextMeeting: 'Mar 19, 2026', probCut: 65.2 },
  inflation: { cpi: 2.3, cpiChange: -0.1, coreCpi: 2.8, coreChange: 0.0, pce: 2.1 },
  yields: {
    '1M': 4.45, '3M': 4.38, '6M': 4.25,
    '1Y': 4.10, '2Y': 3.95, '5Y': 3.80,
    '10Y': 3.92, '20Y': 4.15, '30Y': 4.20
  },
  gdp: { us: 2.1, eurozone: 0.8, china: 4.5, global: 2.8 },
  unemployment: { us: 3.9, eurozone: 6.4, uk: 4.2 }
};

const ecoCalendar = [
  { time: '08:30', country: 'US', event: 'Initial Jobless Claims', actual: '215K', est: '220K', prior: '222K', impact: 'high' },
  { time: '08:30', country: 'US', event: 'GDP Annualized QoQ', actual: '2.1%', est: '2.0%', prior: '1.9%', impact: 'high' },
  { time: '10:00', country: 'US', event: 'Pending Home Sales MoM', actual: '-1.5%', est: '-1.0%', prior: '0.5%', impact: 'med' },
  { time: '10:30', country: 'US', event: 'EIA Natural Gas Storage', actual: '-45B', est: '-40B', prior: '-32B', impact: 'med' },
  { time: '13:00', country: 'US', event: '7-Year Note Auction', actual: '4.02%', est: '', prior: '4.15%', impact: 'high' }
];

let yieldChart = null;
let liveInterval = null;

export function initMacroView() {
  if (initialized) return;
  initialized = true;

  renderMacroDashboard();
}

function renderMacroDashboard() {
  const el = document.getElementById('macro-container');
  if (!el) return;

  // 2Y/10Y Spread
  const spread = (macroData.yields['10Y'] - macroData.yields['2Y']).toFixed(2);
  const spreadColor = spread >= 0 ? '#00d26a' : '#ff3b3b';

  el.innerHTML = `
    <div class="macro-dashboard">
      <div class="macro-header">
        <span class="panel-tag">MACRO</span>
        <h1>Global Macro-Economic Dashboard</h1>
        <span class="text-muted" style="margin-left: auto">Last updated: ${new Date().toLocaleTimeString()}</span>
      </div>

      <div class="macro-grid">
        
        <!-- Central Banks -->
        <div class="macro-card">
          <div class="macro-card-header">CENTRAL BANKS</div>
          <div class="macro-stat">
            <span class="m-label">Fed Funds Rate</span>
            <span class="m-value">${macroData.fedRate.current.toFixed(2)}%</span>
            <span class="m-change ${macroData.fedRate.change < 0 ? 'negative' : 'positive'}">${macroData.fedRate.change.toFixed(2)}%</span>
          </div>
          <div class="macro-stat">
            <span class="m-label">ECB Deposit Rate</span>
            <span class="m-value">3.25%</span>
            <span class="m-change negative">-0.25%</span>
          </div>
          <div class="macro-stat">
            <span class="m-label">BOE Bank Rate</span>
            <span class="m-value">4.75%</span>
            <span class="m-change">0.00%</span>
          </div>
          <div class="macro-stat">
            <span class="m-label">BOJ Policy Rate</span>
            <span class="m-value">0.10%</span>
            <span class="m-change">0.00%</span>
          </div>
          <div class="macro-divider"></div>
          <div class="macro-footer-note">Next FOMC Meeting: <span style="color:var(--orange)">${macroData.fedRate.nextMeeting}</span> (Cut Prob: ${macroData.fedRate.probCut}%)</div>
        </div>

        <!-- Inflation -->
        <div class="macro-card">
          <div class="macro-card-header">INFLATION (USA)</div>
           <div class="macro-stat">
            <span class="m-label">CPI (YoY)</span>
            <span class="m-value">${macroData.inflation.cpi.toFixed(1)}%</span>
            <span class="m-change ${macroData.inflation.cpiChange < 0 ? 'positive' : 'negative'}">${macroData.inflation.cpiChange.toFixed(1)}%</span>
          </div>
          <div class="macro-stat">
            <span class="m-label">Core CPI (YoY)</span>
            <span class="m-value">${macroData.inflation.coreCpi.toFixed(1)}%</span>
            <span class="m-change">0.0%</span>
          </div>
          <div class="macro-stat">
            <span class="m-label">PCE Deflator</span>
            <span class="m-value">${macroData.inflation.pce.toFixed(1)}%</span>
          </div>
          <div class="macro-gauge-container">
            <div class="macro-gauge-label">Target Range</div>
            <div class="macro-gauge-bar">
               <div class="macro-gauge-fill" style="width: ${Math.min(100, (macroData.inflation.cpi / 5) * 100)}%; background: ${macroData.inflation.cpi <= 2.5 ? '#00d26a' : '#ff3b3b'}"></div>
               <div class="macro-gauge-target" style="left: 40%"></div> <!-- 2.0% target on 0-5 scale -->
            </div>
          </div>
        </div>

        <!-- GDP Growth -->
        <div class="macro-card">
          <div class="macro-card-header">GDP GROWTH (ANNUAL %)</div>
          <div class="macro-stat">
            <span class="m-label">United States</span>
            <span class="m-value" style="color:var(--green)">${macroData.gdp.us.toFixed(1)}%</span>
          </div>
          <div class="macro-stat">
            <span class="m-label">Eurozone</span>
            <span class="m-value" style="color:${macroData.gdp.eurozone < 1 ? 'var(--orange)' : 'var(--green)'}">${macroData.gdp.eurozone.toFixed(1)}%</span>
          </div>
          <div class="macro-stat">
            <span class="m-label">China</span>
            <span class="m-value" style="color:var(--green)">${macroData.gdp.china.toFixed(1)}%</span>
          </div>
          <div class="macro-stat">
            <span class="m-label">Global</span>
            <span class="m-value" style="color:var(--green)">${macroData.gdp.global.toFixed(1)}%</span>
          </div>
        </div>

        <!-- Unemployment / Labor -->
        <div class="macro-card">
          <div class="macro-card-header">LABOR MARKET (UNEMPLOYMENT)</div>
          <div class="macro-stat">
            <span class="m-label">United States</span>
            <span class="m-value">${macroData.unemployment.us.toFixed(1)}%</span>
          </div>
          <div class="macro-stat">
            <span class="m-label">Eurozone</span>
            <span class="m-value">${macroData.unemployment.eurozone.toFixed(1)}%</span>
          </div>
          <div class="macro-stat">
            <span class="m-label">United Kingdom</span>
            <span class="m-value">${macroData.unemployment.uk.toFixed(1)}%</span>
          </div>
          <div class="macro-divider"></div>
          <div class="macro-footer-note">NFP Next Release: <span style="color:var(--orange)">Mar 7, 2026</span> (Est: +185K)</div>
        </div>

        <!-- Yield Curve (Live Chart) -->
        <div class="macro-card span-2" style="position: relative;">
           <div class="macro-card-header">US TREASURY YIELD CURVE - LIVE</div>
           <div class="yield-curve-display" style="height: 200px; padding: 0;">
              <canvas id="live-yield-chart"></canvas>
           </div>
           <div class="macro-footer-note" style="margin-top:var(--sp-4); text-align:center;">
              2Y/10Y Spread: <span id="yield-spread-val" style="color:${spreadColor}; font-weight:700;">${spread} bps</span> 
           </div>
        </div>

        <!-- ECO Calendar (Bloomberg Style) -->
        <div class="macro-card span-2">
           <div class="macro-card-header" style="color:var(--orange);">ECO <span style="color:var(--text-muted);font-weight:400;">» Economic Calendars » Global</span></div>
           <table class="eco-table" style="width:100%; font-size:11px; text-align:left; border-collapse: collapse;">
             <thead>
               <tr style="border-bottom:1px solid #333; color:var(--text-muted);">
                 <th style="padding:4px;">Time</th><th style="padding:4px;">Ctry</th><th style="padding:4px;">Event</th>
                 <th style="padding:4px;">Actual</th><th style="padding:4px;">Est</th><th style="padding:4px;">Prior</th>
               </tr>
             </thead>
             <tbody>
               ${ecoCalendar.map(evt => `
                 <tr style="border-bottom:1px solid rgba(255,255,255,0.05); ${evt.impact === 'high' ? 'color:var(--white);font-weight:700;' : 'color:var(--text-secondary);'}">
                   <td style="padding:4px;">${evt.time}</td>
                   <td style="padding:4px;">${evt.country}</td>
                   <td style="padding:4px; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${evt.event}</td>
                   <td style="padding:4px; color:${evt.actual && evt.est && parseFloat(evt.actual) > parseFloat(evt.est) ? 'var(--green)' : 'var(--orange)'}">${evt.actual}</td>
                   <td style="padding:4px;">${evt.est}</td>
                   <td style="padding:4px; color:var(--text-muted);">${evt.prior}</td>
                 </tr>
               `).join('')}
             </tbody>
           </table>
        </div>

      </div>
    </div>
  `;

  initLiveChart();
}

function initLiveChart() {
  const ctx = document.getElementById('live-yield-chart');
  if (!ctx) return;

  if (yieldChart) yieldChart.destroy();

  // Convert object to arrays
  const labels = Object.keys(macroData.yields);
  const dataPoints = Object.values(macroData.yields);

  yieldChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Current Yield Curve',
        data: dataPoints,
        borderColor: '#ff8c00', // Bloomberg orange
        backgroundColor: 'rgba(255, 140, 0, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 400 // Smooth tick updates
      },
      scales: {
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#888', font: { family: 'JetBrains Mono', size: 10 } }
        },
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#888', font: { family: 'JetBrains Mono', size: 10 } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleFont: { family: 'JetBrains Mono' },
          bodyFont: { family: 'JetBrains Mono' }
        }
      }
    }
  });

  if (liveInterval) clearInterval(liveInterval);

  // Simulate Live Ticks on Macro Chart 
  liveInterval = setInterval(() => {
    const newData = yieldChart.data.datasets[0].data.map(val => {
      const noise = (Math.random() - 0.5) * 0.05;
      return Math.max(3.0, val + noise);
    });

    yieldChart.data.datasets[0].data = newData;
    yieldChart.update();

    // Update Spread Text
    const spreadVal = (newData[6] - newData[4]).toFixed(2); // 10Y - 2Y approx index
    const spreadEl = document.getElementById('yield-spread-val');
    if (spreadEl) {
      spreadEl.textContent = `${spreadVal} bps`;
      spreadEl.style.color = spreadVal >= 0 ? '#00d26a' : '#ff3b3b';
    }

  }, 2000);
}
