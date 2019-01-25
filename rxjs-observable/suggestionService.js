angular.module('app')
    .service('suggestionService', suggestionService);

suggestionService.$inject = ['rx'];
function suggestionService(rx) {

        this.searchParam = { 
            element: undefined, 
            fetchFn: undefined
        };

        function getSuggestions(getSearchParam) {
            var search = getSearchParam();
            if (!search.element.value || search.element.value.trim()==='') return rx.Observable.of([]);
            return rx.Observable.fromPromise(search.fetchFn(search).query().$promise);
        }

        this.latestSuggestions = function(getSearchParam) {
            return rx.Observable.fromEvent(getSearchParam().element, 'keyup').
                throttle(250).
                map(function() {
                    return getSuggestions(getSearchParam).
                        retry(3);
                }).
                switchLatest();
        }
}