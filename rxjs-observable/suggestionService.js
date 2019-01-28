angular.module('app')
    .service('suggestionService', suggestionService);

suggestionService.$inject = ['errorService', 'rx'];
function suggestionService(errorService, rx) {

    this.getObservableSuggestions = function(fetchSuggestion, getSuggestionParam) {
        
        function currentObserableSuggestions() {
            var param = getSuggestionParam();
            if (!param.eventTarget.value || param.eventTarget.value.trim()==='') return rx.Observable.of([]);
    
            return rx.Observable.defer(function() {
                return fetchSuggestion(param).query().$promise;
            });
        }

        return rx.Observable.fromEvent(getSuggestionParam().eventTarget, 'keyup').
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