// ══════════════════════════════════════════════════════════════
// FinanceOS — Global Intelligence Map (Leaflet.js) v2
// Includes: OSINT flight tracker, undersea cables, economic
// corridors, nuclear facilities, strategic posture
// ══════════════════════════════════════════════════════════════

import {
    militaryBases, majorPorts, oilInfrastructure, chokepoints,
    shippingRoutes, simulatedVessels, pipelines, conflictZones,
    isMilitaryFlight, underseaCables, economicCorridors,
    nuclearFacilities, osintTrackedFlights, theatreAssessments
} from '../data/geoData.js';
import { countryData } from '../data/countryData.js';

let map = null;
let flightLayer = null;
let vesselLayer = null;
let initialized = false;
let layers = {
    flights: true,
    military: true,
    vessels: true,
    ports: true,
    oil: true,
    chokepoints: true,
    routes: true,
    pipelines: true,
    conflicts: true,
    earthquakes: true,
    cables: true,
    corridors: true,
    nuclear: true,
    osintFlights: true
};
let flightRefreshInterval = null;
let earthquakeLayer = null;
let cableLayer = null;
let corridorLayer = null;
let nuclearLayer = null;
let osintFlightLayer = null;
let geojsonLayer = null;
let openCountryWindows = [];

export function initMapView() {
    if (initialized) return;
    initialized = true;

    const container = document.getElementById('map-container');
    if (!container) return;

    // Initialize Leaflet map
    map = L.map(container, {
        center: [25, 40],
        zoom: 3,
        zoomControl: false,
        attributionControl: false,
        minZoom: 2,
        maxZoom: 16,
        worldCopyJump: true
    });

    // Dark map tiles (CartoDB Dark)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Zoom control positioned
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add all layers
    addConflictZones();
    addShippingRoutes();
    addPipelines();
    addUnderseaCables();
    addEconomicCorridors();
    addNuclearFacilities();
    addMilitaryBases();
    addPorts();
    addOilInfrastructure();
    addChokepoints();
    addVessels();
    addOsintTrackedFlights();
    loadCountryBoundaries();

    // Render layer controls and legend
    renderLayerControls();
    renderLegend();
    renderSidebarStats();
    renderStrategicPosture();
    renderOsintFlightPanel();

    // Fetch live flights and earthquakes
    fetchAndRenderFlights();
    fetchAndRenderEarthquakes();
    flightRefreshInterval = setInterval(fetchAndRenderFlights, 30000);
}

export function onMapVisible() {
    if (map) {
        setTimeout(() => map.invalidateSize(), 100);
    }
    if (!initialized) initMapView();
}

// ─── Custom Marker Icons ───
function makeIcon(html, size = [12, 12]) {
    return L.divIcon({ html, className: 'custom-marker', iconSize: size, iconAnchor: [size[0] / 2, size[1] / 2] });
}

function militaryBaseIcon() {
    return makeIcon('<div class="marker-military-base">★</div>', [20, 20]);
}

function portIcon() {
    return makeIcon('<div class="marker-port">⚓</div>', [16, 16]);
}

function oilIcon() {
    return makeIcon('<div class="marker-oil">●</div>', [14, 14]);
}

function chokeIcon() {
    return makeIcon('<div class="marker-choke">⬥</div>', [18, 18]);
}

function vesselIcon(type) {
    const colors = { 'VLCC': '#ff8c00', 'Suezmax': '#ff8c00', 'Aframax': '#ff8c00', 'Container': '#4da6ff', 'LNG': '#a855f7', 'Bulk': '#888', 'Military': '#ff3b3b' };
    const c = colors[type] || '#888';
    return makeIcon(`<div class="marker-vessel" style="background:${c}">▲</div>`, [14, 14]);
}

function flightIcon(isMil) {
    const c = isMil ? '#ff3b3b' : '#ffffff';
    return makeIcon(`<div class="marker-flight" style="color:${c}">✈</div>`, [12, 12]);
}

function nuclearIcon(status) {
    const c = status === 'at-risk' ? '#ff3b3b' : '#ffd700';
    return makeIcon(`<div style="color:${c}; font-size:12px; text-shadow: 0 0 6px ${c}80;">☢</div>`, [16, 16]);
}

function osintFlightIcon(tag) {
    const colors = { 'VIP': '#ffd700', 'GOV': '#ff8c00', 'COMMERCIAL': '#00d4ff', 'SANCTIONED': '#ff3b3b' };
    const c = colors[tag] || '#00d4ff';
    return makeIcon(`<div style="color:${c}; font-size:14px; text-shadow: 0 0 8px ${c}; animation: marker-pulse 1.5s ease-in-out infinite;">✈</div>`, [18, 18]);
}

// ─── Add Layers ───
function addConflictZones() {
    conflictZones.forEach(zone => {
        L.circle([zone.lat, zone.lng], {
            radius: zone.radius,
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.08,
            weight: 1,
            dashArray: '5,5',
            className: 'conflict-zone-circle'
        }).bindPopup(popupHTML('CONFLICT ZONE', zone.name, zone.desc, '#ff3b3b'))
            .addTo(map);
    });
}

function addShippingRoutes() {
    shippingRoutes.forEach(route => {
        L.polyline(route.coords, {
            color: route.color,
            weight: 1.5,
            opacity: 0.4,
            dashArray: '8,6',
            className: 'shipping-route'
        }).bindPopup(popupHTML('TRADE ROUTE', route.name, `Type: ${route.type.toUpperCase()}`, route.color))
            .addTo(map);
    });
}

function addPipelines() {
    pipelines.forEach(pipe => {
        L.polyline(pipe.coords, {
            color: pipe.color,
            weight: 3,
            opacity: 0.6,
            className: 'pipeline-line'
        }).bindPopup(popupHTML('PIPELINE', pipe.name, pipe.desc, pipe.color))
            .addTo(map);
    });
}

function addUnderseaCables() {
    cableLayer = L.layerGroup();
    underseaCables.forEach(cable => {
        L.polyline(cable.coords, {
            color: cable.color,
            weight: 1.5,
            opacity: 0.5,
            dashArray: '3,6',
            className: 'undersea-cable'
        }).bindPopup(popupHTML('UNDERSEA CABLE', cable.name, `Capacity: ${cable.capacity}<br/>${cable.desc}`, '#00d4ff'))
            .addTo(cableLayer);
    });
    if (layers.cables) cableLayer.addTo(map);
}

