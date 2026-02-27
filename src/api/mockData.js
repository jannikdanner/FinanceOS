// ══════════════════════════════════════════════════════════════
// FinanceOS — Mock Data (Realistic Demo Mode)
// ══════════════════════════════════════════════════════════════

// Helper: generate random walk price history
function generatePriceHistory(basePrice, days = 90, volatility = 0.02) {
    const data = [];
    let price = basePrice;
    const now = Date.now();
    for (let i = days; i >= 0; i--) {
        const change = price * volatility * (Math.random() - 0.48);
        price = Math.max(price * 0.5, price + change);
        const high = price * (1 + Math.random() * 0.015);
        const low = price * (1 - Math.random() * 0.015);
        const open = price + (Math.random() - 0.5) * price * 0.01;
        const volume = Math.floor(20000000 + Math.random() * 80000000);
        data.push({
            date: new Date(now - i * 86400000).toISOString().split('T')[0],
            timestamp: now - i * 86400000,
            open: +open.toFixed(2),
            high: +high.toFixed(2),
            low: +low.toFixed(2),
            close: +price.toFixed(2),
            volume
        });
    }
    return data;
}

// Helper: generate intraday data
function generateIntradayData(basePrice, points = 390) {
    const data = [];
    let price = basePrice;
    const today = new Date();
    today.setHours(9, 30, 0, 0);
    for (let i = 0; i < points; i++) {
        const change = price * 0.001 * (Math.random() - 0.48);
        price = Math.max(price * 0.95, price + change);
        const time = new Date(today.getTime() + i * 60000);
        data.push({
            time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            timestamp: time.getTime(),
            price: +price.toFixed(2),
            volume: Math.floor(100000 + Math.random() * 500000)
        });
    }
    return data;
}

// ─── Market Indices ───
export const mockIndices = [
    { symbol: 'SPX', name: 'S&P 500', value: 5998.74, change: 18.32, pctChange: 0.31, history: generatePriceHistory(5998, 30, 0.008) },
    { symbol: 'INDU', name: 'DOW JONES', value: 43852.16, change: -42.67, pctChange: -0.10, history: generatePriceHistory(43852, 30, 0.007) },
    { symbol: 'CCMP', name: 'NASDAQ', value: 19285.43, change: 87.65, pctChange: 0.46, history: generatePriceHistory(19285, 30, 0.012) },
    { symbol: 'UKX', name: 'FTSE 100', value: 8412.56, change: 23.41, pctChange: 0.28, history: generatePriceHistory(8412, 30, 0.006) },
    { symbol: 'DAX', name: 'DAX', value: 21982.30, change: 145.80, pctChange: 0.67, history: generatePriceHistory(21982, 30, 0.009) },
    { symbol: 'NKY', name: 'NIKKEI 225', value: 38461.25, change: -185.30, pctChange: -0.48, history: generatePriceHistory(38461, 30, 0.01) },
    { symbol: 'HSI', name: 'HANG SENG', value: 22577.80, change: 312.15, pctChange: 1.40, history: generatePriceHistory(22577, 30, 0.013) },
    { symbol: 'SHCOMP', name: 'SHANGHAI', value: 3326.47, change: 11.23, pctChange: 0.34, history: generatePriceHistory(3326, 30, 0.008) },
];

