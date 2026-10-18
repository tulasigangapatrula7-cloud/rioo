import { useState } from 'react';
import { FloatingHearts, Petals, Stars } from '../components/Ambient.jsx';
import { FINAL } from '../content.js';

function Cake() {
  return (
    <svg className="cake" viewBox="0 0 220 190" aria-hidden="true">
      <defs>
        <linearGradient id="cakeA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5A9C8" />
          <stop offset="1" stopColor="#C94F70" />
        </linearGradient>
        <linearGradient id="cakeB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C8B6F0" />
          <stop offset="1" stopColor="#8E78D0" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="176" rx="100" ry="10" fill="#E7C887" opacity=".9" />
      <rect x="22" y="112" width="176" height="62" rx="12" fill="url(#cakeA)" />
      <path d="M22 124c14 0 14 16 28 16s14-16 28-16 14 16 28 16 14-16 28-16 14 16 28 16 14-16 28-16 14 16 28 16v-12H22z" fill="#FFF6EC" />
      <rect x="52" y="64" width="116" height="52" rx="11" fill="url(#cakeB)" />
      <path d="M52 76c12 0 12 14 24 14s12-14 24-14 12 14 24 14 12-14 24-14 12 14 20 14V68H52z" fill="#FFF6EC" />
      <circle cx="40" cy="150" r="4" fill="#E7C887" />
      <circle cx="80" cy="156" r="4" fill="#FFF6EC" />
      <circle cx="140" cy="154" r="4" fill="#E7C887" />
      <circle cx="180" cy="148" r="4" fill="#FFF6EC" />
      {[84, 110, 136].map((x, i) => (
        <g key={x}>
          <rect x={x - 4} y="40" width="8" height="26" rx="3" fill={i === 1 ? '#2453C5' : '#E7C887'} />
          <path className="flame" style={{ animationDelay: `${i * 0.25}s` }} d={`M${x} 22c6 7 7 12 0 17c-7-5-6-10 0-17z`} fill="#FFD36B" />
        </g>
      ))}
    </svg>
  );
}

export default function FinalWish({ onRestart }) {
  const [busy, setBusy] = useState(false);
  return (
    <main className="screen theme-final">
      <Stars count={48} seed={101} />
      <Petals count={12} seed={33} />
      <FloatingHearts count={7} seed={19} />
      <div className="content">
        <Cake />
        <h1 className="title-serif final-title">{FINAL.title}</h1>
        <div className="final-wish">
          {FINAL.wish.map((p, i) => (
            <p key={i} style={{ animationDelay: `${0.6 + i * 0.7}s` }}>
              {p}
            </p>
          ))}
          <p className="final-sign" style={{ animationDelay: `${0.6 + FINAL.wish.length * 0.7}s` }}>
            {FINAL.signature}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-rose watch-again"
          disabled={busy}
          onClick={() => {
            setBusy(true);
            onRestart();
          }}
        >
          {FINAL.watchAgain}
        </button>
      </div>
    </main>
  );
}
