self.addEventListener('install', function(event){
    event.waitUntil(
        // return Promise to install SW

        // force update
        // self.skipWaiting();  
    );

});

self.addEventListener('activate', function(event){
    event.waitUntil(
        // return Promise to activate SW
    );
});

self.addEventListener('fetch', function(event){
    if (!navigator.onLine) {
        event.respondWith(new Response('<h1> Offline: </h1>', { headers: { 'Content-Type': 'text/html' }}));
    } else {
        event.respondWith(fetch(event.request));
    }
});
