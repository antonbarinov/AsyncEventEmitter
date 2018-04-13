# AsyncEventEmitter
Asynchronous with async/await

## Install
```
npm i async-event-emitter
```

## Example
```
const AsyncEventEmitter = require('async-event-emitter');
const aee = new AsyncEventEmitter();

const wait = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(true);
    }, ms);
});

aee.on('test', async (arg1, arg2) => {
    await wait(500);
    console.log(1, arg1, arg2);
});

aee.on('test', async (arg1, arg2) => {
    await wait(500);
    console.log(2, arg1, arg2);
});

// this subscription will be executed only once
aee.once('test', async (arg1, arg2) => {
    await wait(500);
    console.log(3, arg1, arg2);
});

(async () => {
    console.log('--- event emitters has been started ---');
    
    // wait for all subscribed functions will be executed
    await aee.emit('test', 'arg-1', 'arg-2');
    
    // wait for all subscribed functions will be executed
    await aee.emit('test', 'arg-11', 'arg-22');
    
    console.log('--- event emitters has been finished ---');
    console.log(aee.hasSubscribe('test'));
    console.log(aee.hasSubscribe('test2'));
})();
```

Output:
```
--- event emitters has been started ---
1 'arg-1' 'arg-2'
2 'arg-1' 'arg-2'
3 'arg-1' 'arg-2'
1 'arg-11' 'arg-22'
2 'arg-11' 'arg-22'
--- event emitters has been finished ---
true
false
```

## Inheritance
### Using `util.inherits`
```
const AsyncEventEmitter = require('async-event-emitter');
const inherits = require('util').inherits;

function Test() {
    this.talk = () => {
        console.log('Hello');
    }
}
inherits(Test, AsyncEventEmitter);

const aee = new Test();
aee.talk();
const wait = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(true);
    }, ms);
});

aee.on('test', async (arg1, arg2) => {
    await wait(500);
    console.log(1, arg1, arg2);
});

aee.on('test', async (arg1, arg2) => {
    await wait(500);
    console.log(2, arg1, arg2);
});

// this subscription will be executed only once
aee.once('test', async (arg1, arg2) => {
    await wait(500);
    console.log(3, arg1, arg2);
});

(async () => {
    console.log('--- event emitters has been started ---');

    // wait for all subscribed functions will be executed
    await aee.emit('test', 'arg-1', 'arg-2');

    // wait for all subscribed functions will be executed
    await aee.emit('test', 'arg-11', 'arg-22');

    console.log('--- event emitters has been finished ---');
})();
```

### Using `extends`
```
const AsyncEventEmitter = require('async-event-emitter');

class Test extends AsyncEventEmitter {
    myOn(eventName, func) {
        this.on(eventName, func);
    }

    talk() {
        console.log('Hello');
    }
}

const aee = new Test();
aee.talk();
const wait = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(true);
    }, ms);
});

aee.myOn('test', async (arg1, arg2) => {
    await wait(500);
    console.log(1, arg1, arg2);
});

aee.myOn('test', async (arg1, arg2) => {
    await wait(500);
    console.log(2, arg1, arg2);
});

// this subscription will be executed only once
aee.once('test', async (arg1, arg2) => {
    await wait(500);
    console.log(3, arg1, arg2);
});

(async () => {
    console.log('--- event emitters has been started ---');

    // wait for all subscribed functions will be executed
    await aee.emit('test', 'arg-1', 'arg-2');

    // wait for all subscribed functions will be executed
    await aee.emit('test', 'arg-11', 'arg-22');

    console.log('--- event emitters has been finished ---');
})();
``` 