import { map } from "rxjs/operators";

// creating an operator

let source$ = of(1, 2, 3, 4, 5);

function doublerOperator() {
    return map(value => value * 2);
}

source$.pipe(
    doublerOperator()
)
.subscribe(
    doubleValue => console.log(doubleValue) // 2, 4, 6, 8, 10
);
