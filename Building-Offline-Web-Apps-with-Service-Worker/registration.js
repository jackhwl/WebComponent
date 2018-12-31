if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/scripts/sw.js', { scope: '/brand'})
        .catch(err => console.error('Theres a problem', err));
}