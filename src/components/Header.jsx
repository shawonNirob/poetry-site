import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'all', end: true },
  { to: '/poems', label: 'poems' },
  { to: '/prose', label: 'prose' },
  { to: '/fiction', label: 'fiction' },
  { to: '/document', label: 'document' },
  { to: '/about', label: 'about' }
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <NavLink to="/" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">earth</span>
        </NavLink>
        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
