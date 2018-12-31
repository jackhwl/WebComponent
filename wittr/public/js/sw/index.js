self.addEventListener('fetch', function(event) {
    //console.log('Hello 222 333 45s world!!!!!!!');
    if (event.request.url.endsWith('.jpg')) {
        event.respondWith(
            // new Response('<div class="a-winner-is-me"></div>Hello <b>world!</b></div>', {
            //     headers: {'foo': 'bar', 'Content-Type': 'text/html'}
            // })
            fetch('/imgs/dr-evil.gif')
        );
    }
});