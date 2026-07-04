import React from 'react';
import siteConfig from '../siteConfig';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  BlueskyIcon,
  SnapchatIcon,
  TikTokIcon,
  VenmoIcon,
  EmailIcon,
} from './icons';
import './SocialLinks.css';

const items = [
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
  { key: 'bluesky', label: 'Bluesky', Icon: BlueskyIcon },
  { key: 'snapchat', label: 'Snapchat', Icon: SnapchatIcon },
  { key: 'tiktok', label: 'TikTok', Icon: TikTokIcon },
  { key: 'venmo', label: 'Venmo', Icon: VenmoIcon },
  { key: 'email', label: 'Email', Icon: EmailIcon },
];

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`social-links ${className}`}>
      {items.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={siteConfig.social[key]}
          target={key === 'email' ? undefined : '_blank'}
          rel="noopener noreferrer"
          className={`social-badge social-badge--${key}`}
          aria-label={label}
          title={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
