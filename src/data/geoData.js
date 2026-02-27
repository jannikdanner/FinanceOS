// ══════════════════════════════════════════════════════════════
// FinanceOS — Geographic Intelligence Data
// Military bases, ports, oil infrastructure, shipping routes,
// chokepoints, pipelines, and simulated vessel positions
// ══════════════════════════════════════════════════════════════

// ─── US / NATO Military Bases ───
export const militaryBases = [
    { name: 'Ramstein AB', country: 'Germany', type: 'USAF', lat: 49.4369, lng: 7.6003, branch: 'Air Force', desc: 'USAFE-AFAFRICA HQ' },
    { name: 'RAF Lakenheath', country: 'UK', type: 'USAF', lat: 52.4093, lng: 0.5615, branch: 'Air Force', desc: '48th Fighter Wing' },
    { name: 'RAF Mildenhall', country: 'UK', type: 'USAF', lat: 52.3613, lng: 0.4864, branch: 'Air Force', desc: '100th Air Refueling Wing' },
    { name: 'Yokota AB', country: 'Japan', type: 'USAF', lat: 35.7483, lng: 139.3485, branch: 'Air Force', desc: '374th Airlift Wing' },
    { name: 'Kadena AB', country: 'Japan', type: 'USAF', lat: 26.3516, lng: 127.7715, branch: 'Air Force', desc: '18th Wing — largest USAF wing in Pacific' },
    { name: 'Osan AB', country: 'South Korea', type: 'USAF', lat: 37.0900, lng: 127.0300, branch: 'Air Force', desc: '51st Fighter Wing' },
    { name: 'Al Udeid AB', country: 'Qatar', type: 'USAF', lat: 25.1173, lng: 51.3143, branch: 'Air Force', desc: 'CENTCOM Forward HQ' },
    { name: 'Al Dhafra AB', country: 'UAE', type: 'USAF', lat: 24.2483, lng: 54.5475, branch: 'Air Force', desc: '380th Air Expeditionary Wing' },
    { name: 'Incirlik AB', country: 'Turkey', type: 'USAF', lat: 37.0017, lng: 35.4259, branch: 'Air Force', desc: '39th Air Base Wing' },
    { name: 'Diego Garcia', country: 'BIOT', type: 'USN', lat: -7.3195, lng: 72.4229, branch: 'Navy', desc: 'Naval Support Facility' },
    { name: 'NAS Sigonella', country: 'Italy', type: 'USN', lat: 37.4017, lng: 14.9222, branch: 'Navy', desc: 'Hub of the Med' },
    { name: 'NSA Bahrain', country: 'Bahrain', type: 'USN', lat: 26.2361, lng: 50.5877, branch: 'Navy', desc: 'NAVCENT / US 5th Fleet HQ' },
    { name: 'Camp Humphreys', country: 'South Korea', type: 'USA', lat: 36.9626, lng: 127.0312, branch: 'Army', desc: 'USFK HQ — largest overseas US base' },
    { name: 'Camp Lemonnier', country: 'Djibouti', type: 'USN', lat: 11.5472, lng: 43.1579, branch: 'Navy', desc: 'CJTF-HOA — only permanent US base in Africa' },
    { name: 'Guantanamo Bay', country: 'Cuba', type: 'USN', lat: 19.9023, lng: -75.0970, branch: 'Navy', desc: 'Naval Station' },
    { name: 'NSA Naples', country: 'Italy', type: 'USN', lat: 40.8748, lng: 14.2864, branch: 'Navy', desc: 'US Naval Forces Europe HQ' },
    { name: 'Rota Naval Station', country: 'Spain', type: 'USN', lat: 36.6264, lng: -6.3496, branch: 'Navy', desc: 'NAVSTA Rota' },
    { name: 'Thule AB', country: 'Greenland', type: 'USSF', lat: 76.5312, lng: -68.7032, branch: 'Space Force', desc: 'Pituffik Space Base — northernmost US installation' },
    { name: 'Pine Gap', country: 'Australia', type: 'Joint', lat: -23.7990, lng: 133.7370, branch: 'Intelligence', desc: 'Joint US-AU SIGINT facility' },
    { name: 'Menwith Hill', country: 'UK', type: 'NSA', lat: 54.0155, lng: -1.6904, branch: 'Intelligence', desc: 'NSA/GCHQ SIGINT station' },
];

