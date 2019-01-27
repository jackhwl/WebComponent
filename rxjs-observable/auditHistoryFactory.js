angular.module('app')
    .factory('auditHistoryFactory', auditHistoryFactory);

auditHistoryFactory.$inject = ['$resource', '__env', 'CacheFactory', 'suggestionService'];
function auditHistoryFactory($resource, __env, CacheFactory, suggestionService) {

    var factory = {};

    function fetchSuggestion(param) {
        if (!CacheFactory.get('auditHistorysSuggestionCache')) {
            CacheFactory('auditHistorysSuggestionCache');
        }

        return $resource(__env.auditHistoryApiUrl + "/Suggestion?field="+encodeURIComponent(param.field)
            +"&value="+encodeURIComponent(param.eventTarget.value)+"&limit="+param.limit, null,  {
            'query': {
                method: 'GET', cache: CacheFactory.get('auditHistorysSuggestionCache'), isArray: true
            }
        });  
    }

    factory.getObservableSuggestions = function(getSuggestionParam) {
        return suggestionService.getObservableSuggestions(fetchSuggestion, getSuggestionParam);
    }
    return factory;
}