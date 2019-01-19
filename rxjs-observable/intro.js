// Event Subscription
// subscribe
var handler = (e) => console.log(e);
document.addEventListener('mousemove', handler);

// unsubscribe
document.removeEventListener('mousemove', handler);



// Observable Subscription
// subscribe
var subscription = mouseMoves.forEach(console.log);

// unsubscribe
subscription.dispose();


// Expanded Observable.forEach
// subscribe
var subscription = mouseMoves.forEach(
    // next data
    event => console.log(event),
    // error
    error => console.error(error),
    // completed
    () => console.log('done')
);

// unsubscribe
subscription.dispose();