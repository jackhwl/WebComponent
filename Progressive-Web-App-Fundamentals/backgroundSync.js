// persisting to indexedDB
indexedDB.open('sodapopped', 1).onsuccess = evt => {
    var db = evt.target.result;
    var reviews = db.transaction(['reviews'], 'readwrite').objectStore('reviews'), 
        image = picture.files ? picture.files[0] : null,
        val = { 
            key: key,
            drinkId: drinkId,
            drinkSlug: drink,
            brandSlug: brand,
            rating: Number.parseInt(rating.value),
            comments: commentsBox.value,
            picture: image,
            isSynced: false
        },
        operation = reviews.put(val);

        operation.onsuccess = () => {
        // regigter for sync
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            navigator.serviceWorker.ready
                .then(sw => {
                    return sw.sync.register('sync-reviews')
                    .then(r => {
                        // sync registered! Update screen?
                        updateUI(val)
                    });
                })
        } else {
            // TODO: Send data to server via ajax
        }
    }
};

// sw.js
self.addEventListener('sync', event => {
    if(event.tag === 'sync-reviews') {
        event.waitUntil(syncDataWithServer());
    }
})

function syncDataWithServer() {
    openDatabase('sodapopped', 1)
    .then(evt => {
        db = evt.target.result,
        reviews = db.transaction(['reviews'], 'readwrite').objectStore('reviews');

        return getDate(reviews, r => r.isSynced === false);
    })
    .then(results => {
        for (result of results) {
            var body = new FormData();

            for (key in result) {
                body.append(key, result[key]);
            }

            fetch('/review/now', {
                method: 'POST',
                body: body,
                credentials: 'include'
            })
            .then(res => {
                if (res.ok) {
                    result.isSynced = true;
                    db.transaction(['reviews'], 'readwrite')
                    .objectStore('reviews')
                    .put(result);
                }
            });
        }
    })
}

function getData(objectStore, predicate) {
    return new Promise((resolve, reject) => {
        var r = [];
        function onsuccess(evt) {
            cursor = evt.target.result;
            if (cursor) {
                if (predicate(cursor.value)) {
                    r.push(cursor.value);
                }
                cursor.continue();
            } else {
                resolve(r);
            }
        }
        objectStore.openCursor().onsuccess = onsuccess;
    });
}

// Periodic Synchronization
sw.periodicSync.register({
    tag: 'get-latest',
    minPeriod: 12 * 60 * 60 * 1000, // 12 hours, in ms
    powerState: 'avoid-draining',
    networkState: 'avoid-cellular'
}).then(reg => {
    // success
}, err => {
    // failure
});

self.addEventListener('periodicsync', evt => {
    if (evt.registration.tag == 'get-latest') {
        event.waitUntil(fetchAndCacheLatestData());
    }
});