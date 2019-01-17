var i = 0;

var interval = window.setInterval(() => {
    var t = i % 2 === 0 ? 'even' : 'odd';
    var n = new Notification('Title' + i, {tag: t});

    if (i++ > 9) {
        window.clearInterval(interval);
    }
}, 250);
