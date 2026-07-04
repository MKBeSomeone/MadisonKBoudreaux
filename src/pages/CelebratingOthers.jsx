import React from 'react';
import PageHero from '../components/PageHero';
import './GridPages.css';

const spotlights = [
  { emoji: '🌟', title: '[Person\'s Name]', meta: 'Spotlight', body: 'Placeholder — what they did, why it\'s worth celebrating, and a link to their work if public.' },
  { emoji: '🎉', title: '[Person\'s Name]', meta: 'Shoutout', body: 'Placeholder shoutout for someone who deserves recognition.' },
  { emoji: '🏆', title: '[Person\'s Name]', meta: 'Achievement', body: 'Placeholder for celebrating a friend, family member, or colleague\'s win.' },
];

export default function CelebratingOthers() {
  return (
    <div className="page">
      <PageHero
        eyebrow="It's Not Always About Me"
        title="Celebrating Others"
        subtitle="A space to spotlight the people around me — their wins, their work, and the things worth cheering for."
      />
      <section className="container grid-section">
        <div className="card-grid">
          {spotlights.map((s, i) => (
            <div key={i} className="grid-card card">
              <span className="grid-card-emoji">{s.emoji}</span>
              <span className="grid-card-meta">{s.meta}</span>
              <h3 className="grid-card-title">{s.title}</h3>
              <p className="grid-card-body">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="empty-note">Add a new spotlight whenever someone in your life does something worth celebrating.</p>
      </section>
    </div>
  );
}
