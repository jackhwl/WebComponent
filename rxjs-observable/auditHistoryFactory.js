angular.module('app')
    .factory('auditHistoryFactory', auditHistoryFactory);

auditHistoryFactory.$inject = ['$resource', '__env', 'CacheFactory','errorService', 'rx'];
function auditHistoryFactory($resource, __env, CacheFactory, errorService, rx) {

        var factory = {};

        function fetchSuggestion(search) {
            if (!CacheFactory.get('auditHistorysSuggestionCache')) {
                CacheFactory('auditHistorysSuggestionCache');
            }

            return $resource(__env.auditHistoryApiUrl + "/Suggestion?field="+search.field
                        +"&value="+search.value+"&capacity="+search.capacity, null,  {
                'query': {
                    method: 'GET', cache: CacheFactory.get('auditHistorysSuggestionCache'), isArray: true, 
                    interceptor: errorService.generateShowingInterceptor("Unable to get Suggestion")
                }
            });  
        }

        function getSuggestion(searchParam) {
            var search = searchParam();
            if (!search.value || search.value.trim()==='') return rx.Observable.of([]);
            return rx.Observable.fromPromise(fetchSuggestion(search).query().$promise);
        }

        factory.searchParam = { element: undefined, field: undefined, value: '', capacity: 20};

        factory.latestSuggestion = function(searchParam) {
            return rx.Observable.fromEvent(searchParam().element, 'keyup').
                throttle(250).map(function() {return getSuggestion(searchParam).retry(3);}).switchLatest();
        }

    return factory;
}