// ─── Major World Ports ───
export const majorPorts = [
    { name: 'Singapore', country: 'Singapore', lat: 1.2644, lng: 103.8200, throughput: '37.2M TEU', type: 'Container' },
    { name: 'Shanghai', country: 'China', lat: 31.3656, lng: 121.6094, throughput: '49.0M TEU', type: 'Container' },
    { name: 'Ningbo-Zhoushan', country: 'China', lat: 29.8683, lng: 122.2550, throughput: '33.3M TEU', type: 'Container' },
    { name: 'Shenzhen', country: 'China', lat: 22.4814, lng: 114.0553, throughput: '30.4M TEU', type: 'Container' },
    { name: 'Busan', country: 'South Korea', lat: 35.0694, lng: 129.0756, throughput: '22.7M TEU', type: 'Container' },
    { name: 'Guangzhou', country: 'China', lat: 23.0834, lng: 113.4160, throughput: '24.6M TEU', type: 'Container' },
    { name: 'Qingdao', country: 'China', lat: 36.0826, lng: 120.3256, throughput: '25.9M TEU', type: 'Container' },
    { name: 'Rotterdam', country: 'Netherlands', lat: 51.9490, lng: 4.1425, throughput: '14.5M TEU', type: 'Container' },
    { name: 'Dubai (Jebel Ali)', country: 'UAE', lat: 25.0058, lng: 55.0606, throughput: '13.7M TEU', type: 'Container' },
    { name: 'Antwerp', country: 'Belgium', lat: 51.2996, lng: 4.2927, throughput: '12.0M TEU', type: 'Container' },
    { name: 'Hamburg', country: 'Germany', lat: 53.5339, lng: 9.9590, throughput: '8.7M TEU', type: 'Container' },
    { name: 'Los Angeles', country: 'USA', lat: 33.7283, lng: -118.2590, throughput: '9.9M TEU', type: 'Container' },
    { name: 'Long Beach', country: 'USA', lat: 33.7546, lng: -118.2160, throughput: '9.1M TEU', type: 'Container' },
    { name: 'Port Said', country: 'Egypt', lat: 31.2653, lng: 32.3019, throughput: '4.1M TEU', type: 'Container/Transit' },
    { name: 'Yokohama', country: 'Japan', lat: 35.4437, lng: 139.6380, throughput: '2.9M TEU', type: 'Container' },
    { name: 'Piraeus', country: 'Greece', lat: 37.9433, lng: 23.6387, throughput: '5.3M TEU', type: 'Container' },
];

// ─── Oil & Energy Infrastructure ───
export const oilInfrastructure = [
    { name: 'Ras Tanura', country: 'Saudi Arabia', lat: 26.6449, lng: 50.0506, type: 'Oil Terminal', capacity: '6.5 mb/d', desc: 'World\'s largest oil terminal' },
    { name: 'Kharg Island', country: 'Iran', lat: 29.2333, lng: 50.3167, type: 'Oil Terminal', capacity: '5.0 mb/d', desc: 'Iran\'s primary oil export terminal' },
    { name: 'Fujairah', country: 'UAE', lat: 25.1196, lng: 56.3244, type: 'Oil Storage', capacity: '1.2 mb/d', desc: 'Strategic oil storage hub' },
    { name: 'Houston Ship Channel', country: 'USA', lat: 29.7604, lng: -95.0076, type: 'Refinery Complex', capacity: '2.7 mb/d', desc: 'Largest US refining hub' },
    { name: 'Cushing', country: 'USA', lat: 35.9850, lng: -96.7678, type: 'Oil Hub', capacity: '92M bbl storage', desc: 'WTI pricing point — Pipeline Crossroads of the World' },
    { name: 'Primorsk', country: 'Russia', lat: 60.3428, lng: 28.6597, type: 'Oil Terminal', capacity: '1.5 mb/d', desc: 'Russia\'s largest Baltic oil port' },
    { name: 'Novorossiysk', country: 'Russia', lat: 44.7234, lng: 37.7693, type: 'Oil Terminal', capacity: '1.0 mb/d', desc: 'Russia\'s Black Sea oil terminal' },
    { name: 'Jubail', country: 'Saudi Arabia', lat: 27.0046, lng: 49.6225, type: 'Refinery', capacity: '0.9 mb/d', desc: 'Saudi Aramco refinery complex' },
    { name: 'Jamnagar', country: 'India', lat: 22.4707, lng: 70.0577, type: 'Refinery', capacity: '1.24 mb/d', desc: 'World\'s largest refinery (Reliance)' },
    { name: 'Yanbu', country: 'Saudi Arabia', lat: 24.0872, lng: 38.0618, type: 'Oil Terminal', capacity: '2.0 mb/d', desc: 'Red Sea export terminal' },
    { name: 'Saldanha Bay', country: 'South Africa', lat: -33.0092, lng: 17.9281, type: 'Oil Storage', capacity: '0.45 mb/d', desc: 'Strategic Cape storage' },
    { name: 'LOOP', country: 'USA', lat: 28.8844, lng: -90.0257, type: 'Oil Terminal', capacity: '1.2 mb/d', desc: 'Louisiana Offshore Oil Port — only US deepwater port' },
];

