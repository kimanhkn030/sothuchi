// Lets the app open without internet. Your notebook data is NOT stored here;
// it lives in the browser's localStorage and is never sent anywhere.
// When you change index.html, bump VERSION (and APP_VERSION in index.html).
const VERSION = "sothuchi-v5";
const SHELL = ["./", "index.html", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION)
    .then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const same = url.origin === location.origin;
  const fonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!same && !fonts) return;

  // The app page itself: always try the network first so updates show up right away,
  // fall back to the saved copy when offline.
  if (req.mode === "navigate" || (same && /\/(index\.html)?$/.test(url.pathname))){
    e.respondWith(fetch(req, { cache: "no-cache" }).then(res => {
      if (res && res.ok) caches.open(VERSION).then(c => c.put("index.html", res.clone()));
      return res;
    }).catch(() => caches.match("index.html").then(r => r || caches.match("./"))));
    return;
  }

  // Icons, manifest, fonts: cached copy first, refreshed in the background.
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(req, { ignoreSearch: same });
    const fresh = fetch(req).then(res => {
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    }).catch(() => hit);
    return hit || fresh;
  }));
});
