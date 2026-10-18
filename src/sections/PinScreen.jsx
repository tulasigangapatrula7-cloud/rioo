import { useCallback, useEffect, useState } from 'react';
import { Stars } from '../components/Ambient.jsx';
import { PIN, PIN_WRONG_MESSAGES } from '../content.js';
import { useTimeouts } from '../hooks.js';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'];

export default function PinScreen({ onNext }) {
  const [digits, setDigits] = useState('');
  const [status, setStatus] = useState('idle'); // idle | wrong | ok
  const [attempt, setAttempt] = useState(0);
  const after = useTimeouts();

  const press = useCallback(
    (d) => {
      if (status !== 'idle' || digits.length >= 4) return;
      const value = digits + d;
      setDigits(value);
      if (value.length < 4) return;
      if (value === PIN) {
        setStatus('ok');
        after(1300, onNext);
      } else {
        setStatus('wrong');
        setAttempt((a) => a + 1);
        after(850, () => {
          setDigits('');
          setStatus('idle');
        });
      }
    },
    [after, digits, onNext, status]
  );

  const back = useCallback(() => {
    if (status === 'idle') setDigits((d) => d.slice(0, -1));
  }, [status]);

  useEffect(() => {
    const onKey = (e) => {
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [press, back]);

  const message =
    status === 'ok'
      ? 'PIN accepted! Unlocking… 💗'
      : status === 'wrong'
        ? PIN_WRONG_MESSAGES[(attempt - 1) % PIN_WRONG_MESSAGES.length]
        : 'Enter the 4-digit PIN';

  return (
    <main className="screen theme-night">
      <Stars count={30} seed={4} />
      <div className="content">
        <div className={`atm${status === 'wrong' ? ' shake' : ''}${status === 'ok' ? ' unlocked' : ''}`}>
          <svg className="lock" viewBox="0 0 64 64" aria-hidden="true">
            <path className="shackle" d="M20 28v-8a12 12 0 0 1 24 0v8" fill="none" stroke="#E7C887" strokeWidth="5" strokeLinecap="round" />
            <rect x="12" y="28" width="40" height="28" rx="7" fill="#E7C887" />
            <circle cx="32" cy="41" r="4" fill="#21152F" />
            <rect x="30" y="43" width="4" height="8" rx="2" fill="#21152F" />
          </svg>
          <h1 className="title-serif">Junnie ATM PIN</h1>
          <div className="pin-dots" role="img" aria-label={`${digits.length} of 4 digits entered`}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={i < digits.length ? 'on' : ''} />
            ))}
          </div>
          <p className={`pin-msg ${status}`} role="status" aria-live="polite">
            {message}
          </p>
          <div className="keypad">
            {KEYS.map((k) =>
              k === 'clear' ? (
                <button key={k} type="button" className="key ghost" onClick={() => status === 'idle' && setDigits('')} aria-label="Clear">
                  C
                </button>
              ) : k === 'back' ? (
                <button key={k} type="button" className="key ghost" onClick={back} aria-label="Delete last digit">
                  ⌫
                </button>
              ) : (
                <button key={k} type="button" className="key" onClick={() => press(k)}>
                  {k}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
