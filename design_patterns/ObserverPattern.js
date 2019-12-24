
// Observer Design Pattern -> https://www.youtube.com/watch?v=45TeJEmcqk8

function Subject() {
    this.observers = [];
}

Subject.prototype = {
    subsribe: function(fn) {
        this.observers.push(fn);
    },
    unbsubsribe: function(fnToRemove) {
        this.observers = this.observers.filter(fn => {
            if(fn != fnToRemove) {
                return fn;
            }
        })
    },
    fire: function() {
        this.observers.forEach(fn => {
            fn.call();
        })
    }
}

// Execute:
const subject = new Subject();

function observer1() {
    console.log("Observer 1 Firing!");
}

function observer2() {
    console.log("Observer 2 Firing!");
}

subject.subsribe(observer1);
subject.subsribe(observer2);
subject.fire()

subject.unbsubsribe();
subject.fire();