// ─── Strategic Chokepoints ───
export const chokepoints = [
    { name: 'Strait of Hormuz', lat: 26.5667, lng: 56.2500, flow: '21 mb/d oil', desc: '21% of global oil consumption passes through', risk: 'high' },
    { name: 'Strait of Malacca', lat: 2.5000, lng: 101.0000, flow: '16 mb/d oil', desc: 'Shortest sea route between Indian & Pacific', risk: 'medium' },
    { name: 'Suez Canal', lat: 30.4592, lng: 32.3498, flow: '5.5 mb/d oil + 12% global trade', desc: '15% of global shipping traffic', risk: 'medium' },
    { name: 'Bab el-Mandeb', lat: 12.5833, lng: 43.3333, flow: '6.2 mb/d oil', desc: 'Gateway between Red Sea and Gulf of Aden', risk: 'high' },
    { name: 'Panama Canal', lat: 9.0800, lng: -79.6800, flow: '0.9 mb/d oil + 5% global trade', desc: '6% of global seaborne trade', risk: 'low' },
    { name: 'Turkish Straits', lat: 41.1194, lng: 29.0764, flow: '2.4 mb/d oil', desc: 'Bosphorus connects Black Sea to Mediterranean', risk: 'medium' },
    { name: 'Strait of Gibraltar', lat: 35.9614, lng: -5.5123, flow: '3.0 mb/d oil', desc: 'Gateway between Atlantic and Mediterranean', risk: 'low' },
    { name: 'Danish Straits', lat: 55.6761, lng: 12.5683, flow: '1.2 mb/d oil', desc: 'Access to Baltic Sea', risk: 'low' },
    { name: 'Cape of Good Hope', lat: -34.3568, lng: 18.4740, flow: '6.0 mb/d oil (alternate)', desc: 'Alternative to Suez — growing due to Houthi attacks', risk: 'low' },
    { name: 'GIUK Gap', lat: 63.0000, lng: -15.0000, flow: 'NATO strategic', desc: 'Greenland-Iceland-UK submarine monitoring gap', risk: 'medium' },
];

// ─── Major Shipping Routes (polyline coordinates) ───
export const shippingRoutes = [
    {
        name: 'Asia → Europe (Suez Route)',
        type: 'container',
        color: '#4da6ff',
        coords: [
            [31.36, 121.60], [22.28, 114.12], [1.26, 103.82], [5.0, 80.0],
            [12.0, 45.0], [12.58, 43.33], [15.0, 42.0], [30.46, 32.35],
            [35.0, 25.0], [35.96, -5.51], [42.0, -9.0], [48.0, -5.0],
            [51.95, 4.14]
        ]
    },
    {
        name: 'Transpacific (Asia → US West Coast)',
        type: 'container',
        color: '#4da6ff',
        coords: [
            [31.36, 121.60], [35.0, 140.0], [40.0, 170.0], [42.0, -170.0],
            [38.0, -145.0], [34.0, -120.0], [33.73, -118.26]
        ]
    },
    {
        name: 'Persian Gulf Oil Route',
        type: 'oil',
        color: '#ff8c00',
        coords: [
            [26.64, 50.05], [26.57, 56.25], [22.0, 60.0], [15.0, 55.0],
            [12.58, 43.33], [5.0, 45.0], [-5.0, 50.0], [-15.0, 55.0],
            [-34.36, 18.47], [-34.0, -10.0], [-20.0, -30.0],
            [5.0, -35.0], [25.0, -65.0], [29.76, -95.01]
        ]
    },
    {
        name: 'Persian Gulf → Asia',
        type: 'oil',
        color: '#ff8c00',
        coords: [
            [26.64, 50.05], [26.57, 56.25], [22.0, 63.0], [15.0, 68.0],
            [8.0, 77.0], [2.50, 101.0], [1.26, 103.82], [22.48, 114.06],
            [31.36, 121.60], [35.07, 129.08]
        ]
    },
    {
        name: 'Trans-Atlantic',
        type: 'container',
        color: '#4da6ff',
        coords: [
            [51.95, 4.14], [51.0, -1.0], [50.0, -8.0], [48.0, -20.0],
            [42.0, -50.0], [40.5, -73.5]
        ]
    },
    {
        name: 'Russia Baltic Oil Route',
        type: 'oil',
        color: '#ff8c00',
        coords: [
            [60.34, 28.66], [59.0, 22.0], [55.68, 12.57], [54.0, 8.0],
            [51.95, 4.14]
        ]
    },
    {
        name: 'West Africa → Europe Oil',
        type: 'oil',
        color: '#ff8c00',
        coords: [
            [4.0, 3.0], [6.0, -5.0], [15.0, -17.0], [30.0, -15.0],
            [35.96, -5.51], [42.0, -3.0], [51.95, 4.14]
        ]
    },
    {
        name: 'LNG Route: Qatar → Europe',
        type: 'lng',
        color: '#a855f7',
        coords: [
            [25.50, 51.50], [26.57, 56.25], [12.58, 43.33], [15.0, 42.0],
            [30.46, 32.35], [35.0, 25.0], [37.0, 15.0], [40.0, 0.0],
            [43.0, -8.0], [50.0, -5.0], [51.0, 1.0]
        ]
    },
    {
        name: 'Australia → China Iron Ore',
        type: 'bulk',
        color: '#888888',
        coords: [
            [-31.95, 115.86], [-25.0, 110.0], [-15.0, 112.0], [-5.0, 115.0],
            [5.0, 115.0], [15.0, 116.0], [22.48, 114.06], [31.36, 121.60]
        ]
    },
    {
        name: 'South America → Asia (Cape Route)',
        type: 'container',
        color: '#4da6ff',
        coords: [
            [-23.0, -43.2], [-34.0, -20.0], [-34.36, 18.47], [-20.0, 50.0],
            [-5.0, 75.0], [1.26, 103.82], [22.48, 114.06]
        ]
    },
    {
        name: 'Arctic Northern Sea Route',
        type: 'lng',
        color: '#a855f7',
        coords: [
            [59.95, 30.32], [68.0, 40.0], [72.0, 55.0], [73.0, 80.0],
            [74.0, 110.0], [72.0, 140.0], [70.0, 165.0], [65.0, 175.0],
            [55.0, 165.0], [45.0, 150.0], [35.07, 129.08]
        ]
    },
    {
        name: 'India → Middle East Trade',
        type: 'container',
        color: '#4da6ff',
        coords: [
            [19.08, 72.88], [20.0, 68.0], [22.0, 63.0], [25.01, 55.06],
            [26.57, 56.25]
        ]
    },
    {
        name: 'Mediterranean Feeder',
        type: 'container',
        color: '#4da6ff',
        coords: [
            [31.27, 32.30], [33.0, 28.0], [35.0, 25.0], [37.94, 23.64],
            [38.0, 18.0], [37.5, 15.0], [41.0, 13.0], [43.3, 5.4], [36.0, -5.5]
        ]
    },
    {
        name: 'US Gulf → Europe (Petrochemicals)',
        type: 'oil',
        color: '#ff8c00',
        coords: [
            [29.76, -95.01], [27.0, -88.0], [25.0, -80.0], [28.0, -65.0],
            [35.0, -45.0], [42.0, -25.0], [48.0, -8.0], [51.95, 4.14]
        ]
    },
    {
        name: 'North Sea Oil Routes',
        type: 'oil',
        color: '#ff8c00',
        coords: [
            [60.0, 2.0], [58.0, 1.0], [56.0, 3.0], [54.0, 7.0],
            [53.53, 9.96]
        ]
    },
    {
        name: 'East Africa → India Trade',
        type: 'container',
        color: '#4da6ff',
        coords: [
            [-6.17, 39.19], [-2.0, 43.0], [5.0, 55.0], [10.0, 63.0],
            [15.0, 68.0], [19.08, 72.88]
        ]
    },
    {
        name: 'Intra-Asia (China-ASEAN)',
        type: 'container',
        color: '#4da6ff',
        coords: [
            [31.36, 121.60], [25.0, 118.0], [22.48, 114.06], [15.0, 110.0],
            [10.0, 107.0], [5.0, 104.0], [1.26, 103.82]
        ]
    },
];

