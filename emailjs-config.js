// ---------------------------------------------------------------------------
// EmailJS setup for social-link click notifications.
//
// Loaded via a plain <script> tag in public/index.html (after the EmailJS
// CDN script), so window.emailjs is already available here. See
// SETUP-EMAILJS.md in the project root for the full one-time account setup.
//
// Fill in the three REPLACE_ME values below with the keys from your
// EmailJS dashboard (Account > General for the public key, Email Services
// for the service ID, Email Templates for the template ID).
// ---------------------------------------------------------------------------

window.emailjsConfig = {
  publicKey: 'mQ-zhTodZudIEQE6P',
  serviceId: 'service_317d2vx',
  templateId: 'template_ooc6e6k',
};

(function () {
  var configured = window.emailjsConfig.publicKey !== 'REPLACE_ME';
  if (configured && window.emailjs) {
    window.emailjs.init({ publicKey: window.emailjsConfig.publicKey });
  }

  // Called by SocialLinks whenever a signed-in visitor clicks a social badge.
  // Fails silently (just logs) if EmailJS hasn't been configured yet, so a
  // missing setup step never breaks the actual link-opening behavior.
  window.notifySocialClick = function notifySocialClick(platform, user) {
    if (!configured || !window.emailjs) {
      console.warn('EmailJS is not configured yet — skipping click notification email.');
      return Promise.resolve();
    }
    return window.emailjs
      .send(window.emailjsConfig.serviceId, window.emailjsConfig.templateId, {
        platform: platform,
        visitor_email: (user && user.email) || 'unknown',
        visitor_name: (user && user.displayName) || '(no name set)',
        clicked_at: new Date().toLocaleString(),
      })
      .catch(function (err) {
        console.error('Failed to send social-click notification email:', err);
      });
  };
})();
