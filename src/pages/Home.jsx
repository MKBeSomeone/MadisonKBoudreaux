import React from 'react';
import { Link } from '../router/Router';
import SocialLinks from '../components/SocialLinks';
import siteConfig from '../siteConfig';
import './Home.css';

export default function Home() {
  return (
    <div className="page home-page">
      <section className="home-hero">
        <div className="container home-hero-inner">
          <div>
            <span className="page-hero-eyebrow">Hey, I'm glad you're here</span>
            <h1 className="home-title">Hi, I'm {siteConfig.name.split(' ')[0]}.</h1>
            <p className="home-tagline">{siteConfig.tagline}</p>
            <div className="home-cta-row">
              <Link to="/resume" className="btn btn-primary">View my resume</Link>
              <Link to="/projects" className="btn btn-outline">See my projects</Link>
            </div>
          </div>
          <div className="home-avatar-wrap">
            <div className="home-avatar" aria-hidden="true">
              {siteConfig.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
          </div>
        </div>
      </section>

      <section className="container home-section">
        <h2 className="section-title">About Me</h2>
        <p className="section-body">
          [Placeholder] This is where your about-me story goes — where you're from,
          what drives you, and a few things people should know about you. Swap this
          paragraph out for your own voice: your background, your interests, and
          what makes you, you.
        </p>
        <p className="section-body">
          [Placeholder] Add a second paragraph here if you'd like — maybe something
          about your career path, your hobbies (3D printing, cooking, corgis?), or
          what you're currently working on.
        </p>
      </section>

      <section className="container home-section">
        <h2 className="section-title">Why This Site Exists</h2>
        <p className="section-body">
          [Placeholder] Describe the purpose of your site — a home base for your resume,
          a place to share projects, recipes, recommendations, and life updates, or
          simply a corner of the internet that's entirely yours. Make it personal.
        </p>
      </section>

      <section className="container home-section">
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-body">
          Find me around the web, or send a payment my way — links below are
          placeholders, swap them for your real profiles in <code>src/siteConfig.js</code>.
        </p>
        <SocialLinks className="home-social" />
      </section>
    </div>
  );
}
