// ══════════════════════════════════════════════════════════════
// FinanceOS — Equity Research / Company Deep Dive
// ══════════════════════════════════════════════════════════════

import { formatPrice, formatLargeNumber, formatPct, changeClass } from '../utils/formatter.js';

let currentCompany = null;
let initialized = false;

// ─── Comprehensive Mock Company Database ───
const companyDB = {
  AAPL: {
    symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', sector: 'Technology',
    industry: 'Consumer Electronics', hq: 'Cupertino, California', ceo: 'Tim Cook',
    employees: 164000, founded: 1976, website: 'apple.com', isin: 'US0378331005',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearables such as Apple Watch and AirPods. It also provides AppleCare support, cloud services, operates the App Store, Apple Music, Apple TV+, Apple Arcade, Apple Fitness+, and Apple Pay. Apple is known for its integration of hardware, software, and services.',
    aiSentiment: 'BULLISH',
    aiAnalysis: 'Strong services revenue growth is offsetting hardware cyclical slowdowns. AAPL\'s massive cash hoard and buyback program provides a strong floor. Integration of spatial computing (Vision Pro) remains a long-term play, but near-term catalyst depends on iPhone upgrade supercycle driven by on-device AI.',
    rsi: 62.4, macd: 'Bullish Crossover',
    price: 247.10, change: 3.42, pctChange: 1.40, mktCap: 3810000000000, pe: 32.4, eps: 7.62, divYield: 0.44,
    revenue: 394330000000, netIncome: 97000000000, grossMargin: 46.2, operatingMargin: 31.5,
    roe: 171.0, debtToEquity: 176.0, freeCashFlow: 112000000000, beta: 1.24,
    high52w: 260.10, low52w: 164.08, avgVolume: 52400000,
    suppliers: [
      { symbol: 'TSM', name: 'TSMC', role: 'Chip Manufacturing', pct: 25 },
      { symbol: 'SSNLF', name: 'Samsung', role: 'Display Panels, Memory', pct: 15 },
      { symbol: 'FOXF', name: 'Foxconn / Hon Hai', role: 'Assembly & Manufacturing', pct: 20 },
      { symbol: 'QCOM', name: 'Qualcomm', role: 'Modem Chips', pct: 8 },
      { symbol: 'AVGO', name: 'Broadcom', role: 'Wi-Fi/Bluetooth Chips', pct: 5 },
      { symbol: 'TXN', name: 'Texas Instruments', role: 'Power Management ICs', pct: 4 },
      { symbol: 'GLW', name: 'Corning Inc.', role: 'Glass (Ceramic Shield)', pct: 3 },
      { symbol: 'STM', name: 'STMicroelectronics', role: 'Sensors, Controllers', pct: 3 },
    ],
    customers: [
      { name: 'Direct Consumers', role: 'Apple Stores & Online', pct: 37 },
      { name: 'Best Buy', role: 'Retail Channel', pct: 8 },
      { name: 'Amazon', role: 'Online Retail', pct: 6 },
      { name: 'AT&T', role: 'Carrier Sales', pct: 10 },
      { name: 'Verizon', role: 'Carrier Sales', pct: 9 },
      { name: 'T-Mobile', role: 'Carrier Sales', pct: 7 },
      { name: 'Enterprise/Government', role: 'B2B Channel', pct: 12 },
      { name: 'Education', role: 'K-12 & Higher Ed', pct: 5 },
    ],
    peers: ['MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'SSNLF', 'SONY'],
    financials: {
      revenue_history: [{ year: 2024, val: 394.3 }, { year: 2023, val: 383.3 }, { year: 2022, val: 394.0 }, { year: 2021, val: 365.8 }, { year: 2020, val: 274.5 }],
      income_history: [{ year: 2024, val: 97.0 }, { year: 2023, val: 97.0 }, { year: 2022, val: 99.8 }, { year: 2021, val: 94.7 }, { year: 2020, val: 57.4 }],
    }
  },
  MSFT: {
    symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', sector: 'Technology',
    industry: 'Software Infrastructure', hq: 'Redmond, Washington', ceo: 'Satya Nadella',
    employees: 228000, founded: 1975, website: 'microsoft.com', isin: 'US5949181045',
    description: 'Microsoft Corporation develops and supports software, services, devices, and solutions worldwide. Products include Windows, Office 365, Azure cloud platform, LinkedIn, GitHub, Dynamics 365, and Xbox gaming. The company is a leader in cloud computing via Azure and has made significant investments in artificial intelligence through its partnership with OpenAI.',
    aiSentiment: 'BULLISH',
    aiAnalysis: 'Microsoft\'s early mover advantage with OpenAI integration across the software stack is driving meaningful enterprise ARR growth. Azure continues to take market share. Valuation is premium but justified by structural AI tailwinds.',
    rsi: 58.1, macd: 'Neutral',
    price: 452.35, change: -2.18, pctChange: -0.48, mktCap: 3360000000000, pe: 36.4, eps: 12.43, divYield: 0.70,
    revenue: 245120000000, netIncome: 88500000000, grossMargin: 69.8, operatingMargin: 44.6,
    roe: 39.5, debtToEquity: 37.0, freeCashFlow: 74000000000, beta: 0.89,
    high52w: 468.35, low52w: 362.90, avgVolume: 23100000,
    suppliers: [
      { symbol: 'NVDA', name: 'NVIDIA', role: 'AI GPUs for Azure', pct: 18 },
      { symbol: 'INTC', name: 'Intel', role: 'Server CPUs', pct: 12 },
      { symbol: 'AMD', name: 'AMD', role: 'Server CPUs & GPUs', pct: 10 },
      { symbol: 'TSM', name: 'TSMC', role: 'Custom Silicon Fab', pct: 8 },
      { symbol: 'SSNLF', name: 'Samsung', role: 'Memory/SSDs', pct: 7 },
      { symbol: 'DELL', name: 'Dell Technologies', role: 'Server Hardware', pct: 6 },
    ],
    customers: [
      { name: 'Enterprise (Fortune 500)', role: 'Azure + M365 Suites', pct: 40 },
      { name: 'SMBs', role: 'Microsoft 365 Business', pct: 20 },
      { name: 'Government', role: 'Azure Government, Defense', pct: 12 },
      { name: 'Consumers', role: 'Windows, Xbox, Surface', pct: 15 },
      { name: 'Education', role: 'M365 Education', pct: 8 },
      { name: 'Developers', role: 'GitHub, VS Code, Azure DevOps', pct: 5 },
    ],
    peers: ['AAPL', 'GOOGL', 'AMZN', 'CRM', 'ORCL', 'SAP'],
    financials: {
      revenue_history: [{ year: 2024, val: 245.1 }, { year: 2023, val: 211.9 }, { year: 2022, val: 198.3 }, { year: 2021, val: 168.1 }, { year: 2020, val: 143.0 }],
      income_history: [{ year: 2024, val: 88.5 }, { year: 2023, val: 72.4 }, { year: 2022, val: 72.7 }, { year: 2021, val: 61.3 }, { year: 2020, val: 44.3 }],
    }
  },
  NVDA: {
    symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', sector: 'Technology',
    industry: 'Semiconductors', hq: 'Santa Clara, California', ceo: 'Jensen Huang',
    employees: 32000, founded: 1993, website: 'nvidia.com', isin: 'US67066G1040',
    description: 'NVIDIA Corporation designs and manufactures GPU-accelerated computing platforms. The company dominates the AI training and inference chip market with its H100, H200, and Blackwell GPU architectures. NVIDIA also provides networking solutions (Mellanox/InfiniBand), automotive AI platforms, and the CUDA parallel computing ecosystem.',
    aiSentiment: 'STRONG BULLISH',
    aiAnalysis: 'NVIDIA has an undisputed monopoly in the AI accelerator market. The upcoming Blackwell architecture launch will drive the next wave of capital expenditure from hyperscalers. Risk lies in geopolitical export controls, but current demand outstrips supply by a large margin.',
    rsi: 74.2, macd: 'Bullish Crossover',
    price: 131.28, change: 5.73, pctChange: 4.56, mktCap: 3220000000000, pe: 65.2, eps: 2.01, divYield: 0.02,
    revenue: 130500000000, netIncome: 63000000000, grossMargin: 75.3, operatingMargin: 62.4,
    roe: 115.0, debtToEquity: 29.0, freeCashFlow: 61000000000, beta: 1.67,
    high52w: 153.13, low52w: 60.48, avgVolume: 312500000,
    suppliers: [
      { symbol: 'TSM', name: 'TSMC', role: 'Advanced Chip Fabrication (3nm/5nm)', pct: 35 },
      { symbol: 'SSNLF', name: 'Samsung', role: 'HBM Memory (HBM3E)', pct: 15 },
      { symbol: 'MU', name: 'Micron', role: 'HBM Memory', pct: 10 },
      { symbol: 'HYNIX', name: 'SK Hynix', role: 'HBM Memory Leader', pct: 18 },
      { symbol: 'ASML', name: 'ASML', role: 'EUV Lithography (via TSMC)', pct: 5 },
      { symbol: 'AMKR', name: 'Amkor Technology', role: 'Packaging (CoWoS)', pct: 4 },
    ],
    customers: [
      { name: 'Microsoft', role: 'Azure AI Infrastructure', pct: 15 },
      { name: 'Meta', role: 'AI Training (LLaMA)', pct: 10 },
      { name: 'Alphabet/Google', role: 'GCP AI + DeepMind', pct: 10 },
      { name: 'Amazon AWS', role: 'AI/ML cloud instances', pct: 10 },
      { name: 'Tesla', role: 'Autonomous Driving AI', pct: 3 },
      { name: 'Oracle', role: 'OCI GPU Cloud', pct: 5 },
      { name: 'Sovereign AI Programs', role: 'Government AI Investment', pct: 8 },
      { name: 'Other Enterprise', role: 'Data Centers, Research', pct: 25 },
    ],
    peers: ['AMD', 'INTC', 'AVGO', 'QCOM', 'TSM', 'MRVL'],
    financials: {
      revenue_history: [{ year: 2025, val: 130.5 }, { year: 2024, val: 60.9 }, { year: 2023, val: 27.0 }, { year: 2022, val: 26.9 }, { year: 2021, val: 16.7 }],
      income_history: [{ year: 2025, val: 63.0 }, { year: 2024, val: 29.8 }, { year: 2023, val: 4.4 }, { year: 2022, val: 9.8 }, { year: 2021, val: 4.3 }],
    }
  },
  TSLA: {
    symbol: 'TSLA', name: 'Tesla, Inc.', exchange: 'NASDAQ', sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers', hq: 'Austin, Texas', ceo: 'Elon Musk',
    employees: 140000, founded: 2003, website: 'tesla.com', isin: 'US88160R1014',
    description: 'Tesla, Inc. designs, manufactures, and sells electric vehicles, energy generation and storage systems, and related services. Products include Model S, 3, X, Y, Cybertruck and Semi. Tesla also operates the Supercharger network, Tesla Energy (Megapack, Powerwall), and is developing Full Self-Driving (FSD) autonomous technology and the Optimus humanoid robot.',
    aiSentiment: 'NEUTRAL',
    aiAnalysis: 'Tesla faces near-term margin pressure due to price cuts and rising EV competition globally, particularly from Chinese OEMs. Long-term thesis relies heavily on the success of FSD (robotaxis) and energy storage, moving from an auto manufacturer to an AI/Robotics platform.',
    rsi: 38.5, macd: 'Bearish Divergence',
    price: 342.15, change: -8.42, pctChange: -2.40, mktCap: 1100000000000, pe: 115.0, eps: 2.98, divYield: 0,
    revenue: 96770000000, netIncome: 15000000000, grossMargin: 18.2, operatingMargin: 8.5,
    roe: 23.0, debtToEquity: 11.0, freeCashFlow: 4400000000, beta: 2.05,
    high52w: 488.54, low52w: 138.80, avgVolume: 87430000,
    suppliers: [
      { symbol: 'PCRFY', name: 'Panasonic', role: 'Battery Cells (4680)', pct: 18 },
      { symbol: 'CATL', name: 'CATL', role: 'LFP Battery Cells', pct: 22 },
      { symbol: 'NVDA', name: 'NVIDIA', role: 'AI Training GPUs', pct: 5 },
      { symbol: 'STM', name: 'STMicroelectronics', role: 'Power Semiconductors (SiC)', pct: 6 },
      { symbol: 'ALB', name: 'Albemarle', role: 'Lithium Supply', pct: 4 },
      { symbol: 'APTV', name: 'Aptiv', role: 'Electrical Components', pct: 3 },
    ],
    customers: [
      { name: 'Direct Consumers (US)', role: 'tesla.com D2C', pct: 40 },
      { name: 'Direct Consumers (China)', role: 'Shanghai Giga sales', pct: 22 },
      { name: 'Direct Consumers (EU)', role: 'Berlin Giga + import', pct: 18 },
      { name: 'Fleet/Rental', role: 'Hertz, Enterprise, Uber', pct: 8 },
      { name: 'Utilities', role: 'Megapack energy storage', pct: 7 },
      { name: 'Other Markets', role: 'RoW & emerging', pct: 5 },
    ],
    peers: ['F', 'GM', 'RIVN', 'LCID', 'TM', 'BMW.DE', 'NIO'],
    financials: {
      revenue_history: [{ year: 2024, val: 96.8 }, { year: 2023, val: 96.8 }, { year: 2022, val: 81.5 }, { year: 2021, val: 53.8 }, { year: 2020, val: 31.5 }],
      income_history: [{ year: 2024, val: 15.0 }, { year: 2023, val: 15.0 }, { year: 2022, val: 12.6 }, { year: 2021, val: 5.5 }, { year: 2020, val: 0.7 }],
    }
  },
  GOOGL: {
    symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', sector: 'Technology',
    industry: 'Internet Content & Information', hq: 'Mountain View, California', ceo: 'Sundar Pichai',
    employees: 182502, founded: 1998, website: 'abc.xyz', isin: 'US02079K3059',
    description: 'Alphabet Inc. is a global technology conglomerate. Through Google, it dominates internet search, digital advertising, and provides cloud computing (Google Cloud), mobile OS (Android), hardware (Pixel), YouTube, and AI research (DeepMind, Gemini). Other Bets include Waymo (autonomous vehicles), Verily (life sciences), and Calico (longevity research).',
    aiSentiment: 'BULLISH',
    aiAnalysis: 'Despite regulatory scrutiny and antitrust cases, Google\'s core search monopoly remains highly cash-generative. The integration of Gemini into search and Workspace defends against Microsoft/OpenAI. Waymo is showing significant progress in autonomous ride-hailing.',
    rsi: 54.3, macd: 'Neutral',
    price: 185.42, change: 1.87, pctChange: 1.02, mktCap: 2280000000000, pe: 24.8, eps: 7.48, divYield: 0.45,
    revenue: 350020000000, netIncome: 100500000000, grossMargin: 57.5, operatingMargin: 32.5,
    roe: 32.0, debtToEquity: 8.0, freeCashFlow: 72000000000, beta: 1.05,
    high52w: 201.42, low52w: 130.67, avgVolume: 18920000,
    suppliers: [
      { symbol: 'NVDA', name: 'NVIDIA', role: 'AI Training GPUs', pct: 12 },
      { symbol: 'TSM', name: 'TSMC', role: 'TPU Chip Fabrication', pct: 10 },
      { symbol: 'AVGO', name: 'Broadcom', role: 'Custom AI Chips (TPU)', pct: 8 },
      { symbol: 'SSNLF', name: 'Samsung', role: 'Memory, Displays', pct: 6 },
      { symbol: 'INTC', name: 'Intel', role: 'Server CPUs', pct: 5 },
    ],
    customers: [
      { name: 'Advertisers (SMB)', role: 'Google Ads / Search Ads', pct: 45 },
      { name: 'Advertisers (Enterprise)', role: 'YouTube, Display Network', pct: 20 },
      { name: 'Cloud Enterprise', role: 'Google Cloud Platform', pct: 15 },
      { name: 'Consumers', role: 'Pixel, Nest, YouTube Premium', pct: 8 },
      { name: 'Android OEMs', role: 'Play Store / GMS licensing', pct: 7 },
      { name: 'Government / Education', role: 'Google Workspace', pct: 5 },
    ],
    peers: ['META', 'MSFT', 'AMZN', 'AAPL', 'SNAP', 'TTD'],
    financials: {
      revenue_history: [{ year: 2024, val: 350.0 }, { year: 2023, val: 307.4 }, { year: 2022, val: 282.8 }, { year: 2021, val: 257.6 }, { year: 2020, val: 182.5 }],
      income_history: [{ year: 2024, val: 100.5 }, { year: 2023, val: 73.8 }, { year: 2022, val: 60.0 }, { year: 2021, val: 76.0 }, { year: 2020, val: 40.3 }],
    }
  },
  AMZN: {
    symbol: 'AMZN', name: 'Amazon.com, Inc.', exchange: 'NASDAQ', sector: 'Consumer Cyclical',
    industry: 'Internet Retail', hq: 'Seattle, Washington', ceo: 'Andy Jassy',
    employees: 1525000, founded: 1994, website: 'amazon.com', isin: 'US0231351067',
    description: 'Amazon.com is a multinational technology company operating in e-commerce, cloud computing (AWS), digital streaming, and artificial intelligence. AWS is the world\'s largest cloud infrastructure provider. Amazon also operates Whole Foods, Amazon Studios, Twitch, Ring, and Alexa smart home ecosystem.',
    aiSentiment: 'BULLISH',
    aiAnalysis: 'AWS growth is re-accelerating following a period of cloud optimization, driven by GenAI workloads. Retail margins are expanding due to fulfillment network regionalization. Advertising revenue is highly profitable and scaling rapidly.',
    rsi: 66.8, macd: 'Bullish',
    price: 228.93, change: 4.56, pctChange: 2.03, mktCap: 2390000000000, pe: 42.5, eps: 5.39, divYield: 0,
    revenue: 637970000000, netIncome: 44400000000, grossMargin: 48.4, operatingMargin: 10.7,
    roe: 22.0, debtToEquity: 54.0, freeCashFlow: 36800000000, beta: 1.15,
    high52w: 242.52, low52w: 151.61, avgVolume: 41200000,
    suppliers: [
      { symbol: 'NVDA', name: 'NVIDIA', role: 'AI GPUs for AWS', pct: 10 },
      { symbol: 'INTC', name: 'Intel', role: 'Server CPUs (Xeon)', pct: 8 },
      { symbol: 'AMD', name: 'AMD', role: 'Server CPUs (EPYC), Graviton', pct: 7 },
      { symbol: 'UPS', name: 'UPS', role: 'Logistics & Delivery', pct: 6 },
      { symbol: 'FDX', name: 'FedEx', role: 'Logistics & Delivery', pct: 5 },
      { symbol: 'RXN', name: 'Rexnord', role: 'Warehouse Automation', pct: 3 },
    ],
    customers: [
      { name: 'Consumers (NA)', role: 'Amazon.com D2C + Prime', pct: 42 },
      { name: 'Consumers (International)', role: 'Global Amazon stores', pct: 18 },
      { name: 'AWS Enterprise', role: 'Cloud Infrastructure', pct: 18 },
      { name: 'Third-Party Sellers', role: 'Marketplace + FBA', pct: 12 },
      { name: 'Advertisers', role: 'Amazon Ads', pct: 7 },
      { name: 'AWS Government', role: 'GovCloud, Intelligence', pct: 3 },
    ],
    peers: ['WMT', 'BABA', 'SHOP', 'MSFT', 'GOOGL', 'EBAY'],
    financials: {
      revenue_history: [{ year: 2024, val: 638.0 }, { year: 2023, val: 574.8 }, { year: 2022, val: 514.0 }, { year: 2021, val: 469.8 }, { year: 2020, val: 386.1 }],
      income_history: [{ year: 2024, val: 44.4 }, { year: 2023, val: 30.4 }, { year: 2022, val: -2.7 }, { year: 2021, val: 33.4 }, { year: 2020, val: 21.3 }],
    }
  },
  META: {
    symbol: 'META', name: 'Meta Platforms, Inc.', exchange: 'NASDAQ', sector: 'Technology',
    industry: 'Internet Content & Information', hq: 'Menlo Park, California', ceo: 'Mark Zuckerberg',
    employees: 72404, founded: 2004, website: 'meta.com', isin: 'US30303M1027',
    description: 'Meta Platforms operates the world\'s largest social media platforms including Facebook, Instagram, WhatsApp, and Messenger. The company is investing heavily in AI (LLaMA models) and metaverse technologies (Reality Labs, Quest VR headsets). Meta generates the vast majority of revenue from targeted digital advertising.',
    aiSentiment: 'BULLISH',
    aiAnalysis: 'Meta\'s decisive "Year of Efficiency" improved margins significantly. AI investments are paying off by increasing user engagement on Instagram/Reels and improving ad targeting efficiency. Open-source LLaMA strategy creates a formidable moat against proprietary models.',
    rsi: 81.2, macd: 'Overbought',
    price: 695.20, change: 12.35, pctChange: 1.81, mktCap: 1760000000000, pe: 27.8, eps: 25.0, divYield: 0.36,
    revenue: 164710000000, netIncome: 52000000000, grossMargin: 81.5, operatingMargin: 41.2,
    roe: 36.0, debtToEquity: 27.0, freeCashFlow: 44000000000, beta: 1.22,
    high52w: 740.91, low52w: 414.50, avgVolume: 15680000,
    suppliers: [
      { symbol: 'NVDA', name: 'NVIDIA', role: 'AI Training GPUs (H100/B200)', pct: 20 },
      { symbol: 'TSM', name: 'TSMC', role: 'Custom MTIA chip fab', pct: 8 },
      { symbol: 'AVGO', name: 'Broadcom', role: 'Networking, Custom Silicon', pct: 6 },
      { symbol: 'QCOM', name: 'Qualcomm', role: 'Quest VR Chips', pct: 5 },
      { symbol: 'MU', name: 'Micron', role: 'Memory for Data Centers', pct: 4 },
    ],
    customers: [
      { name: 'SMB Advertisers', role: 'Facebook & Instagram Ads', pct: 40 },
      { name: 'Enterprise Advertisers', role: 'Brand campaigns, video ads', pct: 30 },
      { name: 'App Developers', role: 'Meta Audience Network', pct: 8 },
      { name: 'Consumers', role: 'Quest VR, WhatsApp Business', pct: 5 },
      { name: 'E-commerce', role: 'Shops, Marketplace', pct: 12 },
      { name: 'Political / Non-Profit', role: 'Cause-based advertising', pct: 5 },
    ],
    peers: ['GOOGL', 'SNAP', 'PINS', 'TTD', 'MSFT', 'BIDU'],
    financials: {
      revenue_history: [{ year: 2024, val: 164.7 }, { year: 2023, val: 134.9 }, { year: 2022, val: 116.6 }, { year: 2021, val: 117.9 }, { year: 2020, val: 86.0 }],
      income_history: [{ year: 2024, val: 52.0 }, { year: 2023, val: 39.1 }, { year: 2022, val: 23.2 }, { year: 2021, val: 39.4 }, { year: 2020, val: 29.1 }],
    }
  },
};

export function initEquityView() {
  if (initialized) return;
  initialized = true;
  renderEquitySearch();
}

export function searchCompany(symbol) {
  const sym = symbol.toUpperCase();
  const company = companyDB[sym];
  if (company) {
    currentCompany = company;
    renderCompanyProfile(company);
  } else {
    renderNotFound(sym);
  }
}

function renderEquitySearch() {
  const el = document.getElementById('equity-container');
  if (!el) return;
  el.innerHTML = `
    <div class="equity-search-wrapper">
      <div class="equity-search-box">
        <div class="equity-search-header">
          <span class="panel-tag">EQS</span>
          <h1>Equity Research Terminal</h1>
        </div>
        <div class="equity-search-input-row">
          <input type="text" id="equity-search-input" class="equity-search-input"
            placeholder="Enter ticker symbol (e.g. AAPL, NVDA, MSFT, TSLA, GOOGL, AMZN, META)..."
            autocomplete="off" spellcheck="false" />
          <button id="equity-search-btn" class="equity-search-btn">SEARCH</button>
        </div>
        <div class="equity-available">
          <span class="text-muted">Available: </span>
          ${Object.keys(companyDB).map(s => `<span class="equity-ticker-chip" data-symbol="${s}">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  const input = document.getElementById('equity-search-input');
  const btn = document.getElementById('equity-search-btn');
  btn.addEventListener('click', () => { if (input.value.trim()) searchCompany(input.value.trim()); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && input.value.trim()) searchCompany(input.value.trim()); });

  el.querySelectorAll('.equity-ticker-chip').forEach(chip => {
    chip.addEventListener('click', () => searchCompany(chip.dataset.symbol));
  });
}

