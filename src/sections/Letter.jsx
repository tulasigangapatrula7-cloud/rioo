import { useEffect, useState } from 'react';
import { FloatingHearts } from '../components/Ambient.jsx';
import { LETTER } from '../content.js';
import { useTimeouts } from '../hooks.js';

export default function Letter({ onNext }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const after = useTimeouts();

  useEffect(() => {
    after(500, () => setOpen(true));
    after(500 + 900 + LETTER.paragraphs.length * 650 + 1400, () => setReady(true));
  }, [after]);

  return (
    <main className="screen theme-soft letter-screen">
      <FloatingHearts count={10} seed={14} tone="berry" />
      <div className="content wide">
        <div className={`letter-env${open ? ' open' : ''}`} aria-hidden="true">
          <span className="le-flap" />
          <span className="le-seal">♥</span>
        </div>
        <article className={`letter-paper${open ? ' open' : ''}`} aria-label="Junnie's letter">
          <p className="letter-greeting">{LETTER.greeting}</p>
          {LETTER.paragraphs.map((p, i) => (
            <p key={i} className="letter-p" style={{ animationDelay: `${0.9 + i * 0.65}s` }}>
              {p}
            </p>
          ))}
          <p className="letter-telugu" style={{ animationDelay: `${0.9 + LETTER.paragraphs.length * 0.65}s` }}>
            {LETTER.telugu}
          </p>
          <p className="letter-close" style={{ animationDelay: `${1.2 + LETTER.paragraphs.length * 0.65}s` }}>
            {LETTER.closing}
            <span className="letter-sign">{LETTER.signature} 💗</span>
          </p>
        </article>
        {ready && (
          <button type="button" className="btn btn-berry pop-in" onClick={onNext}>
            Continue 💗
          </button>
        )}
      </div>
    </main>
  );
}
