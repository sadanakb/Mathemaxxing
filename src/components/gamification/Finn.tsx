'use client';

type Mood = 'happy' | 'thinking' | 'celebrating' | 'sad' | 'encouraging';

type FinnProps = {
  mood: Mood;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
};

const SIZE_MAP = {
  sm: 64,
  md: 96,
  lg: 128,
} as const;

// ─── SVG sub-components per mood ────────────────────────────

function EarsDefault() {
  return (
    <>
      {/* Left ear */}
      <polygon points="30,28 22,8 38,22" fill="#FF6B35" />
      <polygon points="31,26 25,12 36,23" fill="#FFB3B3" />
      {/* Right ear */}
      <polygon points="70,28 78,8 62,22" fill="#FF6B35" />
      <polygon points="69,26 75,12 64,23" fill="#FFB3B3" />
    </>
  );
}

function EarsDroopy() {
  return (
    <>
      {/* Left ear - droopy */}
      <polygon points="30,28 18,18 36,24" fill="#FF6B35" />
      <polygon points="31,27 22,20 35,25" fill="#FFB3B3" />
      {/* Right ear - droopy */}
      <polygon points="70,28 82,18 64,24" fill="#FF6B35" />
      <polygon points="69,27 78,20 65,25" fill="#FFB3B3" />
    </>
  );
}

function Face() {
  return (
    <>
      {/* Head */}
      <ellipse cx="50" cy="40" rx="24" ry="22" fill="#FF6B35" />
      {/* White face area */}
      <ellipse cx="50" cy="46" rx="16" ry="14" fill="white" />
    </>
  );
}

function Body() {
  return (
    <>
      {/* Body */}
      <ellipse cx="50" cy="72" rx="18" ry="16" fill="#FF6B35" />
      {/* Belly */}
      <ellipse cx="50" cy="74" rx="12" ry="11" fill="white" />
    </>
  );
}

function Tail() {
  return (
    <path
      d="M68,72 Q85,55 82,42 Q80,48 76,52 Q78,60 70,68"
      fill="#FF6B35"
      stroke="#E55A2B"
      strokeWidth="0.5"
    />
  );
}

function TailCelebrating() {
  return (
    <path
      d="M68,68 Q90,45 86,32 Q83,40 78,46 Q82,56 72,64"
      fill="#FF6B35"
      stroke="#E55A2B"
      strokeWidth="0.5"
    />
  );
}

function EyesHappy() {
  return (
    <>
      <circle cx="42" cy="38" r="3" fill="#2D1B00" />
      <circle cx="58" cy="38" r="3" fill="#2D1B00" />
      {/* Eye shine */}
      <circle cx="43" cy="37" r="1" fill="white" />
      <circle cx="59" cy="37" r="1" fill="white" />
    </>
  );
}

function EyesThinking() {
  return (
    <>
      <circle cx="42" cy="38" r="3" fill="#2D1B00" />
      <circle cx="58" cy="38" r="3" fill="#2D1B00" />
      <circle cx="43" cy="37" r="1" fill="white" />
      <circle cx="59" cy="37" r="1" fill="white" />
      {/* Raised eyebrow on right side */}
      <path d="M55,33 Q58,30 62,33" stroke="#2D1B00" strokeWidth="1.5" fill="none" />
    </>
  );
}

function EyesSad() {
  return (
    <>
      <circle cx="42" cy="39" r="3" fill="#2D1B00" />
      <circle cx="58" cy="39" r="3" fill="#2D1B00" />
      <circle cx="43" cy="38" r="1" fill="white" />
      <circle cx="59" cy="38" r="1" fill="white" />
      {/* Sad eyebrows */}
      <path d="M38,34 Q42,37 46,35" stroke="#2D1B00" strokeWidth="1" fill="none" />
      <path d="M54,35 Q58,37 62,34" stroke="#2D1B00" strokeWidth="1" fill="none" />
    </>
  );
}

function EyesWink() {
  return (
    <>
      <circle cx="42" cy="38" r="3" fill="#2D1B00" />
      <circle cx="43" cy="37" r="1" fill="white" />
      {/* Wink (right eye closed) */}
      <path d="M55,38 Q58,36 61,38" stroke="#2D1B00" strokeWidth="1.5" fill="none" />
    </>
  );
}

function MouthSmile() {
  return <path d="M44,48 Q50,54 56,48" stroke="#2D1B00" strokeWidth="1.5" fill="none" />;
}

function MouthFrown() {
  return <path d="M44,52 Q50,47 56,52" stroke="#2D1B00" strokeWidth="1.5" fill="none" />;
}

