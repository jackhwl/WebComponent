import { Observable } from 'rxjs';
import { allBooks } from './data';

function subscribe3(subscriber) {
    for (let book of allBooks) {
        subscriber.next(book);
    }
}
let allBooks$ = new Observable(subscribe3);

allBooks$.subscribe(book => console.log(book.title));