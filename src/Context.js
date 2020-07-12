const Context = (function Context() {

    const events = (() => {
        const subscribers = {}

        function publish(eventName, data) {
            if (!Array.isArray(subscribers[eventName])) {
            return
            }
            subscribers[eventName].forEach((callback) => {
            callback(data)
            })
        }

        function subscribe(eventName, callback) {
            if (!Array.isArray(subscribers[eventName])) {
            subscribers[eventName] = []
            }
            subscribers[eventName].push(callback)
        }

        return {
            publish,
            subscribe,
        }
    })();

    const fireEvent = (eventName, payload) => {
        events.publish(eventName, payload);
    }

    return {
        subscribeToEvent: events.subscribe,
        fireEvent
    }
})();

export default Context;