// ─── Watchlist Stocks ───
export const mockWatchlist = [
    { symbol: 'AAPL', name: 'Apple Inc', price: 247.10, change: 3.42, pctChange: 1.40, volume: 52431000, high: 248.50, low: 243.82, open: 244.10, mktCap: '3.81T' },
    { symbol: 'MSFT', name: 'Microsoft Corp', price: 452.35, change: -2.18, pctChange: -0.48, volume: 23145000, high: 455.20, low: 450.10, open: 454.50, mktCap: '3.36T' },
    { symbol: 'GOOGL', name: 'Alphabet Inc', price: 185.42, change: 1.87, pctChange: 1.02, volume: 18920000, high: 186.30, low: 183.50, open: 184.00, mktCap: '2.28T' },
    { symbol: 'AMZN', name: 'Amazon.com Inc', price: 228.93, change: 4.56, pctChange: 2.03, volume: 41200000, high: 229.80, low: 224.10, open: 224.50, mktCap: '2.39T' },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 131.28, change: 5.73, pctChange: 4.56, volume: 312500000, high: 132.40, low: 125.30, open: 126.00, mktCap: '3.22T' },
    { symbol: 'TSLA', name: 'Tesla Inc', price: 342.15, change: -8.42, pctChange: -2.40, volume: 87430000, high: 352.80, low: 338.50, open: 350.00, mktCap: '1.10T' },
    { symbol: 'META', name: 'Meta Platforms', price: 695.20, change: 12.35, pctChange: 1.81, volume: 15680000, high: 698.50, low: 682.30, open: 683.00, mktCap: '1.76T' },
    { symbol: 'JPM', name: 'JP Morgan Chase', price: 262.47, change: 1.23, pctChange: 0.47, volume: 8540000, high: 263.50, low: 260.80, open: 261.20, mktCap: '754B' },
    { symbol: 'V', name: 'Visa Inc', price: 338.92, change: -0.85, pctChange: -0.25, volume: 5120000, high: 340.10, low: 337.50, open: 339.80, mktCap: '688B' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', price: 158.33, change: 0.42, pctChange: 0.27, volume: 6230000, high: 159.10, low: 157.80, open: 158.00, mktCap: '381B' },
    { symbol: 'WMT', name: 'Walmart Inc', price: 97.56, change: 1.15, pctChange: 1.19, volume: 12450000, high: 98.20, low: 96.30, open: 96.40, mktCap: '784B' },
    { symbol: 'XOM', name: 'Exxon Mobil', price: 108.74, change: -1.32, pctChange: -1.20, volume: 14320000, high: 110.20, low: 108.10, open: 110.00, mktCap: '459B' },
    { symbol: 'BAC', name: 'Bank of America', price: 46.82, change: 0.28, pctChange: 0.60, volume: 32100000, high: 47.10, low: 46.40, open: 46.55, mktCap: '368B' },
    { symbol: 'DIS', name: 'Walt Disney Co', price: 112.45, change: 2.67, pctChange: 2.43, volume: 9870000, high: 113.20, low: 109.50, open: 109.80, mktCap: '204B' },
    { symbol: 'NFLX', name: 'Netflix Inc', price: 998.42, change: 15.30, pctChange: 1.56, volume: 4560000, high: 1002.50, low: 982.00, open: 983.00, mktCap: '430B' },
];

// ─── Crypto Data ───
export const mockCrypto = [
    { rank: 1, symbol: 'BTC', name: 'Bitcoin', price: 96284.32, change24h: 2.14, change7d: 5.42, marketCap: 1902000000000, volume: 38500000000, sparkline: generatePriceHistory(96284, 7, 0.025) },
    { rank: 2, symbol: 'ETH', name: 'Ethereum', price: 3642.18, change24h: 1.87, change7d: 8.31, marketCap: 438000000000, volume: 18200000000, sparkline: generatePriceHistory(3642, 7, 0.03) },
    { rank: 3, symbol: 'BNB', name: 'BNB', price: 698.45, change24h: -0.42, change7d: 2.15, marketCap: 101000000000, volume: 1500000000, sparkline: generatePriceHistory(698, 7, 0.02) },
    { rank: 4, symbol: 'SOL', name: 'Solana', price: 196.73, change24h: 4.56, change7d: 12.34, marketCap: 92000000000, volume: 3800000000, sparkline: generatePriceHistory(196, 7, 0.04) },
    { rank: 5, symbol: 'XRP', name: 'XRP', price: 2.78, change24h: -1.23, change7d: 3.67, marketCap: 158000000000, volume: 6200000000, sparkline: generatePriceHistory(2.78, 7, 0.035) },
    { rank: 6, symbol: 'ADA', name: 'Cardano', price: 1.05, change24h: 3.21, change7d: 15.67, marketCap: 37000000000, volume: 890000000, sparkline: generatePriceHistory(1.05, 7, 0.04) },
    { rank: 7, symbol: 'DOGE', name: 'Dogecoin', price: 0.3142, change24h: 5.67, change7d: -2.34, marketCap: 46000000000, volume: 2100000000, sparkline: generatePriceHistory(0.31, 7, 0.05) },
    { rank: 8, symbol: 'AVAX', name: 'Avalanche', price: 38.92, change24h: -2.87, change7d: 6.78, marketCap: 16000000000, volume: 650000000, sparkline: generatePriceHistory(38.9, 7, 0.04) },
    { rank: 9, symbol: 'DOT', name: 'Polkadot', price: 7.82, change24h: 1.45, change7d: 4.56, marketCap: 11000000000, volume: 340000000, sparkline: generatePriceHistory(7.82, 7, 0.035) },
    { rank: 10, symbol: 'LINK', name: 'Chainlink', price: 19.45, change24h: 2.34, change7d: 9.12, marketCap: 12500000000, volume: 780000000, sparkline: generatePriceHistory(19.45, 7, 0.035) },
];

