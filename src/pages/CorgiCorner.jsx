import React from 'react';
import PageHero from '../components/PageHero';
import './GridPages.css';

const posts = [
  { emoji: '🐾', title: '[Post Title]', meta: 'Corgi Life', body: 'Placeholder blog post about your corgi\'s latest adventure, funny moment, or milestone.' },
  { emoji: '🦴', title: '[Post Title]', meta: 'Corgi Life', body: 'Placeholder post — maybe a new toy, a trip to the vet, or a training win.' },
  { emoji: '📸', title: '[Post Title]', meta: 'Photo Dump', body: 'Placeholder post for a cute photo dump — corgis in costumes, corgis at the park, etc.' },
];

export default function CorgiCorner() {
  return (
    <div className="page">
      <PageHero
        accent="teal"
        eyebrow="A Blog for My Dog"
        title="Corgi Corner"
        subtitle="The unofficial, very biased blog dedicated to my corgi — [dog's name here]."
      />
      <section className="container grid-section">
        <div className="card-grid">
          {posts.map((p, i) => (
            <div key={i} className="grid-card card">
              <span className="grid-card-emoji">{p.emoji}</span>
              <span className="grid-card-meta">{p.meta}</span>
              <h3 className="grid-card-title">{p.title}</h3>
              <p className="grid-card-body">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="empty-note">Swap in real posts and photos of your corgi as they happen — this page is built to grow like a mini blog.</p>
      </section>
    </div>
  );
}
