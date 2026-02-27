// ══════════════════════════════════════════════════════════════
// FinanceOS — Number & Data Formatters
// ══════════════════════════════════════════════════════════════

export function formatPrice(value, decimals = 2) {
    if (value === null || value === undefined) return '—';
    return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatLargeNumber(value) {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'string') return value;
    const abs = Math.abs(value);
    if (abs >= 1e12) return (value / 1e12).toFixed(2) + 'T';
    if (abs >= 1e9) return (value / 1e9).toFixed(2) + 'B';
    if (abs >= 1e6) return (value / 1e6).toFixed(2) + 'M';
    if (abs >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value.toFixed(2);
}

export function formatChange(value, decimals = 2) {
    if (value === null || value === undefined) return '—';
    const sign = value >= 0 ? '+' : '';
    return sign + value.toFixed(decimals);
}

export function formatPct(value) {
    if (value === null || value === undefined) return '—';
    const sign = value >= 0 ? '+' : '';
    return sign + value.toFixed(2) + '%';
}

export function formatVolume(value) {
    if (value === null || value === undefined) return '—';
    return formatLargeNumber(value);
}

export function formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    return Math.floor(diff / 86400000) + 'd ago';
}

export function formatDateTime(timestamp) {
    return new Date(timestamp).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
}

export function changeClass(value) {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return '';
}

export function createSparklineSVG(data, width = 60, height = 20, color = '#00d26a') {
    if (!data || data.length < 2) return '';
    const values = data.map(d => d.close || d.price || d);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const points = values.map((v, i) => {
        const x = (i / (values.length - 1)) * width;
        const y = height - ((v - min) / range) * height;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    const isPositive = values[values.length - 1] >= values[0];
    const lineColor = isPositive ? '#00d26a' : '#ff3b3b';

    return `<span class="sparkline-container"><svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><polyline points="${points}" fill="none" stroke="${lineColor}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
}