function MouthThinking() {
  return <path d="M46,50 Q50,50 54,48" stroke="#2D1B00" strokeWidth="1.5" fill="none" />;
}

function Nose() {
  return <ellipse cx="50" cy="44" rx="2" ry="1.5" fill="#2D1B00" />;
}

// ─── Arms for specific poses ───────────────────────────────

function ArmsDefault() {
  return (
    <>
      {/* Left arm */}
      <path d="M34,66 Q28,72 30,78" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Right arm */}
      <path d="M66,66 Q72,72 70,78" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" fill="none" />
    </>
  );
}

function ArmsThinking() {
  return (
    <>
      {/* Left arm normal */}
      <path d="M34,66 Q28,72 30,78" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Right arm up to chin */}
      <path d="M66,66 Q72,60 66,52" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Hand at chin */}
      <circle cx="66" cy="51" r="3" fill="#FF6B35" />
    </>
  );
}

function ArmsCelebrating() {
  return (
    <>
      {/* Left arm up */}
      <path d="M34,66 Q24,54 28,44" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Right arm up */}
      <path d="M66,66 Q76,54 72,44" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <circle cx="28" cy="43" r="3" fill="#FF6B35" />
      <circle cx="72" cy="43" r="3" fill="#FF6B35" />
    </>
  );
}

function ArmsThumbsUp() {
  return (
    <>
      {/* Left arm normal */}
      <path d="M34,66 Q28,72 30,78" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Right arm out with thumbs up */}
      <path d="M66,66 Q76,62 78,56" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Thumb */}
      <path d="M78,56 L78,50" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="78" cy="55" r="3" fill="#FF6B35" />
    </>
  );
}

// ─── Celebration stars ──────────────────────────────────────

function CelebrationStars() {
  return (
    <>
      <text x="18" y="38" fontSize="8" fill="#FFD700">&#9733;</text>
      <text x="78" y="34" fontSize="6" fill="#FFD700">&#9733;</text>
      <text x="24" y="52" fontSize="5" fill="#FFD700">&#9733;</text>
      <text x="82" y="50" fontSize="7" fill="#FFD700">&#9733;</text>
    </>
  );
}

// ─── Feet ───────────────────────────────────────────────────

function Feet() {
  return (
    <>
      <ellipse cx="42" cy="88" rx="6" ry="3" fill="#FF6B35" />
      <ellipse cx="58" cy="88" rx="6" ry="3" fill="#FF6B35" />
    </>
  );
}

// ─── Speech Bubble ──────────────────────────────────────────

function SpeechBubble({ message, foxSize }: { message: string; foxSize: number }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ bottom: `${foxSize + 8}px` }}
    >
      <div
        className="relative bg-white rounded-xl px-3 py-2 shadow-md text-sm text-gray-800 text-center max-w-[200px] whitespace-pre-line"
        style={{
          lineHeight: 1.4,
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}
      >
        {message}
        {/* Bubble pointer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            bottom: '-6px',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid white',
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────

export function Finn({ mood, size = 'md', message }: FinnProps) {
  const px = SIZE_MAP[size];

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: px }}>
      {message && <SpeechBubble message={message} foxSize={px} />}
      <svg
        viewBox="0 0 100 95"
        width={px}
        height={px}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Finn der Fuchs ist ${mood}`}
      >
        {/* Tail */}
        {mood === 'celebrating' ? <TailCelebrating /> : <Tail />}

        {/* Body */}
        <Body />

        {/* Feet */}
        <Feet />

        {/* Ears */}
        {mood === 'sad' ? <EarsDroopy /> : <EarsDefault />}

        {/* Face */}
        <Face />

        {/* Nose */}
        <Nose />

        {/* Eyes per mood */}
        {mood === 'happy' && <EyesHappy />}
        {mood === 'thinking' && <EyesThinking />}
        {mood === 'celebrating' && <EyesHappy />}
        {mood === 'sad' && <EyesSad />}
        {mood === 'encouraging' && <EyesWink />}

        {/* Mouth per mood */}
        {(mood === 'happy' || mood === 'celebrating' || mood === 'encouraging') && <MouthSmile />}
        {mood === 'thinking' && <MouthThinking />}
        {mood === 'sad' && <MouthFrown />}

        {/* Arms per mood */}
        {mood === 'happy' && <ArmsDefault />}
        {mood === 'thinking' && <ArmsThinking />}
        {mood === 'celebrating' && <ArmsCelebrating />}
        {mood === 'sad' && <ArmsDefault />}
        {mood === 'encouraging' && <ArmsThumbsUp />}

        {/* Celebration extras */}
        {mood === 'celebrating' && <CelebrationStars />}
      </svg>
    </div>
  );
}
