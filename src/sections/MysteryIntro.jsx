import { useEffect, useState } from 'react';
import { FloatingHearts, SparkleBurst, Stars } from '../components/Ambient.jsx';
import { ASSETS, MYSTERY } from '../content.js';
import { useTimeouts } from '../hooks.js';

const STEP_MS = 2100;

export default function MysteryIntro({ onNext }) {
  const [shown, setShown] = useState(0); // how many description lines are visible
  const [phase, setPhase] = useState('lines'); // lines | none | reveal
  const [photoFailed, setPhotoFailed] = useState(false);
  const [nextReady, setNextReady] = useState(false);
  const after = useTimeouts();
  const total = MYSTERY.lines.length;

  // Reveal the lines one by one, with a pause between each.
  useEffect(() => {
    if (phase !== 'lines' || shown >= total) return;
    const id = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 1500 : STEP_MS);
    return () => clearTimeout(id);
  }, [phase, shown, total]);

  const reveal = () => {
    if (phase !== 'lines') return;
    setPhase('none');
    after(2300, () => {
      setPhase('reveal');
      after(1400, () => setNextReady(true));
    });
  };

  const skipAhead = () => phase === 'lines' && shown < total && setShown((n) => n + 1);

  return (
    <main className="screen theme-night mystery" onClick={skipAhead}>
      <Stars count={50} seed={12} />
      {phase === 'reveal' && <FloatingHearts count={10} seed={5} />}
      <div className="content">
        {phase === 'lines' && (
          <>
            <h1 className="title-serif mystery-title">{MYSTERY.title}</h1>
            <div className="mystery-lines" aria-live="polite">
              {MYSTERY.lines.slice(0, shown).map((l, i) => (
                <p key={i} className={i === shown - 1 ? 'line fresh' : 'line'}>
                  {l}
                </p>
              ))}
            </div>
            {shown >= total && (
              <button
                type="button"
                className="btn btn-rose pop-in"
                onClick={(e) => {
                  e.stopPropagation();
                  reveal();
                }}
              >
                {MYSTERY.button}
              </button>
            )}
            {shown < total && <p className="tap-hint">tap anywhere to speed up</p>}
          </>
        )}

        {phase === 'none' && <h1 className="title-serif none-other">{MYSTERY.nonOtherThan}</h1>}

        {phase === 'reveal' && (
          <>
            <h1 className="title-serif rio-reveal">{MYSTERY.reveal}</h1>
            <div className="photo-wrap">
              <div className="photo-frame">
                {photoFailed ? (
                  <div className="photo-missing">
                    Rio's photo is missing.
                    <br />
                    Put it at <code>public/images/rio-photo.jpg</code>
                  </div>
                ) : (
                  <img src={ASSETS.photo} alt="Rio, smiling in a turquoise-blue dress" onError={() => setPhotoFailed(true)} />
                )}
              </div>
              <SparkleBurst count={14} radius={170} />
            </div>
            <p className="photo-caption">{MYSTERY.caption}</p>
            {nextReady && (
              <button type="button" className="btn btn-rose pop-in" onClick={onNext}>
                NEXT →
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
}
