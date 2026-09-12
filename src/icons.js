/**
 * icons.js
 * ---------------------------------------------------------------------------
 * Small library of inline SVG icons used across the site.
 * Kept as plain template strings (no build step, no icon font) so every
 * page can drop `${ICONS.shield}` straight into its markup.
 * All icons inherit color via `currentColor` so they follow their
 * surrounding text/badge color automatically.
 */
const ICONS = {
  // Brand mark: a magnifying glass with a checkmark, used in the navbar,
  // footer and auth screens. Uses a blue -> mint gradient like the Figma logo.
  logo: `
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="brand__mark">
      <defs>
        <linearGradient id="logoGradient" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#3372B8"/>
          <stop offset="1" stop-color="#48BAA4"/>
        </linearGradient>
      </defs>
      <circle cx="17" cy="17" r="12" stroke="url(#logoGradient)" stroke-width="3.4"/>
      <line x1="26" y1="26" x2="35" y2="35" stroke="url(#logoGradient)" stroke-width="4" stroke-linecap="round"/>
      <path d="M11.5 17.5L15 21L23 12.5" stroke="url(#logoGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

  shield: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  document: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12h6M9 16h6M9 8h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,

  documentCheck: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.5 13l2 2 4-4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  brain: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M9 4a3 3 0 00-3 3v.3A3 3 0 004 10v1a3 3 0 001 2.2V15a3 3 0 003 3h1M15 4a3 3 0 013 3v.3A3 3 0 0120 10v1a3 3 0 01-1 2.2V15a3 3 0 01-3 3h-1M9 4v14M15 4v14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  link: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M9 15l6-6M10 6l1-1a4 4 0 015.5 5.5l-1 1M14 18l-1 1A4 4 0 017.5 13.5l1-1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  mail: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  lock: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" stroke-width="1.6"/></svg>`,

  eye: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/></svg>`,

  user: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><circle cx="12" cy="8" r="3.4" stroke="currentColor" stroke-width="1.6"/><path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  checkCircle: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 12.5l2.3 2.3L16 10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  circleInfo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 11v5M12 8v.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,

  chart: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M4 20V4M4 20h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><rect x="7" y="13" width="2.6" height="5" fill="currentColor"/><rect x="12" y="9" width="2.6" height="9" fill="currentColor"/><rect x="17" y="6" width="2.6" height="12" fill="currentColor"/></svg>`,

  bookmark: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M6 3h12v18l-6-4-6 4V3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,

  bookmarkOff: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M6 3h12v18l-6-4-6 4V3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M4 4l16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,

  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  edit: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M4 20h4l10-10-4-4L4 16v4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,

  flag: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M5 21V4h13l-3 4 3 4H5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,

  thumbsUp: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M7 11v9H4v-9h3zm0 0l4-7a2 2 0 012 2v4h4.5a2 2 0 011.9 2.7l-2 6A2 2 0 0115.5 20H7" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,

  bulb: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,

  chat: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M4 5h16v11H8l-4 4V5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,

  building: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M4 21V6l8-3 8 3v15M4 21h16M9 21v-5h6v5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,

  globe: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" stroke="currentColor" stroke-width="1.6"/></svg>`,

  newspaper: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><rect x="3" y="5" width="14" height="14" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M17 8h4v10a2 2 0 01-2 2h-2" stroke="currentColor" stroke-width="1.6"/><path d="M6 9h8M6 12h8M6 15h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,

  linkedin: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M7.5 10v6.5M7.5 7.6v.1M11 16.5V10M11 12.7c0-1.5 1-2.7 2.5-2.7s2.5 1.2 2.5 2.7v3.8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,

  twitter: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M20 6.5c-.6.3-1.3.5-2 .6a3.3 3.3 0 001.5-1.8c-.7.4-1.4.7-2.2.9a3.4 3.4 0 00-5.8 3.1A9.7 9.7 0 014.1 5.9a3.4 3.4 0 001.1 4.6c-.6 0-1.1-.2-1.6-.4v.1c0 1.7 1.2 3 2.8 3.4-.5.1-1 .2-1.6.1.4 1.4 1.7 2.4 3.3 2.4A6.9 6.9 0 014 17.5a9.7 9.7 0 005.3 1.6c6.4 0 9.9-5.3 9.9-9.9v-.5c.7-.5 1.3-1.1 1.8-1.8z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/></svg>`,

  google: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M22 12.2c0-.7-.1-1.4-.2-2H12v4h5.6c-.2 1.3-1 2.4-2.1 3.2v2.6h3.4c2-1.8 3.1-4.5 3.1-7.8z" fill="#4285F4"/><path d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7A10 10 0 0012 22z" fill="#34A853"/><path d="M6.2 13.6a6 6 0 010-3.8V7.1H2.7a10 10 0 000 9l3.5-2.5z" fill="#FBBC05"/><path d="M12 6.1c1.5 0 2.9.5 4 1.5l3-3A10 10 0 002.7 7.1l3.5 2.7c.8-2.4 3.1-3.7 5.8-3.7z" fill="#EA4335"/></svg>`,
};
export { ICONS };
