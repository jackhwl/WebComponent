if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw-min.js')
        .then(r => console.log('SW Registered'))
        .catch(console.error);

}