// ─── Simulated Vessel Positions ───
export const simulatedVessels = [
    { name: 'HAVEN SPIRIT', type: 'VLCC', flag: 'Liberia', lat: 25.2, lng: 57.8, heading: 135, speed: 13, cargo: 'Crude Oil', destination: 'Ningbo', dwt: '300,000' },
    { name: 'OCEAN PIONEER', type: 'VLCC', flag: 'Marshall Islands', lat: 12.1, lng: 48.5, heading: 220, speed: 12, cargo: 'Crude Oil', destination: 'Rotterdam', dwt: '320,000' },
    { name: 'PACIFIC VOYAGER', type: 'VLCC', flag: 'Panama', lat: 5.2, lng: 78.3, heading: 95, speed: 14, cargo: 'Crude Oil', destination: 'Singapore', dwt: '280,000' },
    { name: 'NORDIC STAR', type: 'Suezmax', flag: 'Norway', lat: 30.8, lng: 32.2, heading: 350, speed: 11, cargo: 'Crude Oil', destination: 'Trieste', dwt: '160,000' },
    { name: 'CASPIAN GLORY', type: 'Aframax', flag: 'Greece', lat: 40.5, lng: 28.8, heading: 210, speed: 10, cargo: 'Fuel Oil', destination: 'Augusta', dwt: '115,000' },
    { name: 'STENA SUPREME', type: 'Suezmax', flag: 'Sweden', lat: -30.2, lng: 20.5, heading: 315, speed: 13, cargo: 'Crude Oil', destination: 'Houston', dwt: '155,000' },
    { name: 'MSC OSCAR', type: 'Container', flag: 'Panama', lat: 3.5, lng: 102.5, heading: 280, speed: 18, cargo: 'Containers (18,000 TEU)', destination: 'Rotterdam', dwt: '199,000' },
    { name: 'EVER ACE', type: 'Container', flag: 'Panama', lat: 35.5, lng: 22.0, heading: 270, speed: 20, cargo: 'Containers (24,000 TEU)', destination: 'Piraeus', dwt: '235,000' },
    { name: 'COSCO UNIVERSE', type: 'Container', flag: 'Hong Kong', lat: 40.0, lng: 165.0, heading: 75, speed: 19, cargo: 'Containers (21,000 TEU)', destination: 'Los Angeles', dwt: '210,000' },
    { name: 'CMA CGM MARCO POLO', type: 'Container', flag: 'France', lat: 50.5, lng: -2.5, heading: 200, speed: 17, cargo: 'Containers (16,000 TEU)', destination: 'Le Havre', dwt: '187,000' },
    { name: 'AL KHARSAAH', type: 'LNG', flag: 'Qatar', lat: 15.3, lng: 42.8, heading: 340, speed: 16, cargo: 'LNG (174,000 m³)', destination: 'Milford Haven', dwt: '95,000' },
    { name: 'GASLOG CHELSEA', type: 'LNG', flag: 'Bermuda', lat: 36.2, lng: -3.0, heading: 285, speed: 17, cargo: 'LNG (155,000 m³)', destination: 'Isle of Grain', dwt: '82,000' },
    { name: 'VENTURE GLOBAL', type: 'LNG', flag: 'USA', lat: 28.5, lng: -88.5, heading: 160, speed: 15, cargo: 'LNG (170,000 m³)', destination: 'Incheon', dwt: '91,000' },
    { name: 'CAPE BUENOS', type: 'Bulk', flag: 'Greece', lat: -8.0, lng: 110.0, heading: 250, speed: 12, cargo: 'Iron Ore', destination: 'Qingdao', dwt: '180,000' },
    { name: 'GREAT EASTERN', type: 'Bulk', flag: 'India', lat: 20.0, lng: 67.0, heading: 90, speed: 11, cargo: 'Coal', destination: 'Mundra', dwt: '120,000' },
    { name: 'USS EISENHOWER', type: 'Military', flag: 'USA', lat: 24.5, lng: 58.2, heading: 45, speed: 25, cargo: 'CVN-69 Carrier Strike Group', destination: 'On Station', dwt: '97,000' },
    { name: 'USS BATAAN', type: 'Military', flag: 'USA', lat: 33.5, lng: 28.5, heading: 90, speed: 18, cargo: 'LHD-5 Amphibious Ready Group', destination: 'Eastern Med', dwt: '40,000' },
    { name: 'HMS QUEEN ELIZABETH', type: 'Military', flag: 'UK', lat: 58.5, lng: -3.0, heading: 180, speed: 20, cargo: 'R08 Carrier Strike Group', destination: 'Exercise', dwt: '65,000' },
    { name: 'FS CHARLES DE GAULLE', type: 'Military', flag: 'France', lat: 36.0, lng: 5.5, heading: 90, speed: 22, cargo: 'R91 Carrier Group', destination: 'Eastern Med', dwt: '42,000' },
    { name: 'CAPE ARAGO', type: 'Military', flag: 'USA', lat: 7.5, lng: 45.0, heading: 180, speed: 15, cargo: 'USNS Logistics Ship', destination: 'Djibouti', dwt: '48,000' },
];

