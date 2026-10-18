import { Stars } from '../components/Ambient.jsx';
import { music } from '../music.js';

export default function MusicScreen({ onNext }) {
  const begin = () => {
    music.start(); // runs inside the tap, so browsers allow audio
    onNext();
  };
  return (
    <main className="screen theme-night music-screen">
      <Stars count={46} seed={2} />
      <button type="button" className="music-symbol" onClick={begin} aria-label="Play music and begin">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="noteG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F5A9C8" />
              <stop offset=".55" stopColor="#C8B6F0" />
              <stop offset="1" stopColor="#8FB0FF" />
            </linearGradient>
          </defs>
          <path
            d="M26 12 48 7v33.5a9 9 0 1 1-5-8V19.6L31 22.2V47a9 9 0 1 1-5-8z"
            fill="url(#noteG)"
          />
        </svg>
      </button>
    </main>
  );
}
