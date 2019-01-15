importScripts("precache-manifest.b60a19258b68e1b7a983de578aedc8fc.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

console.log("⚙️ Hello from Service Worker");

workbox.routing.registerRoute(
    /https:\/\/jsonplaceholder\.typicode\.com/,
    workbox.strategies.networkFirst()
)

// workbox.skipWaiting();

workbox.precaching.precacheAndRoute(self.__precacheManifest);