// ─── Major Oil/Gas Pipeline Routes ───
export const pipelines = [
    {
        name: 'Druzhba Pipeline',
        type: 'oil',
        color: '#ff8c00',
        coords: [[55.75, 37.62], [53.9, 27.57], [52.23, 21.01], [51.1, 17.04], [50.08, 14.44]],
        desc: 'Largest oil pipeline network in world — Russia to Central Europe'
    },
    {
        name: 'Nord Stream Route',
        type: 'gas',
        color: '#a855f7',
        coords: [[59.95, 30.32], [59.5, 27.0], [58.5, 20.0], [55.0, 13.0], [54.1, 13.4]],
        desc: 'Offshore gas pipeline — Russia to Germany (damaged 2022)'
    },
    {
        name: 'East-West Pipeline',
        type: 'oil',
        color: '#ff8c00',
        coords: [[26.64, 50.05], [26.0, 48.0], [25.5, 44.0], [24.5, 40.0], [24.09, 38.06]],
        desc: 'Saudi Arabia — Abqaiq to Yanbu (Petroline)'
    },
    {
        name: 'BTC Pipeline',
        type: 'oil',
        color: '#ff8c00',
        coords: [[40.37, 49.89], [41.7, 44.8], [39.92, 32.85], [36.8, 35.0], [36.75, 36.2]],
        desc: 'Baku-Tbilisi-Ceyhan — Caspian oil to Mediterranean'
    },
    {
        name: 'TAP Pipeline',
        type: 'gas',
        color: '#a855f7',
        coords: [[39.5, 20.0], [40.5, 17.0], [41.0, 16.0], [41.3, 16.5]],
        desc: 'Trans-Adriatic Pipeline — Caspian gas to Italy'
    },
    {
        name: 'Trans-Alaska',
        type: 'oil',
        color: '#ff8c00',
        coords: [[70.2, -148.5], [68.0, -149.0], [65.0, -147.0], [63.5, -146.0], [61.2, -149.9], [60.55, -146.35]],
        desc: '800-mile crude oil pipeline — Prudhoe Bay to Valdez'
    },
];

