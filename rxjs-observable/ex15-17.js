// Exercise 15: Use forEach to find the largest box art
function fifteen() {
	var boxarts = [
			{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
			{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
			{ width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
			{ width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
		],
		currentSize,
		maxSize = -1,
		largestBoxart;

	boxarts.forEach(function(boxart) {
		currentSize = boxart.width * boxart.height;
		if (currentSize > maxSize) {
			largestBoxart = boxart;
			maxSize = currentSize;
		}
	});

	return largestBoxart;
}
        
// Exercise 16: Implement reduce()
// [1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }); === [6];
// [1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }, 10); === [16];

Array.prototype.reduce = function(combiner, initialValue) {
	var counter,
		accumulatedValue;

	// If the array is empty, do nothing
	if (this.length === 0) {
		return this;
	}
	else {
		// If the user didn't pass an initial value, use the first item.
		if (arguments.length === 1) {
			counter = 1;
			accumulatedValue = this[0];
		}
		else if (arguments.length >= 2) {
			counter = 0;
			accumulatedValue = initialValue;
		}
		else {
			throw "Invalid arguments.";
		}

		// Loop through the array, feeding the current value and the result of
		// the previous computation back into the combiner function until
		// we've exhausted the entire array and are left with only one value.
		while(counter < this.length) {
			accumulatedValue = combiner(accumulatedValue, this[counter])
			counter++;
		}

		return [accumulatedValue];
	}
};

// Exercise 17: Retrieve the largest rating.
function seventeen() {
	var ratings = [2,3,1,4,5];

	// You should return an array containing only the largest rating. Remember that reduce always
	// returns an array with one item.
	return ratings.
		reduce((acc, cur) => acc > cur ? acc : cur);   // Complete this expression
}
		