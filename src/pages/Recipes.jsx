import React from 'react';
import PageHero from '../components/PageHero';
import './GridPages.css';

const recipes = [
  { emoji: '🍝', title: '[Recipe Name]', meta: 'Dinner · 30 min', body: 'Placeholder recipe — ingredients, steps, and any tips or swaps you\'d suggest.' },
  { emoji: '🍪', title: '[Recipe Name]', meta: 'Dessert · 45 min', body: 'Placeholder recipe for a favorite dessert.' },
  { emoji: '🥗', title: '[Recipe Name]', meta: 'Quick · 15 min', body: 'Placeholder recipe for something quick and easy.' },
];

export default function Recipes() {
  return (
    <div className="page">
      <PageHero
        accent="mustard"
        eyebrow="From My Kitchen"
        title="Recipes"
        subtitle="Dishes I make on repeat, family recipes, and a few experiments worth keeping around."
      />
      <section className="container grid-section">
        <div className="card-grid">
          {recipes.map((r, i) => (
            <div key={i} className="grid-card card">
              <span className="grid-card-emoji">{r.emoji}</span>
              <span className="grid-card-meta">{r.meta}</span>
              <h3 className="grid-card-title">{r.title}</h3>
              <p className="grid-card-body">{r.body}</p>
            </div>
          ))}
        </div>
        <p className="empty-note">Replace with your real recipes — ingredients list, steps, and a photo make each card feel complete.</p>
      </section>
    </div>
  );
}
