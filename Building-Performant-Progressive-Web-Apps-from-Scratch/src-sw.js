workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
    /https:\/\/pluralsight\-pwa\-scratch\.firebaseio\.com\/.*\.json/,
  new workbox.strategies.NetworkFirst()
)