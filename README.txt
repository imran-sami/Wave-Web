WAVE - WEB VERSION
==================
Offline music + video player (mp3, m4a, mp4, mkv, webm ...). Works in any modern browser.

RUN LOCALLY (test)
  python3 -m http.server 8080      (run inside this folder)
  open http://localhost:8080

PUT ONLINE (free, pick one)
  - Netlify: drag this whole folder onto app.netlify.com/drop
  - Cloudflare Pages / Vercel / GitHub Pages: upload these files as a static site (no build step)
  IMPORTANT: it must be served over HTTPS (or localhost). Install-to-home-screen,
  offline mode and the audio engine do not work from file:// or plain http.

INSTALL AS AN APP
  Chrome/Edge: install icon in the address bar.  Android: menu > Add to Home screen.
  iPhone Safari: Share > Add to Home Screen.

HOW FILES GET IN
  Unlike the Android APK, a website cannot scan the phone/PC automatically.
  Use the add buttons in the app (audio / video / folder) to pick files. They are stored
  in the browser (IndexedDB) so they stay after you close it.

UPDATE
  Replace index.html on your host. Bump V in sw.js (wave-web-v2 ...) if you change other files.
