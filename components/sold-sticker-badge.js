import { useId } from 'react'

function SoldStickerBadge({ className = '' }) {
  const id = useId().replace(/:/g, '')
  const gradientId = `sold-sticker-gradient-${id}`
  const arcId = `sold-sticker-arc-${id}`
  const shadowId = `sold-sticker-shadow-${id}`

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-label="GIRIXCO sold out"
      role="img"
    >
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)]"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="22" y1="14" x2="98" y2="106">
            <stop offset="0%" stopColor="#ff7a2f" />
            <stop offset="48%" stopColor="#ef3f24" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#7f1d1d" floodOpacity="0.35" />
          </filter>
          <path id={arcId} d="M 21 57 A 39 39 0 0 1 99 57" />
        </defs>

        <ellipse
          cx="60"
          cy="62"
          rx="46"
          ry="42"
          fill={`url(#${gradientId})`}
          filter={`url(#${shadowId})`}
        />
        <ellipse
          cx="60"
          cy="62"
          rx="40"
          ry="36"
          fill="none"
          stroke="#fde68a"
          strokeWidth="3"
          strokeDasharray="5 4"
        />
        <ellipse
          cx="60"
          cy="62"
          rx="48"
          ry="44"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
        />

        <text
          fill="#fff7d6"
          fontFamily="Arial Black, Arial, sans-serif"
          fontSize="17"
          fontWeight="900"
          letterSpacing="2.2"
          textAnchor="middle"
          stroke="#8f1d13"
          strokeWidth="1.2"
          paintOrder="stroke fill"
        >
          <textPath href={`#${arcId}`} startOffset="50%">
            GIRIXCO
          </textPath>
        </text>

        <text
          x="60"
          y="70"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Arial Black, Arial, sans-serif"
          fontSize="16"
          fontWeight="900"
          letterSpacing="1.4"
          stroke="#991b1b"
          strokeWidth="1"
          paintOrder="stroke fill"
        >
          SOLD OUT!
        </text>
        <text
          x="60"
          y="86"
          textAnchor="middle"
          fill="#fde68a"
          fontFamily="Arial, sans-serif"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1"
        >
          OFFICIAL STICKER
        </text>

        <path
          d="M 91 88 Q 101 86 105 76 L 105 96 Q 98 93 91 88 Z"
          fill="#fff7d6"
          opacity="0.95"
        />
        <path
          d="M 92 88 Q 99 86 104 78"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}

export default SoldStickerBadge
