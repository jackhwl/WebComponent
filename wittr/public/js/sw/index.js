var staticCacheName = 'wittr-static-v6';
var contentImgsCache = 'wittr-content-imgs';
var allCaches = [staticCacheName, contentImgsCache];

self.addEventListener('install', function(event) {
    var urlsToCache = [
        '/skeleton',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        //'https://fonts.gstatic.com/s/roboto/v15/'
    ];

    event.waitUntil(
        // TODO: open a cache named 'wittr-static-v1'
        caches.open(staticCacheName).then(function(cache){
            return cache.addAll(urlsToCache);
        })
        // Add cache the urls from urlsToCache
    );
});

self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName.startsWith('wittr-') && !allCaches.includes(cacheName);
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    // TODO: respond to requests for the root page with
    // the page skeleton from the cache
    var requestUrl = new URL(event.request.url);

    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(caches.match('/skeleton'));
            return;
        }
        if (requestUrl.pathname.startsWith('/photos/')) {
            event.respondWith(servePhoto(event.request));
            return;
        }
    }

    event.respondWith(
        caches.match(event.request).then(function(response){
            if (response) return response;
            return fetch(event.request);
        })
        //console.log('Hello 222 333 45s world!!!!!!!');
        // if (event.request.url.endsWith('.jpg')) {
        //     event.respondWith(
        //         // new Response('<div class="a-winner-is-me"></div>Hello <b>world!</b></div>', {
        //         //     headers: {'foo': 'bar', 'Content-Type': 'text/html'}
        //         // })
        //         fetch('/imgs/dr-evil.gif')
        //     );
        // }

        // fetch(event.request).then(function(response){
        //     if (response.status == 404){
        //         // TODO: instead, respond with the gif
        //         //return new Response("Whoops, not found");
        //         // using a network request
        //         return fetch('/imgs/dr-evil.gif');
        //     }
        //     return response;
        // }).catch(function(){
        //     return new Response("Uh oh, that totally failed");
        // })
    );
});

function servePhoto(request){
    // /photos/98028-7527734776-e1d2bda28e-800px.jpg
    var storageUrl = request.url.replace(/-\d+px\.jpg$/, '');

    // TODO: return images from the "wittr-content-imgs" cache
    // if they're in there. Otherwise, fetch the images from 
    // the network, put them into the cache, and send it back 
    // to the browser.
    //
    // HINT: cache.put supports a plain url as the first parameter

    return caches.open(contentImgsCache).then(function(cache){
        return cache.match(storageUrl).then(function(response){
            if (response) return response;

            return fetch(request).then(function(networkResponse){
                cache.put(storageUrl, networkResponse.clone());
                return networkResponse;
            });
        });
    });
}
// TODO: listen for the "message" event, and call
// skipWaiting if you get the appropriate message

self.addEventListener('message', function(event) {
    if (event.data.action == 'skipWaiting') {
        self.skipWaiting();
    }
});
