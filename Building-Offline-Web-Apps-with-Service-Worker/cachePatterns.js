// network only
event.respondWith(
    fetch(event.request)
);

// cache only
event.respondWith(
    caches.match(event.request)
);

// cache first (read through), check cache first, if found return, not found go to network, return and write to cache
event.respondWith(
    caches.match(event.request).then(function (cResponse) {
        if (cResponse) { return cResponse; }
        return fetch(event.request).then(function (fResponse) {
            return caches.open('v1').then(function(cache){
                return cache.put(event.request, fResponse.clone()).then(function(){
                    return fResponse;
                });
            });
        });
    })
);

// network first (stale while eror pattern)
event.respondWith(
    fetch(event.request).then(function(fResponse) {
        return caches.open('v1').then(function(cache) {
            if (!fResponse.ok) {
                return cache.match(event.request);
            } else {
                cache.put(event.request, fResponse.clone());
                return fResponse;
            }
        });
    })
);

// fastest
event.respondWith(() => {
    var promises = [caches.match(event.match), fetch(event.request)];
    return new Promise((resolve, reject) => { // Promise.race doesn't work well here...
        promises.map(p => Promise.resolve(promise));
        promises.forEach(p => p.then(resolve));
        promises.reduce((a, b) => a.catch(()=> b))
        .catch(() => reject (new Error('Both promises failed.')));
    });
    }

);