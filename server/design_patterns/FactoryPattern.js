class Factory {
    constructor() {
        this.createType = (type) => {
            let data;
            if(type === 'Food') data = new Food();
            else if(type === 'Drink') data = new Drink();

            return data;
        }
    }
}


class Food {
    constructor() {
        this._type = 'Food';
        this.description = () => {
            return "Cooking food";
        }
    }
}

class Drink {
    constructor() {
        this._type = 'Drink';
        this.description = () => {
            return "Drink and Drunk";
        }
    }
}


// Example:
const factory = new Factory();

const food = factory.createType('Food');
const drink = factory.createType('Drink');











