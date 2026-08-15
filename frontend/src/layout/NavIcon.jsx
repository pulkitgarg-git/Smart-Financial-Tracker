const paths = {
  overview: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  transactions: (
    <>
      <path d="M4 6h16M4 12h10M4 18h14" />
    </>
  ),
  analytics: (
    <>
      <path d="M4 19V9M10 19V5M16 19v-6M22 19V3" />
    </>
  ),
  news: (
    <>
      <path d="M4 6h16v12H4zM8 6V4h8v2M8 10h8M8 14h5" />
    </>
  ),
  insights: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
};

export default function NavIcon({ name }) {
  return (
    <svg
      className="nav-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name] ?? paths.overview}
    </svg>
  );
}
