import { useState } from 'react';
import { Link } from 'react-router-dom';
import { INSIGHTS, INSIGHT_CATEGORIES } from '../../data/insightsArticles';

export default function InsightsModule() {
  const [category, setCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filtered =
    category === 'all'
      ? INSIGHTS
      : INSIGHTS.filter((a) => a.category === category);

  return (
    <section className="module-insights">
      <section className="hero-banner">
        <div className="hero-banner-content">
          <span className="hero-eyebrow">Learn</span>
          <h2 className="hero-title">Money insights that stick</h2>
          <p className="hero-text">
            Short guides on budgeting, investing, debt, and habits — built into
            your tracker so you learn while you manage cash flow.
          </p>
        </div>
      </section>

      <div className="insights-layout">
        <aside className="insights-sidebar panel">
          <h3 className="panel-title">Topics</h3>
          <ul className="insights-topic-list">
            {INSIGHT_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  className={`insights-topic-btn ${category === cat.id ? 'is-active' : ''}`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="insights-sidebar-note">
            Pair these with your{' '}
            <Link to="/app/analytics">Analytics</Link> module to see how theory
            matches your numbers.
          </p>
        </aside>

        <section className="insights-articles">
          {filtered.map((article) => {
            const open = expandedId === article.id;
            return (
              <article key={article.id} className="insight-card panel">
                <div className="insight-card-header">
                  <span className="insight-category">{article.category}</span>
                  <span className="insight-read-time">{article.readMinutes} min read</span>
                </div>
                <h3 className="insight-title">{article.title}</h3>
                <p className="insight-summary">{article.summary}</p>
                {open && <p className="insight-body">{article.body}</p>}
                <button
                  type="button"
                  className="btn btn-ghost insight-toggle"
                  onClick={() => setExpandedId(open ? null : article.id)}
                >
                  {open ? 'Show less' : 'Read more'}
                </button>
              </article>
            );
          })}
        </section>
      </div>
    </section>
  );
}
