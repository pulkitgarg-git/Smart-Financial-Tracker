import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { getModuleByPath } from '../config/navigation';
import { FinanceDataProvider, useFinanceData } from '../context/FinanceDataContext';
import ThemeToggle from '../components/ThemeToggle';
import PageHeader from './PageHeader';
import Sidebar from './Sidebar';

function AppShellInner() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const module = getModuleByPath(location.pathname);
  const { refresh, refreshOnMount } = useFinanceData();

  useEffect(() => {
    refreshOnMount();
  }, [refreshOnMount]);

  return (
    <section className="app-layout">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <section className="app-content">
        <header className="topbar">
          <button
            type="button"
            className="btn-icon topbar-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
          <PageHeader
            title={module.label}
            subtitle={module.description}
            actions={
              <div className="topbar-actions">
                <ThemeToggle />
                {module.id !== 'news' && module.id !== 'insights' && (
                  <button type="button" className="btn btn-ghost" onClick={refresh}>
                    Refresh data
                  </button>
                )}
              </div>
            }
          />
        </header>

        <main className="module-view">
          <Outlet />
        </main>
      </section>
    </section>
  );
}

export default function AppShell() {
  return (
    <FinanceDataProvider>
      <AppShellInner />
    </FinanceDataProvider>
  );
}
