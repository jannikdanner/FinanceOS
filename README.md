# FinanceOS — Intelligence Terminal

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/license-private-red?style=flat-square" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-blue?style=flat-square" />
</p>

A Bloomberg Terminal-inspired intelligence platform combining **real-time financial data**, **global geopolitical intelligence**, **OSINT flight tracking**, and **strategic infrastructure mapping** into a single, dark-themed command-line-style web interface.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Views & Modules](#views--modules)
- [Data Sources & APIs](#data-sources--apis)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Roadmap](#roadmap)

---

## Overview

FinanceOS is a web-based intelligence terminal designed to aggregate and visualize financial markets, geopolitical data, and open-source intelligence (OSINT) in real time. It draws inspiration from professional trading terminals (Bloomberg, Refinitiv) and intelligence platforms (WorldMonitor) to provide a unified operational picture.

The platform operates with **zero paid API dependencies** — all data comes from free public APIs, simulated intelligence feeds, and curated datasets.

---

## Features

### 🖥️ Terminal Dashboard (F1)
- **Market Overview** — Live indices (SPX, INDU, CCMP, UKX, DAX, NKY, HSI, SHCOMP) with real-time WebSocket updates via Finnhub
- **Equity Chart** — Interactive candlestick/line chart for any ticker with 1D/1W/1M/3M/1Y timeframes
- **Top News Feed** — Aggregated financial news from Reuters, Bloomberg, CNBC, FT, CoinDesk
- **Watchlist** — Customizable stock watchlist with live price updates, change %, volume, and market cap
- **Sector Performance** — 12-sector heatmap (Technology, Healthcare, Financials, Energy, Defense, etc.)
- **Crypto Dashboard** — Top 20 cryptocurrencies with sparkline charts, 24h change, and market cap
- **FX / Currency Pairs** — Major forex pairs with bid/ask spreads

### 🗺️ Global Intelligence Map (F2)
**14 toggleable data layers:**

| Layer | Description | Source |
|-------|-------------|--------|
| ✈ Live Flights | Real-time aircraft positions worldwide | OpenSky Network API |
| ✈ OSINT Tracked | 6 tracked aircraft with animated flight paths | Curated OSINT data |
| ★ Military Bases | 20 US/NATO installations globally | Curated dataset |
| ▲ Vessels / AIS | 20 simulated vessels (VLCC, Container, LNG, Military) | AIS simulation |
| ⚓ Ports | 16 major world ports with TEU throughput | Curated dataset |
| ● Oil Infrastructure | 12 terminals, refineries, and storage facilities | Curated dataset |
| ⬥ Chokepoints | 10 strategic maritime chokepoints with risk levels | Curated dataset |
| ─ Trade Routes | 17 global shipping lanes (container, oil, LNG, bulk) | Curated dataset |
| ═ Pipelines | 6 major oil/gas pipelines (Druzhba, Nord Stream, BTC, etc.) | Curated dataset |
| ⌁ Undersea Cables | 7 submarine fiber optic routes (MAREA, SEA-ME-WE, etc.) | Curated dataset |
| ◆ Economic Corridors | 3 corridors (Belt & Road, CPEC, INSTC) | Curated dataset |
| ☢ Nuclear Sites | 8 nuclear facilities with risk status | Curated dataset |
| ◌ Conflict Zones | 6 active conflict/tension zones | Curated dataset |
| ◎ Seismic Activity | Live earthquake data from USGS | USGS GeoJSON API |

**Additional Map Features:**
- **DEFCON Indicator** — Global threat level display
- **Strategic Posture Panel** — Theater-level assessments (Persian Gulf, Baltic, South China Sea, Eastern Med, Arctic) with severity ratings and air/sea asset counts
- **OSINT Flight Tracker** — Search by registration number, quick-tag buttons for tracked aircraft, click-to-zoom
- **Intel Feed** — Real-time intelligence updates on military movements, shipping delays, energy markets

### 🌍 Geopolitical Country Intelligence (Click on Map)
Click any of **15 major countries** on the map to open a **draggable Bloomberg-style intelligence window** with 4 tabs:

| Tab | Contents |
|-----|----------|
| **POL** | Head of state, ruling party, ideology, government type, last/next election, result, opposition, parliament composition bar, Democracy Index, Freedom House score |
| **GEO** | East↔West alignment spectrum with trend indicator, military alliances (NATO, BRICS+, SCO, etc.), key allies & adversaries, nuclear status, sanctions status, UN voting alignment bars (US/CN/RU), territorial disputes |
| **ECON** | GDP, GDP per capita, trade balance, currency, central bank rate, debt-to-GDP, credit rating, top export/import partners with percentage bars, strategic resources |
| **RISK** | Political stability score (1-10), conflict level, Corruption Perception Index rank, Press Freedom rank, overall risk assessment (LOW/MED/HIGH/CRIT), Democracy Index bar |

**Countries covered:** United States, China, Russia, United Kingdom, Germany, India, Iran, Japan, Saudi Arabia, Ukraine, Israel, Turkey, France, North Korea, Brazil

### 📊 Equity Research (F3)
- **Company Overview** — Ticker search with detailed company fundamentals
- **SEC EDGAR Integration** — Latest regulatory filings
- **Supply Chain Analysis** — Supplier and customer relationships
- **Financial Metrics** — P/E, Market Cap, Revenue, EPS

### 📰 Intel View (F4)
- **Multi-source news aggregation** with category tags (URGENT, EARNINGS, MARKET)
- **Webcam feeds** — Live streams from strategic locations worldwide

### 📈 Macro Dashboard (F5)
- **Central Banks** — Fed, ECB, BoE, BoJ rates with next meeting dates and cut probability
- **Inflation (CPI)** — US, Eurozone, UK, Japan with target range gauge
- **GDP Growth** — Annual % for US, Eurozone, China, Global
- **Labor Market** — Unemployment rates with NFP release countdown
- **US Treasury Yield Curve** — Live interactive chart with 2Y/10Y spread
- **Economic Calendar** — Upcoming high-impact events with actual vs. estimate

### 🔍 OSINT View (F6)
- **Flight Tracking (ADSB)** — Search by registration, displays aircraft type, owner, altitude, speed, origin/destination
- **Maritime Tracking (AIS)** — Vessel search with type, status, speed, draught, destination
- **Global Threat & Leak Monitor** — Live feed with severity levels (HIGH/MED/LOW) for darkweb monitoring, signal intelligence, social network analysis, and geospatial intelligence

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser (Client)                   │
│  ┌───────────┬──────────┬──────────┬───────────────┐ │
│  │ Terminal  │   Map    │  Equity  │  Intel/OSINT  │ │
│  │  (F1)     │  (F2)    │  (F3)    │  (F4-F6)      │ │
│  └───────────┴──────────┴──────────┴───────────────┘ │
│  ┌─────────────────────────────────────────────────┐ │
│  │         Shared Components                        │ │
│  │  Navigation │ CommandBar │ Watchlist │ Ticker    │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────┐
│              Express API Server (:3001)              │
│  ┌────────────────────────────────────────────────┐  │
│  │ /api/stocks    │ /api/news     │ /api/crypto   │  │
│  │ /api/flights   │ /api/webcams  │ /api/vessels  │  │
│  │ /api/overview  │ /api/forex    │ /api/sec      │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│              External APIs (Free Tier)               │
│  Finnhub │ CoinGecko │ OpenSky │ USGS │ SEC EDGAR  │
│  ExchangeRate-API │ Alpha Vantage                    │
└─────────────────────────────────────────────────────┘
```

---

## Data Sources & APIs

| API | Purpose | Auth Required | Rate Limit |
|-----|---------|---------------|------------|
| **[Finnhub](https://finnhub.io/)** | Stock quotes, market news, WebSocket live prices | API Key (free tier) | 60 req/min |
| **[CoinGecko](https://www.coingecko.com/api)** | Cryptocurrency prices, market data, sparklines | None | 10-30 req/min |
| **[OpenSky Network](https://opensky-network.org/api)** | Live aircraft positions worldwide | None | 10 req/min |
| **[USGS Earthquake](https://earthquake.usgs.gov/)** | Real-time seismic activity (GeoJSON) | None | Unlimited |
| **[ExchangeRate-API](https://www.exchangerate-api.com/)** | Foreign exchange rates | None | 1500 req/month |
| **[Alpha Vantage](https://www.alphavantage.co/)** | Company fundamentals, financial data | API Key (free tier) | 5 req/min |
| **[SEC EDGAR](https://efts.sec.gov/)** | Company filings, regulatory documents | None | 10 req/sec |
| **[Leaflet.js](https://leafletjs.com/)** + CartoDB | Dark-themed global map tiles | None | Unlimited |
| **[Chart.js](https://www.chartjs.org/)** | Interactive charts and visualizations | None | N/A |
| **GitHub GeoJSON** | Country boundaries for click detection | None | Unlimited |

> **Note:** The application works fully with mock data when API keys are not configured. Set `FINNHUB_KEY` and `ALPHA_VANTAGE_KEY` environment variables for live data.

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Vanilla JavaScript (ES Modules), HTML5, CSS3 |
| **Styling** | Custom CSS with CSS variables design system |
| **Bundler** | Vite 6 |
| **Backend** | Express.js (API proxy server) |
| **Maps** | Leaflet.js with CartoDB dark tiles |
| **Charts** | Chart.js |
| **Live Data** | Finnhub WebSocket (stock prices) |
| **Concurrency** | `concurrently` (runs Vite + Express simultaneously) |
| **Package Manager** | npm |

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/jannikdanner/FinanceOS.git
cd FinanceOS

# Install dependencies
npm install

# Start development server (Vite + Express)
npm run dev
```

The app will be available at:
- **Frontend:** http://localhost:5173
- **API Server:** http://localhost:3001

### Environment Variables (Optional)

Create a `.env` file in the project root:

```env
FINNHUB_KEY=your_finnhub_api_key
ALPHA_VANTAGE_KEY=your_alpha_vantage_key
```

Without these keys, the app uses realistic mock data.

---

## Project Structure

```
FinanceOS/
├── index.html                    # Main HTML entry point
├── server.js                     # Express API proxy server
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite configuration
├── .gitignore
│
├── src/
│   ├── main.js                   # Application entry point & view router
│   ├── style.css                 # Global design system (variables, resets)
│   ├── pages.css                 # View-specific styles + geopolitical windows
│   │
│   ├── components/
│   │   ├── navigation.js         # Top nav bar with F-key tabs
│   │   ├── commandBar.js         # Bloomberg-style command input
│   │   ├── watchlist.js          # Stock watchlist with live updates
│   │   └── ticker.js             # Scrolling market ticker bar
│   │
│   ├── pages/
│   │   ├── terminalView.js       # F1 — Main terminal dashboard
│   │   ├── mapView.js            # F2 — Global intelligence map (1000+ lines)
│   │   ├── equityView.js         # F3 — Equity research & analysis
│   │   ├── intelView.js          # F4 — News & webcam feeds
│   │   ├── macroView.js          # F5 — Macro-economic dashboard
│   │   ├── osintView.js          # F6 — OSINT intelligence terminal
│   │   └── camsView.js           # Live webcam integration
│   │
│   └── data/
│       ├── geoData.js            # Geographic intelligence data (600+ lines)
│       │                         #   Military bases, ports, oil infrastructure,
│       │                         #   chokepoints, shipping routes, pipelines,
│       │                         #   undersea cables, economic corridors,
│       │                         #   vessels, nuclear facilities, conflict zones,
│       │                         #   OSINT tracked flights, theatre assessments
│       │
│       └── countryData.js        # Geopolitical intelligence for 15 countries
│                                 #   Politics, alliances, economy, risk scores
```

---

## Configuration

### Design System

The application uses a comprehensive CSS variables system defined in `style.css`:

```css
--bg-primary: #0a0a0a          /* Main background */
--bg-secondary: #0d0d0d        /* Secondary panels */
--orange: #ff8c00              /* Primary accent (Bloomberg orange) */
--green: #00d26a               /* Positive/bull indicators */
--red: #ff3b3b                 /* Negative/bear/military indicators */
--font-mono: 'JetBrains Mono'  /* Terminal monospace font */
```

### Map Layer Defaults

All 14 map layers are enabled by default. Users can toggle them via the LAYERS panel on the left side of the map view. Layer states are maintained during the session.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `F1` | Switch to Terminal view |
| `F2` | Switch to Map view |
| `F3` | Switch to Equity view |
| `F4` | Switch to Intel view |
| `F5` | Switch to Macro view |
| `F6` | Switch to OSINT view |
| `ESC` | Clear command bar |
| `Enter` | Execute command |

### Command Bar Commands

Type commands in the bottom command bar:

| Command | Action |
|---------|--------|
| `MAP` | Switch to map view |
| `EQUITY` | Switch to equity view |
| `DES AAPL` | Open equity description for AAPL |
| `SUPPLY NVDA` | Open supply chain analysis for NVDA |
| `HELP` | Show available commands |

---

## Roadmap

### v0.2 (Planned)
- [ ] Live news video integration (Bloomberg, CNBC streams)
- [ ] Historical playback mode for map (1h/24h/7d time slider)
- [ ] Portfolio tracking and P&L
- [ ] Options chain visualization
- [ ] Commodities dashboard (Gold, Oil, Natural Gas)

### v0.3 (Planned)
- [ ] AI-powered intelligence insights (focal points, signal detection)
- [ ] Alert system with desktop notifications
- [ ] Multi-monitor workspace support
- [ ] Custom dashboard layouts
- [ ] Data export (CSV/JSON)

### v1.0 (Vision)
- [ ] Full API integration (paid tier)
- [ ] Real-time AIS vessel tracking
- [ ] Satellite imagery integration
- [ ] Custom indicator builder
- [ ] Mobile responsive layout
- [ ] User authentication and saved workspaces

---

## License

This is a private repository. All rights reserved.

---

<p align="center">
  <strong>FinanceOS v0.1</strong> — Built with ☕ and intelligence
</p>
