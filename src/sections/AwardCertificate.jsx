import { useState } from 'react';
import { Stars } from '../components/Ambient.jsx';
import { AWARD } from '../content.js';
import { useTimeouts } from '../hooks.js';

export function Trophy({ className = '' }) {
  return (
    <svg className={`trophy ${className}`} viewBox="0 0 120 140" aria-hidden="true">
      <defs>
        <linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6E3B0" />
          <stop offset=".5" stopColor="#E7C887" />
          <stop offset="1" stopColor="#B88F45" />
        </linearGradient>
      </defs>
      <path d="M30 14h60v34a30 30 0 0 1-60 0z" fill="url(#goldG)" />
      <path d="M30 22H14c0 20 8 32 24 36M90 22h16c0 20-8 32-24 36" fill="none" stroke="url(#goldG)" strokeWidth="7" strokeLinecap="round" />
      <path d="M52 76h16v22H52z" fill="url(#goldG)" />
      <path d="M40 98h40l5 14H35z" fill="url(#goldG)" />
      <rect x="28" y="112" width="64" height="16" rx="4" fill="#2453C5" />
      <rect x="28" y="112" width="64" height="4" rx="2" fill="#E7C887" />
      <path d="M60 28l5 11 12 1.5-9 8 2.5 12-10.5-6-10.5 6 2.5-12-9-8 12-1.5z" fill="#FFF6EC" opacity=".9" />
      <path d="M38 22c-2 18 4 30 14 38" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function AwardCertificate({ onNext }) {
  const [accepting, setAccepting] = useState(false);
  const after = useTimeouts();

  const accept = () => {
    if (accepting) return;
    setAccepting(true);
    after(1000, onNext);
  };

  return (
    <main className="screen theme-night award-screen">
      <Stars count={36} seed={52} />
      <div className="content wide">
        <section className={`certificate${accepting ? ' accepting' : ''}`} aria-label="Bestest Friend Award certificate">
          <div className="cert-corner tl" aria-hidden="true" />
          <div className="cert-corner tr" aria-hidden="true" />
          <div className="cert-corner bl" aria-hidden="true" />
          <div className="cert-corner br" aria-hidden="true" />
          <Trophy />
          <h1 className="cert-title">{AWARD.title}</h1>
          <div className="cert-rule" aria-hidden="true"><span>✦</span></div>
          <p className="cert-to">{AWARD.presentedTo}</p>
          <p className="cert-for">{AWARD.forBeing}</p>
          <ul className="cert-list">
            {AWARD.reasons.map((r, i) => (
              <li key={i} className={i === AWARD.reasons.length - 1 ? 'strong' : ''}>{r}</li>
            ))}
          </ul>
          <div className="cert-seal" aria-hidden="true"><span>★</span></div>
        </section>
        <button type="button" className="btn btn-gold" onClick={accept} disabled={accepting}>
          {AWARD.button}
        </button>
      </div>
    </main>
  );
}
