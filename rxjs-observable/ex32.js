// Exercise 32: Creating a mouse drag event
function thirtytwo(sprite, spriteContainer) {
	var spriteMouseDowns = Observable.fromEvent(sprite, "mousedown"),
		spriteContainerMouseMoves = Observable.fromEvent(spriteContainer, "mousemove"),
		spriteContainerMouseUps = Observable.fromEvent(spriteContainer, "mouseup"),
		spriteMouseDrags =
			// For every mouse down event on the sprite...
			spriteMouseDowns.concatMap(mouseDown => spriteContainerMouseMoves.
                takeUntil(spriteContainerMouseUps))
          
				// --------------------------------------------------------
				//					  INSERT CODE HERE
				// --------------------------------------------------------
				// Complete this expression...
				// For every mouse down event, return the mouse move event
				// sequence until a mouse up event occurs.

	// For each mouse drag event, move the sprite to the absolute page position.
	spriteMouseDrags.forEach(function(dragPoint) {
		sprite.style.left = dragPoint.pageX + "px";
		sprite.style.top = dragPoint.pageY + "px";
	});
}
		