// ══════════════════════════════════════════════════════════════
// FinanceOS — OSINT View (F6)
// ══════════════════════════════════════════════════════════════

let initialized = false;

const threatFeed = [
    { time: '14:23:41', system: 'DARKWEB MON', threat: 'HIGH', msg: 'Ransomware group claimed access to top 10 US Bank' },
    { time: '14:20:12', system: 'SIGNAL INT', threat: 'MED', msg: 'Abnormal encrypted traffic spike originating from St. Petersburg' },
    { time: '14:15:05', system: 'SOCIAL NET', threat: 'LOW', msg: 'Trending bot coordination on X regarding #CrudeOil' },
    { time: '14:02:30', system: 'GEO INT', threat: 'HIGH', msg: 'Satellite imagery confirms troop movements near border sector 4' },
    { time: '13:58:11', system: 'DARKWEB MON', threat: 'MED', msg: 'Zero-day exploit for common enterprise firewall listed for sale' },
];

export function initOsintView() {
    if (initialized) return;
    initialized = true;

    renderOsintView();
}

function renderOsintView() {
    const el = document.getElementById('osint-container');
    if (!el) return;

    el.innerHTML = `
    <div class="osint-dashboard">
      <div class="macro-header" style="border-bottom: 1px solid var(--border-accent); margin-bottom: var(--sp-6);">
        <span class="panel-tag" style="background:#ff3b3b; color:#000;">OSINT</span>
        <h1 style="color:var(--white);">Open Source Intelligence Terminal</h1>
      </div>

      <div class="osint-grid">
        
        <!-- Flight Tracker -->
        <div class="macro-card osint-card">
          <div class="macro-card-header" style="color:var(--blue);">FLIGHT TRACKING (ADSB)</div>
          <div class="osint-search">
            <input type="text" placeholder="Enter Registration (e.g. N12345)" class="osint-input" id="flight-input" value="N420TX"/>
            <button class="osint-btn" onclick="document.getElementById('flight-result').style.display='block'">TRACK</button>
          </div>
          <div id="flight-result" class="osint-result" style="display:block; margin-top:var(--sp-4);">
            <div class="macro-stat"><span class="m-label">Aircraft</span><span class="m-value">Gulfstream G650</span></div>
            <div class="macro-stat"><span class="m-label">Owner</span><span class="m-value">Private (Blocked)</span></div>
            <div class="macro-stat"><span class="m-label">Status</span><span class="m-value" style="color:var(--green)">Airborne</span></div>
            <div class="macro-stat"><span class="m-label">Altitude</span><span class="m-value">41,000 ft</span></div>
            <div class="macro-stat"><span class="m-label">Speed</span><span class="m-value">488 kts</span></div>
            <div class="macro-stat"><span class="m-label">Origin</span><span class="m-value">SJC (San Jose)</span></div>
            <div class="macro-stat"><span class="m-label">Destination</span><span class="m-value">TEB (Teterboro)</span></div>
          </div>
        </div>

        <!-- Vessel Tracker -->
        <div class="macro-card osint-card">
          <div class="macro-card-header" style="color:var(--cyan);">MARITIME TRACKING (AIS)</div>
          <div class="osint-search">
            <input type="text" placeholder="Enter IMO / MMSI" class="osint-input" id="vessel-input" value="9708990"/>
            <button class="osint-btn" onclick="document.getElementById('vessel-result').style.display='block'">TRACK</button>
          </div>
          <div id="vessel-result" class="osint-result" style="display:block; margin-top:var(--sp-4);">
             <div class="macro-stat"><span class="m-label">Vessel</span><span class="m-value">EVER GIVEN</span></div>
             <div class="macro-stat"><span class="m-label">Type</span><span class="m-value">Container Ship</span></div>
             <div class="macro-stat"><span class="m-label">Status</span><span class="m-value" style="color:var(--orange)">Underway</span></div>
             <div class="macro-stat"><span class="m-label">Speed/Course</span><span class="m-value">14.2 kn / 054°</span></div>
             <div class="macro-stat"><span class="m-label">Draught</span><span class="m-value">15.7 m</span></div>
             <div class="macro-stat"><span class="m-label">Destination</span><span class="m-value">Rotterdam</span></div>
          </div>
        </div>

        <!-- Threat Monitor -->
        <div class="macro-card span-2 osint-card">
          <div class="macro-card-header" style="color:#ff3b3b;">GLOBAL THREAT & LEAK MONITOR</div>
          <div class="threat-feed-container" style="background:var(--bg-highlight); padding:var(--sp-2); border:1px solid #ff3b3b40; border-radius:3px; height: 180px; overflow-y:auto;">
             ${threatFeed.map(t => `
               <div style="font-size:11px; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; gap:10px;">
                 <span style="color:var(--text-muted); min-width:60px;">${t.time}</span>
                 <span style="color:var(--cyan); min-width:80px;">[${t.system}]</span>
                 <span style="color:${t.threat === 'HIGH' ? 'var(--red)' : t.threat === 'MED' ? 'var(--orange)' : 'var(--green)'}; min-width:40px; font-weight:700;">${t.threat}</span>
                 <span style="color:var(--text-secondary);">${t.msg}</span>
               </div>
             `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
