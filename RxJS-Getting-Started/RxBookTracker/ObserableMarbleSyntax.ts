// description Observable events with marble syntax

let source$ = helpers.cold('-a-b-c');
let source$ = helpers.cold('--a-4---c-8|');
let source$ = helpers.cold('  --a-4 12ms c-8#');
let source$ = helpers.hot('-a-^-b-(cde)---f|');