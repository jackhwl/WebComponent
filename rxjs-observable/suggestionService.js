angular.module('app')
    .service('suggestionService', suggestionService);

suggestionService.$inject = ['errorService', 'rx'];
function suggestionService(errorService, rx) {

    function currentObserableSuggestion(fetchSuggestion, getSuggestionParam) {
        var param = getSuggestionParam();
        if (!param.eventTarget.value || param.eventTarget.value.trim()==='') return rx.Observable.of([]);

        return rx.Observable.defer(function() {
            return fetchSuggestion(param).query().$promise;
        });
    }

    this.getObservableSuggestions = function(fetchSuggestion, getSuggestionParam) {
        return rx.Observable.fromEvent(getSuggestionParam().eventTarget, 'keyup').
            throttle(250).
            map(function() {
                return currentObserableSuggestion(fetchSuggestion, getSuggestionParam).
                    retry(3).
                    catch(function(error) {
                        errorService.generateLoggingInterceptor(error);
                        return rx.Observable.of([]);
                    });
            }).
            switchLatest();
    }
}