import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Sidebar } from './Sidebar.jsx';
import { Footer } from './Footer.jsx';

function DashboardOutlet() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition-inner">
      <Outlet />
    </div>
  );
}

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell dashboard-theme">
      <Navbar
        variant="dashboard"
        workspaceMenuOpen={sidebarOpen}
        onWorkspaceMenuToggle={() => setSidebarOpen((o) => !o)}
      />
      <div className="container dashboard-grid">
        <div
          className={`sidebar-backdrop ${sidebarOpen ? 'sidebar-backdrop--visible' : ''}`}
          aria-hidden={!sidebarOpen}
          onClick={() => setSidebarOpen(false)}
        />
        <Sidebar mobileOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
        <main className="dashboard-main page-shell" id="main-content">
          <div className="dashboard-page">
            <DashboardOutlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