function addEconomicCorridors() {
    corridorLayer = L.layerGroup();
    economicCorridors.forEach(corr => {
        L.polyline(corr.coords, {
            color: corr.color,
            weight: 3,
            opacity: 0.6,
            dashArray: '12,4',
            className: 'economic-corridor'
        }).bindPopup(popupHTML('ECONOMIC CORRIDOR', corr.name,
            `Investment: ${corr.investment}<br/>${corr.desc}`, '#ffd700'))
            .addTo(corridorLayer);
    });
    if (layers.corridors) corridorLayer.addTo(map);
}

function addNuclearFacilities() {
    nuclearLayer = L.layerGroup();
    nuclearFacilities.forEach(nuc => {
        L.marker([nuc.lat, nuc.lng], { icon: nuclearIcon(nuc.status) })
            .bindPopup(popupHTML('NUCLEAR FACILITY', nuc.name,
                `Type: ${nuc.type}<br/>Country: ${nuc.country}<br/>Status: ${nuc.status.toUpperCase()}<br/>${nuc.desc}`,
                nuc.status === 'at-risk' ? '#ff3b3b' : '#ffd700'))
            .addTo(nuclearLayer);
    });
    if (layers.nuclear) nuclearLayer.addTo(map);
}

function addMilitaryBases() {
    militaryBases.forEach(base => {
        L.marker([base.lat, base.lng], { icon: militaryBaseIcon() })
            .bindPopup(popupHTML('MILITARY INSTALLATION', base.name,
                `${base.branch} — ${base.type}<br/>Country: ${base.country}<br/>${base.desc}`, '#ff3b3b'))
            .addTo(map);
    });
}

function addPorts() {
    majorPorts.forEach(port => {
        L.marker([port.lat, port.lng], { icon: portIcon() })
            .bindPopup(popupHTML('PORT', port.name,
                `${port.country}<br/>Throughput: ${port.throughput}<br/>Type: ${port.type}`, '#4da6ff'))
            .addTo(map);
    });
}

function addOilInfrastructure() {
    oilInfrastructure.forEach(oil => {
        L.marker([oil.lat, oil.lng], { icon: oilIcon() })
            .bindPopup(popupHTML('OIL/ENERGY', oil.name,
                `${oil.type} — ${oil.country}<br/>Capacity: ${oil.capacity}<br/>${oil.desc}`, '#ff8c00'))
            .addTo(map);
    });
}

function addChokepoints() {
    chokepoints.forEach(cp => {
        const riskColors = { high: '#ff3b3b', medium: '#ff8c00', low: '#ffd700' };
        L.marker([cp.lat, cp.lng], { icon: chokeIcon() })
            .bindPopup(popupHTML('CHOKEPOINT', cp.name,
                `Flow: ${cp.flow}<br/>Risk: ${cp.risk.toUpperCase()}<br/>${cp.desc}`,
                riskColors[cp.risk] || '#ffd700'))
            .addTo(map);
    });
}

function addVessels() {
    vesselLayer = L.layerGroup();
    simulatedVessels.forEach(v => {
        const icon = vesselIcon(v.type);
        L.marker([v.lat, v.lng], { icon, rotationAngle: v.heading })
            .bindPopup(popupHTML('VESSEL', v.name,
                `Type: ${v.type} | Flag: ${v.flag}<br/>Speed: ${v.speed} kts | Heading: ${v.heading}°<br/>Cargo: ${v.cargo}<br/>Dest: ${v.destination} | DWT: ${v.dwt}`,
                v.type === 'Military' ? '#ff3b3b' : '#4da6ff'))
            .addTo(vesselLayer);
    });
    vesselLayer.addTo(map);
}

// ─── OSINT Tracked Flights on Map ───
function addOsintTrackedFlights() {
    osintFlightLayer = L.layerGroup();

    osintTrackedFlights.forEach(flight => {
        if (flight.status === 'On Ground' && flight.path.length <= 1) {
            // Ground marker only
            L.marker([flight.currentLat, flight.currentLng], { icon: osintFlightIcon(flight.tag) })
                .bindPopup(popupHTML('TRACKED AIRCRAFT', `${flight.reg} — ${flight.aircraft}`,
                    `Owner: ${flight.owner}<br/>Status: <span style="color:#ff8c00">${flight.status}</span><br/>Location: ${flight.origin.name} (${flight.origin.code})<br/>Tag: <span style="color:#ff3b3b;font-weight:700">${flight.tag}</span>`,
                    '#ff3b3b'))
                .addTo(osintFlightLayer);
            return;
        }

        // Flight path polyline
        const tagColors = { 'VIP': '#ffd700', 'GOV': '#ff8c00', 'COMMERCIAL': '#00d4ff', 'SANCTIONED': '#ff3b3b' };
        const pathColor = tagColors[flight.tag] || '#00d4ff';

        // Draw the completed path (solid)
        const completedPathIdx = flight.path.findIndex(p => p[0] === flight.currentLat && p[1] === flight.currentLng);
        const completedPath = flight.path.slice(0, completedPathIdx + 1);
        const remainingPath = flight.path.slice(completedPathIdx);

        if (completedPath.length > 1) {
            L.polyline(completedPath, {
                color: pathColor,
                weight: 2,
                opacity: 0.7,
            }).addTo(osintFlightLayer);
        }

        // Draw the remaining path (dashed)
        if (remainingPath.length > 1) {
            L.polyline(remainingPath, {
                color: pathColor,
                weight: 1.5,
                opacity: 0.35,
                dashArray: '6,6'
            }).addTo(osintFlightLayer);
        }

        // Origin airport marker
        L.circleMarker([flight.origin.lat, flight.origin.lng], {
            radius: 4, color: pathColor, fillColor: pathColor, fillOpacity: 0.8, weight: 1
        }).bindPopup(popupHTML('ORIGIN', flight.origin.code,
            `${flight.origin.name}`, pathColor)).addTo(osintFlightLayer);

        // Destination airport marker
        L.circleMarker([flight.destination.lat, flight.destination.lng], {
            radius: 4, color: pathColor, fillColor: '#000', fillOpacity: 1, weight: 2
        }).bindPopup(popupHTML('DESTINATION', flight.destination.code,
            `${flight.destination.name}`, pathColor)).addTo(osintFlightLayer);

        // Current aircraft position
        L.marker([flight.currentLat, flight.currentLng], { icon: osintFlightIcon(flight.tag) })
            .bindPopup(popupHTML('TRACKED AIRCRAFT', `${flight.reg} — ${flight.aircraft}`,
                `Owner: ${flight.owner}<br/>Callsign: ${flight.callsign}<br/>Alt: ${flight.altitude.toLocaleString()} ft | Speed: ${flight.speed} kts<br/>${flight.origin.code} → ${flight.destination.code}<br/>Tag: <span style="color:${pathColor};font-weight:700">${flight.tag}</span>`,
                pathColor))
            .addTo(osintFlightLayer);
    });

    if (layers.osintFlights) osintFlightLayer.addTo(map);
}

