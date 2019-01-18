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
}

function getData(objectStore, predicate) {
    
}