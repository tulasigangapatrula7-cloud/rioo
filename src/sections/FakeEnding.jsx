import { useEffect, useState } from 'react';
import { Stars } from '../components/Ambient.jsx';
import { FAKE_ENDING } from '../content.js';
import { useTimeouts } from '../hooks.js';

export default function FakeEnding({ onNext }) {
  const [warn, setWarn] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const after = useTimeouts();

  useEffect(() => {
    after(3200, () => setWarn(true));
  }, [after]);

  const press = () => {
    if (glitch) return;
    setGlitch(true);
    after(900, onNext);
  };

  return (
    <main className={`screen theme-night fake-end${glitch ? ' glitch' : ''}`}>
      <Stars count={26} seed={71} />
      <div className="content">
        <h1 className="title-serif fake-line">{FAKE_ENDING.line}</h1>
        {warn && (
          <>
            <p className="warning pop-in">{FAKE_ENDING.warning}</p>
            <button type="button" className="btn btn-danger pop-in" onClick={press} disabled={glitch}>
              {FAKE_ENDING.button}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