// ─── Military Aircraft Callsign Patterns ───
export const militaryCallsigns = [
    'RCH',    // C-17 Globemaster (REACH)
    'DUKE',   // Special ops
    'EVAC',   // Aeromedical evacuation
    'RRR',    // Tanker/refueler
    'COBRA',  // Attack helicopter
    'HAWK',   // Fighter
    'VALOR',  // VIP transport
    'IRON',   // Strategic
    'STEEL',  // Ground attack
    'ATLAS',  // A400M
    'ASCOT',  // RAF transport
    'NAV',    // Navy
    'MARV',   // Marines
    'TOPCAT', // Catalina
    'SAM',    // Special Air Mission
    'JAKE',   // E-3 AWACS
    'TREND',  // RAF Typhoon
    'CHAOS',  // Special ops
];

// ─── Military ICAO Hex Ranges (US Military) ───
export const militaryICAO = {
    usaf: { start: 'AE0000', end: 'AFFFFF' },
    usarmy: { start: 'A00000', end: 'A3FFFF' },
    usnavy: { start: 'A80000', end: 'ABFFFF' },
};

export function isMilitaryFlight(flight) {
    // Check callsign
    const cs = (flight.callsign || '').toUpperCase();
    if (militaryCallsigns.some(p => cs.startsWith(p))) return true;

    // Check ICAO hex range (rough US military detection)
    const icao = (flight.icao || '').toUpperCase();
    if (icao >= 'AE0000' && icao <= 'AFFFFF') return true;

    // Check country for known military operators
    const country = (flight.country || '').toLowerCase();
    if (cs.startsWith('RRR') || cs.startsWith('CNV') || cs.startsWith('CFC')) return true;

    return false;
}

// ─── Conflict / Hotspot Zones ───
export const conflictZones = [
    { name: 'Ukraine Conflict Zone', lat: 48.5, lng: 37.5, radius: 300000, color: '#ff3b3b', desc: 'Active conflict zone — restricted airspace' },
    { name: 'Gaza/Israel', lat: 31.4, lng: 34.4, radius: 80000, color: '#ff3b3b', desc: 'Active conflict zone' },
    { name: 'Red Sea / Houthi Threat', lat: 14.0, lng: 42.5, radius: 200000, color: '#ff6600', desc: 'Missile/drone threat to shipping' },
    { name: 'South China Sea', lat: 15.0, lng: 114.0, radius: 400000, color: '#ffaa00', desc: 'Disputed territory — military buildup' },
    { name: 'Taiwan Strait', lat: 24.0, lng: 119.5, radius: 150000, color: '#ffaa00', desc: 'Strategic flashpoint — military tension' },
    { name: 'Korean DMZ', lat: 38.0, lng: 127.0, radius: 50000, color: '#ff6600', desc: 'Demilitarized Zone — heavy military presence' },
];

// ─── Undersea Cable Routes ───
export const underseaCables = [
    {
        name: 'Transatlantic (TAT-14)',
        type: 'fiber',
        color: '#00d4ff',
        coords: [[40.7, -74.0], [42.0, -60.0], [47.0, -35.0], [50.0, -15.0], [51.0, -5.0], [50.8, -1.1]],
        capacity: '3.2 Tbps',
        desc: 'Major transatlantic fiber optic cable'
    },
    {
        name: 'MAREA Cable',
        type: 'fiber',
        color: '#00d4ff',
        coords: [[39.5, -74.5], [40.0, -50.0], [39.5, -30.0], [38.5, -15.0], [37.2, -7.0], [36.7, -6.3]],
        capacity: '200 Tbps',
        desc: 'Microsoft/Facebook — highest capacity transatlantic cable'
    },
    {
        name: 'SEA-ME-WE 6',
        type: 'fiber',
        color: '#00d4ff',
        coords: [
            [1.26, 103.82], [5.0, 80.0], [8.0, 73.0], [12.0, 55.0],
            [12.58, 43.33], [30.46, 32.35], [33.0, 30.0], [36.0, 15.0],
            [36.7, -6.3], [43.3, -9.0], [46.0, -3.0], [50.8, -1.1]
        ],
        capacity: '100+ Tbps',
        desc: 'Southeast Asia-Middle East-Western Europe submarine cable'
    },
    {
        name: 'Pacific Crossing (PC-1)',
        type: 'fiber',
        color: '#00d4ff',
        coords: [[35.6, 139.7], [40.0, 160.0], [45.0, -175.0], [42.0, -150.0], [38.0, -125.0], [33.9, -118.4]],
        capacity: '640 Gbps',
        desc: 'Major transpacific cable — Japan to USA'
    },
    {
        name: 'WACS (West Africa)',
        type: 'fiber',
        color: '#00d4ff',
        coords: [
            [50.8, -1.1], [48.0, -7.0], [43.0, -9.0], [38.0, -9.5],
            [33.0, -8.0], [28.0, -13.0], [15.0, -17.5], [6.0, -1.5],
            [4.0, 8.0], [-6.0, 12.0], [-23.0, 14.0], [-34.0, 18.5]
        ],
        capacity: '14.5 Tbps',
        desc: 'West Africa Cable System — Europe to South Africa'
    },
    {
        name: 'South Atlantic Cable',
        type: 'fiber',
        color: '#00d4ff',
        coords: [
            [-23.0, -43.2], [-18.0, -30.0], [-10.0, -15.0], [-6.0, -5.0],
            [-2.0, 5.0], [5.5, 0.0]
        ],
        capacity: '72 Tbps',
        desc: 'EllaLink — connects Brazil to Europe via Africa'
    },
    {
        name: 'Asia-America Gateway',
        type: 'fiber',
        color: '#00d4ff',
        coords: [
            [22.3, 114.2], [18.0, 115.0], [14.0, 112.0], [10.0, 107.0],
            [1.26, 103.82], [-6.0, 107.0], [-10.0, 120.0], [-15.0, 140.0],
            [-20.0, 165.0], [-10.0, -170.0], [5.0, -150.0], [15.0, -130.0],
            [21.3, -157.8]
        ],
        capacity: '2.88 Tbps',
        desc: 'Asia-America Gateway — SE Asia to Hawaii'
    },
];

