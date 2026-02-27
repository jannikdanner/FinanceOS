// ══════════════════════════════════════════════════════════════
// FinanceOS — API Client
// ══════════════════════════════════════════════════════════════

const BASE_URL = '/api';

async function fetchJSON(endpoint) {
    try {
        const resp = await fetch(`${BASE_URL}${endpoint}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        if (data.error || data.mock) return null; // fallback to mock
        return data;
    } catch (e) {
        console.warn(`[API] ${endpoint} failed:`, e.message);
        return null;
    }
}

export async function fetchQuote(symbol) {
    return fetchJSON(`/quote/${symbol}`);
}

export async function fetchProfile(symbol) {
    return fetchJSON(`/profile/${symbol}`);
}

export async function fetchNews() {
    return fetchJSON('/news');
}

export async function fetchCrypto() {
    return fetchJSON('/crypto');
}

export async function fetchFX() {
    return fetchJSON('/fx');
}

export async function fetchHistory(symbol, interval) {
    const qs = interval ? `?interval=${interval}` : '';
    return fetchJSON(`/history/${symbol}${qs}`);
}

export async function fetchSectors() {
    return fetchJSON('/sectors');
}

export async function checkHealth() {
    return fetchJSON('/health');
}
