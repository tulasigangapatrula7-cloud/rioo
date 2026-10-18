import { useState } from 'react';
import { Balloons, Confetti, Petals, Stars } from '../components/Ambient.jsx';
import { CELEBRATION } from '../content.js';
import { useTimeouts } from '../hooks.js';
import { useEffect } from 'react';
import { Trophy } from './AwardCertificate.jsx';

export default function Celebration({ onNext }) {
  const [ready, setReady] = useState(false);
  const after = useTimeouts();
  useEffect(() => {
    after(1600, () => setReady(true));
  }, [after]);

  return (
    <main className="screen theme-celebrate">
      <Balloons count={7} seed={9} />
      <Petals count={14} seed={17} />
      <Confetti count={64} seed={23} />
      <Stars count={18} seed={6} />
      <div className="content">
        <Trophy className="trophy-big" />
        <h1 className="title-serif celebrate-title">{CELEBRATION.title}</h1>
        <p className="celebrate-sub">{CELEBRATION.subtitle}</p>
        {ready && (
          <button type="button" className="btn btn-berry pop-in" onClick={onNext}>
            Continue 💗
          </button>
        )}
      </div>
    </main>
  );
}
