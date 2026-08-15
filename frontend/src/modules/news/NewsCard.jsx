export default function NewsCard({ item, featured = false }) {
  return (
    <article className={`news-card ${featured ? 'news-card--featured' : ''}`}>
      <div className="news-card-meta">
        <span className="news-tag">{item.tag}</span>
        <span className="news-source">{item.source}</span>
        <span className="news-time">{item.publishedAt}</span>
      </div>
      <h3 className="news-card-title">
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h3>
      {item.excerpt && <p className="news-card-excerpt">{item.excerpt}</p>}
      <footer className="news-card-footer">
        {item.points != null && (
          <span className="news-points">{item.points} pts</span>
        )}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-read-more"
        >
          Read article →
        </a>
      </footer>
    </article>
  );
}
