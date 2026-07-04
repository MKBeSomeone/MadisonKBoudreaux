import React from 'react';

// Lightweight, hand-drawn glyphs (no icon library dependency) used for
// the social/contact badges. Simplified line-art rather than exact brand
// marks, styled to match the site's rounded, playful aesthetic.

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const FacebookIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M15 8.5h2V5h-2c-2.2 0-4 1.8-4 4v2H9v3.5h2V21h3v-6.5h2.5L17 11h-3V9c0-.3.2-.5.5-.5z" fill="currentColor" stroke="none" />
  </svg>
);

export const InstagramIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const LinkedInIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
    <circle cx="7.5" cy="7.3" r="0.9" fill="currentColor" stroke="none" />
    <path d="M11 16.5v-4c0-1.2 1-2 2.2-2 1.2 0 2.1.8 2.1 2v4" />
    <line x1="11" y1="10.5" x2="11" y2="16.5" />
  </svg>
);

export const BlueskyIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 8.5c-1-2-3.4-4-5.6-4-1.4 0-2.4.8-2.4 2.2 0 2.6 3.3 5.7 8 8.3 4.7-2.6 8-5.7 8-8.3 0-1.4-1-2.2-2.4-2.2-2.2 0-4.6 2-5.6 4z" />
  </svg>
);

export const SnapchatIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 4c-2.8 0-4.3 2-4.3 4.4 0 1 0 2-.2 2.6-.3.7-1.2 1-2 1.2-.3.1-.3.6 0 .8.6.4 1.6.7 1.9 1.2.2.4-.1.9-.4 1.3-.2.3 0 .6.4.6.7 0 1.3.3 1.7 1 .5.9 1.6 1.4 2.9 1.4s2.4-.5 2.9-1.4c.4-.7 1-1 1.7-1 .4 0 .6-.3.4-.6-.3-.4-.6-.9-.4-1.3.3-.5 1.3-.8 1.9-1.2.3-.2.3-.7 0-.8-.8-.2-1.7-.5-2-1.2-.2-.6-.2-1.6-.2-2.6C16.3 6 14.8 4 12 4z" />
  </svg>
);

export const TikTokIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M14 4v10.2a2.6 2.6 0 1 1-2.2-2.57" />
    <path d="M14 4c.3 2 1.8 3.5 3.8 3.7" />
  </svg>
);

export const VenmoIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M16.5 5c.6 1 .9 2.1.9 3.4 0 4.3-3.7 9.9-6.7 13.6H7l-2.4-14 3.6-.3 1.3 10c1.9-3.1 3.4-6 3.4-8.1 0-1.1-.2-1.9-.5-2.6z" fill="currentColor" stroke="none" />
  </svg>
);

export const EmailIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="M4.5 7 12 13l7.5-6" />
  </svg>
);
