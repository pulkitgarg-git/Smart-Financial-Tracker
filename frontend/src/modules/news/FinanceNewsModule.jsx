import { useCallback, useEffect, useState } from 'react';
import { fetchFinanceNews } from '../../api/news';
import NewsSourcesPanel from '../../components/NewsSourcesPanel';
import NewsCard from './NewsCard';

const TABS = [
  { id: 'all', label: 'All headlines' },
  { id: 'markets', label: 'Markets' },
  { id: 'personal', label: 'Personal finance' },
  { id: 'economy', label: 'Economy' },
];

export default function FinanceNewsModule() {
  const [category, setCategory] = useState('all');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const items = await fetchFinanceNews(category);
      setArticles(items);
    } catch (err) {
      setError(err.message || 'Could not load news');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    load();
  }, [load]);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="module-news">
      <section className="hero-banner hero-banner--news">
        <div className="hero-banner-content">
          <span className="hero-eyebrow">Live feed</span>
          <h2 className="hero-title">Latest financial news</h2>
          <p className="hero-text">
            Headlines from markets, personal finance, and the economy — refreshed
            on demand. Links open the original source in a new tab.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={load} disabled={loading}>
          {loading ? 'Updating…' : 'Refresh feed'}
        </button>
      </section>

      <NewsSourcesPanel />

      <div className="news-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={category === tab.id}
            className={`news-tab ${category === tab.id ? 'is-active' : ''}`}
            onClick={() => setCategory(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="alert alert-error" role="alert">
          {error}
        </p>
      )}

      {loading && articles.length === 0 ? (
        <div className="news-skeleton-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="skeleton-card" />
          ))}
        </div>
      ) : (
        <>
          {featured && (
            <section className="news-featured">
              <NewsCard item={featured} featured />
            </section>
          )}
          <section className="news-grid">
            {rest.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </section>
        </>
      )}

      <p className="news-disclaimer">
        Stories are aggregated from public discussion and editorial fallbacks for
        learning purposes. Always verify facts with primary sources before making
        financial decisions.
      </p>
    </div>
  );
}
