// Central place to update your real links, name, and blurb.
// Swap the placeholder values below with your actual info — every page
// that needs this data pulls from here.

const siteConfig = {
  name: 'Madison K. Boudreaux',
  tagline: 'Welcome to my corner of the internet.',

  social: {
    facebook: 'https://facebook.com/your-handle',
    instagram: 'https://instagram.com/your-handle',
    linkedin: 'https://linkedin.com/in/your-handle',
    bluesky: 'https://bsky.app/profile/your-handle',
    snapchat: 'https://snapchat.com/add/your-handle',
    tiktok: 'https://tiktok.com/@your-handle',
    venmo: 'https://venmo.com/your-handle',
    email: 'mailto:you@example.com',
  },

  resume: {
    pdfPath: `${process.env.PUBLIC_URL}/resume.pdf`,
  },
};

export default siteConfig;
