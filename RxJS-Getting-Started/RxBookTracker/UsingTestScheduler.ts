// creating a new TestScheduler

let scheduler = new TestScheduler((actual, expected) => {
    // perform deep equality test
});

// calling the run() method

scheduler.run(helpers => {
    // use methods on "helpers" object to test code

    // helpers.cold()
    // helpers.hot()
    // helpers.expectObservable()
    // helpers.expectSubscriptions()
    // helpers.flush()

});