import { NavLink } from 'react-router-dom';
import { MODULES } from '../config/navigation';
import { useAuth } from '../context/AuthContext';
import NavIcon from './NavIcon';

export default function Sidebar({ mobileOpen, onClose }) {
  const { logout } = useAuth();

  return (
    <>
      <button
        type="button"
        className={`sidebar-backdrop ${mobileOpen ? 'is-visible' : ''}`}
        onClick={onClose}
        aria-label="Close menu"
      />
      <aside className={`sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="sidebar-brand">
          <span className="brand-icon small">₹</span>
          <div>
            <span className="sidebar-brand-name">Smart Finance</span>
            <span className="sidebar-brand-tag">Tracker</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main modules">
          <span className="sidebar-section-label">Modules</span>
          <ul>
            {MODULES.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'is-active' : ''}`
                  }
                  onClick={onClose}
                >
                  <NavIcon name={item.icon} />
                  <span className="sidebar-link-text">
                    <span className="sidebar-link-label">{item.label}</span>
                    <span className="sidebar-link-desc">{item.description}</span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="btn btn-ghost sidebar-logout" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
