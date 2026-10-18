import { useState } from 'react';
import { SparkleBurst, Stars } from '../components/Ambient.jsx';
import { SECRET } from '../content.js';
import { useTimeouts } from '../hooks.js';

export default function SecretReveal({ onNext }) {
  const [taps, setTaps] = useState(0);
  const [phase, setPhase] = useState('charging'); // charging | burst | revealed
  const [pulse, setPulse] = useState(0);
  const after = useTimeouts();
  const need = SECRET.tapsNeeded;

  const tap = () => {
    if (phase !== 'charging') return;
    const n = taps + 1;
    setTaps(n);
    setPulse((p) => p + 1);
    if (n >= need) {
      setPhase('burst');
      after(1100, () => setPhase('revealed'));
    }
  };

  const charge = taps / need;

  return (
    <main className={`screen theme-night secret${phase === 'burst' ? ' flash' : ''}`}>
      <Stars count={44} seed={81} />
      <div className="content">
        {phase !== 'revealed' && (
          <>
            <p className="secret-prompt">{SECRET.prompt}</p>
            <button
              type="button"
              className={`orb${phase === 'burst' ? ' burst-out' : ''}`}
              style={{ '--charge': charge }}
              onClick={tap}
              aria-label={`Glowing orb. Tap it. ${taps} of ${need} taps.`}
            >
              <span key={pulse} className="orb-core" />
              <span className="orb-ring" />
              {pulse > 0 && <SparkleBurst key={`b${pulse}`} count={8} radius={80} color="rose" />}
            </button>
            <div className="orb-dots" aria-hidden="true">
              {Array.from({ length: need }, (_, i) => (
                <span key={i} className={i < taps ? 'on' : ''} />
              ))}
            </div>
          </>
        )}
        {phase === 'revealed' && (
          <div className="secret-card pop-in">
            <p className="eyebrow">{SECRET.eyebrow}</p>
            <h1 className="title-serif">{SECRET.title}</h1>
            {SECRET.image && <img className="secret-img" src={SECRET.image} alt="" />}
            <p>{SECRET.message}</p>
            <button type="button" className="btn btn-rose" onClick={onNext}>
              Continue 💗
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
