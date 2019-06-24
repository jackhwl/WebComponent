import { Observable, of, from, fromEvent, concat } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { allBooks, allReaders } from './data';

/**
 * if you want to consume the data inside of an observable. Create
 * an observer object with three handlers. You hand the observer object 
 * to an observable. the observable pushed data into the observer object
 * and by extension your callbacks. And it'll call onNext, onError, onComplete
 * 
 * subscribe
 * var subscription = mouseMoves.forEach(
 *      event => console.log(event),
 *      error => console.error(error),
 *      () => console.log("done");
 * );
 * * var subscription = mouseMoves.forEach({     // Observer object
 * *      onNext: event => console.log(event),
 * *      onError: error => console.error(error),
 * *      onCompleted: () => console.log("done");
 * * });
 * unsubscribe
 * subscription.dispose();
 * 
 * An observer observes an observable
 * 
 * An observable is nothing but an object with a forEach method.
 * 
 * Subscribers are just objects that implement the observer interface, which means they have
 * methods named next, error and complete.
 */

// function subscribe3(subscriber) {
//     for (let book of allBooks) {
//         subscriber.next(book);
//     }
// }

// let allBooks$ = Observable.create(subscriber => {
//     if (document.title !== 'RxBookTracker') {
//         subscriber.error('Incorrect page title.');
//     }
//     for (let book of allBooks) {
//         subscriber.next(book);
//     }
//     setTimeout(() => {
//         subscriber.complete();
//     }, 2000);

//     return () => console.log('Executing teardown code.');
// });

// allBooks$.subscribe(book => console.log(book.title));

// function myObservable(forEach) {
//     this._forEach = forEach;
// }
// myObservable.prototype = {
//     forEach: function(onNext, onError, onComplete) {
//         if (typeof onNext === 'function') {
//             return this._forEach({
//                 onNext: onNext,
//                 onError: onError || function() {},
//                 onComplete: onComplete || function() {}
//             })
//         } else {
//             return this._forEach(onNext);
//         }
//     }
// }

// let source1$ = of('hello', 10, true, allReaders[0].name);
// // source1$.subscribe(value => console.log(value));

// let source2$ = from(allBooks);
// // source2$.subscribe(book => console.log(book.title));

// concat(source1$, source2$)
//     .subscribe(value => console.log(value));

// let button = document.getElementById('readersButton');
// fromEvent(button, 'click')
//     .subscribe(event => {
//         console.log(event);

//         let readersDiv = document.getElementById('readers');
//         for (let reader of allReaders) {
//             readersDiv.innerHTML += reader.name + '<br>';
//         }
//     });

let button = document.getElementById('readersButton');
fromEvent(button, 'click')
    .subscribe(event => {
        ajax('/api/readers')
        .subscribe(ajaxResponse => {
            console.log(ajaxResponse);
            let readers = ajaxResponse.response;

            let readersDiv = document.getElementById('readers');
            for (let reader of readers) {
                readersDiv.innerHTML += reader.name + '<br>';
            }            
        })
    });