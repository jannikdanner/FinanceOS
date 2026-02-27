// ══════════════════════════════════════════════════════════════
// FinanceOS — Header Component
// ══════════════════════════════════════════════════════════════

export function initHeader() {
    const el = document.getElementById('terminal-header');

    el.innerHTML = `
    <div class="header-left">
      <div class="logo">
        <div class="logo-icon">F</div>
        <span>FinanceOS</span>
      </div>
      <div class="header-status">
        <div class="status-dot" id="conn-status"></div>
        <span id="conn-label">CONNECTED</span>
      </div>
    </div>
    <div class="header-center">
      <div class="header-clock">
        <div class="clock-item">
          <span class="clock-label">NYC</span>
          <span class="clock-time" id="clock-nyc">--:--:--</span>
        </div>
        <div class="clock-item">
          <span class="clock-label">LDN</span>
          <span class="clock-time" id="clock-ldn">--:--:--</span>
        </div>
        <div class="clock-item">
          <span class="clock-label">TKY</span>
          <span class="clock-time" id="clock-tky">--:--:--</span>
        </div>
        <div class="clock-item">
          <span class="clock-label">LOCAL</span>
          <span class="clock-time" id="clock-local">--:--:--</span>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="connectivity">
        <span class="data-mode" id="data-mode-badge">DEMO</span>
      </div>
      <span id="header-date">--</span>
    </div>
  `;

    updateClocks();
    setInterval(updateClocks, 1000);
}

function updateClocks() {
    const now = new Date();

    const fmt = (tz) => now.toLocaleTimeString('en-US', {
        timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });

    const nyc = document.getElementById('clock-nyc');
    const ldn = document.getElementById('clock-ldn');
    const tky = document.getElementById('clock-tky');
    const local = document.getElementById('clock-local');
    const dateEl = document.getElementById('header-date');

    if (nyc) nyc.textContent = fmt('America/New_York');
    if (ldn) ldn.textContent = fmt('Europe/London');
    if (tky) tky.textContent = fmt('Asia/Tokyo');
    if (local) local.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}
