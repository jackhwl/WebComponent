// Using two-pronged 'facade' functions that both initiate background web browser work and return a placeholder object (promise) immediately in JavaScript

function display(data){
    console.log(data)
}

const futureData = fetch('https://twitter/will/tweets/1')

futureData.then(display);
// we got futureData a promise object (value: , onfufill:) with a value property 
// that's not yet filled in, when it does get filled in, we're gonna trigger all these
// functions, How do we get functions in there? using the then method on the futureData Object.
console.log("Me first!")