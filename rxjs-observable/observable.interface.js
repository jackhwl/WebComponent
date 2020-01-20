class Observable {
    constructor(subscribe){
        this._subscribe = subscribe
    }
    subscribe(observer){
        return this._subscribe(observer)
    }

    static timeout(time){
        return new Observable(function subscribe(observer){
            const handle = setTimeout(function(){
                observer.next()
                observer.complete()
            }, time)

            return {
                unsubscribe() {
                    clearTimeout(handle)
                }
            }
        })
    }
}