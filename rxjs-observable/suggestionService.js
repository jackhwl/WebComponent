angular.module('app')
    .service('suggestionService', suggestionService);

suggestionService.$inject = ['errorService', 'rx'];
function suggestionService(errorService, rx) {
    var fetchFn, paramFn;
    function currentObserableSuggestions() {
        var param = paramFn();
        if (!param.eventTarget.value || param.eventTarget.value.trim()==='') return rx.Observable.of([]);

        return rx.Observable.defer(function() {
            return fetchFn(param).query().$promise;
        });
    }

    function assignFunction(fetchSuggestion, getSuggestionParam) {
        fetchFn = fetchSuggestion;
        paramFn = getSuggestionParam;
    }

    this.getObservableSuggestions = function(fetchSuggestion, getSuggestionParam) {
        assignFunction(fetchSuggestion, getSuggestionParam);
        return rx.Observable.fromEvent(paramFn().eventTarget, 'keyup').
            throttle(250).
            map(function() {
                return currentObserableSuggestions().
                    retry(3).
                    catch(function(error) {
                        errorService.generateLoggingInterceptor(error);
                        return rx.Observable.of([]);
                    });
            }).
            switchLatest();
    }
}