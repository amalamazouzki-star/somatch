export type SocialNetwork = "google" | "instagram" | "tiktok";

export function SocialLogo({ network }: { network: SocialNetwork }) {
  if (network === "google") {
    return (
      <svg className="social-logo" viewBox="0 0 18 18" aria-hidden="true">
        <path fill="#4285f4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.714v2.258h2.909c1.702-1.567 2.684-3.874 2.684-6.613Z" />
        <path fill="#34a853" d="M9 18c2.43 0 4.467-.806 5.956-2.182l-2.91-2.258c-.805.54-1.835.86-3.046.86-2.344 0-4.328-1.584-5.037-3.711H.956v2.332A9 9 0 0 0 9 18Z" />
        <path fill="#fbbc05" d="M3.963 10.709A5.42 5.42 0 0 1 3.68 9c0-.593.102-1.17.283-1.709V4.959H.956A9 9 0 0 0 0 9c0 1.45.347 2.824.956 4.041l3.007-2.332Z" />
        <path fill="#ea4335" d="M9 3.58c1.322 0 2.508.455 3.442 1.346l2.581-2.582C13.463.891 11.427 0 9 0A9 9 0 0 0 .956 4.959l3.007 2.332C4.672 5.164 6.656 3.58 9 3.58Z" />
      </svg>
    );
  }

  if (network === "instagram") {
    return (
      <svg className="social-logo" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="instagram-login-gradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffcc55" />
            <stop offset=".34" stopColor="#ff543e" />
            <stop offset=".67" stopColor="#c837ab" />
            <stop offset="1" stopColor="#6b4bdb" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="22" height="22" rx="6.5" fill="url(#instagram-login-gradient)" />
        <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="16.7" cy="7.4" r="1.1" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg className="social-logo" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#25f4ee" d="M13.9 3.5v10.1a4.1 4.1 0 1 1-3.3-4v2.6a1.7 1.7 0 1 0 .8 1.4V2.8h2.5c.4 2.1 1.8 3.4 3.9 3.9v2.5a7.7 7.7 0 0 1-3.9-1.6Z" />
      <path fill="#fe2c55" d="M15.1 2.8v10.1a4.1 4.1 0 1 1-3.3-4v2.6a1.7 1.7 0 1 0 .8 1.4V2.1h2.5c.4 2.1 1.8 3.4 3.9 3.9v2.5a7.7 7.7 0 0 1-3.9-1.6Z" />
      <path fill="#fff" d="M14.5 3.1v10.1a4.1 4.1 0 1 1-3.3-4v2.6a1.7 1.7 0 1 0 .8 1.4V2.4h2.5c.4 2.1 1.8 3.4 3.9 3.9v2.5a7.7 7.7 0 0 1-3.9-1.6Z" />
    </svg>
  );
}