function renderNotFound(symbol) {
  const el = document.getElementById('equity-container');
  el.innerHTML = `
    <div class="equity-search-wrapper">
      <div class="equity-search-box">
        <div class="equity-search-header">
          <span class="panel-tag">EQS</span>
          <h1>Equity Research Terminal</h1>
        </div>
        <div class="equity-search-input-row">
          <input type="text" id="equity-search-input" class="equity-search-input" value="${symbol}"
            placeholder="Enter ticker symbol..." autocomplete="off" />
          <button id="equity-search-btn" class="equity-search-btn">SEARCH</button>
        </div>
        <div class="equity-not-found">
          <span style="color:var(--red)">✕ Symbol "${symbol}" not found in database.</span><br/>
          <span class="text-muted">Available: ${Object.keys(companyDB).join(', ')}</span>
        </div>
        <div class="equity-available">
          ${Object.keys(companyDB).map(s => `<span class="equity-ticker-chip" data-symbol="${s}">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  const input = document.getElementById('equity-search-input');
  const btn = document.getElementById('equity-search-btn');
  btn.addEventListener('click', () => { if (input.value.trim()) searchCompany(input.value.trim()); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && input.value.trim()) searchCompany(input.value.trim()); });
  el.querySelectorAll('.equity-ticker-chip').forEach(chip => {
    chip.addEventListener('click', () => searchCompany(chip.dataset.symbol));
  });
}

