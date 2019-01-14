importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

console.log("⚙️ Hello from Service Worker");

workbox.routing.registerRoute(
    /https:\/\/jsonplaceholder\.typicode\.com/,
    workbox.strategies.networkFirst()
)

workbox.precaching.precacheAndRoute([
  {
    "url": "app.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app.js",
    "revision": "e4f46076b3601450174e8578527cdac7"
  },
  {
    "url": "index.html",
    "revision": "4efe2e8ac42cb15d69d81bfcd4edc649"
  },
  {
    "url": "src-sw.js",
    "revision": "d286388d6099497658176c20b3636ff1"
  },
  {
    "url": "workbox-config.js",
    "revision": "090943c506315f89d69ddcbca18b5f30"
  }
]);