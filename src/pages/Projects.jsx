import React from 'react';
import PageHero from '../components/PageHero';
import './GridPages.css';

const projects = [
  { emoji: '🚀', title: '[Project Name]', meta: 'Type / Year', body: 'Placeholder description — what you built, the tools you used, and why it mattered.' },
  { emoji: '🛠️', title: '[Project Name]', meta: 'Type / Year', body: 'Placeholder description of a second project. Swap in a screenshot, link, or repo.' },
  { emoji: '💡', title: '[Project Name]', meta: 'Type / Year', body: 'Placeholder description of a third project — link out to a live demo if you have one.' },
];

export default function Projects() {
  return (
    <div className="page">
      <PageHero
        eyebrow="Things I've Built"
        title="Projects"
        subtitle="A showcase of things I've made — apps, side projects, experiments, and everything in between."
      />
      <section className="container grid-section">
        <div className="card-grid">
          {projects.map((p, i) => (
            <div key={i} className="grid-card card">
              <span className="grid-card-emoji">{p.emoji}</span>
              <span className="grid-card-meta">{p.meta}</span>
              <h3 className="grid-card-title">{p.title}</h3>
              <p className="grid-card-body">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="empty-note">Replace these placeholder cards with your real projects — add links, images, or a "View on GitHub" button as you go.</p>
      </section>
    </div>
  );
}
