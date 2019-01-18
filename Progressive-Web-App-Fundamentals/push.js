// http://web-push-codelab.glitch.me/

var pubKey = 'BP_mRQGs8otey3-zzC2-6AyCDhWZR-MPVbobEVLEy0L8es8S07EEIjnlt6vVsZ4XT19biAFzTrzoHPDWcz6sE9Q'
// '987yXqMJt9TACWO0BPxJMEmOmvAhCUYzRL-pPPe9NnE'

var notifyBtn = document.getElementById('notify-btn'), btnIcon = notifyBtn.children[0];

if ('serviceWorker' in navigator && 'PushManager' in window) {
    notifyBtn.classList.remove('hidden');

    if (Notification.permission !== 'denied') {
        notifyBtn.disabled = false;
    }

    navigator.serviceWorker.ready.then(sw => {
        sp.sw = sw;

        sw.pushManager.getSubscription()
        .then(s => {
            var isSubscribed = s !== null;

            btnIcon.innerHTML = isSubscribed ? '&#xf1f6' : '&#xf0f3';
        });
    });
}

notifyBtn.addEventListener('click', function(evt) {
    this.disabled = true;

    sp.sw.pushManager.getSubscription().then(s => {
        if (s !== null) {
            s.unsubscribe();
            // TODO: tell server to delete subscription

            btnIcon.innerHTML = '&#xf0f3';
            this.disabled = false;
        } else {
            sp.sw.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array(pubKey)
            })
            .then(s => fetch('api/subscription', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(s)
            }))
            .then(res => {
                btnIcon.innerHTML = '&#xf1f6';
                this.disabled = false;
            });
        }
    });
});

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }


  // in sw.js
  self.addEventListener('push', evt => {
    var payload = evt.data.json();
    // do something with payload

    var options = {
        // configure options
        body: payload.drink.name + ' from ' + payload.brand.name,
        icon: '/android-chrome-192x192.png',
        badge: '/android-chrome-192x192.png',
        data: payload,
        actions: [
            { action: 'view', title: 'See It', icon: '/content/{{eye-png}}'},
            { action: 'later', title: 'Pop it later', icon: '/content/{{plus-png}}'}
        ]
    };
    evt.waitUntil(
        self.registration.showNotification('Title', options)
    );
  });

  self.addEventListener('notificationclick', evt => {
    evt.notification.close();

    var payload = evt.notification.data;

    switch(event.action) {
        case 'later':
            var form = new FormData();
            form.append('drinkId', payload.drink.id);
            form.append('drinkSlug', payload.drink.slug);
            form.append('brankSlug', payload.brand.slug);

            event.waitUntil(fetch('/review/later', { method: 'POST', body: form, credentials: 'include' }));
            break;
        case 'view':
        default:
        var brand = payload.brand.slug,
        drink = payload.drink.slug;
        evt.waitUntil(
            clients.openWindow(`${evt.target.location.origin}/${brand}/${drink}/`)
        );
    }
  });