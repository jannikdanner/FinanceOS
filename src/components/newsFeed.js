// ══════════════════════════════════════════════════════════════
// FinanceOS — News Feed Component
// ══════════════════════════════════════════════════════════════

import { mockNews } from '../api/mockData.js';
import { formatTime } from '../utils/formatter.js';

let newsData = [...mockNews];

export function initNewsFeed() {
    renderNews();

    // Refresh timestamps every 30s
    setInterval(renderNews, 30000);
}

function renderNews() {
    const el = document.getElementById('news-feed-content');
    if (!el) return;

    el.innerHTML = newsData.map(item => {
        return `
      <div class="news-item fade-in" data-id="${item.id}">
        <div class="news-time">
          <span class="news-source">${item.source}</span>
          <span>•</span>
          <span>${formatTime(item.time)}</span>
        </div>
        <div class="news-headline">${item.headline}</div>
        ${item.tag ? `<span class="news-tag ${item.tag}">${item.tag}</span>` : ''}
      </div>
    `;
    }).join('');
}

export function getNewsData() {
    return newsData;
}
