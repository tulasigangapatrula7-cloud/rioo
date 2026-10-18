import { useMemo, useState } from 'react';
import { Stars } from '../components/Ambient.jsx';
import { CLUE } from '../content.js';
import { seeded, useTimeouts } from '../hooks.js';
import { useEffect } from 'react';

const GLYPHS = ['✦', '✧', '⋆', '☾', '✿', '❖', '✺', '✦', '✧'];
const HEART = { x: 76, y: 66 }; // percent position of the hidden heart

export default function HiddenClue({ onNext }) {
  const [found, setFound] = useState(false);
  const [nudge, setNudge] = useState(null); // id of the decoy that was just tapped
  const [hint, setHint] = useState(false);
  const after = useTimeouts();

  const decoys = useMemo(() => {
    const r = seeded(42);
    const list = [];
    while (list.length < 28) {
      const x = 4 + r() * 90;
      const y = 14 + r() * 80;
      if (Math.hypot(x - HEART.x, (y - HEART.y) * 0.7) < 14) continue; // keep the heart's surroundings clear
      list.push({
        id: list.length,
        x,
        y,
        size: 16 + r() * 18,
        glyph: GLYPHS[list.length % GLYPHS.length],
        gold: r() > 0.7,
      });
    }
    return list;
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setHint(true), 9000);
    return () => clearTimeout(id);
  }, []);

  const foundIt = () => {
    if (found) return;
    setFound(true);
    after(2000, onNext);
  };

  const tapDecoy = (id) => {
    if (found) return;
    setNudge(id);
    after(500, () => setNudge((n) => (n === id ? null : n)));
  };

  return (
    <main className="screen theme-night clue">
      <Stars count={50} seed={31} />
      <h1 className="title-serif clue-title">{CLUE.prompt}</h1>
      <div className="clue-field">
        {decoys.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`decoy${d.gold ? ' gold' : ''}${nudge === d.id ? ' nudge' : ''}`}
            style={{ left: `${d.x}%`, top: `${d.y}%`, fontSize: d.size }}
            onClick={() => tapDecoy(d.id)}
            aria-label="Decoration"
            tabIndex={-1}
          >
            {d.glyph}
          </button>
        ))}
        <button
          type="button"
          className={`hidden-heart${found ? ' found' : ''}`}
          style={{ left: `${HEART.x}%`, top: `${HEART.y}%` }}
          onClick={foundIt}
          aria-label="The hidden heart"
        >
          ♥
        </button>
      </div>
      {hint && !found && <p className="hint-text">{CLUE.hint}</p>}
      {found && (
        <div className="found-overlay" role="status">
          <div className="found-card">
            <span className="found-heart" aria-hidden="true">💗</span>
            <h2 className="title-serif">{CLUE.found}</h2>
          </div>
        </div>
      )}
    </main>
  );
}
