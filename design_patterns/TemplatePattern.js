import { Test } from "mocha";


class Employee {
    constructor(name, slary) {
        this._name = name;
        this._salary = salary;
    }

    work() {
        return this._name + " handles " + this.resposibilites();
    }

    getPaid() {
        return this._name + " got paid " + this._salary;
    }
}


class Developer extends Employee {
    constructor(name, slary) {
        super(name, slary);
    }

    resposibilites() {
        return "application development";
    }
}

class Tester extends Employee {
    constructor(name, slary){
        super(name, slary);
    }

    resposibilites() {
        return "testing";
    }
}

// Example:
const dev = new Developer('Duy', 10000);
console.log(dev.work());
console.log(dev.getPaid());

const tester = new Tester('Brian', 9000);
console.log(tester.work());
console.log(tester.getPaid());





