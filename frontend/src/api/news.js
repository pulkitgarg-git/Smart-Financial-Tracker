import { getFallbackNews } from '../data/newsFallback';

const HN_SEARCH =
  'https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=12';

/** Documented sources for the Finance News module UI */
export const NEWS_SOURCES = {
  primary: {
    name: 'Hacker News — Algolia Search API',
    endpoint: 'https://hn.algolia.com/api/v1/search',
    docsUrl: 'https://hn.algolia.com/',
    description:
      'Live stories are fetched from the public Hacker News Algolia index. Each tab runs a finance-related search (e.g. “stock market”, “personal finance”). The article link opens the original publisher when available; otherwise the Hacker News discussion thread.',
  },
  fallback: {
    name: 'Curated fallback headlines (local)',
    description:
      'If the API is unreachable or returns fewer than four stories, the app fills the feed with sample headlines stored in frontend/src/data/newsFallback.js. These are editorial placeholders for learning—not live RSS feeds from those outlets.',
    publishers: ['Reuters', 'Bloomberg', 'Financial Times', 'CNBC', 'Investopedia', 'SEC Investor'],
  },
  disclaimer:
    'This app does not scrape Reuters, Bloomberg, or other publishers directly. Always verify facts on the destination site before making financial decisions.',
};

const CATEGORY_QUERIES = {
  all: 'finance OR investing OR stock market',
  markets: 'stock market OR wall street OR S&P 500',
  personal: 'personal finance OR budgeting OR savings',
  economy: 'economy OR inflation OR federal reserve OR GDP',
};

function timeAgo(timestamp) {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function mapHit(hit) {
  return {
    id: hit.objectID,
    title: hit.title,
    url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
    source: (() => {
      try {
        return hit.url
          ? new URL(hit.url).hostname.replace(/^www\./, '')
          : 'Hacker News';
      } catch {
        return 'Web';
      }
    })(),
    publishedAt: timeAgo(hit.created_at_i),
    excerpt: hit.story_text?.slice(0, 140) || null,
    points: hit.points,
    tag: 'HN Live',
  };
}

export async function fetchFinanceNews(category = 'all') {
  const query = CATEGORY_QUERIES[category] ?? CATEGORY_QUERIES.all;

  try {
    const res = await fetch(
      `${HN_SEARCH}&query=${encodeURIComponent(query)}`,
    );
    if (!res.ok) throw new Error('News feed unavailable');

    const data = await res.json();
    const hits = data.hits?.filter((h) => h.title) ?? [];

    if (hits.length >= 4) {
      return hits.map(mapHit);
    }
    return [...hits.map(mapHit), ...getFallbackNews(category)].slice(0, 15);
  } catch {
    return getFallbackNews(category);
  }
}

export async function fetchHeadlinePreview(count = 3) {
  const items = await fetchFinanceNews('all');
  return items.slice(0, count);
}
