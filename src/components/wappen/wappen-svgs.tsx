'use client';

type WappenProps = { size: number };

// Common shield clip path used by all Wappen
// A rounded-top rectangle tapering to a point at the bottom
const SHIELD_PATH = 'M 3,1 Q 1,1 1,3 L 1,14 Q 1,18 5,21 L 12,26 L 19,21 Q 23,18 23,14 L 23,3 Q 23,1 21,1 Z';
const VIEWBOX = '0 0 24 27';

function ShieldClip({ id }: { id: string }) {
  return (
    <defs>
      <clipPath id={id}>
        <path d={SHIELD_PATH} />
      </clipPath>
    </defs>
  );
}

function ShieldOutline() {
  return <path d={SHIELD_PATH} fill="none" stroke="#1a1a1a" strokeWidth="0.6" strokeLinejoin="round" />;
}

// 1. Baden-Württemberg: Gold shield with 3 black lions stacked
export function BadenWuerttemberg({ size }: WappenProps) {
  const id = 'bw-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="24" height="27" fill="#FFD700" />
        {/* Three simplified lion silhouettes */}
        {[5, 11, 17].map((y, i) => (
          <g key={i} transform={`translate(12, ${y})`}>
            {/* Lion body */}
            <ellipse cx="0" cy="0" rx="5" ry="2.2" fill="#1a1a1a" />
            {/* Lion head */}
            <circle cx="-4" cy="-1.5" r="1.8" fill="#1a1a1a" />
            {/* Tail */}
            <path d="M 4,-1 Q 6,-3 5,-4" stroke="#1a1a1a" strokeWidth="0.8" fill="none" />
          </g>
        ))}
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 2. Bayern: Blue and white diamond/lozenge pattern (Rautenmuster)
export function Bayern({ size }: WappenProps) {
  const id = 'by-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="24" height="27" fill="#FFFFFF" />
        {/* Diamond pattern (Rautenmuster) */}
        {Array.from({ length: 8 }, (_, row) =>
          Array.from({ length: 6 }, (_, col) => {
            const isBlue = (row + col) % 2 === 0;
            if (!isBlue) return null;
            const x = col * 4 + (row % 2 === 0 ? 0 : 2) - 2;
            const y = row * 3.5 - 1;
            return (
              <polygon
                key={`${row}-${col}`}
                points={`${x},${y + 1.75} ${x + 2},${y} ${x + 4},${y + 1.75} ${x + 2},${y + 3.5}`}
                fill="#0066B3"
              />
            );
          })
        )}
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 3. Berlin: White shield with black bear standing upright
export function Berlin({ size }: WappenProps) {
  const id = 'be-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="24" height="27" fill="#FFFFFF" />
        {/* Red top and bottom stripe */}
        <rect x="0" y="0" width="24" height="4" fill="#DD0000" />
        <rect x="0" y="22" width="24" height="5" fill="#DD0000" />
        {/* Bear standing upright */}
        <g transform="translate(12, 13)">
          {/* Body */}
          <ellipse cx="0" cy="2" rx="3.5" ry="5" fill="#1a1a1a" />
          {/* Head */}
          <circle cx="0" cy="-4.5" r="2.5" fill="#1a1a1a" />
          {/* Ears */}
          <circle cx="-1.8" cy="-6.2" r="0.8" fill="#1a1a1a" />
          <circle cx="1.8" cy="-6.2" r="0.8" fill="#1a1a1a" />
          {/* Snout */}
          <ellipse cx="0" cy="-3.8" rx="1" ry="0.6" fill="#666" />
          {/* Arms */}
          <path d="M -3,0 L -5.5,-2" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 3,0 L 5.5,-2" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
          {/* Legs */}
          <path d="M -2,6 L -2.5,8" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 2,6 L 2.5,8" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
          {/* Claws */}
          <line x1="-5.5" y1="-2" x2="-6.2" y2="-2.8" stroke="#DD0000" strokeWidth="0.5" />
          <line x1="5.5" y1="-2" x2="6.2" y2="-2.8" stroke="#DD0000" strokeWidth="0.5" />
        </g>
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 4. Brandenburg: White shield with red eagle
export function Brandenburg({ size }: WappenProps) {
  const id = 'bb-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="24" height="27" fill="#FFFFFF" />
        {/* Red eagle */}
        <g transform="translate(12, 13)">
          {/* Body */}
          <ellipse cx="0" cy="2" rx="3" ry="5" fill="#DD0000" />
          {/* Head */}
          <circle cx="0" cy="-4" r="2" fill="#DD0000" />
          {/* Beak */}
          <polygon points="0,-5 1.5,-6.5 0,-6" fill="#FFD700" />
          {/* Wings spread */}
          <path d="M -3,0 Q -8,-3 -9,-7 L -6,-4 Q -4,-2 -3,0" fill="#DD0000" />
          <path d="M 3,0 Q 8,-3 9,-7 L 6,-4 Q 4,-2 3,0" fill="#DD0000" />
          {/* Tail feathers */}
          <path d="M -1.5,7 L 0,9 L 1.5,7" fill="#DD0000" />
          {/* Claws */}
          <path d="M -2,6 L -3,8.5 M -2,6 L -1,8.5" stroke="#FFD700" strokeWidth="0.5" fill="none" />
          <path d="M 2,6 L 3,8.5 M 2,6 L 1,8.5" stroke="#FFD700" strokeWidth="0.5" fill="none" />
        </g>
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 5. Bremen: White shield with silver/red key (Bremer Schluessel)
export function Bremen({ size }: WappenProps) {
  const id = 'hb-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="24" height="27" fill="#FFFFFF" />
        {/* Key (Bremer Schluessel) */}
        <g transform="translate(12, 13.5)">
          {/* Key shaft */}
          <rect x="-0.6" y="-4" width="1.2" height="14" rx="0.3" fill="#DD0000" />
          {/* Key head (oval) */}
          <ellipse cx="0" cy="-6.5" rx="3" ry="3" fill="none" stroke="#DD0000" strokeWidth="1.2" />
          <ellipse cx="0" cy="-6.5" rx="1.2" ry="1.2" fill="#FFFFFF" stroke="#DD0000" strokeWidth="0.6" />
          {/* Key teeth */}
          <rect x="0.6" y="6" width="2" height="0.8" fill="#DD0000" />
          <rect x="0.6" y="8" width="1.5" height="0.8" fill="#DD0000" />
          <rect x="0.6" y="4" width="1.5" height="0.8" fill="#DD0000" />
        </g>
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 6. Hamburg: White shield with red castle/gate (Hamburger Tor)
export function Hamburg({ size }: WappenProps) {
  const id = 'hh-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="24" height="27" fill="#FFFFFF" />
        {/* Castle gate */}
        <g transform="translate(12, 14)">
          {/* Main gate arch */}
          <rect x="-7" y="-2" width="14" height="10" fill="#DD0000" />
          {/* Gate opening */}
          <path d="M -2.5,8 L -2.5,2 Q -2.5,-1 0,-1 Q 2.5,-1 2.5,2 L 2.5,8" fill="#FFFFFF" />
          {/* Left tower */}
          <rect x="-8.5" y="-8" width="3.5" height="16" fill="#DD0000" />
          {/* Right tower */}
          <rect x="5" y="-8" width="3.5" height="16" fill="#DD0000" />
          {/* Tower roofs (pointed) */}
          <polygon points="-8.5,-8 -6.75,-12 -5,-8" fill="#DD0000" />
          <polygon points="5,-8 6.75,-12 8.5,-8" fill="#DD0000" />
          {/* Cross on top */}
          <line x1="-6.75" y1="-12" x2="-6.75" y2="-14" stroke="#DD0000" strokeWidth="0.5" />
          <line x1="-7.5" y1="-13" x2="-6" y2="-13" stroke="#DD0000" strokeWidth="0.5" />
          <line x1="6.75" y1="-12" x2="6.75" y2="-14" stroke="#DD0000" strokeWidth="0.5" />
          <line x1="6" y1="-13" x2="7.5" y2="-13" stroke="#DD0000" strokeWidth="0.5" />
          {/* Star above gate */}
          <polygon points="0,-5 0.5,-3.5 2,-3.5 0.8,-2.5 1.2,-1 0,-1.8 -1.2,-1 -0.8,-2.5 -2,-3.5 -0.5,-3.5" fill="#FFFFFF" />
          {/* Windows on towers */}
          <rect x="-7.5" y="-5" width="1.5" height="1.5" rx="0.3" fill="#FFFFFF" />
          <rect x="6" y="-5" width="1.5" height="1.5" rx="0.3" fill="#FFFFFF" />
        </g>
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 7. Hessen: Blue and red striped shield with white lion
export function Hessen({ size }: WappenProps) {
  const id = 'he-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        {/* Blue and red alternating horizontal stripes */}
        {Array.from({ length: 10 }, (_, i) => (
          <rect
            key={i}
            x="0"
            y={i * 2.7}
            width="24"
            height="2.7"
            fill={i % 2 === 0 ? '#003DA5' : '#DD0000'}
          />
        ))}
        {/* White lion rampant (simplified) */}
        <g transform="translate(12, 13)">
          {/* Body */}
          <ellipse cx="0" cy="1" rx="4" ry="5.5" fill="#FFFFFF" />
          {/* Head */}
          <circle cx="0" cy="-5.5" r="2.5" fill="#FFFFFF" />
          {/* Crown hint */}
          <polygon points="-1.5,-8 -0.8,-7 0,-8 0.8,-7 1.5,-8" fill="#FFD700" />
          {/* Front legs raised */}
          <path d="M -3,-1 L -5.5,-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 3,-1 L 5.5,-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          {/* Hind legs */}
          <path d="M -2,5 L -3,8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 2,5 L 3,8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          {/* Tail */}
          <path d="M 2,5 Q 5,3 5,0" stroke="#FFFFFF" strokeWidth="1" fill="none" />
        </g>
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 8. Mecklenburg-Vorpommern: Shield split - left golden bull head on blue, right red griffin on gold
export function MecklenburgVorpommern({ size }: WappenProps) {
  const id = 'mv-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        {/* Left half: blue background */}
        <rect x="0" y="0" width="12" height="27" fill="#003DA5" />
        {/* Right half: gold background */}
        <rect x="12" y="0" width="12" height="27" fill="#FFD700" />
        {/* Left: Bull head */}
        <g transform="translate(6, 13)">
          <ellipse cx="0" cy="0" rx="3" ry="3.5" fill="#FFD700" />
          {/* Horns */}
          <path d="M -2,-2.5 Q -4,-5 -3,-7" stroke="#FFD700" strokeWidth="0.8" fill="none" />
          <path d="M 2,-2.5 Q 4,-5 3,-7" stroke="#FFD700" strokeWidth="0.8" fill="none" />
          {/* Nostrils */}
          <circle cx="-0.8" cy="1.5" r="0.4" fill="#003DA5" />
          <circle cx="0.8" cy="1.5" r="0.4" fill="#003DA5" />
          {/* Eyes */}
          <circle cx="-1.2" cy="-0.8" r="0.3" fill="#003DA5" />
          <circle cx="1.2" cy="-0.8" r="0.3" fill="#003DA5" />
        </g>
        {/* Right: Red griffin */}
        <g transform="translate(18, 13)">
          <ellipse cx="0" cy="1" rx="2.5" ry="4" fill="#DD0000" />
          <circle cx="0" cy="-3.5" r="1.5" fill="#DD0000" />
          {/* Beak */}
          <polygon points="0,-4.5 1.5,-5.5 0,-5" fill="#FFD700" />
          {/* Wing */}
          <path d="M -2,0 Q -4,-2 -4.5,-5" stroke="#DD0000" strokeWidth="1" fill="none" />
          {/* Tail */}
          <path d="M 1,4 Q 2,6 1,7" stroke="#DD0000" strokeWidth="0.8" fill="none" />
        </g>
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 9. Niedersachsen: Red shield with white horse (Sachsenross)
export function Niedersachsen({ size }: WappenProps) {
  const id = 'ni-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="24" height="27" fill="#DD0000" />
        {/* White horse (Sachsenross) rearing */}
        <g transform="translate(12, 13)">
          {/* Body */}
          <ellipse cx="-1" cy="1" rx="4.5" ry="3.5" fill="#FFFFFF" transform="rotate(-15)" />
          {/* Neck */}
          <path d="M 1,-2 Q 2,-6 1,-8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Head */}
          <ellipse cx="1.5" cy="-9" rx="2" ry="1.3" fill="#FFFFFF" transform="rotate(-10, 1.5, -9)" />
          {/* Ear */}
          <polygon points="1,-10 1.5,-11.5 2,-10" fill="#FFFFFF" />
          {/* Eye */}
          <circle cx="2.5" cy="-9.2" r="0.3" fill="#DD0000" />
          {/* Front legs (rearing up) */}
          <path d="M 1,0 Q 3,-3 4,-5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M 2,1 Q 4,-1 5.5,-3" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          {/* Hind legs */}
          <path d="M -4,3 L -5,7" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M -3,4 L -3,8" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          {/* Tail */}
          <path d="M -5,2 Q -7,1 -8,3" stroke="#FFFFFF" strokeWidth="1" fill="none" />
          {/* Mane */}
          <path d="M 0,-4 Q -1,-5 0,-7" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />
        </g>
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 10. Nordrhein-Westfalen: Shield split in 3 - Rhine wave, white horse, red rose
export function NordrheinWestfalen({ size }: WappenProps) {
  const id = 'nw-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        {/* Left: green/white Rhine wave */}
        <rect x="0" y="0" width="12" height="15" fill="#009640" />
        <path d="M 0,8 Q 3,5 6,8 Q 9,11 12,8" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
        <path d="M 0,11 Q 3,8 6,11 Q 9,14 12,11" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
        {/* Right top: white horse on red */}
        <rect x="12" y="0" width="12" height="15" fill="#DD0000" />
        <g transform="translate(18, 7.5)">
          <ellipse cx="0" cy="0" rx="3" ry="2" fill="#FFFFFF" />
          <circle cx="2" cy="-2.5" r="1.2" fill="#FFFFFF" />
          <path d="M -2,1.5 L -2.5,4" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M 1,1.5 L 1.5,4" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>
        {/* Bottom: red rose on white */}
        <rect x="0" y="15" width="24" height="12" fill="#FFFFFF" />
        <g transform="translate(12, 21)">
          {/* Rose petals */}
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-2"
              rx="1.3"
              ry="2.2"
              fill="#DD0000"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="1" fill="#FFD700" />
        </g>
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 11. Rheinland-Pfalz: Shield with golden cross on red, gold lion, red wheel
export function RheinlandPfalz({ size }: WappenProps) {
  const id = 'rp-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        {/* Left: red with golden cross */}
        <rect x="0" y="0" width="8" height="27" fill="#DD0000" />
        <rect x="2.5" y="3" width="3" height="10" fill="#FFD700" />
        <rect x="0.5" y="5.5" width="7" height="3" fill="#FFD700" />
        {/* Center: golden lion on black */}
        <rect x="8" y="0" width="8" height="27" fill="#1a1a1a" />
        <g transform="translate(12, 13)">
          <ellipse cx="0" cy="0" rx="2.5" ry="4" fill="#FFD700" />
          <circle cx="0" cy="-4.5" r="1.5" fill="#FFD700" />
          <path d="M -1.5,3 L -2,6" stroke="#FFD700" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M 1.5,3 L 2,6" stroke="#FFD700" strokeWidth="0.8" strokeLinecap="round" />
        </g>
        {/* Right: red wheel (Mainzer Rad) on white */}
        <rect x="16" y="0" width="8" height="27" fill="#FFFFFF" />
        <g transform="translate(20, 13)">
          <circle cx="0" cy="0" r="3.5" fill="none" stroke="#DD0000" strokeWidth="1" />
          <circle cx="0" cy="0" r="1" fill="none" stroke="#DD0000" strokeWidth="0.5" />
          {/* Spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={Math.cos((angle * Math.PI) / 180) * 3.5}
              y2={Math.sin((angle * Math.PI) / 180) * 3.5}
              stroke="#DD0000"
              strokeWidth="0.5"
            />
          ))}
        </g>
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 12. Saarland: Shield quartered with lion, crosses, eagle
export function Saarland({ size }: WappenProps) {
  const id = 'sl-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        {/* Top-left: blue with white/silver lion */}
        <rect x="0" y="0" width="12" height="13.5" fill="#003DA5" />
        <g transform="translate(6, 6.5)">
          <ellipse cx="0" cy="0" rx="2.5" ry="3" fill="#FFFFFF" />
          <circle cx="0" cy="-3.5" r="1.3" fill="#FFFFFF" />
        </g>
        {/* Top-right: white with red crosses */}
        <rect x="12" y="0" width="12" height="13.5" fill="#FFFFFF" />
        <g transform="translate(18, 6.5)">
          <rect x="-0.4" y="-3" width="0.8" height="6" fill="#DD0000" />
          <rect x="-2" y="-1.5" width="4" height="0.8" fill="#DD0000" />
        </g>
        {/* Bottom-left: gold with red cross */}
        <rect x="0" y="13.5" width="12" height="13.5" fill="#FFD700" />
        <g transform="translate(6, 20)">
          <rect x="-0.4" y="-3" width="0.8" height="6" fill="#DD0000" />
          <rect x="-2" y="-1.5" width="4" height="0.8" fill="#DD0000" />
        </g>
        {/* Bottom-right: red with black eagle */}
        <rect x="12" y="13.5" width="12" height="13.5" fill="#DD0000" />
        <g transform="translate(18, 20)">
          <ellipse cx="0" cy="0" rx="2" ry="2.5" fill="#1a1a1a" />
          <circle cx="0" cy="-2.8" r="1" fill="#1a1a1a" />
          <path d="M -2,-1 L -4,-3" stroke="#1a1a1a" strokeWidth="0.8" />
          <path d="M 2,-1 L 4,-3" stroke="#1a1a1a" strokeWidth="0.8" />
        </g>
        {/* Dividing lines */}
        <line x1="12" y1="0" x2="12" y2="27" stroke="#1a1a1a" strokeWidth="0.3" />
        <line x1="0" y1="13.5" x2="24" y2="13.5" stroke="#1a1a1a" strokeWidth="0.3" />
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 13. Sachsen: Gold and black horizontal stripes with green diamond (Rautenkranz)
export function Sachsen({ size }: WappenProps) {
  const id = 'sn-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        {/* Gold and black horizontal stripes */}
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x="0"
            y={i * 3}
            width="24"
            height="3"
            fill={i % 2 === 0 ? "#FFD700" : "#1a1a1a"}
          />
        ))}
        {/* Green diagonal band (Rautenkranz) */}
        <path
          d="M 3,2 L 21,22"
          stroke="#009640"
          strokeWidth="3.5"
          fill="none"
        />
        {/* Small green diamonds on the band */}
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 5 + i * 3.2;
          const y = 5 + i * 4;
          return (
            <polygon
              key={i}
              points={`${x},${y - 1} ${x + 1},${y} ${x},${y + 1} ${x - 1},${y}`}
              fill="#009640"
              stroke="#FFD700"
              strokeWidth="0.2"
            />
          );
        })}
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 14. Sachsen-Anhalt: Gold shield with black eagle and green garland
export function SachsenAnhalt({ size }: WappenProps) {
  const id = 'st-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="24" height="27" fill="#FFD700" />
        {/* Black eagle */}
        <g transform="translate(12, 12)">
          {/* Body */}
          <ellipse cx="0" cy="1" rx="3.5" ry="5" fill="#1a1a1a" />
          {/* Head */}
          <circle cx="0" cy="-5" r="2" fill="#1a1a1a" />
          {/* Beak */}
          <polygon points="0,-6 2,-7.5 0,-6.8" fill="#DD0000" />
          {/* Wings spread */}
          <path d="M -3,-1 Q -7,-3 -9,-7 L -6,-4 Q -4,-2 -3,-1" fill="#1a1a1a" />
          <path d="M 3,-1 Q 7,-3 9,-7 L 6,-4 Q 4,-2 3,-1" fill="#1a1a1a" />
          {/* Tail */}
          <polygon points="-2,6 0,9 2,6" fill="#1a1a1a" />
          {/* Claws */}
          <path d="M -2,5 L -3,8" stroke="#DD0000" strokeWidth="0.5" />
          <path d="M 2,5 L 3,8" stroke="#DD0000" strokeWidth="0.5" />
        </g>
        {/* Green garland / wreath around the shield */}
        <path
          d="M 3,6 Q 1,14 5,21 Q 8,24 12,26 Q 16,24 19,21 Q 23,14 21,6"
          stroke="#009640"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="1.5 1"
        />
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 15. Schleswig-Holstein: Shield split - two blue lions on gold (left), red with silver leaf (right)
export function SchleswigHolstein({ size }: WappenProps) {
  const id = 'sh-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        {/* Left: gold with blue lions */}
        <rect x="0" y="0" width="12" height="27" fill="#FFD700" />
        {/* Upper lion */}
        <g transform="translate(6, 8)">
          <ellipse cx="0" cy="0" rx="3" ry="1.8" fill="#003DA5" />
          <circle cx="-2" cy="-1.5" r="1.2" fill="#003DA5" />
          <path d="M 2,-0.5 Q 4,-2 3.5,-3" stroke="#003DA5" strokeWidth="0.6" fill="none" />
        </g>
        {/* Lower lion */}
        <g transform="translate(6, 17)">
          <ellipse cx="0" cy="0" rx="3" ry="1.8" fill="#003DA5" />
          <circle cx="-2" cy="-1.5" r="1.2" fill="#003DA5" />
          <path d="M 2,-0.5 Q 4,-2 3.5,-3" stroke="#003DA5" strokeWidth="0.6" fill="none" />
        </g>
        {/* Right: red with silver/white nettle leaf (Nesselblatt) */}
        <rect x="12" y="0" width="12" height="27" fill="#DD0000" />
        <g transform="translate(18, 13)">
          {/* Simplified nettle leaf - a triangular/diamond shape */}
          <polygon
            points="0,-6 3,-1 2,4 0,6 -2,4 -3,-1"
            fill="#C0C0C0"
            stroke="#FFFFFF"
            strokeWidth="0.3"
          />
          {/* Cut-out notches to suggest nettle leaf */}
          <line x1="-1.5" y1="-3" x2="0" y2="-2" stroke="#DD0000" strokeWidth="0.5" />
          <line x1="1.5" y1="-3" x2="0" y2="-2" stroke="#DD0000" strokeWidth="0.5" />
          <line x1="-2" y1="1" x2="0" y2="0" stroke="#DD0000" strokeWidth="0.5" />
          <line x1="2" y1="1" x2="0" y2="0" stroke="#DD0000" strokeWidth="0.5" />
        </g>
        {/* Dividing line */}
        <line x1="12" y1="0" x2="12" y2="27" stroke="#1a1a1a" strokeWidth="0.3" />
      </g>
      <ShieldOutline />
    </svg>
  );
}

// 16. Thueringen: Blue shield with red and white striped lion with gold crown
export function Thueringen({ size }: WappenProps) {
  const id = 'th-clip';
  return (
    <svg width={size} height={size} viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
      <ShieldClip id={id} />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="24" height="27" fill="#003DA5" />
        {/* Lion rampant with red/white stripes */}
        <g transform="translate(12, 13)">
          {/* Body shape as clip for stripes */}
          <defs>
            <clipPath id="th-lion">
              <ellipse cx="0" cy="1" rx="4.5" ry="5.5" />
              <circle cx="0" cy="-5.5" r="2.5" />
              {/* Arms/legs rough area */}
              <rect x="-6" y="-5" width="3" height="2" />
              <rect x="3" y="-5" width="3" height="2" />
            </clipPath>
          </defs>
          {/* Striped fill for lion */}
          <g clipPath="url(#th-lion)">
            {Array.from({ length: 10 }, (_, i) => (
              <rect
                key={i}
                x="-8"
                y={-8 + i * 2}
                width="16"
                height="2"
                fill={i % 2 === 0 ? '#DD0000' : '#FFFFFF'}
              />
            ))}
          </g>
          {/* Lion outline details */}
          {/* Head outline */}
          <circle cx="0" cy="-5.5" r="2.5" fill="none" stroke="#1a1a1a" strokeWidth="0.3" />
          {/* Crown */}
          <polygon points="-2,-8 -1.2,-7 -0.4,-8 0.4,-7 1.2,-8 2,-7 2,-8.5 -2,-8.5" fill="#FFD700" stroke="#1a1a1a" strokeWidth="0.2" />
          {/* Front legs raised */}
          <path d="M -3,-1 L -5.5,-4" stroke="#DD0000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 3,-1 L 5.5,-4" stroke="#DD0000" strokeWidth="1.5" strokeLinecap="round" />
          {/* Hind legs */}
          <path d="M -2,5 L -3,8" stroke="#DD0000" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M 2,5 L 3,8" stroke="#DD0000" strokeWidth="1.3" strokeLinecap="round" />
          {/* Tail */}
          <path d="M 3,4 Q 6,2 6,-1" stroke="#DD0000" strokeWidth="1" fill="none" />
          {/* Stars (8 stars around the lion) */}
          {[
            [-7, -7], [7, -7], [-8, 0], [8, 0],
            [-7, 7], [7, 7], [-8, 3.5], [8, 3.5],
          ].map(([sx, sy], i) => (
            <circle key={i} cx={sx} cy={sy} r="0.7" fill="#FFD700" />
          ))}
        </g>
      </g>
      <ShieldOutline />
    </svg>
  );
}
