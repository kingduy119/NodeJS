
class Icecream {
    constructor(flavour, price) {
        this.flavour = flavour;
        this.price = price;
    }
}

class IcecreamFactory {
    constructor() {
        this._icecream = [];
    }

    createIcecream(flavour, price) {
        let icecream = this.getIcecream(flavour);
        if(icecream) {
            return icecream;
        } else {
            const newIcecream = new Icecream(flavour, price);
            this._icecream.push(newIcecream);
        }
    }

    getIcecream(flavour) {
        return this._icecream.find(icecream => icecream.flavour === flavour);
    }
}


// Example:
const factory = new IcecreamFactory();

const chocoVanilla = factory.createIcecream('chocalate and vanilla', 15);
const vanillaChoco = factory.createIcecream('chocalate and vanilla', 15);

// chocoVanilla === vanillaChoco // true





