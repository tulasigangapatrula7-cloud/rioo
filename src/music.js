import { useSyncExternalStore } from 'react';
import { ASSETS } from './content.js';

/*
 * One single background-music controller for the whole site.
 * - The <audio> element is created once (module level), so there are never duplicate players.
 * - It only starts after a user gesture (music.start() is called from the 🎵 tap).
 * - "wants" = whether Rio wants music on. The video screen temporarily suspends it.
 */
let audio = null;
let wants = false;
let suspended = false;
let state = { wants: false, available: true };
const listeners = new Set();

function set(patch) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

function ensure() {
  if (audio || typeof Audio === 'undefined') return audio;
  audio = new Audio(ASSETS.music);
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0.75;
  audio.addEventListener('error', () => set({ available: false }));
  return audio;
}

async function tryPlay() {
  const a = ensure();
  if (!a) return;
  try {
    await a.play();
  } catch {
    /* blocked by the browser or file missing – the site keeps working silently */
  }
}

export const music = {
  start() {
    wants = true;
    set({ wants: true });
    if (!suspended) tryPlay();
  },
  toggle() {
    if (wants) {
      wants = false;
      set({ wants: false });
      audio?.pause();
    } else {
      wants = true;
      set({ wants: true });
      if (!suspended) tryPlay();
    }
  },
  suspend() {
    suspended = true;
    audio?.pause();
  },
  resume() {
    suspended = false;
    if (wants) tryPlay();
  },
  reset() {
    wants = false;
    suspended = false;
    set({ wants: false });
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  },
  subscribe(l) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot() {
    return state;
  },
};

export function useMusic() {
  return useSyncExternalStore(music.subscribe, music.getSnapshot, music.getSnapshot);
}
