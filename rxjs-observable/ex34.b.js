function getWikipediaSearchResults(term){
    return {
        forEach: function(observer){
            var cancelled = false;
            var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+encodeURIComponent(term)+'&callback=?';
            $.getJSON(url, function(data){
                if (!cancelled){
                    observer.onNext(data[1]);
                    observer.onCompleted();
                }
            });

            return {
                dispose: function() {
                    cancelled = true;
                }
            }
        }
    }
}