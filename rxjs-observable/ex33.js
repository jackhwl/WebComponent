// Exercise 33: Improving our mouse drag event
function thirtythree(sprite, spriteContainer) {
	// All of the mouse event sequences look like this:
	// seq([ {pageX: 22, pageY: 3423, layerX: 14, layerY: 22} ,,, ])
	var spriteMouseDowns = Observable.fromEvent(sprite, "mousedown"),
		spriteContainerMouseMoves = Observable.fromEvent(spriteContainer, "mousemove"),
		spriteContainerMouseUps = Observable.fromEvent(spriteContainer, "mouseup"),
		// Create a sequence that looks like this:
		// seq([ {pageX: 22, pageY:4080 },,,{pageX: 24, pageY: 4082},,, ])
		spriteMouseDrags =
			// For every mouse down event on the sprite...
			spriteMouseDowns.
				concatMap(function(contactPoint) {
					// ...retrieve all the mouse move events on the sprite container...
					return spriteContainerMouseMoves.
						// ...until a mouse up event occurs.
                        takeUntil(spriteContainerMouseUps).
                        map(point => ({
                            pageX: point.pageX - contactPoint.offsetX,
                            pageY: point.pageY - contactPoint.offsetY
                        }));
						// ------------   INSERT CODE HERE  -----------------
						// Project each mouse move object into a new object
						// with adjusted pageX and pageY properties.
						// Translate each page coordinate based on the value
						// of the layerX and layerY properties in the
						// contactPoint.
						// -------------------------------------------------
						// Complete expression...
				});

	// For each mouse drag event, move the sprite to the absolute page position.
	spriteMouseDrags.forEach(function(dragPoint) {
		sprite.style.left = dragPoint.pageX + "px";
		sprite.style.top = dragPoint.pageY + "px";
	});
}
