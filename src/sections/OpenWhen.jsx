import { useEffect, useRef, useState } from 'react';
import { FloatingHearts } from '../components/Ambient.jsx';
import { ENVELOPES } from '../content.js';

function EnvelopeModal({ envelope, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="open-letter"
        role="dialog"
        aria-modal="true"
        aria-label={`Open ${envelope.title}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ol-flap" aria-hidden="true">
          <span className="ol-seal">♥</span>
        </div>
        <div className="ol-paper">
          <h2 className="title-serif">{envelope.title}</h2>
          <ol className="ol-messages">
            {envelope.messages.map((m, i) => (
              <li key={i} style={{ animationDelay: `${0.7 + i * 0.7}s` }}>
                {m}
              </li>
            ))}
          </ol>
          <button ref={closeRef} type="button" className="btn btn-berry" onClick={onClose}>
            Close envelope
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OpenWhen({ onNext }) {
  const [openId, setOpenId] = useState(null);
  const [opened, setOpened] = useState(() => new Set());
  const current = ENVELOPES.find((e) => e.id === openId);

  const open = (id) => {
    setOpenId(id);
    setOpened((s) => new Set(s).add(id));
  };

  return (
    <main className="screen theme-soft">
      <FloatingHearts count={12} seed={8} tone="berry" />
      <div className="content wide">
        <h1 className="title-serif">Open When…</h1>
        <p className="sub">Five little envelopes, written just for you. Tap one to open it. 💌</p>
        <div className="env-grid">
          {ENVELOPES.map((e) => (
            <button
              key={e.id}
              type="button"
              className={`env${opened.has(e.id) ? ' read' : ''}`}
              onClick={() => open(e.id)}
              aria-label={`Open envelope: ${e.title}`}
            >
              <span className="env-flap" aria-hidden="true" />
              <span className="env-seal" aria-hidden="true">♥</span>
              <span className="env-label">{e.title}</span>
              {opened.has(e.id) && <span className="env-check" aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
        <p className="sub small">{opened.size} of {ENVELOPES.length} opened</p>
        <button type="button" className="btn btn-berry" onClick={onNext}>
          Continue 💗
        </button>
      </div>
      {current && <EnvelopeModal envelope={current} onClose={() => setOpenId(null)} />}
    </main>
  );
}
