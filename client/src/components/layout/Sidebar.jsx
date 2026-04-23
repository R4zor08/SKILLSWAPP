import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Overview', icon: '◆' },
  { to: '/dashboard/profile', label: 'Profile', icon: '◎' },
  { to: '/dashboard/browse', label: 'Browse skills', icon: '⌕' },
  { to: '/dashboard/matches', label: 'Matches', icon: '✧' },
  { to: '/dashboard/swaps', label: 'Swap requests', labelShort: 'Swaps', icon: '⇄' },
  { to: '/dashboard/messages', label: 'Messages', icon: '◇' },
  { to: '/dashboard/reviews', label: 'Reviews', icon: '★' },
  { to: '/dashboard/progress', label: 'Progress', icon: '▥' },
];

export function Sidebar({ mobileOpen, onNavigate }) {
  return (
    <aside id="workspace-sidebar" className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
      <p className="sidebar-heading">Workspace</p>
      <ul className="sidebar-list">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              end={l.to === '/dashboard'}
              onClick={onNavigate}
            >
              <span className="sidebar-icon" aria-hidden>
                {l.icon}
              </span>
              <span className="sidebar-label">{l.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
