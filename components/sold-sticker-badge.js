import { useId } from 'react'

function SoldStickerBadge({ className = '' }) {
  const id = useId().replace(/:/g, '')
  const grainId = `sold-stamp-grain-${id}`
  const distressMaskId = `sold-stamp-distress-${id}`

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-label="Sold out"
      role="img"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        className="h-full w-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.28)]"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern
            id={grainId}
            patternUnits="userSpaceOnUse"
            width="85"
            height="85"
          >
            <circle cx="12" cy="16" r="3" fill="#000" opacity="0.35" />
            <circle cx="46" cy="30" r="2" fill="#000" opacity="0.28" />
            <circle cx="70" cy="12" r="2.5" fill="#000" opacity="0.3" />
            <rect
              x="22"
              y="60"
              width="22"
              height="3"
              fill="#000"
              opacity="0.25"
              transform="rotate(-18 22 60)"
            />
            <rect
              x="58"
              y="54"
              width="14"
              height="2"
              fill="#000"
              opacity="0.3"
              transform="rotate(22 58 54)"
            />
            <circle cx="63" cy="72" r="2" fill="#000" opacity="0.24" />
          </pattern>

          <mask id={distressMaskId}>
            <rect width="1000" height="1000" fill="#fff" />
            <rect
              width="1000"
              height="1000"
              fill={`url(#${grainId})`}
              opacity="0.6"
            />
          </mask>
        </defs>

        <g
          mask={`url(#${distressMaskId})`}
          fill="none"
          stroke="#ff1f1f"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="500" cy="500" r="360" strokeWidth="12" />
          <circle cx="500" cy="500" r="335" strokeWidth="5" />
          <circle cx="500" cy="500" r="245" strokeWidth="5" />

          <g transform="rotate(-15 500 500)">
            <rect x="80" y="405" width="840" height="190" fill="transparent" />
            <line x1="80" y1="405" x2="920" y2="405" strokeWidth="12" />
            <line x1="80" y1="595" x2="920" y2="595" strokeWidth="12" />
            <circle cx="115" cy="500" r="16" fill="#ff1f1f" stroke="none" />
            <circle cx="885" cy="500" r="16" fill="#ff1f1f" stroke="none" />
            <text
              x="500"
              y="548"
              fill="#ff1f1f"
              stroke="none"
              fontFamily="Arial Narrow, Roboto Condensed, Arial, sans-serif"
              fontSize="145"
              fontWeight="900"
              letterSpacing="8"
              textAnchor="middle"
            >
              SOLD OUT
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default SoldStickerBadge