// ─── OSINT Flight Search Panel ───
function renderOsintFlightPanel() {
    const sidebar = document.getElementById('map-feed');
    if (!sidebar) return;

    // We prepend the OSINT panel above the intel feed
    const panelHTML = `
    <div class="feed-header" style="background:rgba(255,140,0,0.08); color:#ff8c00; display:flex; align-items:center; gap:6px;">
      ✈ OSINT FLIGHT TRACKER
    </div>
    <div style="padding:8px 12px;">
      <div style="display:flex; gap:4px; margin-bottom:8px;">
        <input type="text" id="osint-flight-search" placeholder="Enter REG (e.g. N420TX)" 
          style="flex:1; background:#0a0a0a; border:1px solid #333; color:#fff; font-family:var(--font-mono); font-size:10px; padding:4px 6px; outline:none; border-radius:2px;" />
        <button id="osint-flight-track-btn" 
          style="background:#ff8c00; color:#000; border:none; font-family:var(--font-mono); font-size:9px; font-weight:700; padding:4px 8px; cursor:pointer; border-radius:2px; letter-spacing:0.5px;">TRACK</button>
      </div>
      <div id="osint-flight-result" style="font-size:10px;"></div>
      <div style="display:flex; flex-wrap:wrap; gap:3px; margin-top:4px;">
        ${osintTrackedFlights.map(f => `<span class="osint-quick-tag" data-reg="${f.reg}" 
          style="font-size:8px; padding:1px 4px; border:1px solid ${f.tag === 'GOV' ? '#ff8c00' : f.tag === 'VIP' ? '#ffd700' : f.tag === 'SANCTIONED' ? '#ff3b3b' : '#00d4ff'}; 
          color:${f.tag === 'GOV' ? '#ff8c00' : f.tag === 'VIP' ? '#ffd700' : f.tag === 'SANCTIONED' ? '#ff3b3b' : '#00d4ff'}; 
          cursor:pointer; border-radius:1px;">${f.reg}</span>`).join('')}
      </div>
    </div>
  `;

    // Insert before existing content
    const existingContent = sidebar.innerHTML;
    sidebar.innerHTML = panelHTML + existingContent;

    // Bind search
    const searchInput = document.getElementById('osint-flight-search');
    const trackBtn = document.getElementById('osint-flight-track-btn');
    const resultDiv = document.getElementById('osint-flight-result');

    function trackFlight(reg) {
        const flight = osintTrackedFlights.find(f => f.reg.toUpperCase() === reg.toUpperCase());
        if (!flight) {
            resultDiv.innerHTML = `<span style="color:#ff3b3b;">✕ No tracking data for "${reg}"</span>`;
            return;
        }

        const tagColors = { 'VIP': '#ffd700', 'GOV': '#ff8c00', 'COMMERCIAL': '#00d4ff', 'SANCTIONED': '#ff3b3b' };
        const c = tagColors[flight.tag] || '#00d4ff';

        resultDiv.innerHTML = `
        <div style="border-left:2px solid ${c}; padding-left:6px; margin-bottom:4px;">
          <div style="color:${c}; font-weight:700; font-size:11px;">${flight.aircraft}</div>
          <div style="color:#888; font-size:9px;">${flight.owner}</div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:2px; font-size:9px;">
          <span style="color:#888;">Status</span><span style="color:${flight.status === 'Airborne' ? '#00d26a' : '#ff8c00'}; text-align:right;">${flight.status}</span>
          <span style="color:#888;">Altitude</span><span style="text-align:right;">${flight.altitude.toLocaleString()} ft</span>
          <span style="color:#888;">Speed</span><span style="text-align:right;">${flight.speed} kts</span>
          <span style="color:#888;">Route</span><span style="text-align:right;">${flight.origin.code} → ${flight.destination.code}</span>
          <span style="color:#888;">Tag</span><span style="color:${c}; font-weight:700; text-align:right;">${flight.tag}</span>
        </div>
      `;

        // Zoom to flight on map
        if (map) {
            map.flyTo([flight.currentLat, flight.currentLng], 5, { duration: 1.5 });
        }
    }

    trackBtn.addEventListener('click', () => {
        const val = searchInput.value.trim();
        if (val) trackFlight(val);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = searchInput.value.trim();
            if (val) trackFlight(val);
        }
    });

    // Quick tag buttons
    sidebar.querySelectorAll('.osint-quick-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            searchInput.value = tag.dataset.reg;
            trackFlight(tag.dataset.reg);
        });
    });
}

// ─── Strategic Posture Panel ───
function renderStrategicPosture() {
    const infoPanel = document.getElementById('map-info-panel');
    if (!infoPanel) return;

    const severityColors = { CRIT: '#ff3b3b', HIGH: '#ff6600', ELEV: '#ff8c00', LOW: '#00d26a' };

    // DEFCON indicator
    const defconLevel = 3;
    const defconColors = { 1: '#ff3b3b', 2: '#ff6600', 3: '#ff8c00', 4: '#ffd700', 5: '#00d26a' };

    infoPanel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <div style="font-size:9px; color:#888; letter-spacing:1px;">GLOBAL STATUS</div>
      <div style="display:flex; align-items:center; gap:4px;">
        <span style="font-size:8px; color:#888;">DEFCON</span>
        <span style="background:${defconColors[defconLevel]}; color:#000; font-size:10px; font-weight:800; padding:1px 6px; border-radius:2px;">${defconLevel}</span>
      </div>
    </div>
    
    <div class="info-summary">
      <div class="info-row"><span class="info-label">Military Bases:</span><span class="info-value">${militaryBases.length}</span></div>
      <div class="info-row"><span class="info-label">Ports Tracked:</span><span class="info-value">${majorPorts.length}</span></div>
      <div class="info-row"><span class="info-label">Oil Terminals:</span><span class="info-value">${oilInfrastructure.length}</span></div>
      <div class="info-row"><span class="info-label">Chokepoints:</span><span class="info-value">${chokepoints.length}</span></div>
      <div class="info-row"><span class="info-label">Vessels Tracked:</span><span class="info-value">${simulatedVessels.length}</span></div>
      <div class="info-row"><span class="info-label">Pipelines:</span><span class="info-value">${pipelines.length}</span></div>
      <div class="info-row"><span class="info-label">Undersea Cables:</span><span class="info-value" style="color:#00d4ff">${underseaCables.length}</span></div>
      <div class="info-row"><span class="info-label">Nuclear Sites:</span><span class="info-value" style="color:#ffd700">${nuclearFacilities.length}</span></div>
      <div class="info-row"><span class="info-label">Tracked Aircraft:</span><span class="info-value" style="color:#ff8c00">${osintTrackedFlights.length}</span></div>
      <div class="info-row"><span class="info-label">Conflict Zones:</span><span class="info-value">${conflictZones.length}</span></div>
      <div class="info-row"><span class="info-label">Data Source:</span><span class="info-value" style="color:#00d26a">OpenSky + AIS SIM</span></div>
    </div>

    <div style="border-top:1px solid #222; margin-top:6px; padding-top:6px;">
      <div style="font-size:8px; color:#ff8c00; letter-spacing:1px; margin-bottom:4px; font-weight:700;">STRATEGIC POSTURE</div>
      ${theatreAssessments.map(t => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:3px 0; border-bottom:1px solid rgba(255,255,255,0.03); font-size:9px;">
          <span style="color:#ccc; min-width:80px;">${t.theatre}</span>
          <span style="color:${severityColors[t.severity]}; font-weight:700; font-size:8px; min-width:32px; text-align:center;">${t.severity}</span>
          <span style="color:#888; font-size:8px;">✈${t.airAssets} ⚓${t.seaAssets}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── Live Flights ───
async function fetchAndRenderFlights() {
    try {
        const resp = await fetch('/api/flights');
        const data = await resp.json();

        if (data.mock || !data.flights) {
            renderMockFlights();
            updateFlightStats(0, 0);
            return;
        }

        // Remove old flight layer
        if (flightLayer) map.removeLayer(flightLayer);
        flightLayer = L.layerGroup();

        let milCount = 0;
        let civCount = 0;

        data.flights.forEach(f => {
            if (!f.lat || !f.lng) return;
            const isMil = isMilitaryFlight(f);
            if (isMil) milCount++; else civCount++;

            const icon = flightIcon(isMil);
            const popupType = isMil ? 'MILITARY AIRCRAFT' : 'AIRCRAFT';
            const color = isMil ? '#ff3b3b' : '#e0e0e0';

            L.marker([f.lat, f.lng], { icon })
                .bindPopup(popupHTML(popupType, f.callsign || f.icao,
                    `Country: ${f.country}<br/>Alt: ${f.altitude ? f.altitude + 'm' : 'N/A'}<br/>Speed: ${f.speed ? f.speed + ' km/h' : 'N/A'}<br/>Heading: ${f.heading || 'N/A'}°`,
                    color))
                .addTo(flightLayer);
        });

        flightLayer.addTo(map);
        updateFlightStats(civCount, milCount);

        // Update sidebar feed
        updateIntelFeed(data);
    } catch (e) {
        console.warn('[MAP] Flight fetch failed:', e);
        renderMockFlights();
    }
}

// ─── Live Earthquakes (USGS) ───
async function fetchAndRenderEarthquakes() {
    try {
        const resp = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson');
        const data = await resp.json();

        if (earthquakeLayer) map.removeLayer(earthquakeLayer);
        earthquakeLayer = L.layerGroup();

        data.features.forEach(eq => {
            const coords = eq.geometry.coordinates;
            const mag = eq.properties.mag;
            const place = eq.properties.place;
            const time = new Date(eq.properties.time).toLocaleString();

            const radius = Math.max(mag * 30000, 50000);
            const color = mag > 6 ? '#ff3b3b' : '#ff8c00';

            L.circle([coords[1], coords[0]], {
                radius: radius,
                color: color,
                fillColor: color,
                fillOpacity: 0.3,
                weight: 1,
                className: 'earthquake-circle'
            }).bindPopup(popupHTML('SEISMIC ACTIVITY', place, `Magnitude: ${mag}<br/>Time: ${time}<br/>Depth: ${coords[2]} km`, color))
                .addTo(earthquakeLayer);
        });

        if (layers.earthquakes) earthquakeLayer.addTo(map);
    } catch (err) {
        console.warn('[MAP] Failed to fetch USGS earthquake data', err);
    }
}

function renderMockFlights() {
    if (flightLayer) map.removeLayer(flightLayer);
    flightLayer = L.layerGroup();

    const mockFlights = [
        { lat: 51.5, lng: -0.1, callsign: 'BAW123', country: 'United Kingdom', altitude: 11000, speed: 850, heading: 180 },
        { lat: 48.8, lng: 2.3, callsign: 'AFR456', country: 'France', altitude: 10500, speed: 820, heading: 90 },
        { lat: 40.7, lng: -74.0, callsign: 'DAL789', country: 'United States', altitude: 12000, speed: 900, heading: 270 },
        { lat: 35.6, lng: 139.7, callsign: 'ANA321', country: 'Japan', altitude: 10000, speed: 800, heading: 45 },
        { lat: 25.3, lng: 55.3, callsign: 'UAE555', country: 'United Arab Emirates', altitude: 11500, speed: 870, heading: 310 },
        { lat: 33.9, lng: -118.4, callsign: 'UAL101', country: 'United States', altitude: 10800, speed: 830, heading: 90 },
        { lat: 55.7, lng: 37.6, callsign: 'AFL777', country: 'Russia', altitude: 11000, speed: 850, heading: 260 },
        { lat: 1.3, lng: 103.8, callsign: 'SIA888', country: 'Singapore', altitude: 12000, speed: 890, heading: 340 },
        { lat: 52.3, lng: 4.8, callsign: 'KLM654', country: 'Netherlands', altitude: 10200, speed: 810, heading: 180 },
        { lat: 22.3, lng: 114.2, callsign: 'CPA222', country: 'Hong Kong', altitude: 9500, speed: 780, heading: 45 },
        { lat: 24.5, lng: 58.5, callsign: 'RCH401', country: 'United States', altitude: 9000, speed: 700, heading: 270, military: true },
        { lat: 38.5, lng: 35.0, callsign: 'RRR505', country: 'United States', altitude: 10000, speed: 600, heading: 90, military: true },
        { lat: 54.0, lng: -2.0, callsign: 'ASCOT01', country: 'United Kingdom', altitude: 8000, speed: 650, heading: 180, military: true },
    ];

    let milCount = 0, civCount = 0;

    mockFlights.forEach(f => {
        const isMil = f.military || isMilitaryFlight(f);
        if (isMil) milCount++; else civCount++;
        const icon = flightIcon(isMil);
        L.marker([f.lat, f.lng], { icon })
            .bindPopup(popupHTML(isMil ? 'MILITARY AIRCRAFT' : 'AIRCRAFT', f.callsign,
                `Country: ${f.country}<br/>Alt: ${f.altitude}m<br/>Speed: ${f.speed} km/h<br/>Heading: ${f.heading}°`,
                isMil ? '#ff3b3b' : '#e0e0e0'))
            .addTo(flightLayer);
    });

    flightLayer.addTo(map);
    updateFlightStats(civCount, milCount);
}

function updateFlightStats(civ, mil) {
    const el = document.getElementById('map-stats');
    if (!el) return;
    el.innerHTML = `
    <div class="map-stat-grid">
      <div class="map-stat-item">
        <span class="map-stat-value" style="color:#4da6ff">${civ}</span>
        <span class="map-stat-label">CIV FLIGHTS</span>
      </div>
      <div class="map-stat-item">
        <span class="map-stat-value" style="color:#ff3b3b">${mil}</span>
        <span class="map-stat-label">MIL FLIGHTS</span>
      </div>
      <div class="map-stat-item">
        <span class="map-stat-value" style="color:#ff8c00">${simulatedVessels.filter(v => v.type !== 'Military').length}</span>
        <span class="map-stat-label">VESSELS</span>
      </div>
      <div class="map-stat-item">
        <span class="map-stat-value" style="color:#ff3b3b">${simulatedVessels.filter(v => v.type === 'Military').length}</span>
        <span class="map-stat-label">NAVAL</span>
      </div>
      <div class="map-stat-item">
        <span class="map-stat-value" style="color:#ffd700">${chokepoints.length}</span>
        <span class="map-stat-label">CHOKEPOINTS</span>
      </div>
      <div class="map-stat-item">
        <span class="map-stat-value" style="color:#00d26a">${majorPorts.length}</span>
        <span class="map-stat-label">PORTS</span>
      </div>
    </div>
  `;
}

function updateIntelFeed(data) {
    const el = document.getElementById('map-feed');
    if (!el) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    const items = [
        { time: timeStr, text: `Flight data updated — ${data.flights?.length || 0} aircraft tracked`, type: 'system' },
        { time: timeStr, text: `OpenSky API — ${data.total || 0} total aircraft in database`, type: 'info' },
    ];

    const intel = [
        { text: 'USS EISENHOWER CSG operating in Gulf of Oman — 3 escorts detected', type: 'military' },
        { text: 'Increased tanker traffic through Strait of Hormuz — +12% week-over-week', type: 'oil' },
        { text: 'Container vessel congestion at Port of Singapore — avg wait 18h', type: 'shipping' },
        { text: 'Russian naval activity detected near GIUK Gap — 2 submarines transiting', type: 'military' },
        { text: 'LNG spot price surge — Qatar ramping exports to Europe', type: 'energy' },
        { text: 'Houthi missile threat: Bab el-Mandeb risk level ELEVATED', type: 'alert' },
        { text: 'Chinese military drills near Taiwan — ADIZ violations reported', type: 'military' },
        { text: 'Suez Canal transit delays — northbound queue at 24 vessels', type: 'shipping' },
        { text: 'SEA-ME-WE 6 cable: maintenance window scheduled — partial capacity', type: 'info' },
        { text: 'CPEC corridor: new rail terminal operational at Gwadar', type: 'shipping' },
    ];

    // Keep OSINT panel if it exists
    const osintPanel = el.querySelector('.feed-header[style*="ff8c00"]');
    const osintContent = osintPanel ? osintPanel.parentElement : null;
    let osintHTML = '';
    if (osintContent) {
        // Find the OSINT tracker section (header + next sibling)
        const headerEl = el.querySelector('.feed-header[style*="ff8c00"]');
        if (headerEl) {
            const nextSib = headerEl.nextElementSibling;
            osintHTML = headerEl.outerHTML + (nextSib ? nextSib.outerHTML : '');
        }
    }

    el.innerHTML = `
    ${osintHTML}
    <div class="feed-header">INTEL FEED</div>
    ${items.concat(intel).map(item => `
      <div class="feed-item feed-${item.type}">
        <span class="feed-time">${item.time || '--:--:--'}</span>
        <span class="feed-text">${item.text}</span>
      </div>
    `).join('')}
  `;
}

// ─── Layer Controls ───
function renderLayerControls() {
    const el = document.getElementById('map-layer-controls');
    if (!el) return;

    const layerDefs = [
        { id: 'flights', label: 'Live Flights', icon: '✈', color: '#e0e0e0' },
        { id: 'osintFlights', label: 'OSINT Tracked', icon: '✈', color: '#ffd700' },
        { id: 'military', label: 'Military Bases', icon: '★', color: '#ff3b3b' },
        { id: 'vessels', label: 'Vessels / AIS', icon: '▲', color: '#4da6ff' },
        { id: 'ports', label: 'Ports', icon: '⚓', color: '#00d26a' },
        { id: 'oil', label: 'Oil Infrastructure', icon: '●', color: '#ff8c00' },
        { id: 'chokepoints', label: 'Chokepoints', icon: '⬥', color: '#ffd700' },
        { id: 'routes', label: 'Trade Routes', icon: '─', color: '#4da6ff' },
        { id: 'pipelines', label: 'Pipelines', icon: '═', color: '#a855f7' },
        { id: 'cables', label: 'Undersea Cables', icon: '⌁', color: '#00d4ff' },
        { id: 'corridors', label: 'Economic Corridors', icon: '◆', color: '#ffd700' },
        { id: 'nuclear', label: 'Nuclear Sites', icon: '☢', color: '#ffd700' },
        { id: 'conflicts', label: 'Conflict Zones', icon: '◌', color: '#ff3b3b' },
        { id: 'earthquakes', label: 'Seismic Activity', icon: '◎', color: '#ff8c00' },
    ];

    el.innerHTML = `
    <div class="layer-controls-header">
      <span class="panel-tag">LAYERS</span>
    </div>
    ${layerDefs.map(l => `
      <label class="layer-toggle" data-layer="${l.id}">
        <input type="checkbox" ${layers[l.id] ? 'checked' : ''} />
        <span class="layer-icon" style="color:${l.color}">${l.icon}</span>
        <span class="layer-label">${l.label}</span>
      </label>
    `).join('')}
  `;

    const layerMap = {
        earthquakes: () => earthquakeLayer,
        cables: () => cableLayer,
        corridors: () => corridorLayer,
        nuclear: () => nuclearLayer,
        osintFlights: () => osintFlightLayer,
    };

    el.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            const layerId = cb.closest('.layer-toggle').dataset.layer;
            layers[layerId] = cb.checked;

            const getLayer = layerMap[layerId];
            if (getLayer) {
                const layer = getLayer();
                if (layer) {
                    if (layers[layerId]) layer.addTo(map);
                    else map.removeLayer(layer);
                }
            }
        });
    });
}

function renderLegend() {
    const el = document.getElementById('map-legend');
    if (!el) return;

    el.innerHTML = `
    <div class="legend-items">
      <span class="legend-item"><span class="legend-dot" style="background:#ff3b3b"></span> Military</span>
      <span class="legend-item"><span class="legend-dot" style="background:#ff8c00"></span> Oil/Energy</span>
      <span class="legend-item"><span class="legend-dot" style="background:#4da6ff"></span> Shipping</span>
      <span class="legend-item"><span class="legend-dot" style="background:#a855f7"></span> Gas/LNG</span>
      <span class="legend-item"><span class="legend-dot" style="background:#00d4ff"></span> Cables</span>
      <span class="legend-item"><span class="legend-dot" style="background:#ffd700"></span> Corridors</span>
      <span class="legend-item"><span class="legend-dot" style="background:#00d26a"></span> Port</span>
      <span class="legend-item"><span class="legend-dot" style="background:#e0e0e0"></span> Civilian</span>
    </div>
  `;
}

function renderSidebarStats() {
    updateFlightStats(0, 0);
    updateIntelFeed({ flights: [], total: 0 });
}

// ─── Popup Builder ───
function popupHTML(type, title, body, color = '#ff8c00') {
    return `
    <div class="map-popup">
      <div class="map-popup-tag" style="background:${color}">${type}</div>
      <div class="map-popup-title">${title}</div>
      <div class="map-popup-body">${body}</div>
    </div>
  `;
}

// ─── GeoJSON Country Boundaries ───
async function loadCountryBoundaries() {
    try {
        const resp = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
        const geojson = await resp.json();

        geojsonLayer = L.geoJSON(geojson, {
            style: () => ({
                color: 'transparent',
                fillColor: 'transparent',
                fillOpacity: 0,
                weight: 0
            }),
            onEachFeature: (feature, layer) => {
                const name = feature.properties.ADMIN || feature.properties.name;

                layer.on('mouseover', () => {
                    layer.setStyle({
                        color: '#ff8c00',
                        fillColor: '#ff8c00',
                        fillOpacity: 0.06,
                        weight: 1
                    });
                });

                layer.on('mouseout', () => {
                    layer.setStyle({
                        color: 'transparent',
                        fillColor: 'transparent',
                        fillOpacity: 0,
                        weight: 0
                    });
                });

                layer.on('click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    const data = countryData[name];
                    if (data) {
                        createCountryIntelWindow(name, data, e.latlng);
                    } else {
                        // Show basic popup for countries without detailed data
                        layer.bindPopup(popupHTML('COUNTRY', name,
                            'Detailed intelligence not yet available.<br/>Click a major country for full geopolitical profile.',
                            '#666')).openPopup();
                    }
                });
            }
        }).addTo(map);
    } catch (err) {
        console.warn('[MAP] Failed to load country boundaries:', err);
    }
}

// ─── Draggable Country Intelligence Window ───
function createCountryIntelWindow(countryName, data, latlng) {
    // Don't open duplicate windows
    if (openCountryWindows.includes(countryName)) return;
    openCountryWindows.push(countryName);

    const windowId = 'geo-window-' + data.code;
    const container = document.getElementById('map-container');
    if (!container) return;

    const win = document.createElement('div');
    win.id = windowId;
    win.className = 'geo-intel-window';

    // Position slightly offset from map center
    const offset = openCountryWindows.length * 25;
    win.style.left = (100 + offset) + 'px';
    win.style.top = (80 + offset) + 'px';

    const riskColors = { LOW: '#00d26a', MED: '#ff8c00', HIGH: '#ff3b3b', CRIT: '#ff3b3b' };
    const p = data.politics;
    const g = data.geopolitics;
    const e = data.economy;
    const r = data.risk;

    // Alignment bar position
    const alignPos = g.alignment;
    const trendArrow = g.alignmentTrend === 'east' ? '← East' : g.alignmentTrend === 'west' ? 'West →' : '━ Stable';
    const trendColor = g.alignmentTrend === 'east' ? '#ff3b3b' : g.alignmentTrend === 'west' ? '#4da6ff' : '#888';

    win.innerHTML = `
    <div class="geo-window-header" id="${windowId}-header">
      <div class="geo-window-title">
        <span class="geo-flag">${data.flag}</span>
        <span class="geo-country-name">${countryName.toUpperCase()}</span>
        <span class="geo-country-code">${data.code}</span>
      </div>
      <div class="geo-window-controls">
        <button class="geo-minimize" title="Minimize">─</button>
        <button class="geo-close" title="Close">✕</button>
      </div>
    </div>

    <!-- Risk Badge -->
    <div class="geo-risk-badge" style="background:${riskColors[r.overallRisk]}20; border-left:3px solid ${riskColors[r.overallRisk]};">
      <span style="color:${riskColors[r.overallRisk]}; font-weight:800; font-size:10px;">${r.overallRisk} RISK</span>
      <span style="color:#888; font-size:8px;">Stability: ${r.stability}/10 | Conflict: ${r.conflictLevel}</span>
    </div>

    <!-- Tabs -->
    <div class="geo-tabs">
      <button class="geo-tab active" data-tab="pol">POL</button>
      <button class="geo-tab" data-tab="geo">GEO</button>
      <button class="geo-tab" data-tab="econ">ECON</button>
      <button class="geo-tab" data-tab="risk">RISK</button>
    </div>

    <!-- POL tab -->
    <div class="geo-tab-content active" data-tab="pol">
      <div class="geo-section-header">POLITICAL STRUCTURE</div>
      <div class="geo-row"><span class="geo-label">${p.title}</span><span class="geo-value">${p.headOfState}</span></div>
      <div class="geo-row"><span class="geo-label">Party</span><span class="geo-value" style="color:#ff8c00">${p.party}</span></div>
      <div class="geo-row"><span class="geo-label">Ideology</span><span class="geo-value">${p.ideology}</span></div>
      <div class="geo-row"><span class="geo-label">Gov Type</span><span class="geo-value">${p.govType}</span></div>
      <div class="geo-divider"></div>
      <div class="geo-section-header">ELECTIONS</div>
      <div class="geo-row"><span class="geo-label">Last Election</span><span class="geo-value">${p.lastElection}</span></div>
      <div class="geo-row"><span class="geo-label">Result</span><span class="geo-value" style="font-size:8px">${p.result}</span></div>
      <div class="geo-row"><span class="geo-label">Next Election</span><span class="geo-value" style="color:#ff8c00">${p.nextElection}</span></div>
      <div class="geo-row"><span class="geo-label">Opposition</span><span class="geo-value">${p.opposition}</span></div>
      <div class="geo-divider"></div>
      <div class="geo-section-header">PARLIAMENT</div>
      <div class="geo-parliament">
        <div class="geo-parl-bar">
          <div class="geo-parl-fill ruling" style="width:${p.parliament.ruling}%">${p.parliament.ruling}%</div>
          <div class="geo-parl-fill opposition" style="width:${p.parliament.opposition}%">${p.parliament.opposition}%</div>
        </div>
        <div class="geo-parl-legend"><span style="color:#ff8c00">■ Ruling</span><span style="color:#4da6ff">■ Opposition</span></div>
      </div>
      <div class="geo-divider"></div>
      <div class="geo-row"><span class="geo-label">Democracy Index</span><span class="geo-value">${p.democracyIndex}/10</span></div>
      <div class="geo-row"><span class="geo-label">Freedom House</span><span class="geo-value">${p.freedomHouse}/100</span></div>
    </div>

    <!-- GEO tab -->
    <div class="geo-tab-content" data-tab="geo">
      <div class="geo-section-header">ALIGNMENT SPECTRUM</div>
      <div class="geo-alignment">
        <div class="geo-align-labels"><span style="color:#ff3b3b">EAST</span><span style="color:#888">NEUTRAL</span><span style="color:#4da6ff">WEST</span></div>
        <div class="geo-align-bar">
          <div class="geo-align-marker" style="left:${alignPos}%"></div>
        </div>
        <div style="text-align:center; margin-top:2px; font-size:8px; color:${trendColor}">${trendArrow}</div>
      </div>
      <div class="geo-divider"></div>
      <div class="geo-section-header">ALLIANCES & MEMBERSHIPS</div>
      <div class="geo-tags">${g.alliances.map(a => `<span class="geo-alliance-tag">${a}</span>`).join('')}</div>
      <div class="geo-divider"></div>
      <div class="geo-section-header">KEY ALLIES</div>
      <div class="geo-tags">${g.allies.map(a => `<span class="geo-ally-tag">${a}</span>`).join('')}</div>
      <div class="geo-section-header">ADVERSARIES</div>
      <div class="geo-tags">${g.adversaries.map(a => `<span class="geo-adversary-tag">${a}</span>`).join('')}</div>
      <div class="geo-divider"></div>
      <div class="geo-row"><span class="geo-label">Nuclear Status</span><span class="geo-value" style="color:${g.nuclearStatus.includes('Armed') ? '#ff3b3b' : g.nuclearStatus.includes('Threshold') ? '#ff8c00' : '#888'}; font-size:8px">${g.nuclearStatus}</span></div>
      <div class="geo-row"><span class="geo-label">Sanctions</span><span class="geo-value" style="color:${g.sanctions.includes('Heavy') ? '#ff3b3b' : g.sanctions.includes('Partial') ? '#ff8c00' : '#888'}">${g.sanctions}</span></div>
      <div class="geo-divider"></div>
      <div class="geo-section-header">UN VOTING ALIGNMENT</div>
      <div class="geo-un-votes">
        <div class="geo-un-row"><span>🇺🇸 US</span><div class="geo-un-bar"><div style="width:${g.unVoting.us}%; background:#4da6ff"></div></div><span>${g.unVoting.us}%</span></div>
        <div class="geo-un-row"><span>🇨🇳 CN</span><div class="geo-un-bar"><div style="width:${g.unVoting.china}%; background:#ff3b3b"></div></div><span>${g.unVoting.china}%</span></div>
        <div class="geo-un-row"><span>🇷🇺 RU</span><div class="geo-un-bar"><div style="width:${g.unVoting.russia}%; background:#ff8c00"></div></div><span>${g.unVoting.russia}%</span></div>
      </div>
      <div class="geo-divider"></div>
      <div class="geo-section-header">DISPUTES & FLASHPOINTS</div>
      <div style="font-size:8px; color:#ccc; line-height:1.4;">
        ${g.disputes.map(d => `<div style="padding:1px 0;">• ${d}</div>`).join('')}
      </div>
    </div>

    <!-- ECON tab -->
    <div class="geo-tab-content" data-tab="econ">
      <div class="geo-section-header">ECONOMIC OVERVIEW</div>
      <div class="geo-row"><span class="geo-label">GDP</span><span class="geo-value" style="color:#00d26a">${e.gdp}</span></div>
      <div class="geo-row"><span class="geo-label">GDP per Capita</span><span class="geo-value">${e.gdpPerCapita}</span></div>
      <div class="geo-row"><span class="geo-label">Trade Balance</span><span class="geo-value" style="color:${e.tradeBalance.includes('+') ? '#00d26a' : '#ff3b3b'}; font-size:8px">${e.tradeBalance}</span></div>
      <div class="geo-row"><span class="geo-label">Currency</span><span class="geo-value">${e.currency}</span></div>
      <div class="geo-row"><span class="geo-label">Central Bank Rate</span><span class="geo-value" style="color:#ff8c00">${e.centralBankRate}</span></div>
      <div class="geo-row"><span class="geo-label">Debt/GDP</span><span class="geo-value">${e.debtToGdp}</span></div>
      <div class="geo-row"><span class="geo-label">Credit Rating</span><span class="geo-value">${e.creditRating}</span></div>
      <div class="geo-divider"></div>
      <div class="geo-section-header">TOP EXPORT PARTNERS</div>
      ${e.topExports.map(p => `
        <div class="geo-trade-row">
          <span class="geo-trade-name">${p.partner}</span>
          <div class="geo-trade-bar"><div style="width:${p.pct * 2}%; background:#00d26a"></div></div>
          <span class="geo-trade-pct">${p.pct}%</span>
        </div>
      `).join('')}
      <div class="geo-section-header">TOP IMPORT PARTNERS</div>
      ${e.topImports.map(p => `
        <div class="geo-trade-row">
          <span class="geo-trade-name">${p.partner}</span>
          <div class="geo-trade-bar"><div style="width:${p.pct * 2}%; background:#ff8c00"></div></div>
          <span class="geo-trade-pct">${p.pct}%</span>
        </div>
      `).join('')}
      <div class="geo-divider"></div>
      <div class="geo-section-header">STRATEGIC RESOURCES</div>
      <div class="geo-tags">${e.resources.map(r => `<span class="geo-resource-tag">${r}</span>`).join('')}</div>
    </div>

    <!-- RISK tab -->
    <div class="geo-tab-content" data-tab="risk">
      <div class="geo-section-header">RISK ASSESSMENT</div>
      <div class="geo-risk-grid">
        <div class="geo-risk-card">
          <div class="geo-risk-score" style="color:${r.stability >= 7 ? '#00d26a' : r.stability >= 4 ? '#ff8c00' : '#ff3b3b'}">${r.stability}</div>
          <div class="geo-risk-label">STABILITY</div>
          <div class="geo-risk-sub">/10</div>
        </div>
        <div class="geo-risk-card">
          <div class="geo-risk-score" style="color:${riskColors[r.conflictLevel]}">${r.conflictLevel}</div>
          <div class="geo-risk-label">CONFLICT</div>
        </div>
        <div class="geo-risk-card">
          <div class="geo-risk-score" style="color:${r.corruptionRank <= 30 ? '#00d26a' : r.corruptionRank <= 80 ? '#ff8c00' : '#ff3b3b'}">#${r.corruptionRank}</div>
          <div class="geo-risk-label">CORRUPTION</div>
          <div class="geo-risk-sub">/180</div>
        </div>
        <div class="geo-risk-card">
          <div class="geo-risk-score" style="color:${r.pressFreedom <= 30 ? '#00d26a' : r.pressFreedom <= 80 ? '#ff8c00' : '#ff3b3b'}">#${r.pressFreedom}</div>
          <div class="geo-risk-label">PRESS FREE</div>
          <div class="geo-risk-sub">/180</div>
        </div>
      </div>
      <div class="geo-divider"></div>
      <div style="text-align:center; padding:8px;">
        <div style="font-size:8px; color:#888; letter-spacing:1px; margin-bottom:4px;">OVERALL ASSESSMENT</div>
        <div style="font-size:20px; font-weight:900; color:${riskColors[r.overallRisk]}; letter-spacing:2px;">${r.overallRisk}</div>
      </div>
      <div class="geo-divider"></div>
      <div class="geo-section-header">DEMOCRACY INDEX</div>
      <div class="geo-democracy-bar">
        <div class="geo-demo-fill" style="width:${p.democracyIndex * 10}%; background:${p.democracyIndex >= 6 ? '#00d26a' : p.democracyIndex >= 4 ? '#ff8c00' : '#ff3b3b'}"></div>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:7px; color:#555; margin-top:1px;">
        <span>Authoritarian</span><span>Hybrid</span><span>Flawed</span><span>Full Dem.</span>
      </div>
      <div style="text-align:center; margin-top:4px; font-size:11px; color:#ccc; font-weight:700;">${p.democracyIndex}/10</div>
    </div>
  `;

    container.appendChild(win);

    // Tab switching
    win.querySelectorAll('.geo-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            win.querySelectorAll('.geo-tab').forEach(t => t.classList.remove('active'));
            win.querySelectorAll('.geo-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            win.querySelector(`.geo-tab-content[data-tab="${tab.dataset.tab}"]`).classList.add('active');
        });
    });

    // Close button
    win.querySelector('.geo-close').addEventListener('click', () => {
        win.remove();
        openCountryWindows = openCountryWindows.filter(n => n !== countryName);
    });

    // Minimize button
    win.querySelector('.geo-minimize').addEventListener('click', () => {
        const content = win.querySelectorAll('.geo-tab-content, .geo-tabs, .geo-risk-badge');
        const isMinimized = win.classList.toggle('minimized');
        content.forEach(c => c.style.display = isMinimized ? 'none' : '');
    });

    // Make draggable
    makeDraggable(win, win.querySelector('.geo-window-header'));
}

function makeDraggable(el, handle) {
    let offsetX = 0, offsetY = 0, startX = 0, startY = 0;

    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;

        const onMove = (e) => {
            offsetX = startX - e.clientX;
            offsetY = startY - e.clientY;
            startX = e.clientX;
            startY = e.clientY;
            el.style.top = (el.offsetTop - offsetY) + 'px';
            el.style.left = (el.offsetLeft - offsetX) + 'px';
        };

        const onUp = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });
}

export function destroyMap() {
    if (flightRefreshInterval) clearInterval(flightRefreshInterval);
    openCountryWindows = [];
    if (map) { map.remove(); map = null; initialized = false; }
}
