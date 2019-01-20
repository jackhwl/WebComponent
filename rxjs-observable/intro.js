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
// subscribe, error & completed are optional
var subscription = mouseMoves.forEach(
    // next data
    event => console.log(event),
    // error
    error => console.error(error),
    // completed
    () => console.log('done')
);

var subscription = mouseMoves.forEach({
    onNext: event => console.log(event),
    // error
    onError: error => console.error(error),
    // completed
    onCompleted: () => console.log('done')
});

// unsubscribe
subscription.dispose();

// iterator: consumer control the process by asking for next object, until it's done
// observable: producer control the process by keey sending next object to consumer(consumer don't need ask for next)
// three object is observable, observer observse three observable

// An Observable is nothing but an object with a forEach method. 
// A Suscription is nothing but an object with a dispose methos.
// evey foreach method at the end has to return a subscription object
// Converting Events to Obserables
Obserable.fromEvent = function(dom, eventName) {
    // returning Obserable object
    return {
        forEach: function(observer) {
            var handler = (e) => observer.onNext(e);
            dom.addEventListener(eventName, handler);

            // returning Subscription object
            return {
                dispose: function() {
                    dom.removeEventListener(eventName, handler);
                }
            };
        }
    };
}

// {1...2.....3}.forEach(x => consoel.log(x));  1  2     3
// {1...2.....3}.map(x => x+1).forEach(log);  2  3      4
// {1...2.....3}.filter(x => x>1).forEach(log);  2      3

concatAll

// takeUntil: take two infinity observeable into observeable ends, 
// with this method, don't need remove event listener, cause under the hood, 
// takeUntil will call dispose on these two observeable.

// {1...2.....3}.takeUntil(
// {........4})

// {1...2...}

// Mouse Drags Collection

var getElementDrags = elmt => {
    elmt.mouseDowns = Observable.fromEvent(elmt, 'mousedown');
    elmt.mouseUps = Observable.fromEvent(elmt, 'mouseup');
    elmt.mouseMoves = Observable.fromEvent(elmt, 'mousemove');

    return elmt.mouseDowns.map(mouseDown => document.mouseMoves.takeUntil(document.mouseUps)).concatAll();
}

getElementDrags(image).forEach(pos => image.position = pos);

// mergeAll  first come first serve, don't care about order; contactAll will wait current observeable finish 

// switchLatest, when new observable arrive, will dispose current one, move on to the new one.

// Don't unsubscribe from Events. Complete them when another event fires.

// Netflix Search

var searchResultSets = 
    keyPresses.
        throttle(250).
        map(key => 
            getJSON('/searchResults?q=' + input.value).
                retry(3).
                takeUntil(keyPresses)).
        concatAll();

var searchResultSets = 
        keyPresses.
            throttle(250).
            map(key => 
                getJSON('/searchResults?q=' + input.value).
                    retry(3)).
            switchLatest();
    
searchResultSets.forEach(
    resultSet => updateSearchResults(resultSet),
    error => showMessage('the server appears to be down.')
);

// Promise is hot, Observable is cold, only issue network request when you forEach looping it, like linq, it's lazy

// Netflix: Observable Everywhere:
// App Startup
// Player
// Data Access
// Animations
// View/Model binding