// ─── FX Pairs ───
export const mockFX = [
    { pair: 'EUR/USD', rate: 1.0842, bid: 1.0840, ask: 1.0844, change: 0.0012, pctChange: 0.11 },
    { pair: 'GBP/USD', rate: 1.2674, bid: 1.2672, ask: 1.2676, change: -0.0023, pctChange: -0.18 },
    { pair: 'USD/JPY', rate: 149.82, bid: 149.80, ask: 149.84, change: 0.45, pctChange: 0.30 },
    { pair: 'USD/CHF', rate: 0.8812, bid: 0.8810, ask: 0.8814, change: -0.0008, pctChange: -0.09 },
    { pair: 'AUD/USD', rate: 0.6543, bid: 0.6541, ask: 0.6545, change: 0.0019, pctChange: 0.29 },
    { pair: 'USD/CAD', rate: 1.3587, bid: 1.3585, ask: 1.3589, change: 0.0034, pctChange: 0.25 },
    { pair: 'NZD/USD', rate: 0.6187, bid: 0.6185, ask: 0.6189, change: -0.0011, pctChange: -0.18 },
    { pair: 'EUR/GBP', rate: 0.8555, bid: 0.8553, ask: 0.8557, change: 0.0028, pctChange: 0.33 },
    { pair: 'EUR/JPY', rate: 162.38, bid: 162.36, ask: 162.40, change: 0.67, pctChange: 0.41 },
    { pair: 'GBP/JPY', rate: 189.84, bid: 189.82, ask: 189.86, change: -0.32, pctChange: -0.17 },
];

// ─── Sector Performance ───
export const mockSectors = [
    { name: 'Technology', change: 1.82, marketCap: '14.2T' },
    { name: 'Healthcare', change: 0.45, marketCap: '7.1T' },
    { name: 'Financials', change: -0.32, marketCap: '8.9T' },
    { name: 'Consumer Disc.', change: 1.24, marketCap: '5.8T' },
    { name: 'Communication', change: 0.87, marketCap: '4.2T' },
    { name: 'Industrials', change: -0.15, marketCap: '5.4T' },
    { name: 'Consumer Stpl.', change: 0.23, marketCap: '3.8T' },
    { name: 'Energy', change: -1.45, marketCap: '3.1T' },
    { name: 'Utilities', change: 0.67, marketCap: '1.6T' },
    { name: 'Real Estate', change: -0.78, marketCap: '1.2T' },
    { name: 'Materials', change: 0.34, marketCap: '2.1T' },
    { name: 'Defense', change: 2.15, marketCap: '0.9T' },
];

// ─── News Headlines ───
export const mockNews = [
    { id: 1, headline: 'Fed Signals Potential Rate Cut in Q2 as Inflation Cools to 2.3%', source: 'Reuters', time: Date.now() - 300000, tag: 'urgent', category: 'macro' },
    { id: 2, headline: 'NVIDIA Reports Record Q4 Revenue of $39.3B, Beating Estimates by 12%', source: 'Bloomberg', time: Date.now() - 900000, tag: 'earnings', category: 'tech' },
    { id: 3, headline: 'Apple Unveils AI-Powered Smart Glasses at Special Event', source: 'CNBC', time: Date.now() - 1800000, tag: 'market', category: 'tech' },
    { id: 4, headline: 'US Treasury Yields Fall After Weak Jobs Report: 10Y at 4.12%', source: 'FT', time: Date.now() - 2700000, tag: 'urgent', category: 'bonds' },
    { id: 5, headline: 'Bitcoin Surges Past $96K as Institutional Inflows Hit Record $2.1B', source: 'CoinDesk', time: Date.now() - 3600000, tag: 'market', category: 'crypto' },
    { id: 6, headline: 'Amazon Web Services Announces $100B Data Center Expansion Plan', source: 'WSJ', time: Date.now() - 5400000, tag: 'market', category: 'tech' },
    { id: 7, headline: 'European Central Bank Holds Rates Steady, Signals June Decision', source: 'Reuters', time: Date.now() - 7200000, tag: 'market', category: 'macro' },
    { id: 8, headline: 'Tesla Recalls 1.2M Vehicles Over Software Update in Autopilot System', source: 'AP', time: Date.now() - 9000000, tag: 'urgent', category: 'auto' },
    { id: 9, headline: 'JPMorgan Upgrades China Equities to Overweight, Sees 20% Upside', source: 'Bloomberg', time: Date.now() - 10800000, tag: 'market', category: 'em' },
    { id: 10, headline: 'Oil Prices Drop 3% on Unexpected US Inventory Build', source: 'Reuters', time: Date.now() - 14400000, tag: 'market', category: 'commodities' },
    { id: 11, headline: 'Meta Plans $65B Capital Expenditure for AI Infrastructure in 2026', source: 'CNBC', time: Date.now() - 18000000, tag: 'earnings', category: 'tech' },
    { id: 12, headline: 'German DAX Hits Record High as Manufacturing PMI Surprises', source: 'FT', time: Date.now() - 21600000, tag: 'market', category: 'europe' },
    { id: 13, headline: 'Solana ETF Applications Surge: BlackRock, Fidelity File with SEC', source: 'CoinDesk', time: Date.now() - 25200000, tag: 'market', category: 'crypto' },
    { id: 14, headline: 'US-China Trade Talks Resume as Tariff Deadline Approaches', source: 'WSJ', time: Date.now() - 28800000, tag: 'urgent', category: 'trade' },
    { id: 15, headline: 'Microsoft Azure Revenue Grows 42% YoY, AI Services Drive Expansion', source: 'Bloomberg', time: Date.now() - 32400000, tag: 'earnings', category: 'tech' },
];

