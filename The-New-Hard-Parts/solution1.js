function display(data) {
    console.log(data)
}

const dataFromAPI = fetchAndWait('https://twitter.com/will/1')

display(dataFromAPI)

console.log("Me later!")

// Problems
// Fundamentally untenable -blocks our single javascript thread 
// from running any further code while the task completes

// Benefits
// It's easy to reason about