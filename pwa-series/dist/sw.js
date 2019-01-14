importScripts("precache-manifest.d5b0f2432d4952bb241c01866f91e0fe.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

console.log("⚙️ Hello from Service Worker");

workbox.routing.registerRoute(
    /https:\/\/jsonplaceholder\.typicode\.com/,
    workbox.strategies.networkFirst()
)

// workbox.skipWaiting();

workbox.precaching.precacheAndRoute(self.__precacheManifest);
