import React from 'react';
import PageHero from '../components/PageHero';
import './GridPages.css';

const builds = [
  { emoji: '🧩', title: '[Print / Model Name]', meta: 'Design', body: 'Placeholder — what you designed or printed, the software used, and print settings worth noting.' },
  { emoji: '⚙️', title: '[Print / Model Name]', meta: 'Function', body: 'Placeholder for a functional print — a fix, tool, or upgrade you made.' },
  { emoji: '🎨', title: '[Print / Model Name]', meta: 'Fun Build', body: 'Placeholder for a just-for-fun print or model.' },
];

export default function Workshop3D() {
  return (
    <div className="page">
      <PageHero
        accent="teal"
        eyebrow="Making Things"
        title="3D Workshop"
        subtitle="Designs, prints, and builds from my 3D printer — from practical fixes to purely-for-fun creations."
      />
      <section className="container grid-section">
        <div className="card-grid">
          {builds.map((b, i) => (
            <div key={i} className="grid-card card">
              <span className="grid-card-emoji">{b.emoji}</span>
              <span className="grid-card-meta">{b.meta}</span>
              <h3 className="grid-card-title">{b.title}</h3>
              <p className="grid-card-body">{b.body}</p>
            </div>
          ))}
        </div>
        <p className="empty-note">Swap these for photos of your actual prints, plus notes on materials, print time, or design files.</p>
      </section>
    </div>
  );
}
