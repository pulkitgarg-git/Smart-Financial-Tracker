const BASE = [
  {
    id: 'fb-1',
    title: 'Fed holds rates steady as inflation cools toward 2% target',
    url: 'https://www.reuters.com/markets/',
    source: 'Reuters Markets',
    publishedAt: '2h ago',
    excerpt:
      'Central bankers signal data-dependent path; bond yields dip on softer CPI print.',
    tag: 'Markets',
  },
  {
    id: 'fb-2',
    title: 'Tech earnings season: AI spending remains top investor theme',
    url: 'https://www.bloomberg.com/markets',
    source: 'Bloomberg',
    publishedAt: '4h ago',
    excerpt:
      'Mega-cap guidance highlights capex toward data centers and enterprise AI adoption.',
    tag: 'Markets',
  },
  {
    id: 'fb-3',
    title: 'Emergency fund basics: how much cash to keep on hand',
    url: 'https://www.investopedia.com/',
    source: 'Investopedia',
    publishedAt: 'Today',
    excerpt:
      'Most planners suggest 3–6 months of essential expenses in a high-yield savings account.',
    tag: 'Personal Finance',
  },
  {
    id: 'fb-4',
    title: 'Global oil prices swing on supply outlook and demand forecasts',
    url: 'https://www.ft.com/markets',
    source: 'Financial Times',
    publishedAt: '6h ago',
    excerpt:
      'Energy stocks mixed as traders weigh OPEC+ commentary against macro growth signals.',
    tag: 'Economy',
  },
  {
    id: 'fb-5',
    title: 'Index funds vs active funds: what the latest SPIVA data shows',
    url: 'https://www.sec.gov/investor',
    source: 'SEC Investor',
    publishedAt: 'Yesterday',
    excerpt:
      'Long-term studies continue to show majority of active managers underperform benchmarks.',
    tag: 'Personal Finance',
  },
  {
    id: 'fb-6',
    title: 'Housing market update: mortgage rates and inventory trends',
    url: 'https://www.cnbc.com/real-estate/',
    source: 'CNBC',
    publishedAt: '5h ago',
    excerpt:
      'Affordability remains pressured; buyers watch weekly rate averages and regional supply.',
    tag: 'Economy',
  },
];

const BY_CATEGORY = {
  markets: ['Markets'],
  personal: ['Personal Finance'],
  economy: ['Economy'],
};

export function getFallbackNews(category = 'all') {
  if (category === 'all') return BASE;
  const tags = BY_CATEGORY[category] ?? [];
  const filtered = BASE.filter((n) => tags.includes(n.tag));
  return filtered.length ? filtered : BASE;
}
