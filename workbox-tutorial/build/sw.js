importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

console.log('this is my custom service worker');

workbox.routing.registerRoute(
    new RegExp('https://jsonplaceholder.typicode.com/users'),
    workbox.strategies.cacheFirst()
  );
  
workbox.precaching.precacheAndRoute([
  {
    "url": "css/app.css",
    "revision": "fd2e1d3c4c8d43da10afe67a7d69fbd1"
  },
  {
    "url": "index.html",
    "revision": "4fd18ab9fb79d5c0c6cbb4701597af56"
  },
  {
    "url": "js/app.js",
    "revision": "03bde26b6af07cd6bb0378ec0a50e410"
  }
]);

