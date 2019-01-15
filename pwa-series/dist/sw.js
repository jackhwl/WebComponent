importScripts("precache-manifest.f9c4ae9f79b5807e70f74201a63bf8e4.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

console.log("⚙️ Hello from Service Worker");

workbox.routing.registerRoute(
    /https:\/\/jsonplaceholder\.typicode\.com/,
    workbox.strategies.networkFirst()
)

// workbox.skipWaiting();

workbox.precaching.precacheAndRoute(self.__precacheManifest);
