import { NEWS_SOURCES } from '../api/news';

export default function NewsSourcesPanel() {
  return (
    <section className="panel news-sources-panel" aria-labelledby="news-sources-heading">
      <h3 id="news-sources-heading" className="panel-title">
        Where do these stories come from?
      </h3>

      <div className="news-source-block">
        <span className="news-source-badge news-source-badge--live">Primary · Live</span>
        <h4>{NEWS_SOURCES.primary.name}</h4>
        <p>{NEWS_SOURCES.primary.description}</p>
        <p className="news-source-meta">
          Endpoint:{' '}
          <code className="inline-code">{NEWS_SOURCES.primary.endpoint}</code>
        </p>
        <a
          href={NEWS_SOURCES.primary.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          API documentation →
        </a>
      </div>

      <div className="news-source-block">
        <span className="news-source-badge news-source-badge--fallback">Fallback</span>
        <h4>{NEWS_SOURCES.fallback.name}</h4>
        <p>{NEWS_SOURCES.fallback.description}</p>
        <ul className="news-source-publishers">
          {NEWS_SOURCES.fallback.publishers.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>

      <p className="news-sources-note">{NEWS_SOURCES.disclaimer}</p>
    </section>
  );
}
