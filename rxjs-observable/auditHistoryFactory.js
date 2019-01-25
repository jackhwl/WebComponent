angular.module('app')
    .factory('auditHistoryFactory', auditHistoryFactory);

auditHistoryFactory.$inject = ['$resource', '__env', 'CacheFactory','errorService', 'suggestionService'];
function auditHistoryFactory($resource, __env, CacheFactory, errorService, suggestionService) {

        var factory = {};

        function fetchSuggestion(search) {
            if (!CacheFactory.get('auditHistorysSuggestionCache')) {
                CacheFactory('auditHistorysSuggestionCache');
            }

            return $resource(__env.auditHistoryApiUrl + "/Suggestion?field="+encodeURIComponent(search.field)
                        +"&value="+encodeURIComponent(search.value)+"&capacity="+search.capacity, null,  {
                'query': {
                    method: 'GET', cache: CacheFactory.get('auditHistorysSuggestionCache'), isArray: true, 
                    interceptor: errorService.generateShowingInterceptor("Unable to get Suggestion")
                }
            });  
        }

        factory.searchParam = Object.assign({}, suggestionService.searchParam, {fetchFn: fetchSuggestion, capacity: 20});

        factory.getSuggestions = function(getSearchParam) {
            return suggestionService.latestSuggestions(getSearchParam);
        }

    return factory;
}