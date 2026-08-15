import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      <span className="theme-toggle-track" aria-hidden>
        <span className={`theme-toggle-icon ${theme === 'dark' ? 'is-active' : ''}`}>
          ☀️
        </span>
        <span className={`theme-toggle-icon ${theme === 'light' ? 'is-active' : ''}`}>
          🌙
        </span>
      </span>
      <span className="theme-toggle-label">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