// ─── Chart Data for Selected Stock ───
export const mockChartData = {
    'AAPL': { daily: generatePriceHistory(247.10, 365, 0.015), intraday: generateIntradayData(247.10) },
    'MSFT': { daily: generatePriceHistory(452.35, 365, 0.013), intraday: generateIntradayData(452.35) },
    'GOOGL': { daily: generatePriceHistory(185.42, 365, 0.016), intraday: generateIntradayData(185.42) },
    'NVDA': { daily: generatePriceHistory(131.28, 365, 0.03), intraday: generateIntradayData(131.28) },
    'TSLA': { daily: generatePriceHistory(342.15, 365, 0.025), intraday: generateIntradayData(342.15) },
    'AMZN': { daily: generatePriceHistory(228.93, 365, 0.015), intraday: generateIntradayData(228.93) },
    'META': { daily: generatePriceHistory(695.20, 365, 0.018), intraday: generateIntradayData(695.20) },
};

// ─── Ticker Tape Items ───
export const mockTickerItems = [
    ...mockIndices.map(i => ({ symbol: i.symbol, name: i.name, price: i.value, change: i.change, pctChange: i.pctChange })),
    ...mockWatchlist.slice(0, 8).map(s => ({ symbol: s.symbol, name: s.name, price: s.price, change: s.change, pctChange: s.pctChange })),
    { symbol: 'BTC', name: 'Bitcoin', price: 96284.32, change: 2034.12, pctChange: 2.14 },
    { symbol: 'ETH', name: 'Ethereum', price: 3642.18, change: 67.34, pctChange: 1.87 },
    { symbol: 'GOLD', name: 'Gold', price: 2942.50, change: 12.30, pctChange: 0.42 },
    { symbol: 'OIL', name: 'Crude Oil', price: 71.82, change: -2.15, pctChange: -2.91 },
    { symbol: 'EUR/USD', name: 'EUR/USD', price: 1.0842, change: 0.0012, pctChange: 0.11 },
    { symbol: 'US10Y', name: 'US 10Y Yield', price: 4.12, change: -0.05, pctChange: -1.20 },
];

// ─── Simulate Live Updates ───
export function simulateUpdate(data) {
    const volatility = 0.0008;
    if (Array.isArray(data)) {
        return data.map(item => {
            const priceField = item.price !== undefined ? 'price' : item.value !== undefined ? 'value' : item.rate !== undefined ? 'rate' : null;
            if (!priceField) return item;
            const oldPrice = item[priceField];
            const change = oldPrice * volatility * (Math.random() - 0.48);
            const newPrice = +(oldPrice + change).toFixed(priceField === 'rate' ? 4 : 2);
            const totalChange = +(item.change + change).toFixed(priceField === 'rate' ? 4 : 2);
            const pctChange = +((totalChange / (newPrice - totalChange)) * 100).toFixed(2);
            return { ...item, [priceField]: newPrice, change: totalChange, pctChange };
        });
    }
    return data;
}
