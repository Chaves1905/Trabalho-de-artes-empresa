import type { FrameColor } from '../types'

type Props = {
  color: FrameColor
  tilt: { x: number; y: number }
}

export function Glasses({ color, tilt }: Props) {
  return (
    <svg
      viewBox="0 0 640 280"
      role="img"
      aria-label="Óculos Visora"
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <defs>
        <linearGradient id="lensGlow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color.accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor="#081018" stopOpacity="0.85" />
        </linearGradient>
        <filter id="soft">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <ellipse cx="320" cy="250" rx="180" ry="12" fill="#000" opacity="0.35" />
      <path
        d="M118 118c70-38 334-38 404 0"
        fill="none"
        stroke={color.hex === '#d7e7f5' ? '#9bb4c8' : '#1a2430'}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect x="28" y="104" width="86" height="14" rx="7" fill={color.hex} stroke={color.accent} />
      <rect x="526" y="104" width="86" height="14" rx="7" fill={color.hex} stroke={color.accent} />
      <rect x="92" y="78" width="196" height="108" rx="36" fill={color.hex} stroke={color.accent} strokeWidth="3" />
      <rect x="352" y="78" width="196" height="108" rx="36" fill={color.hex} stroke={color.accent} strokeWidth="3" />
      <rect x="292" y="112" width="56" height="16" rx="8" fill={color.hex} stroke={color.accent} />
      <rect x="108" y="92" width="164" height="80" rx="28" fill="url(#lensGlow)" />
      <rect x="368" y="92" width="164" height="80" rx="28" fill="url(#lensGlow)" />
      <path d="M124 118h90" stroke={color.accent} strokeWidth="1.4" opacity="0.8" />
      <path d="M384 132h78" stroke={color.accent} strokeWidth="1.4" opacity="0.8" />
      <circle cx="150" cy="148" r="4" fill={color.accent} filter="url(#soft)" />
      <circle cx="490" cy="148" r="4" fill={color.accent} />
      <text x="130" y="138" fill={color.accent} fontSize="11" fontFamily="Share Tech Mono, monospace">
        HUD LIVE
      </text>
      <text x="390" y="152" fill={color.accent} fontSize="11" fontFamily="Share Tech Mono, monospace">
        IA 98.4%
      </text>
    </svg>
  )
}
