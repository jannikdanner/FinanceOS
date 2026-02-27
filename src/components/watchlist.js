// ══════════════════════════════════════════════════════════════
// FinanceOS — Watchlist Component
// ══════════════════════════════════════════════════════════════

import { mockWatchlist, simulateUpdate } from '../api/mockData.js';
import { formatPrice, formatChange, formatPct, formatVolume, changeClass } from '../utils/formatter.js';

let watchlistData = [];
let previousPrices = {};
const WATCHLIST_STORAGE_KEY = 'financeos_watchlist';

export function initWatchlist(onSymbolClick) {
  // Load from localStorage or use defaults
  const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
  let initialSymbols = stored ? JSON.parse(stored) : mockWatchlist.map(s => s.symbol);

  // Fallback if empty
  if (!initialSymbols || initialSymbols.length === 0) {
    initialSymbols = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'SPY'];
  }

  // Initialize mock data for the symbols
  watchlistData = initialSymbols.map(sym => {
    const existing = mockWatchlist.find(m => m.symbol === sym);
    if (existing) return { ...existing };
    return {
      symbol: sym,
      name: sym,
      price: 100 + Math.random() * 200,
      change: +(Math.random() * 4 - 2).toFixed(2),
      pctChange: +(Math.random() * 4 - 2).toFixed(2),
      volume: Math.floor(Math.random() * 50000000),
      mktCap: '—'
    };
  });

  // Store initial prices
  watchlistData.forEach(s => { previousPrices[s.symbol] = s.price; });

  renderWatchlist(onSymbolClick);

  // Update every 4 seconds
  setInterval(() => {
    watchlistData.forEach(s => { previousPrices[s.symbol] = s.price; });
    watchlistData = simulateUpdate(watchlistData);
    // We only persist the symbols, not the mock data
    renderWatchlist(onSymbolClick);
  }, 4000);
}

function renderWatchlist(onSymbolClick) {
  const el = document.getElementById('watchlist-content');
  if (!el) return;

  const rows = watchlistData.map(stock => {
    const cls = changeClass(stock.pctChange);
    const prev = previousPrices[stock.symbol] || stock.price;
    const flashClass = stock.price > prev ? 'flash-green' : stock.price < prev ? 'flash-red' : '';

    return `
      <tr class="${flashClass}" data-symbol="${stock.symbol}">
        <td>${stock.symbol}</td>
        <td>${formatPrice(stock.price)}</td>
        <td class="${cls}">${formatChange(stock.change)}</td>
        <td class="${cls}">${formatPct(stock.pctChange)}</td>
        <td>${formatVolume(stock.volume)}</td>
        <td>${stock.mktCap}</td>
      </tr>
    `;
  }).join('');

  el.innerHTML = `
    <table class="watchlist-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Last</th>
          <th>Chg</th>
          <th>Chg%</th>
          <th>Vol</th>
          <th>MCap</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  // Add click handlers
  if (onSymbolClick) {
    el.querySelectorAll('td:first-child').forEach(td => {
      td.addEventListener('click', () => onSymbolClick(td.textContent));
    });
  }
}

export function addToWatchlist(symbol) {
  if (watchlistData.find(s => s.symbol === symbol.toUpperCase())) return false;
  watchlistData.push({
    symbol: symbol.toUpperCase(),
    name: symbol.toUpperCase(),
    price: 100 + Math.random() * 200,
    change: +(Math.random() * 4 - 2).toFixed(2),
    pctChange: +(Math.random() * 4 - 2).toFixed(2),
    volume: Math.floor(Math.random() * 50000000),
    high: 0, low: 0, open: 0,
    mktCap: '—'
  });
  saveWatchlist();
  return true;
}

export function removeFromWatchlist(symbol) {
  const idx = watchlistData.findIndex(s => s.symbol === symbol.toUpperCase());
  if (idx === -1) return false;
  watchlistData.splice(idx, 1);
  saveWatchlist();
  return true;
}

function saveWatchlist() {
  const symbols = watchlistData.map(s => s.symbol);
  localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(symbols));
}

export function getWatchlistData() {
  return watchlistData;
}
