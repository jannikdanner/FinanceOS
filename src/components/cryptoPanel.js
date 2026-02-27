// ══════════════════════════════════════════════════════════════
// FinanceOS — Crypto Panel Component
// ══════════════════════════════════════════════════════════════

import { mockCrypto, simulateUpdate } from '../api/mockData.js';
import { formatPrice, formatPct, formatLargeNumber, changeClass, createSparklineSVG } from '../utils/formatter.js';
import { fetchCrypto } from '../api/client.js';

let cryptoData = [...mockCrypto];

export async function initCryptoPanel() {
    // Try live API first
    const liveData = await fetchCrypto();
    if (liveData && Array.isArray(liveData) && liveData.length > 0) {
        cryptoData = liveData.map((coin, i) => ({
            rank: i + 1,
            symbol: coin.symbol?.toUpperCase() || 'N/A',
            name: coin.name || 'Unknown',
            price: coin.current_price || 0,
            change24h: coin.price_change_percentage_24h || 0,
            change7d: coin.price_change_percentage_7d_in_currency || 0,
            marketCap: coin.market_cap || 0,
            volume: coin.total_volume || 0,
            sparkline: coin.sparkline_in_7d?.price || []
        }));
    }

    renderCrypto();

    // Update every 15 seconds
    setInterval(async () => {
        const live = await fetchCrypto();
        if (live && Array.isArray(live) && live.length > 0) {
            cryptoData = live.map((coin, i) => ({
                rank: i + 1,
                symbol: coin.symbol?.toUpperCase() || 'N/A',
                name: coin.name || 'Unknown',
                price: coin.current_price || 0,
                change24h: coin.price_change_percentage_24h || 0,
                change7d: coin.price_change_percentage_7d_in_currency || 0,
                marketCap: coin.market_cap || 0,
                volume: coin.total_volume || 0,
                sparkline: coin.sparkline_in_7d?.price || []
            }));
        } else {
            cryptoData = simulateUpdate(cryptoData);
        }
        renderCrypto();
    }, 15000);
}

function renderCrypto() {
    const el = document.getElementById('crypto-content');
    if (!el) return;

    el.innerHTML = cryptoData.slice(0, 12).map(coin => {
        const cls24 = changeClass(coin.change24h);
        const sparkData = Array.isArray(coin.sparkline)
            ? (coin.sparkline.length > 0 && typeof coin.sparkline[0] === 'object'
                ? coin.sparkline
                : coin.sparkline.map(p => ({ close: p })))
            : [];

        const decimals = coin.price >= 100 ? 2 : coin.price >= 1 ? 2 : coin.price >= 0.01 ? 4 : 6;

        return `
      <div class="crypto-row">
        <span class="crypto-rank">${coin.rank}</span>
        <div class="crypto-name">
          <span class="crypto-symbol">${coin.symbol}</span>
          <span class="crypto-fullname">${coin.name}</span>
        </div>
        <span class="crypto-price">$${formatPrice(coin.price, decimals)}</span>
        <span class="crypto-change ${cls24}">${formatPct(coin.change24h)}</span>
        <span class="crypto-mcap">${formatLargeNumber(coin.marketCap)}</span>
      </div>
    `;
    }).join('');
}