// ─── Economic Corridors ───
export const economicCorridors = [
    {
        name: 'China-Pakistan Economic Corridor (CPEC)',
        type: 'corridor',
        color: '#ffd700',
        coords: [[39.5, 76.0], [36.0, 74.0], [34.0, 72.0], [31.5, 71.5], [28.5, 68.0], [25.0, 66.9]],
        desc: '$62B China–Pakistan infrastructure corridor',
        investment: '$62 Billion'
    },
    {
        name: 'Belt & Road Overland (China-Europe Rail)',
        type: 'corridor',
        color: '#ffd700',
        coords: [
            [31.23, 121.47], [36.0, 103.8], [43.0, 87.0], [41.0, 69.0],
            [47.0, 51.0], [52.0, 45.0], [55.75, 37.62], [53.0, 28.0],
            [52.23, 21.01], [52.5, 13.4]
        ],
        desc: 'China-Europe freight rail corridor via Central Asia',
        investment: '$1+ Trillion'
    },
    {
        name: 'India-ME-Europe Corridor (INSTC)',
        type: 'corridor',
        color: '#ffd700',
        coords: [[19.08, 72.88], [25.4, 58.0], [38.0, 48.0], [41.7, 44.8], [42.0, 41.0], [41.0, 29.0]],
        desc: 'International North-South Transport Corridor',
        investment: '$25 Billion'
    },
];

// ─── Nuclear Facilities ───
export const nuclearFacilities = [
    { name: 'Natanz', country: 'Iran', lat: 33.72, lng: 51.73, type: 'Enrichment', status: 'active', desc: 'Uranium enrichment facility' },
    { name: 'Fordow', country: 'Iran', lat: 34.88, lng: 51.99, type: 'Enrichment', status: 'active', desc: 'Underground enrichment facility' },
    { name: 'Dimona', country: 'Israel', lat: 31.0, lng: 35.14, type: 'Research', status: 'active', desc: 'Nuclear research center' },
    { name: 'Yongbyon', country: 'North Korea', lat: 39.80, lng: 125.76, type: 'Reactor', status: 'active', desc: 'Nuclear weapons complex' },
    { name: 'Barakah', country: 'UAE', lat: 23.95, lng: 52.25, type: 'Power Plant', status: 'active', desc: 'First nuclear power plant in Arab world' },
    { name: 'La Hague', country: 'France', lat: 49.68, lng: -1.88, type: 'Reprocessing', status: 'active', desc: 'Nuclear fuel reprocessing plant' },
    { name: 'Sellafield', country: 'UK', lat: 54.42, lng: -3.50, type: 'Reprocessing', status: 'active', desc: 'Nuclear decommissioning site' },
    { name: 'Zaporizhzhia', country: 'Ukraine', lat: 47.51, lng: 34.59, type: 'Power Plant', status: 'at-risk', desc: 'Largest nuclear power plant in Europe — in conflict zone' },
];

