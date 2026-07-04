import React from 'react';
import './PageHero.css';

export default function PageHero({ eyebrow, title, subtitle, accent = 'coral' }) {
  return (
    <div className={`page-hero page-hero--${accent}`}>
      <div className="container">
        {eyebrow && <span className="page-hero-eyebrow">{eyebrow}</span>}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
