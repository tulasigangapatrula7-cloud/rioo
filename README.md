# Rio's Birthday 💗 — made by Junnie

A 13-screen interactive birthday experience (React + Vite). Screen 14 is the **Watch Again** button at the bottom of the final screen.

## Run it on your computer (beginner steps)

1. Install **Node.js** (the LTS version) from https://nodejs.org
2. Open a terminal inside this folder (`rio-birthday`).
3. Install the project once:
   ```
   npm install
   ```
4. Start it:
   ```
   npm run dev
   ```
5. Open the address it prints (usually http://localhost:5173). Use your browser's phone view (F12 → device icon) to see the mobile layout.

Check the production build any time with `npm run build` (output goes to `dist/`) and `npm run preview`.

## Put it online with Vercel (free)

**Option A – GitHub (recommended)**
1. Push this folder to a GitHub repository (do not upload `node_modules`).
2. On https://vercel.com choose *Add New → Project*, import the repo and press **Deploy**. Vercel detects Vite automatically (build command `npm run build`, output folder `dist`).

**Option B – Vercel CLI**
```
npm install -g vercel
vercel          # follow the prompts
vercel --prod   # publishes the final link
```

The photo, video and music are inside `public/`, so they are uploaded with the site automatically.

## Where to change things

| What | Where |
| --- | --- |
| Rio's photo | replace `public/images/rio-photo.jpg` (keep the name) |
| Junnie's video | replace `public/videos/junnie-video.mp4` |
| Background music | replace `public/audio/birthday-music.mp3` |
| PIN, envelope messages, award, contract, **letter**, fake ending, **secret reveal**, final wish | `src/content.js` (plain text, one section per block) |
| Colours | CSS variables at the top of `src/styles.css` |

### Junnie's letter
`LETTER` in `src/content.js` is a draft written only from the sentiments in the brief (plus the exact Telugu line). Replace the paragraphs with Junnie's own words — one string per paragraph.

### Secret reveal
`SECRET` in `src/content.js` controls the text. To add a photo, put it in `public/images/` and set `image: `${BASE}images/secret.jpg``.

## Tip: faster video start (optional)
The supplied MP4 stores its index at the end of the file, which is fine for a 5 MB clip. If you ever want it to start a touch faster you can move the index to the front **without re-encoding** (picture and sound are untouched):
```
ffmpeg -i junnie-video.mp4 -c copy -movflags +faststart junnie-video-fast.mp4
```
