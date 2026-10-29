/** Flat vector courier on a scooter, drawn for the delivery banner. */
export function ScooterArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 300"
      className={className}
      role="img"
      aria-label="Tasty Bites delivery courier riding a scooter with a branded delivery box"
    >
      {/* speed lines */}
      <g stroke="rgba(0,0,0,0.22)" strokeWidth="6" strokeLinecap="round">
        <path d="M14 116h58" />
        <path d="M2 152h40" />
        <path d="M22 188h54" />
      </g>

      {/* ground shadow */}
      <ellipse cx="250" cy="272" rx="186" ry="13" fill="rgba(0,0,0,0.16)" />

      {/* rear wheel */}
      <circle cx="128" cy="242" r="46" fill="#171717" />
      <circle cx="128" cy="242" r="27" fill="#EDEDED" />
      <circle cx="128" cy="242" r="10" fill="#171717" />
      {/* front wheel */}
      <circle cx="370" cy="242" r="46" fill="#171717" />
      <circle cx="370" cy="242" r="27" fill="#EDEDED" />
      <circle cx="370" cy="242" r="10" fill="#171717" />

      {/* rear cowl */}
      <path d="M98 216c-13-27 0-52 30-58h86c26 0 38 19 33 38l-4 20H98Z" fill="#FF9800" />
      {/* floorboard */}
      <path d="M96 216h192l20 22H110Z" fill="#E07E00" />
      {/* seat */}
      <rect x="132" y="146" width="116" height="20" rx="10" fill="#171717" />

      {/* front leg shield */}
      <path d="M262 216c22-20 40-56 52-88l30 11c-12 42-30 74-48 96Z" fill="#FFB02E" />
      {/* front fork */}
      <path d="M352 130 370 200" stroke="#CFCFCF" strokeWidth="9" strokeLinecap="round" />
      {/* front fender */}
      <path d="M320 200a48 48 0 0 1 92 14l-13 4a35 35 0 0 0-67-11Z" fill="#FF9800" />
      {/* headlight */}
      <circle cx="352" cy="142" r="9" fill="#FFF6E0" />
      {/* handlebar */}
      <path d="M340 126 384 114" stroke="#171717" strokeWidth="10" strokeLinecap="round" />
      {/* mirror */}
      <path d="M374 108v-16" stroke="#171717" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="374" cy="88" rx="9" ry="6" fill="#171717" />

      {/* delivery box */}
      <rect x="86" y="92" width="112" height="90" rx="12" fill="#141414" stroke="#FF9800" strokeWidth="3" />
      <text
        x="142"
        y="128"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontSize="17"
        fontWeight="700"
        letterSpacing="1"
        fill="#FFFFFF"
      >
        TASTY
      </text>
      <text
        x="142"
        y="150"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontSize="17"
        fontWeight="700"
        letterSpacing="1"
        fill="#FF9800"
      >
        BITES
      </text>
      <path d="M110 164h64" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round" />

      {/* rider leg */}
      <path d="M206 150 220 198 250 210" stroke="#262626" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M236 206h34" stroke="#101010" strokeWidth="12" strokeLinecap="round" />
      {/* rider torso */}
      <path d="M196 158c-12-38 2-66 30-74l22 12c8 26 4 50-2 66Z" fill="#1B1B1B" />
      {/* rider arm */}
      <path d="M232 96 358 120" stroke="#1B1B1B" strokeWidth="18" strokeLinecap="round" />
      <circle cx="360" cy="121" r="9" fill="#FFB02E" />
      {/* helmet */}
      <circle cx="258" cy="70" r="27" fill="#1B1B1B" />
      <path d="M262 50a24 24 0 0 1 20 26l-31-5Z" fill="#FF9800" />
      {/* collar */}
      <path d="M234 92 214 108" stroke="#FFB02E" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
