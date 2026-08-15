import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchHeadlinePreview } from '../../api/news';
import { MODULES } from '../../config/navigation';
import { useFinanceData } from '../../context/FinanceDataContext';
import SummaryCards from '../../components/SummaryCards';
import { formatDate, formatMoney } from '../../utils/format';

export default function OverviewModule() {
  const { summary, recentTransactions, loading, error } = useFinanceData();
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    fetchHeadlinePreview(4).then(setHeadlines).catch(() => setHeadlines([]));
  }, []);

  const quickModules = MODULES.filter((m) => m.id !== 'overview');

  return (
    <section className="module-overview">
      {error && (
        <p className="alert alert-error" role="alert">
          {error}
        </p>
      )}

      <section className="hero-banner">
        <div className="hero-banner-content">
          <span className="hero-eyebrow">Welcome back</span>
          <h2 className="hero-title">Your money command center</h2>
          <p className="hero-text">
            Track spending, study trends, read market headlines, and build better
            habits — all from one sidebar.
          </p>
        </div>
        {!loading && summary && (
          <div className="hero-stat">
            <span className="hero-stat-label">Net balance</span>
            <span className="hero-stat-value">{formatMoney(summary.balance)}</span>
          </div>
        )}
      </section>

      {loading ? (
        <p className="loading-hint">Loading your snapshot…</p>
      ) : (
        <SummaryCards summary={summary} title="All-time overview" />
      )}

      <section className="quick-modules">
        <h2 className="section-heading">Jump to a module</h2>
        <div className="quick-module-grid">
          {quickModules.map((mod) => (
            <Link key={mod.id} to={mod.path} className="quick-module-card">
              <span className="quick-module-label">{mod.label}</span>
              <span className="quick-module-desc">{mod.description}</span>
              <span className="quick-module-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="overview-split">
        <section className="panel">
          <header className="panel-header">
            <h2 className="panel-title">Recent transactions</h2>
            <Link to="/app/transactions" className="text-link">
              View all
            </Link>
          </header>
          {recentTransactions.length === 0 ? (
            <p className="empty-state">
              No transactions yet.{' '}
              <Link to="/app/transactions">Add your first one</Link>.
            </p>
          ) : (
            <ul className="compact-tx-list">
              {recentTransactions.map((tx) => (
                <li key={tx.id} className="compact-tx-item">
                  <span>
                    <strong>{tx.category}</strong>
                    <span className="compact-tx-date">{formatDate(tx.date)}</span>
                  </span>
                  <span className={`tx-amount tx-amount--${tx.type?.toLowerCase()}`}>
                    {tx.type === 'EXPENSE' ? '−' : '+'}
                    {formatMoney(tx.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel panel-news-preview">
          <header className="panel-header">
            <h2 className="panel-title">Market pulse</h2>
            <Link to="/app/news" className="text-link">
              Open news
            </Link>
          </header>
          <ul className="headline-list">
            {headlines.map((item) => (
              <li key={item.id}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                <span className="headline-meta">
                  {item.source} · {item.publishedAt}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
