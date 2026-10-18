import { useCallback, useEffect, useRef, useState } from 'react';
import { music, useMusic } from './music.js';
import MusicScreen from './sections/MusicScreen.jsx';
import PinScreen from './sections/PinScreen.jsx';
import OpenWhen from './sections/OpenWhen.jsx';
import MysteryIntro from './sections/MysteryIntro.jsx';
import HiddenClue from './sections/HiddenClue.jsx';
import AwardCertificate from './sections/AwardCertificate.jsx';
import Celebration from './sections/Celebration.jsx';
import Contract from './sections/Contract.jsx';
import Letter from './sections/Letter.jsx';
import FakeEnding from './sections/FakeEnding.jsx';
import SecretReveal from './sections/SecretReveal.jsx';
import VideoScreen from './sections/VideoScreen.jsx';
import FinalWish from './sections/FinalWish.jsx';

/* The exact order of the experience. Sections can only move forward through their own onNext. */
const SCREENS = [
  MusicScreen, // 1  Music symbol
  PinScreen, // 2  Junnie ATM PIN
  OpenWhen, // 3  Open When...
  MysteryIntro, // 4  Mystery introduction (+ photo reveal)
  HiddenClue, // 5  Find the hidden clue
  AwardCertificate, // 6  Bestest Friend Award
  Celebration, // 7  Award celebration
  Contract, // 8  Friendship contract
  Letter, // 9  Junnie's actual letter
  FakeEnding, // 10 DO NOT CLICK
  SecretReveal, // 11 Secret interactive reveal
  VideoScreen, // 12 Junnie's video
  FinalWish, // 13 Final birthday wish (+ 14 Watch Again button)
];

function MusicToggle() {
  const { wants, available } = useMusic();
  if (!available) return null;
  return (
    <button
      type="button"
      className="music-toggle"
      onClick={() => music.toggle()}
      aria-pressed={wants}
      aria-label={wants ? 'Pause music' : 'Play music'}
      title={wants ? 'Pause music' : 'Play music'}
    >
      {wants ? '🔊' : '🔇'}
    </button>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0); // bumping this remounts every section = clean reset
  const [leaving, setLeaving] = useState(false);
  const busy = useRef(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const change = useCallback((fn) => {
    if (busy.current) return; // ignore double clicks while a transition is running
    busy.current = true;
    setLeaving(true);
    timer.current = setTimeout(() => {
      fn();
      setLeaving(false);
      busy.current = false;
      window.scrollTo(0, 0);
    }, 380);
  }, []);

  const next = useCallback(
    () => change(() => setStep((s) => Math.min(s + 1, SCREENS.length - 1))),
    [change]
  );

  const restart = useCallback(
    () =>
      change(() => {
        music.reset();
        setStep(0);
        setRun((r) => r + 1);
      }),
    [change]
  );

  const Screen = SCREENS[step];
  const progress = (step / (SCREENS.length - 1)) * 100;

  return (
    <>
      {step > 0 && (
        <div className="progress" aria-hidden="true">
          <i style={{ width: `${progress}%` }} />
        </div>
      )}
      {step > 0 && <MusicToggle />}
      <div key={`${run}-${step}`} className={`stage${leaving ? ' leaving' : ''}`} data-step={step + 1}>
        <Screen onNext={next} onRestart={restart} />
      </div>
    </>
  );
}
