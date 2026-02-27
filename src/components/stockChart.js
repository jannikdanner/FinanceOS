// ══════════════════════════════════════════════════════════════
// FinanceOS — Stock Chart Component (Chart.js)
// ══════════════════════════════════════════════════════════════

import { mockChartData, mockWatchlist } from '../api/mockData.js';
import { formatPrice, formatChange, formatPct, changeClass } from '../utils/formatter.js';

let chartInstance = null;
let currentSymbol = 'AAPL';
let currentTimeframe = '1D';

export function initStockChart() {
    renderChart(currentSymbol, currentTimeframe);
    setupTimeframeButtons();
}

export function setChartSymbol(symbol) {
    currentSymbol = symbol.toUpperCase();
    const titleEl = document.getElementById('chart-title');
    if (titleEl) {
        const stock = mockWatchlist.find(s => s.symbol === currentSymbol);
        titleEl.textContent = stock ? `${currentSymbol} — ${stock.name}` : `${currentSymbol} US Equity`;
    }
    renderChart(currentSymbol, currentTimeframe);
}

function setupTimeframeButtons() {
    document.querySelectorAll('.tf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTimeframe = btn.dataset.tf;
            renderChart(currentSymbol, currentTimeframe);
        });
    });
}

function getDataForTimeframe(symbol, tf) {
    const chartData = mockChartData[symbol] || mockChartData['AAPL'];

    if (tf === '1D') {
        return {
            labels: chartData.intraday.map(d => d.time),
            prices: chartData.intraday.map(d => d.price),
            volumes: chartData.intraday.map(d => d.volume)
        };
    }

    const daily = chartData.daily;
    let sliceCount;
    switch (tf) {
        case '1W': sliceCount = 5; break;
        case '1M': sliceCount = 22; break;
        case '3M': sliceCount = 66; break;
        case '1Y': sliceCount = 252; break;
        default: sliceCount = 22;
    }

    const sliced = daily.slice(-Math.min(sliceCount, daily.length));
    return {
        labels: sliced.map(d => d.date),
        prices: sliced.map(d => d.close),
        volumes: sliced.map(d => d.volume)
    };
}

function renderChart(symbol, tf) {
    const canvas = document.getElementById('stock-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { labels, prices, volumes } = getDataForTimeframe(symbol, tf);

    if (!prices.length) return;

    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const priceChange = lastPrice - firstPrice;
    const pctChange = (priceChange / firstPrice) * 100;
    const isPositive = priceChange >= 0;
    const lineColor = isPositive ? '#00d26a' : '#ff3b3b';

    // Update overlay
    const overlay = document.getElementById('chart-overlay');
    if (overlay) {
        overlay.innerHTML = `
      <div class="price-big">${formatPrice(lastPrice)}</div>
      <div class="price-change ${changeClass(priceChange)}">
        ${formatChange(priceChange)} (${formatPct(pctChange)})
      </div>
    `;
    }

    // Destroy previous chart
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.parentElement.clientHeight);
    if (isPositive) {
        gradient.addColorStop(0, 'rgba(0, 210, 106, 0.15)');
        gradient.addColorStop(1, 'rgba(0, 210, 106, 0.01)');
    } else {
        gradient.addColorStop(0, 'rgba(255, 59, 59, 0.15)');
        gradient.addColorStop(1, 'rgba(255, 59, 59, 0.01)');
    }

    // Show fewer labels
    const maxLabels = 12;
    const step = Math.max(1, Math.floor(labels.length / maxLabels));
    const displayLabels = labels.map((l, i) => i % step === 0 ? (tf === '1D' ? l : l.slice(5)) : '');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: displayLabels,
            datasets: [
                {
                    label: symbol,
                    data: prices,
                    borderColor: lineColor,
                    backgroundColor: gradient,
                    borderWidth: 1.5,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: lineColor,
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(10,10,10,0.95)',
                    titleColor: '#ff8c00',
                    bodyColor: '#e0e0e0',
                    borderColor: '#333',
                    borderWidth: 1,
                    titleFont: { family: "'JetBrains Mono'", size: 11 },
                    bodyFont: { family: "'JetBrains Mono'", size: 11 },
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: (ctx) => `Price: $${formatPrice(ctx.raw)}`,
                        afterLabel: (ctx) => {
                            const vol = volumes[ctx.dataIndex];
                            return vol ? `Vol: ${(vol / 1e6).toFixed(1)}M` : '';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255,255,255,0.03)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#555',
                        font: { family: "'JetBrains Mono'", size: 9 },
                        maxRotation: 0
                    }
                },
                y: {
                    position: 'right',
                    grid: {
                        color: 'rgba(255,255,255,0.03)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#555',
                        font: { family: "'JetBrains Mono'", size: 9 },
                        callback: (v) => '$' + v.toFixed(2)
                    }
                }
            },
            animation: {
                duration: 600,
                easing: 'easeOutQuart'
            }
        }
    });
}

export function getCurrentSymbol() {
    return currentSymbol;
}
