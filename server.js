import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─── API Keys ───
const FINNHUB_KEY = process.env.FINNHUB_KEY || '';
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY || '';

// ─── Health ───
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now(), keys: { finnhub: !!FINNHUB_KEY, alphaVantage: !!ALPHA_VANTAGE_KEY } });
});

// ═══ Finnhub: Stock Quote ═══
app.get('/api/quote/:symbol', async (req, res) => {
    if (!FINNHUB_KEY) return res.json({ mock: true });
    try {
        const r = await fetch(`https://finnhub.io/api/v1/quote?symbol=${req.params.symbol}&token=${FINNHUB_KEY}`);
        res.json(await r.json());
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══ Finnhub: Company Profile ═══
app.get('/api/profile/:symbol', async (req, res) => {
    if (!FINNHUB_KEY) return res.json({ mock: true });
    try {
        const r = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${req.params.symbol}&token=${FINNHUB_KEY}`);
        res.json(await r.json());
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══ Finnhub: Market News ═══
app.get('/api/news', async (req, res) => {
    if (!FINNHUB_KEY) return res.json({ mock: true });
    try {
        const r = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_KEY}`);
        res.json(await r.json());
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══ Finnhub: Peers ═══
app.get('/api/peers/:symbol', async (req, res) => {
    if (!FINNHUB_KEY) return res.json({ mock: true });
    try {
        const r = await fetch(`https://finnhub.io/api/v1/stock/peers?symbol=${req.params.symbol}&token=${FINNHUB_KEY}`);
        res.json(await r.json());
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══ Finnhub: Basic Financials / Metrics ═══
app.get('/api/metrics/:symbol', async (req, res) => {
    if (!FINNHUB_KEY) return res.json({ mock: true });
    try {
        const r = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${req.params.symbol}&metric=all&token=${FINNHUB_KEY}`);
        res.json(await r.json());
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══ CoinGecko: Crypto ═══
app.get('/api/crypto', async (req, res) => {
    try {
        const r = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d');
        res.json(await r.json());
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══ ExchangeRate: FX ═══
app.get('/api/fx', async (req, res) => {
    try {
        const r = await fetch('https://open.er-api.com/v6/latest/USD');
        res.json(await r.json());
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══ Alpha Vantage: Historical ═══
app.get('/api/history/:symbol', async (req, res) => {
    if (!ALPHA_VANTAGE_KEY) return res.json({ mock: true });
    try {
        const fn = req.query.interval ? 'TIME_SERIES_INTRADAY' : 'TIME_SERIES_DAILY';
        let url = `https://www.alphavantage.co/query?function=${fn}&symbol=${req.params.symbol}&apikey=${ALPHA_VANTAGE_KEY}`;
        if (req.query.interval) url += `&interval=${req.query.interval}`;
        const r = await fetch(url);
        res.json(await r.json());
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══ Alpha Vantage: Company Overview ═══
app.get('/api/overview/:symbol', async (req, res) => {
    if (!ALPHA_VANTAGE_KEY) return res.json({ mock: true });
    try {
        const r = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${req.params.symbol}&apikey=${ALPHA_VANTAGE_KEY}`);
        res.json(await r.json());
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ═══════════════════════════════════════════════════════════
// OPENSKY NETWORK — Live Flight Tracking (Free, No Key)
// ═══════════════════════════════════════════════════════════
app.get('/api/flights', async (req, res) => {
    try {
        // Fetch all live aircraft states
        const url = 'https://opensky-network.org/api/states/all';
        const r = await fetch(url, {
            headers: { 'Accept': 'application/json' }
        });
        if (!r.ok) {
            return res.json({ mock: true, error: `OpenSky returned ${r.status}` });
        }
        const data = await r.json();
        if (!data.states) return res.json({ mock: true });

        // Process and return limited set (first 800 with position data)
        const flights = data.states
            .filter(s => s[5] != null && s[6] != null && !s[8]) // has position, not on ground
            .slice(0, 800)
            .map(s => ({
                icao: s[0],
                callsign: (s[1] || '').trim(),
                country: s[2],
                lng: s[5],
                lat: s[6],
                altitude: s[7] ? Math.round(s[7]) : null,
                speed: s[9] ? Math.round(s[9] * 3.6) : null, // m/s to km/h
                heading: s[10] ? Math.round(s[10]) : null,
                verticalRate: s[11],
                squawk: s[14]
            }));

        res.json({ time: data.time, flights, total: data.states.length });
    } catch (e) {
        console.error('[OpenSky Error]', e.message);
        res.json({ mock: true, error: e.message });
    }
});

// ═══ Flights: Bounded box query (more efficient) ═══
app.get('/api/flights/area', async (req, res) => {
    const { lamin, lamax, lomin, lomax } = req.query;
    try {
        const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`;
        const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (!r.ok) return res.json({ mock: true });
        const data = await r.json();
        if (!data.states) return res.json({ flights: [] });

        const flights = data.states
            .filter(s => s[5] != null && s[6] != null)
            .map(s => ({
                icao: s[0],
                callsign: (s[1] || '').trim(),
                country: s[2],
                lng: s[5],
                lat: s[6],
                altitude: s[7] ? Math.round(s[7]) : null,
                speed: s[9] ? Math.round(s[9] * 3.6) : null,
                heading: s[10] ? Math.round(s[10]) : null,
                verticalRate: s[11]
            }));

        res.json({ flights, total: flights.length });
    } catch (e) {
        res.json({ mock: true, error: e.message });
    }
});

// ═══════════════════════════════════════════════════════════
// VESSEL TRACKING (simulated AIS — no free real-time AIS API)
// ═══════════════════════════════════════════════════════════
app.get('/api/vessels', (req, res) => {
    // Return simulated vessel data since free real-time AIS APIs don't exist
    res.json({ mock: true, message: 'Using simulated vessel data' });
});

// ═══════════════════════════════════════════════════════════
// WEBCAMS — Windy.com Webcams (or mock list)
// ═══════════════════════════════════════════════════════════
app.get('/api/webcams', (req, res) => {
    // Return curated list of publicly embeddable webcam feeds
    const feeds = [
        { id: 'nyc-timesquare', name: 'Times Square, NYC', location: 'New York, USA', lat: 40.758, lng: -73.9855, category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/AdUw5RdyZxI?autoplay=1&mute=1&controls=0' },
        { id: 'tokyo-shibuya', name: 'Shibuya Crossing', location: 'Tokyo, Japan', lat: 35.6595, lng: 139.7004, category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/NrzTyS9eE-Q?autoplay=1&mute=1&controls=0' },
        { id: 'dubai-burjkhalifa', name: 'Burj Khalifa View', location: 'Dubai, UAE', lat: 25.1972, lng: 55.2744, category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/QnGMSo_ETtk?autoplay=1&mute=1&controls=0' },
        { id: 'london-abbey', name: 'Abbey Road Crossing', location: 'London, UK', lat: 51.5320, lng: -0.1777, category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0' },
        { id: 'iss-earth', name: 'ISS — Earth View', location: 'Low Earth Orbit', lat: 0, lng: 0, category: 'space', type: 'youtube', src: 'https://www.youtube.com/embed/P9C25Un7xaM?autoplay=1&mute=1&controls=0' },
        { id: 'miami-port', name: 'Port of Miami', location: 'Miami, USA', lat: 25.7743, lng: -80.1703, category: 'port', type: 'youtube', src: 'https://www.youtube.com/embed/t2Hzb95mhfc?autoplay=1&mute=1&controls=0' },
        { id: 'jackson-hole', name: 'Jackson Hole Town Square', location: 'Wyoming, USA', lat: 43.4799, lng: -110.7624, category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/psfFJR3vZ78?autoplay=1&mute=1&controls=0' },
        { id: 'venice-stmark', name: "St Mark's Square", location: 'Venice, Italy', lat: 45.4341, lng: 12.3388, category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/vPIqGJ2W5qo?autoplay=1&mute=1&controls=0' },
        { id: 'la-port', name: 'Port of Los Angeles', location: 'Los Angeles, USA', lat: 33.7283, lng: -118.2590, category: 'port', type: 'youtube', src: 'https://www.youtube.com/embed/VFRXaif1ewE?autoplay=1&mute=1&controls=0' },
        { id: 'singapore-port', name: 'Singapore Harbour', location: 'Singapore', lat: 1.2644, lng: 103.8200, category: 'port', type: 'youtube', src: 'https://www.youtube.com/embed/gCNeDWCI0vo?autoplay=1&mute=1&controls=0' },
        { id: 'nyc-brooklyn', name: 'Brooklyn Bridge View', location: 'New York, USA', lat: 40.7061, lng: -73.9969, category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/ksFR53Dv26c?autoplay=1&mute=1&controls=0' },
        { id: 'rome-trevi', name: 'Trevi Fountain', location: 'Rome, Italy', lat: 41.9009, lng: 12.4833, category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/K6HnbpMqRCw?autoplay=1&mute=1&controls=0' },
    ];
    res.json(feeds);
});

// ═══════════════════════════════════════════════════════════
// SEC EDGAR — Free Company Filings Search
// ═══════════════════════════════════════════════════════════
app.get('/api/sec/company/:ticker', async (req, res) => {
    try {
        const r = await fetch(`https://efts.sec.gov/LATEST/search-index?q=%22${req.params.ticker}%22&dateRange=custom&startdt=2024-01-01&enddt=2026-12-31&forms=10-K,10-Q,8-K`, {
            headers: { 'User-Agent': 'FinanceOS Terminal research@example.com', 'Accept': 'application/json' }
        });
        if (!r.ok) return res.json({ mock: true });
        res.json(await r.json());
    } catch (e) {
        res.json({ mock: true, error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`\n  ╔══════════════════════════════════════════╗`);
    console.log(`  ║  FinanceOS API Server running on :${PORT}   ║`);
    console.log(`  ╚══════════════════════════════════════════╝\n`);
    if (!FINNHUB_KEY) console.log('  ⚠  No FINNHUB_KEY — using mock data for stocks');
    if (!ALPHA_VANTAGE_KEY) console.log('  ⚠  No ALPHA_VANTAGE_KEY — using mock data');
    console.log('  ✓  OpenSky Network (flights) — no key needed');
    console.log('  ✓  CoinGecko (crypto) — no key needed');
    console.log('  ✓  Webcam feeds — curated list');
    console.log('');
});
