/* Careon service worker – relative paths work in a GitHub Pages subfolder. */
var CACHE_NAME = "careon-v2";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/fonts.css",
  "./css/base.css",
  "./css/layout.css",
  "./css/components.css",
  "./css/chat.css",
  "./css/glass.css",
  "./js/data.js",
  "./js/engine.js",
  "./js/chat.js",
  "./js/main.js",
  "./assets/careon-logo.svg",
  "./assets/careon-mark.svg",
  "./icons/favicon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./fonts/outfit-latin.woff2",
  "./fonts/outfit-latin-ext.woff2"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) {
        return caches.delete(k);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(function (cached) {
      var fetched = fetch(req).then(function (res) {
        if (res && res.ok && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        if (cached) return cached;
        if (req.mode === "navigate") return caches.match("./index.html");
        return new Response("", { status: 503, statusText: "Offline" });
      });
      return cached || fetched;
    })
  );
});
