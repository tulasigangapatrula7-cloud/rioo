import { useMemo } from 'react';
import { seeded } from '../hooks.js';

/* Decorative, non-interactive layers. All are aria-hidden and pointer-events: none. */

export function Stars({ count = 30, seed = 7 }) {
  const items = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: r() * 100,
      top: r() * 100,
      size: 2 + r() * 3,
      d: 2.4 + r() * 3.6,
      delay: -r() * 5,
      gold: r() > 0.82,
    }));
  }, [count, seed]);
  return (
    <div className="layer" aria-hidden="true">
      {items.map((s) => (
        <span
          key={s.id}
          className={`star${s.gold ? ' gold' : ''}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            '--d': `${s.d}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingHearts({ count = 10, seed = 3, tone = 'rose' }) {
  const items = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: r() * 100,
      size: 12 + r() * 16,
      d: 10 + r() * 9,
      delay: -r() * 16,
      dx: (r() - 0.5) * 80,
      alt: r() > 0.6,
    }));
  }, [count, seed]);
  return (
    <div className="layer" aria-hidden="true">
      {items.map((h) => (
        <span
          key={h.id}
          className={`fheart ${tone}${h.alt ? ' alt' : ''}`}
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            '--d': `${h.d}s`,
            '--dx': `${h.dx}px`,
            animationDelay: `${h.delay}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

export function Petals({ count = 14, seed = 11 }) {
  const items = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: r() * 100,
      size: 10 + r() * 10,
      d: 9 + r() * 8,
      delay: -r() * 14,
      dx: (r() - 0.5) * 140,
      tint: i % 3,
    }));
  }, [count, seed]);
  return (
    <div className="layer" aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          className={`petal t${p.tint}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            '--d': `${p.d}s`,
            '--dx': `${p.dx}px`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const CONFETTI_COLORS = ['#F5A9C8', '#C8B6F0', '#E7C887', '#FFF6EC', '#2453C5', '#C94F70'];

export function Confetti({ count = 70, seed = 21 }) {
  const items = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: r() * 100,
      w: 6 + r() * 6,
      h: 9 + r() * 9,
      d: 3.2 + r() * 3.5,
      delay: -r() * 6,
      dx: (r() - 0.5) * 160,
      rot: 360 + r() * 720,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      round: r() > 0.7,
    }));
  }, [count, seed]);
  return (
    <div className="layer" aria-hidden="true">
      {items.map((c) => (
        <span
          key={c.id}
          className="confetti"
          style={{
            left: `${c.left}%`,
            width: c.w,
            height: c.h,
            background: c.color,
            borderRadius: c.round ? '50%' : 2,
            '--d': `${c.d}s`,
            '--dx': `${c.dx}px`,
            '--rot': `${c.rot}deg`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const BALLOON_COLORS = ['#C94F70', '#2453C5', '#C8B6F0', '#E7C887', '#F5A9C8'];

export function Balloons({ count = 6, seed = 5 }) {
  const items = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 4 + (i * 92) / count + r() * 6,
      d: 11 + r() * 6,
      delay: -r() * 14,
      size: 44 + r() * 22,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
    }));
  }, [count, seed]);
  return (
    <div className="layer" aria-hidden="true">
      {items.map((b) => (
        <span
          key={b.id}
          className="balloon"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 1.22,
            '--c': b.color,
            '--d': `${b.d}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* A one-shot burst of sparkles around a point (used for the stamp and the secret orb). */
export function SparkleBurst({ count = 10, radius = 90, color = 'gold' }) {
  const items = useMemo(() => {
    const r = seeded(99);
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + r() * 0.4;
      const dist = radius * (0.7 + r() * 0.6);
      return {
        id: i,
        x: Math.cos(a) * dist,
        y: Math.sin(a) * dist,
        size: 8 + r() * 8,
        delay: r() * 0.15,
      };
    });
  }, [count, radius]);
  return (
    <span className="burst" aria-hidden="true">
      {items.map((s) => (
        <i
          key={s.id}
          className={`spark ${color}`}
          style={{
            '--x': `${s.x}px`,
            '--y': `${s.y}px`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </span>
  );
}
