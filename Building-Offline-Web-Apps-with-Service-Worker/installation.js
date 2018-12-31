self.addEventListener('install', function(event){
    event.waitUntil(
        // return Promise to install SW
    );
});

self.addEventListener('activate', function(event){
    event.waitUntil(
        // return Promise to activate SW
    );
});

self.addEventListener('fetch', function(event){
    event.respondWith(fetch(event.request));
});
