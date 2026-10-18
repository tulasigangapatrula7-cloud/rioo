import { useEffect, useRef, useState } from 'react';
import { Stars } from '../components/Ambient.jsx';
import { ASSETS, VIDEO } from '../content.js';
import { music } from '../music.js';

export default function VideoScreen({ onNext }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  const [ended, setEnded] = useState(false);

  // While the video plays, the background song is paused so Junnie's own audio is heard clearly.
  // It resumes (if Rio had music on) when the video pauses, ends, or this screen closes.
  useEffect(() => () => music.resume(), []);

  const replay = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    setEnded(false);
    v.play().catch(() => {});
  };

  return (
    <main className="screen theme-night video-screen">
      <Stars count={30} seed={91} />
      <div className="content">
        <h1 className="title-serif video-title">{VIDEO.heading}</h1>
        <div className="video-frame">
          {failed ? (
            <div className="video-missing">
              The video could not be loaded.
              <br />
              Put it at <code>public/videos/junnie-video.mp4</code>
            </div>
          ) : (
            <video
              ref={ref}
              src={ASSETS.video}
              controls
              playsInline
              preload="metadata"
              onPlay={() => {
                setEnded(false);
                music.suspend();
              }}
              onPause={() => music.resume()}
              onEnded={() => setEnded(true)}
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <div className="video-actions">
          <button type="button" className="btn btn-ghost" onClick={replay} disabled={failed}>
            {ended ? '↺ Watch again' : '↺ Replay'}
          </button>
          <button type="button" className="btn btn-rose" onClick={onNext}>
            Continue 💗
          </button>
        </div>
      </div>
    </main>
  );
}
