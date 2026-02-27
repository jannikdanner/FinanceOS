// ══════════════════════════════════════════════════════════════
// FinanceOS — Intel View (Live Webcam Feeds & Global Cams)
// ══════════════════════════════════════════════════════════════

let initialized = false;
let feeds = [];
let activeCategory = 'all';

export async function initIntelView() {
  if (initialized) return;
  initialized = true;

  // Fetch webcam feed list from API
  try {
    const resp = await fetch('/api/webcams');
    feeds = await resp.json();
  } catch (e) {
    feeds = getDefaultFeeds();
  }

  renderIntelView();
}

function getDefaultFeeds() {
  return [
    { id: 'nyc-timesquare', name: 'Times Square, NYC', location: 'New York, USA', category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/1-iLuLvrEQQ?autoplay=1&mute=1&controls=0' },
    { id: 'tokyo-shibuya', name: 'Shibuya Crossing', location: 'Tokyo, Japan', category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/9Auq9mYxFEE?autoplay=1&mute=1&controls=0' },
    { id: 'iss-earth', name: 'ISS Earth View', location: 'Low Earth Orbit', category: 'space', type: 'youtube', src: 'https://www.youtube.com/embed/21X5lGlDOfg?autoplay=1&mute=1&controls=0' },
    { id: 'news-global', name: 'Global News Feed', location: 'London, UK', category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/1XQ-y3I_RVI?autoplay=1&mute=1&controls=0' },
    { id: 'news-us', name: 'US News Feed', location: 'Washington D.C.', category: 'city', type: 'youtube', src: 'https://www.youtube.com/embed/0zXfDafmAWs?autoplay=1&mute=1&controls=0' },
    { id: 'miami-port', name: 'Port of Miami', location: 'Miami, USA', category: 'port', type: 'youtube', src: 'https://www.youtube.com/embed/sZrd3h4wBqI?autoplay=1&mute=1&controls=0' },
  ];
}

function renderIntelView() {
  const el = document.getElementById('intel-container');
  if (!el) return;

  const categories = ['all', ...new Set(feeds.map(f => f.category))];
  const filtered = activeCategory === 'all' ? feeds : feeds.filter(f => f.category === activeCategory);

  el.innerHTML = `
    <div class="intel-page">
      <div class="intel-header-bar">
        <div class="intel-header-left">
          <span class="panel-tag">CAMS</span>
          <h2>Global Intelligence Feeds</h2>
        </div>
        <div class="intel-category-filters">
          ${categories.map(cat => `
            <button class="intel-cat-btn ${cat === activeCategory ? 'active' : ''}" data-cat="${cat}">
              ${cat.toUpperCase()}
            </button>
          `).join('')}
        </div>
        <div class="intel-header-right">
          <span class="text-muted">${filtered.length} feeds active</span>
        </div>
      </div>

      <div class="intel-grid">
        ${filtered.map(feed => `
          <div class="intel-feed-card" data-id="${feed.id}">
            <div class="intel-feed-header">
              <div class="intel-feed-status">
                <span class="status-dot"></span>
                <span class="text-xs">LIVE</span>
              </div>
              <span class="intel-feed-name">${feed.name}</span>
              <button class="intel-expand-btn" data-id="${feed.id}" title="Expand">⬜</button>
            </div>
            <div class="intel-feed-viewport">
              <iframe class="intel-feed-iframe" src="${feed.src}" allow="autoplay; encrypted-media" allowfullscreen frameborder="0"></iframe>
            </div>
            <div class="intel-feed-footer">
              <span class="text-xs text-muted">${feed.location}</span>
              <span class="text-xs" style="color:var(--cyan)">${feed.category.toUpperCase()}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Expanded feed overlay -->
      <div class="intel-expanded-overlay" id="intel-expanded" style="display:none">
        <div class="intel-expanded-content">
          <div class="intel-expanded-header">
            <span id="intel-expanded-title"></span>
            <button class="intel-close-btn" id="intel-close-btn">✕ CLOSE</button>
          </div>
          <div class="intel-expanded-viewport" id="intel-expanded-viewport"></div>
        </div>
      </div>
    </div>
  `;

  // Category filter clicks
  el.querySelectorAll('.intel-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderIntelView();
    });
  });

  // (Placeholders removed - feeds load directly)

  // Expand button
  el.querySelectorAll('.intel-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const feedId = btn.dataset.id;
      const feed = feeds.find(f => f.id === feedId);
      if (!feed) return;

      const overlay = document.getElementById('intel-expanded');
      const title = document.getElementById('intel-expanded-title');
      const viewport = document.getElementById('intel-expanded-viewport');

      title.textContent = `${feed.name} — ${feed.location}`;
      viewport.innerHTML = `<iframe class="intel-feed-iframe expanded" src="${feed.src}" allow="autoplay; encrypted-media" allowfullscreen frameborder="0"></iframe>`;
      overlay.style.display = 'flex';
    });
  });

  // Close expanded
  document.getElementById('intel-close-btn')?.addEventListener('click', () => {
    const overlay = document.getElementById('intel-expanded');
    const viewport = document.getElementById('intel-expanded-viewport');
    viewport.innerHTML = '';
    overlay.style.display = 'none';
  });
}
