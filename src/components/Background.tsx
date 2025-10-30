export default function Background() {
  return (
    <div className="site-bg pointer-events-none -z-10 fixed inset-0">
      <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#FFF9F2" />
            <stop offset="100%" stopColor="#FEF5EE" />
          </linearGradient>
          <radialGradient id="r1" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#F3EAF8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F3EAF8" stopOpacity="0" />
          </radialGradient>
          <filter id="blurTiny">
            <feGaussianBlur stdDeviation="24" />
          </filter>
        </defs>

        {/* Base cream wash */}
        <rect width="100%" height="100%" fill="url(#g1)" />

        {/* Soft lavender pools that drift slowly */}
        <g className="bg-animate-drift" style={{ transformOrigin: '50% 50%' }}>
          <ellipse cx="420" cy="220" rx="420" ry="260" fill="url(#r1)" filter="url(#blurTiny)" />
          <ellipse cx="1080" cy="600" rx="420" ry="260" fill="url(#r1)" filter="url(#blurTiny)" />
        </g>

        {/* Decorative gold filigree (very subtle) */}
        <g className="filigree-anim" fill="none" stroke="#D99B2A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.06">
          <path d="M120 760 C 260 640, 380 640, 520 760 S 780 880, 980 760 S 1300 640, 1440 760" />
          <path d="M0 120 C 180 40, 360 40, 540 120 S 900 240, 1260 120" />
        </g>

        {/* subtle shining ellipse */}
        <ellipse cx="1120" cy="160" rx="220" ry="60" fill="#FDBE3B" opacity="0.035" />
      </svg>
    </div>
  );
}
