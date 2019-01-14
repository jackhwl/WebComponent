importScripts("precache-manifest.656e36fd86f4c5e5b9743517dbfdb33d.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

console.log("⚙️ Hello from Service Worker");

workbox.routing.registerRoute(
    /https:\/\/jsonplaceholder\.typicode\.com/,
    workbox.strategies.networkFirst()
)

// workbox.skipWaiting();

workbox.precaching.precacheAndRoute(self.__precacheManifest);
