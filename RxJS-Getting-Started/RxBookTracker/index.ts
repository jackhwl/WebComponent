import { Observable, of, from, fromEvent, concat, interval, Subscriber, throwError, Subject } from 'rxjs';
import { map, mergeMap, filter, tap, catchError, take, takeUntil } from 'rxjs/operators';
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
 * 
 * 
//  Transformation
//  Filtering
//  Combination
//  Utility
//  Conditional
//  Aggregate
//  Multicasting

 */

 //#region Creating Observales


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

//#endregion

//#region Subscribing to Observables with Observers
// // allBooks$.subscribe(book => console.log(book.title));

// // function myObservable(forEach) {
// //     this._forEach = forEach;
// // }
// // myObservable.prototype = {
// //     forEach: function(onNext, onError, onComplete) {
// //         if (typeof onNext === 'function') {
// //             return this._forEach({
// //                 onNext: onNext,
// //                 onError: onError || function() {},
// //                 onComplete: onComplete || function() {}
// //             })
// //         } else {
// //             return this._forEach(onNext);
// //         }
// //     }
// // }

// // let source1$ = of('hello', 10, true, allReaders[0].name);
// // // source1$.subscribe(value => console.log(value));

// // let source2$ = from(allBooks);
// // // source2$.subscribe(book => console.log(book.title));

// // concat(source1$, source2$)
// //     .subscribe(value => console.log(value));

// // let button = document.getElementById('readersButton');
// // fromEvent(button, 'click')
// //     .subscribe(event => {
// //         console.log(event);

// //         let readersDiv = document.getElementById('readers');
// //         for (let reader of allReaders) {
// //             readersDiv.innerHTML += reader.name + '<br>';
// //         }
// //     });

// let button = document.getElementById('readersButton');
// let timesDiv = document.getElementById('times');
// fromEvent(button, 'click')
//     .subscribe(event => {
//         ajax('/api/readers')
//         .subscribe(ajaxResponse => {
//             console.log(ajaxResponse);
//             let readers = ajaxResponse.response;

//             let readersDiv = document.getElementById('readers');
//             for (let reader of readers) {
//                 readersDiv.innerHTML += reader.name + '<br>';
//             }            
//         })
//     }
// );

// //let timer$ = interval(1000);

// let timer$ = new Observable(Subscriber => {
//     let i = 0;
//     let intervalID = setInterval(() => {
//         Subscriber.next(i++);
//     }, 1000);

//     return () => {
//         console.log('Executing teardown code.');
//         clearInterval(intervalID);
//     }
// });

// // let timerSubscription = timer$.subscribe(
// //     value => timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
// //     null,
// //     () => console.log('All done!') 
// // );

// // let timerConsoleSubscription = timer$.subscribe(
// //     value => console.log(`${new Date().toLocaleTimeString()} (${value})`)
// // );

// // timerSubscription.add(timerConsoleSubscription);

// // fromEvent(button, 'click')
// //     .subscribe(
// //         event => timerSubscription.unsubscribe()
// //     );

// let source$ = of(1, 2, 3, 4, 5);
// let doubler = map((value): number => value * 2);
// let doubled$ = doubler(source$);
// doubled$.subscribe(value => console.log(value));
//#endregion

//#region Using Operators

// ajax('/api/errors/500')
//   .pipe(
//     mergeMap(ajaxResponse => ajaxResponse.response),
//     filter(book => book.publicationYear < 1950),
//     tap(book => console.log(`Title: ${book.title}`)),
//     //catchError(err => of({title: 'Corduroy', author: 'Don Freeman'}))
//     //catchError((err, caught) => caught)
//     //catchError(err => throw `Something bad happened ${err.message}`)
//     catchError(err => return throwError(err.message))
//   )
//   .subscribe(
//     finalValue => console.log(`VALUE: ${finalValue.title}`),
//     error => console.log(`ERROR: ${error}`)
//   );


//#endregion

//#region take takeUntil

// let timesDiv = document.getElementById('times');
// let button = document.getElementById('readersButton');

// let timer$ = new Observable(subscriber => {
//   let i = 0;
//   let intervalID = setInterval(() => {
//     subscriber.next(i++);
//   }, 1000);

//   return () => {
//     console.log('Executing teardown code.');
//     clearInterval(intervalID);
//   }
// });

// let cancelTimer$ = fromEvent(button, 'click');

// timer$
//   .pipe(
//     //take(3)
//     takeUntil(cancelTimer$)
//   )
//   .subscribe(
//     value => timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
//     null,
//     () => console.log('All done!')
//   );

//#endregion

//#region Creating Your Own Operators

// function grabAndLogClassics(year, log) {
//   return source$ => {
//     return new Observable(subscriber => {
//       return source$.subscribe(
//         book => {
//           if (book.publicationYear < year) {
//             subscriber.next(book);
//             if(log) {
//               console.log(`Classic: ${book.title}`);
//             }
//           }
//         },
//         err => subscriber.error(err),
//         () => subscriber.complete()
//       );
//     });
//   }
// }

// function grabClassics(year) {
//   return filter(book => book.publicationYear < year);
// }

// function grabClassicsWithPipe(year, log) {
//   return source$ => source$.pipe(
//     filter(book => book.publicationYear < year),
//     tap(book => log ? console.log(`Title: ${book.title}`) : null),
//   );
// }

// ajax('/api/books')
//   .pipe(
//     mergeMap(ajaxResponse => ajaxResponse.response),
//     // filter(book => book.publicationYear < 1950),
//     // tap(book => console.log(`Title: ${book.title}`)),
//     // grabAndLogClassics(1930, false)
//     // grabClassics(1950)
//     grabClassicsWithPipe(1930, true)
//   )
//   .subscribe(
//     finalValue => console.log(`VALUE: ${finalValue.title}`),
//   );

//#endregion

//#region Using Subjects and Multicasted Observables

// let subject$ = new Subject();

// subject$.subscribe(
//   value => console.log(`Observer 1: ${value}`)
// );

// subject$.subscribe(
//   value => console.log(`Observer 2: ${value}`)
// );

// subject$.next('Hello!');

// let source$ = new Observable(subscriber => {
//   subscriber.next('Greetings!');
// });

// source$.subscribe(subject$);

let source$ = interval(1000).pipe(
    take(4)
);


source$.subscribe(
    value => console.log(`Observer 1: ${value}`)
);

setTimeout(() => {
    source$.subscribe(
        value => console.log(`Observer 2: ${value}`)
    );
}, 1000);

setTimeout(() => {
    source$.subscribe(
        value => console.log(`Observer 3: ${value}`)
    );
}, 2000);

//#endregion