// ─── OSINT Tracked Flights (for map overlay) ───
export const osintTrackedFlights = [
    {
        reg: 'N420TX',
        callsign: 'N420TX',
        aircraft: 'Gulfstream G650',
        owner: 'Private (Blocked)',
        status: 'Airborne',
        altitude: 41000,
        speed: 488,
        origin: { code: 'SJC', name: 'San Jose', lat: 37.36, lng: -121.93 },
        destination: { code: 'TEB', name: 'Teterboro', lat: 40.85, lng: -74.06 },
        currentLat: 39.5,
        currentLng: -98.0,
        path: [
            [37.36, -121.93], [37.8, -118.0], [38.2, -113.0], [38.8, -108.0],
            [39.2, -103.0], [39.5, -98.0], [39.8, -93.0], [40.1, -88.0],
            [40.4, -83.0], [40.6, -78.0], [40.85, -74.06]
        ],
        tag: 'VIP'
    },
    {
        reg: 'N502SB',
        callsign: 'SAM502',
        aircraft: 'Boeing C-32A (757-200)',
        owner: 'United States Government',
        status: 'Airborne',
        altitude: 38000,
        speed: 520,
        origin: { code: 'JBA', name: 'Joint Base Andrews', lat: 38.81, lng: -76.87 },
        destination: { code: 'RAK', name: 'Marrakech', lat: 31.61, lng: -8.04 },
        currentLat: 40.2,
        currentLng: -42.0,
        path: [
            [38.81, -76.87], [40.0, -68.0], [41.0, -55.0], [40.2, -42.0],
            [38.0, -30.0], [36.0, -18.0], [34.0, -12.0], [31.61, -8.04]
        ],
        tag: 'GOV'
    },
    {
        reg: 'TC-TRK',
        callsign: 'THY3',
        aircraft: 'Airbus A350-900',
        owner: 'Turkish Airlines',
        status: 'Airborne',
        altitude: 39000,
        speed: 510,
        origin: { code: 'IST', name: 'Istanbul', lat: 41.26, lng: 28.74 },
        destination: { code: 'JFK', name: 'New York JFK', lat: 40.64, lng: -73.78 },
        currentLat: 48.0,
        currentLng: -15.0,
        path: [
            [41.26, 28.74], [43.0, 20.0], [45.0, 10.0], [47.0, 0.0],
            [48.0, -15.0], [47.0, -30.0], [45.0, -45.0], [43.0, -58.0],
            [41.0, -68.0], [40.64, -73.78]
        ],
        tag: 'COMMERCIAL'
    },
    {
        reg: 'A6-EDA',
        callsign: 'ETD7W',
        aircraft: 'Airbus A380-800',
        owner: 'Etihad Airways',
        status: 'Airborne',
        altitude: 40000,
        speed: 530,
        origin: { code: 'AUH', name: 'Abu Dhabi', lat: 24.43, lng: 54.65 },
        destination: { code: 'LHR', name: 'London Heathrow', lat: 51.47, lng: -0.46 },
        currentLat: 42.0,
        currentLng: 25.0,
        path: [
            [24.43, 54.65], [28.0, 50.0], [32.0, 44.0], [36.0, 38.0],
            [40.0, 30.0], [42.0, 25.0], [45.0, 18.0], [48.0, 10.0],
            [50.0, 3.0], [51.47, -0.46]
        ],
        tag: 'COMMERCIAL'
    },
    {
        reg: '10+03',
        callsign: 'GAF686',
        aircraft: 'Airbus A340-300',
        owner: 'German Air Force (Flugbereitschaft)',
        status: 'Airborne',
        altitude: 37000,
        speed: 490,
        origin: { code: 'BER', name: 'Berlin Brandenburg', lat: 52.36, lng: 13.51 },
        destination: { code: 'IAD', name: 'Washington Dulles', lat: 38.94, lng: -77.46 },
        currentLat: 53.0,
        currentLng: -25.0,
        path: [
            [52.36, 13.51], [53.0, 5.0], [54.0, -5.0], [54.5, -15.0],
            [53.0, -25.0], [51.0, -38.0], [48.0, -50.0], [44.0, -62.0],
            [41.0, -72.0], [38.94, -77.46]
        ],
        tag: 'GOV'
    },
    {
        reg: 'VP-BLK',
        callsign: 'VP-BLK',
        aircraft: 'Boeing 737 BBJ',
        owner: 'Roman Abramovich (sanctioned)',
        status: 'On Ground',
        altitude: 0,
        speed: 0,
        origin: { code: 'IST', name: 'Istanbul', lat: 41.26, lng: 28.74 },
        destination: { code: 'IST', name: 'Istanbul', lat: 41.26, lng: 28.74 },
        currentLat: 41.26,
        currentLng: 28.74,
        path: [[41.26, 28.74]],
        tag: 'SANCTIONED'
    }
];

// ─── Strategic Posture / Theater Assessments ───
export const theatreAssessments = [
    { theatre: 'Persian Gulf', severity: 'CRIT', airAssets: 5, seaAssets: 8, groundTension: 'HIGH', desc: 'Iran nuclear escalation — carrier strike group deployed' },
    { theatre: 'Baltic Sea', severity: 'ELEV', airAssets: 12, seaAssets: 4, groundTension: 'MED', desc: 'NATO enhanced forward presence — Russian naval activity' },
    { theatre: 'South China Sea', severity: 'ELEV', airAssets: 8, seaAssets: 6, groundTension: 'MED', desc: 'Chinese ADIZ violations — US freedom of navigation ops' },
    { theatre: 'Eastern Med', severity: 'HIGH', airAssets: 3, seaAssets: 5, groundTension: 'HIGH', desc: 'Israel-Gaza conflict — multinational naval presence' },
    { theatre: 'Arctic', severity: 'LOW', airAssets: 2, seaAssets: 1, groundTension: 'LOW', desc: 'Ice cap monitoring — Russian northern fleet activity' },
];