function renderCompanyProfile(c) {
  const el = document.getElementById('equity-container');
  if (!el) return;

  const cls = changeClass(c.pctChange);

  el.innerHTML = `
    <div class="equity-profile">
      <!-- Header -->
      <div class="equity-header">
        <div class="equity-header-left">
          <div class="equity-back" id="equity-back-btn">← Back</div>
          <div class="equity-title-row">
            <span class="panel-tag">${c.exchange}</span>
            <h1 class="equity-company-name">${c.name}</h1>
            <span class="equity-symbol">${c.symbol}</span>
          </div>
          <div class="equity-subtitle">${c.sector} · ${c.industry} · ${c.hq}</div>
        </div>
        <div class="equity-header-right">
          <div class="equity-price">\$${formatPrice(c.price)}</div>
          <div class="equity-price-change ${cls}">
            ${c.change >= 0 ? '+' : ''}${c.change.toFixed(2)} (${c.pctChange >= 0 ? '+' : ''}${c.pctChange.toFixed(2)}%)
          </div>
        </div>
      </div>

      <!-- Key Metrics Grid -->
      <div class="equity-section">
        <h3 class="equity-section-title">KEY STATISTICS</h3>
        <div class="equity-metrics-grid">
          <div class="metric-card"><span class="metric-label">Market Cap</span><span class="metric-value">\$${formatLargeNumber(c.mktCap)}</span></div>
          <div class="metric-card"><span class="metric-label">P/E Ratio</span><span class="metric-value">${c.pe.toFixed(1)}x</span></div>
          <div class="metric-card"><span class="metric-label">EPS (TTM)</span><span class="metric-value">\$${c.eps.toFixed(2)}</span></div>
          <div class="metric-card"><span class="metric-label">Dividend Yield</span><span class="metric-value">${c.divYield > 0 ? c.divYield.toFixed(2) + '%' : 'N/A'}</span></div>
          <div class="metric-card"><span class="metric-label">Revenue (TTM)</span><span class="metric-value">\$${formatLargeNumber(c.revenue)}</span></div>
          <div class="metric-card"><span class="metric-label">Net Income</span><span class="metric-value">\$${formatLargeNumber(c.netIncome)}</span></div>
          <div class="metric-card"><span class="metric-label">Gross Margin</span><span class="metric-value">${c.grossMargin.toFixed(1)}%</span></div>
          <div class="metric-card"><span class="metric-label">Op. Margin</span><span class="metric-value">${c.operatingMargin.toFixed(1)}%</span></div>
          <div class="metric-card"><span class="metric-label">ROE</span><span class="metric-value">${c.roe.toFixed(1)}%</span></div>
          <div class="metric-card"><span class="metric-label">D/E Ratio</span><span class="metric-value">${c.debtToEquity.toFixed(0)}%</span></div>
          <div class="metric-card"><span class="metric-label">Free Cash Flow</span><span class="metric-value">\$${formatLargeNumber(c.freeCashFlow)}</span></div>
          <div class="metric-card"><span class="metric-label">Beta</span><span class="metric-value">${c.beta.toFixed(2)}</span></div>
          <div class="metric-card"><span class="metric-label">52W High</span><span class="metric-value">\$${formatPrice(c.high52w)}</span></div>
          <div class="metric-card"><span class="metric-label">52W Low</span><span class="metric-value">\$${formatPrice(c.low52w)}</span></div>
          <div class="metric-card"><span class="metric-label">Avg Volume</span><span class="metric-value">${formatLargeNumber(c.avgVolume)}</span></div>
          <div class="metric-card"><span class="metric-label">Employees</span><span class="metric-value">${c.employees.toLocaleString()}</span></div>
        </div>
      </div>

      <!-- Company Description -->
      <div class="equity-section">
        <h3 class="equity-section-title">COMPANY OVERVIEW</h3>
        <div class="equity-description">
          <div class="equity-desc-meta">
            <span>CEO: <strong>${c.ceo}</strong></span>
            <span>Founded: <strong>${c.founded}</strong></span>
            <span>ISIN: <strong>${c.isin}</strong></span>
            <span>Web: <strong>${c.website}</strong></span>
          </div>
          <p>${c.description}</p>
        </div>
      </div>

      <!-- AI Analysis & Technicals -->
      <div class="equity-section">
        <h3 class="equity-section-title">INTELLIGENCE DESK (AI)</h3>
        <div class="equity-ai-card">
          <div class="equity-ai-header">
            <span class="ai-tag">FINANCE_OS AGENT</span>
            <span class="ai-sentiment ${c.aiSentiment.includes('BULL') ? 'positive' : c.aiSentiment.includes('BEAR') ? 'negative' : 'neutral'}">
                RATING: ${c.aiSentiment}
            </span>
          </div>
          <p class="equity-ai-analysis">"${c.aiAnalysis}"</p>
          <div class="equity-technicals">
             <span class="tech-badge">RSI (14D): ${c.rsi}</span>
             <span class="tech-badge">MACD: ${c.macd}</span>
          </div>
        </div>
      </div>

      <!-- Supply Chain -->
      <div class="equity-section">
        <h3 class="equity-section-title">SUPPLY CHAIN</h3>
        <div class="supply-chain-container">
          <!-- Suppliers -->
          <div class="supply-chain-column">
            <div class="supply-chain-label">SUPPLIERS</div>
            ${c.suppliers.map(s => `
              <div class="supply-chain-card supplier-card">
                <div class="sc-name">${s.name}</div>
                <div class="sc-role">${s.role}</div>
                <div class="sc-bar-container">
                  <div class="sc-bar" style="width:${s.pct * 2.5}%;background:#4da6ff"></div>
                  <span class="sc-pct">${s.pct}%</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Center: Company -->
          <div class="supply-chain-center">
            <div class="supply-chain-arrows">▶▶▶</div>
            <div class="supply-chain-company-badge">
              <div class="sc-company-symbol">${c.symbol}</div>
              <div class="sc-company-name">${c.name}</div>
            </div>
            <div class="supply-chain-arrows">▶▶▶</div>
          </div>

          <!-- Customers -->
          <div class="supply-chain-column">
            <div class="supply-chain-label">CUSTOMERS</div>
            ${c.customers.map(cu => `
              <div class="supply-chain-card customer-card">
                <div class="sc-name">${cu.name}</div>
                <div class="sc-role">${cu.role}</div>
                <div class="sc-bar-container">
                  <div class="sc-bar" style="width:${cu.pct * 2.5}%;background:#00d26a"></div>
                  <span class="sc-pct">${cu.pct}%</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Revenue History -->
      <div class="equity-section">
        <h3 class="equity-section-title">FINANCIAL HISTORY ($B)</h3>
        <div class="financials-table-container">
          <table class="financials-table">
            <thead>
              <tr>
                <th>Year</th>
                ${c.financials.revenue_history.map(r => `<th>${r.year}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-accent">Revenue</td>
                ${c.financials.revenue_history.map(r => `<td>$${r.val.toFixed(1)}B</td>`).join('')}
              </tr>
              <tr>
                <td class="text-accent">Net Income</td>
                ${c.financials.income_history.map(r => `<td class="${r.val >= 0 ? 'positive' : 'negative'}">$${r.val.toFixed(1)}B</td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Peers -->
      <div class="equity-section">
        <h3 class="equity-section-title">PEERS</h3>
        <div class="equity-peers">
          ${c.peers.map(p => `<span class="equity-peer-chip" data-symbol="${p}">${p}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  // Back button
  document.getElementById('equity-back-btn')?.addEventListener('click', () => {
    initialized = false;
    initEquityView();
  });

  // Peer chips
  el.querySelectorAll('.equity-peer-chip').forEach(chip => {
    chip.addEventListener('click', () => searchCompany(chip.dataset.symbol));
  });
}
