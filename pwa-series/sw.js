/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
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
    "url": "workbox-config.js",
    "revision": "dca7965d1b81bc3b2040ccd53a0df521"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/https:\/\/jsonplaceholder\.typicode\.com/, workbox.strategies.networkFirst(), 'GET');
