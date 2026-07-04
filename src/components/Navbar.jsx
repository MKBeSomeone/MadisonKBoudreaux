import React, { useState } from 'react';
import { Link, useRouter } from '../router/Router';
import AuthWidget from '../auth/AuthWidget';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/resume', label: 'Resume' },
  { to: '/projects', label: 'Projects' },
  { to: '/suggestion-warehouse', label: 'Suggestion Warehouse' },
  { to: '/3d-workshop', label: '3D Workshop' },
  { to: '/celebrating-others', label: 'Celebrating Others' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/corgi-corner', label: 'Corgi Corner' },
];

export default function Navbar() {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <button
          className={`navbar-toggle ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`navbar-link ${path === item.to ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="navbar-auth">
          <AuthWidget />
        </div>
      </div>
    </header>
  );
}
