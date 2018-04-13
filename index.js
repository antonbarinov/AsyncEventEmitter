function AsyncEventEmitter() {}
AsyncEventEmitter.prototype.__asyncEventEmitterEvents = {};
AsyncEventEmitter.prototype.on = function (eventName, func) {
    const e = this.__asyncEventEmitterEvents;
    if (!e[eventName]) e[eventName] = [];
    e[eventName].push({
        function: func
    });
};
AsyncEventEmitter.prototype.once = function (eventName, func) {
    const e = this.__asyncEventEmitterEvents;
    if (!e[eventName]) e[eventName] = [];
    e[eventName].push({
        function: func,
        once: true,
        executed: false
    });
};
AsyncEventEmitter.prototype.emit = async function (eventName) {
    let args = [];
    for (let k in arguments) {
        if (k > 0) args.push(arguments[k]);
    }

    const events = this.__asyncEventEmitterEvents[eventName] || [];
    for (let event of events) {
        if (event.once) {
            if (event.executed) continue;
            event.executed = true;
        }

        await event.function.apply(event.function, args);
    }

    return true;
};

module.exports = AsyncEventEmitter;