
// Proxy Design Pattern -> https://www.youtube.com/watch?v=SFTpSFQNPts

// External API Service
function CryptoCurrencyAPI() {
    this.getValue = function(coin) {
        switch(coin) {
            case "Bitcoin":
                return "$8,500";
            case "Litecoin":
                return "$50";
            case "Ethereum":
                return "$175"
            default:
                return "N/A";
        }
    }
}
function CryptoCurrencyProxy() {
    this.api = new CryptoCurrencyAPI();
    this.cache = {};

    this.getValue = function(coin){
        if(this.cache[coin] == null) {
            this.cache[coin] = this.api.getValue(coin);
        }
        return this.cache[coin];
    }
}


console.log("----------With Proxy----------")
const proxy = new CryptoCurrencyProxy();
console.log(proxy.getValue("Bitcoin"))
console.log(proxy.getValue("Litecoin"))
console.log(proxy.getValue("Ethereum"))
console.log(proxy.getValue("Bitcoin"))
console.log(proxy.getValue("Litecoin"))
console.log(proxy.getValue("Ethereum"))
console.log(proxy.cache);





