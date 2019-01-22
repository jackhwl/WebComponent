// Exercise 18: Retrieve url of the largest boxart
function eighteen() {
	var boxarts = [
			{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
			{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
			{ width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
			{ width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
		];

	// You should return an array containing only the URL of the largest box art. Remember that reduce always
	// returns an array with one item.
	return boxarts.
        reduce((pre, cur) => pre.width * pre.height > cur.width * cur.height ? pre : cur).
        map(boxart => boxart.url);   // Complete this expression
}
        
// Exercise 19: Reducing with an initial value
function nineteen() {
	var videos = [
		{
			"id": 65432445,
			"title": "The Chamber"
		},
		{
			"id": 675465,
			"title": "Fracture"
		},
		{
			"id": 70111470,
			"title": "Die Hard"
		},
		{
			"id": 654356453,
			"title": "Bad Boys"
		}
	];

	// Expecting this output...
	// [
	//	 {
	//		 "65432445": "The Chamber",
	//		 "675465": "Fracture",
	//		 "70111470": "Die Hard",
	//		 "654356453": "Bad Boys"
	//	 }
	// ]
	return videos.
		reduce(function(accumulatedMap, video) {
            var obj = {};
            obj[video.id] = video.title;
            // ----- INSERT CODE TO ADD THE VIDEO TITLE TO THE ----
            // ----- NEW MAP USING THE VIDEO ID AS THE KEY	 ----

            // Object.assign() takes all of the enumerable properties from
            // the object listed in its second argument (obj) and assigns them
            // to the object listed in its first argument (accumulatedMap).
            return Object.assign(accumulatedMap, obj);
		},
		// Use an empty map as the initial value instead of the first item in
		// the list.
		{});
}