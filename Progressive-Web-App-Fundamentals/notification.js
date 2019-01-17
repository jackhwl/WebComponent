// https://tests.peter.sh/ notification generator

if (Notification.permission === 'granted') {
    showNotification();
    return;
}

if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(p => {
        if (p === 'granted') showNotification();
    });
}

var n = new Notification('Title', 
{
    body: 'body text',
    badge: '/path/to/image.ext',
    icon: '/path/to/image.ext',
    image: 'path/to/image.ext',
    tag: 'foo',
    renotity: false,
    data: { 
        // obj here
    },
    requireInteraction: false,
    actions: [{
        action: 'id',
        title: 'Action Title',
        icon: '/path/to/image.ext'
    }],
    silent: false,
    sound: '/path/to/audio.ext',
    vibrate: [200, 100, 200],
    dir: 'ltr',
    lang: 'en-US',
    timestamp: Date.now(),
});

n.addEventListener('error', evt => {
    console.error('There was a problem', evt);
});

n.addEventListener('click', evt => {
    console.log('Notification clicked!');
});

n.close();

// persistent Notifications

self.registration.showNotification('Title', {
    actions: [{ action: 'view', title: 'Action Title', icon: 'plus.png'}],
    // other options
});

self.addEventListener('notificationclick', evt => {
    // clicked on action body not button
    if (!evt.action) {
        console.log('Notification clicked!');
        return;
    }

    // handle notification action click
    switch (evt.action) {
        case 'view':
            console.log('View action clicked!');
            break;
        default:
            console.warn('${evt.action} action clicked!');
            break;
    }
});

self.addEventListener('notificationclose', evt => {
    console.log('notification closed');
});

self.addEventListener('notificationclick', evt => {
    evt.notification.close();
});