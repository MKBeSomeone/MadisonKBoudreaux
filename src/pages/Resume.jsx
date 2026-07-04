import React from 'react';
import PageHero from '../components/PageHero';
import siteConfig from '../siteConfig';
import './Resume.css';

const skills = [
  'Placeholder Skill 1', 'Placeholder Skill 2', 'Placeholder Skill 3',
  'Placeholder Skill 4', 'Placeholder Skill 5', 'Placeholder Skill 6',
];

const experience = [
  {
    role: '[Current Title]',
    company: '[Current Employer]',
    dates: 'Present',
    current: true,
    bullets: [
      'Placeholder responsibility or achievement in your current role.',
      'Another placeholder bullet — quantify impact where you can.',
    ],
  },
  {
    role: '[Previous Title]',
    company: '[Previous Employer]',
    dates: '20XX — 20XX',
    bullets: [
      'Placeholder responsibility or achievement.',
      'Placeholder bullet describing a project or result.',
    ],
  },
  {
    role: '[Earlier Title]',
    company: '[Earlier Employer]',
    dates: '20XX — 20XX',
    bullets: [
      'Placeholder responsibility or achievement.',
    ],
  },
];

export default function Resume() {
  return (
    <div className="page">
      <PageHero
        accent="teal"
        eyebrow="Professional Background"
        title="Resume"
        subtitle="A quick look at where I've worked, what I do now, and the skills I bring to the table."
      />

      <div className="container resume-actions">
        <a href={siteConfig.resume.pdfPath} className="btn btn-primary" download>
          Download PDF Resume
        </a>
        <a
          href={siteConfig.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          View my LinkedIn
        </a>
      </div>

      <section className="container resume-section">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {experience.map((job, i) => (
            <div key={i} className={`timeline-item card ${job.current ? 'is-current' : ''}`}>
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{job.role}</h3>
                  <p className="timeline-company">{job.company}</p>
                </div>
                <span className="timeline-dates">{job.dates}</span>
              </div>
              <ul className="timeline-bullets">
                {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container resume-section">
        <h2 className="section-title">Skills</h2>
        <div className="skills-wrap">
          {skills.map((s) => (
            <span key={s} className="pill-tag">{s}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
