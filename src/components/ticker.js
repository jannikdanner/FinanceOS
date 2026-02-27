// ══════════════════════════════════════════════════════════════
// FinanceOS — Ticker Tape Component
// ══════════════════════════════════════════════════════════════

import { mockTickerItems, simulateUpdate } from '../api/mockData.js';
import { formatPrice, formatChange, formatPct, changeClass } from '../utils/formatter.js';

let tickerData = [...mockTickerItems];

export function initTicker() {
  const el = document.getElementById('ticker-tape');
  renderTicker(el);

  // Update generic mock prices every 3 seconds
  setInterval(() => {
    tickerData = simulateUpdate(tickerData);
    renderTicker(el);
  }, 3000);

  // Initialize Real-Time WebSockets
  initWebSockets();
}

function initWebSockets() {
  try {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker/ethusdt@ticker/solusdt@ticker');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (!data || !data.s || !data.c) return;

      // Binance symbol mapping (BTCUSDT -> BTC)
      const symbol = data.s.replace('USDT', '');
      const price = parseFloat(data.c);
      const change = parseFloat(data.p);
      const pctChange = parseFloat(data.P);

      // Update local memory so mock cycle doesn't overwrite with old values
      const tickerItem = tickerData.find(t => t.symbol === symbol);
      if (tickerItem) {
        const oldPrice = tickerItem.price;
        tickerItem.price = price;
        tickerItem.change = change;
        tickerItem.pctChange = pctChange;

        // Live DOM update for instantly flashing prices
        updateLiveDom(symbol, price, change, pctChange, oldPrice);
      }
    };

    ws.onopen = () => console.log('%c WS connected: Binance Live Feed', 'color: #00d26a; font-size: 10px;');
    ws.onerror = () => console.warn('Binance WS connection failed.');
  } catch (err) {
    console.warn('Real-time feed unavailable:', err);
  }
}

function updateLiveDom(symbol, price, change, pctChange, oldPrice) {
  const items = document.querySelectorAll(`.ticker-item[data-symbol="${symbol}"]`);
  if (!items.length) return;

  items.forEach(el => {
    const priceEl = el.querySelector('.ticker-price');
    const changeEl = el.querySelector('.ticker-change');
    if (!priceEl || !changeEl) return;

    const decimals = price > 1000 ? 2 : 4;
    priceEl.textContent = formatPrice(price, decimals);
    changeEl.textContent = `${formatChange(change, decimals)} (${formatPct(pctChange)})`;

    // Update class for colors
    changeEl.className = `ticker-change ${changeClass(change)}`;

    // Flash effect
    if (price !== oldPrice) {
      el.classList.add(price > oldPrice ? 'live-up' : 'live-down');
      setTimeout(() => {
        el.classList.remove('live-up', 'live-down');
      }, 300);
    }
  });
}

function renderTicker(container) {
  const items = tickerData.map(item => {
    const cls = changeClass(item.change);
    const decimals = item.price > 1000 ? 2 : item.price > 10 ? 2 : item.price > 1 ? 4 : 4;
    return `
      <div class="ticker-item" data-symbol="${item.symbol}">
        <span class="ticker-symbol">${item.symbol}</span>
        <span class="ticker-price">${formatPrice(item.price, decimals)}</span>
        <span class="ticker-change ${cls}">${formatChange(item.change, decimals)} (${formatPct(item.pctChange)})</span>
      </div>
    `;
  }).join('');

  // Duplicate for seamless loop
  container.innerHTML = `<div class="ticker-track">${items}${items}</div>`;
}
