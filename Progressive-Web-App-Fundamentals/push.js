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