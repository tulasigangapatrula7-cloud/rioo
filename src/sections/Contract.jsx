import { useEffect, useRef, useState } from 'react';
import { SparkleBurst, Stars } from '../components/Ambient.jsx';
import SignaturePad from '../components/SignaturePad.jsx';
import { CONTRACT } from '../content.js';
import { useTimeouts } from '../hooks.js';

/*
 * Friendship contract — three SEPARATE pieces of state, on purpose:
 *   1. signature entry   -> drawn (bool from the pad) / typed (string) / mode
 *   2. accepting         -> true while the button was pressed and the paper is "receiving" the stamp
 *   3. accepted          -> true only AFTER the ACCEPT click; the stamp renders ONLY when this is true
 */
export default function Contract({ onNext }) {
  const [mode, setMode] = useState('draw'); // draw | type
  const [drawn, setDrawn] = useState(false);
  const [typed, setTyped] = useState('');
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const padRef = useRef(null);
  const stampRef = useRef(null);
  const clickLock = useRef(false);
  const after = useTimeouts();

  const hasSignature = mode === 'draw' ? drawn : typed.trim().length > 0;
  const locked = accepting || accepted;

  const accept = () => {
    if (!hasSignature || clickLock.current) return;
    clickLock.current = true; // prevents overlapping stamp animations
    setAccepting(true); // button disables, paper starts to move
    after(550, () => setAccepted(true)); // the stamp lands
    after(550 + 1300, () => setShowDone(true)); // then the confirmation + CONTINUE
  };

  useEffect(() => {
    if (accepted) stampRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [accepted]);

  const clear = () => {
    if (locked) return;
    if (mode === 'draw') padRef.current?.clear();
    else setTyped('');
  };

  return (
    <main className="screen theme-night contract-screen">
      <Stars count={24} seed={61} />
      {/* SVG filter that gives the stamp a rough, ink-worn look */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="ink-rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -0.62" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" result="eroded" />
          <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves="2" seed="3" result="w" />
          <feDisplacementMap in="eroded" in2="w" scale="2.4" />
        </filter>
      </svg>

      <div className="content wide">
        <article className={`paper${accepting ? ' receiving' : ''}`} data-testid="contract" aria-label="Official friendship agreement">
          <header className="paper-head">
            <p className="paper-no">Contract No. {CONTRACT.number}</p>
            <h1 className="paper-title">{CONTRACT.title}</h1>
            <div className="cert-rule" aria-hidden="true"><span>✦</span></div>
          </header>

          <div className="parties">
            <p>{CONTRACT.partyA}</p>
            <p>{CONTRACT.partyB}</p>
          </div>
          <p className="paper-opening">{CONTRACT.opening}</p>

          {CONTRACT.articles.map((a) => (
            <section key={a.no} className={`article${a.emphasis ? ' emphasis' : ''}`}>
              <h2>
                <span>ARTICLE {a.no}</span> — {a.title}
              </h2>
              <p>{a.body}</p>
            </section>
          ))}

          <div className="signatures">
            <div className="sig-col">
              <div className="sig-box junnie">
                <span className="sig-script">{CONTRACT.junnieSignature}</span>
              </div>
              <p className="sig-label">Junnie — signature</p>
            </div>

            <div className="sig-col rio-sign" ref={stampRef}>
              <div className="sig-tabs" role="tablist" aria-label="Signature method">
                <button type="button" role="tab" aria-selected={mode === 'draw'} className={mode === 'draw' ? 'on' : ''} disabled={locked} onClick={() => setMode('draw')}>
                  ✍️ Draw
                </button>
                <button type="button" role="tab" aria-selected={mode === 'type'} className={mode === 'type' ? 'on' : ''} disabled={locked} onClick={() => setMode('type')}>
                  ⌨️ Type
                </button>
              </div>

              <div className={`sig-box rio${locked ? ' locked' : ''}`}>
                <div style={{ display: mode === 'draw' ? 'block' : 'none' }} className="sig-pad-wrap">
                  <SignaturePad ref={padRef} disabled={locked} onChange={setDrawn} />
                  {!drawn && <span className="sig-placeholder">Sign here with your finger ✍️</span>}
                </div>
                {mode === 'type' && (
                  <div className="sig-type-wrap">
                    <input
                      className="sig-input"
                      type="text"
                      value={typed}
                      maxLength={24}
                      disabled={locked}
                      placeholder="Type your name"
                      aria-label="Type your signature"
                      onChange={(e) => setTyped(e.target.value)}
                    />
                    {typed.trim() && <span className="sig-script typed" aria-hidden="true">{typed}</span>}
                  </div>
                )}

                {accepted && (
                  <div className="stamp-spot">
                    <div className="stamp" role="img" aria-label="Approved. Forever.">
                      <span className="stamp-top">APPROVED</span>
                      <span className="stamp-bar" />
                      <span className="stamp-bot">FOREVER ❤️</span>
                    </div>
                    <SparkleBurst count={12} radius={120} />
                  </div>
                )}
              </div>
              <p className="sig-label">Rio — digital signature</p>
              <button type="button" className="link-btn" onClick={clear} disabled={locked || !hasSignature}>
                Clear signature
              </button>
            </div>
          </div>

          <div className="accept-row">
            <button type="button" className="btn btn-berry accept" onClick={accept} disabled={!hasSignature || locked}>
              ACCEPT 💗
            </button>
            {!hasSignature && <p className="accept-hint">Sign above to enable ACCEPT</p>}
          </div>

          {showDone && (
            <div className="signed-done" role="status">
              <h2 className="title-serif">{CONTRACT.signedTitle}</h2>
              <p>{CONTRACT.signedSubtitle}</p>
              <button type="button" className="btn btn-berry pop-in" onClick={onNext}>
                CONTINUE 💗
              </button>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
