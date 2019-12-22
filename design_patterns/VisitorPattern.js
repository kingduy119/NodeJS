
// Visitor Design Pattern -> https://youtu.be/x-Gx0Ym1Di0

function Employee(name, salary) {
    this.name = name;
    this.salary = salary;
}

Employee.prototype = {
    getSalary: function() {
        return this.salary;
    },
    setSalary: function(sal) {
        this.salary = sal;
    },
    accept: function(visitorFunc) {
        visitorFunc(this);
    }
}

// Execute

const devsage = new Employee("Devsage", 1000);
console.log(devsage.getSalary());

function ExtraSalary(emp) {
    emp.setSalary(emp.getSalary() * 2);
}

devsage.accept(ExtraSalary);
console.log(devsage.getSalary());

