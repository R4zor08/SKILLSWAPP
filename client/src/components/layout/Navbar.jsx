import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export function Navbar({ variant = 'default', workspaceMenuOpen, onWorkspaceMenuToggle }) {
  const { isAuthenticated, user, logout } = useAuth();
  const { pathname, hash } = useLocation();
  const isDashboard = variant === 'dashboard';

  const homeActive = pathname === '/' && !hash;
  const featuresActive = pathname === '/' && hash === '#features';
  const aboutActive = pathname === '/' && hash === '#about';
  const contactActive = pathname === '/' && hash === '#contact';

  return (
    <header className={`navbar ${isDashboard ? 'navbar--dashboard' : 'navbar--marketing'}`}>
      <div className="container navbar-inner">
        {isAuthenticated && isDashboard && (
          <button
            type="button"
            className="btn-icon menu-toggle"
            aria-label={workspaceMenuOpen ? 'Close workspace menu' : 'Open workspace menu'}
            aria-expanded={Boolean(workspaceMenuOpen)}
            aria-controls="workspace-sidebar"
            onClick={onWorkspaceMenuToggle}
          >
            <span className="menu-toggle-bars" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>
        )}

        <Link to={{ pathname: '/', hash: '' }} className="brand">
          <span className="brand-mark">⇄</span>
          <span>SkillSwap</span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`} end>
                Dashboard
              </NavLink>
              <NavLink to="/dashboard/browse" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
                Browse
              </NavLink>
              <NavLink to="/dashboard/matches" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
                Matches
              </NavLink>
              <NavLink to="/dashboard/swaps" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
                Swaps
              </NavLink>
              <NavLink to="/dashboard/messages" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
                Messages
              </NavLink>
            </>
          ) : (
            <>
              <Link to={{ pathname: '/', hash: '' }} className={`nav-pill ${homeActive ? 'active' : ''}`}>
                Home
              </Link>
              <Link to={{ pathname: '/', hash: 'features' }} className={`nav-pill ${featuresActive ? 'active' : ''}`}>
                Features
              </Link>
              <Link to={{ pathname: '/', hash: 'about' }} className={`nav-pill ${aboutActive ? 'active' : ''}`}>
                About
              </Link>
              <Link to={{ pathname: '/', hash: 'contact' }} className={`nav-pill ${contactActive ? 'active' : ''}`}>
                Contact
              </Link>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `btn primary sm touch-target${isActive ? ' navbar-login--active' : ''}`
                }
              >
                Login
              </NavLink>
            </>
          )}
        </nav>

        {isAuthenticated && (
          <div className="nav-user">
            <span className="nav-user-name muted sm">{user?.name}</span>
            <button type="button" className="btn ghost sm" onClick={logout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
