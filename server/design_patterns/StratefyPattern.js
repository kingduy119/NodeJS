function Fedex() {
    this.calculate = package => {
      return 2.45;
    }
  }
  
  function UPS() {
    this.calculate = package => {
      return 1.56;
    }
  }
  
  function USPS() {
    this.calculate = package => {
      return 4.5;
    }
  }
  
  function Shipping() {
    this.company = "";
    this.setStratefy = function (company) {
      this.company = company;
    }
    
    this.calculate = function (package) {
      return this.company.calculate(package);
    }
  }
  
  const fedex = new Fedex();
  const ups = new UPS();
  const usps = new USPS();
  const package = {from: 'VietNam', to: 'America', wegth: 1.56};
  
  const shipping = new Shipping();
  
  shipping.setStratefy(fedex);
  console.log("Fedex: " + shipping.calculate(package));
  
  shipping.setStratefy(ups);
  console.log("Ups: " + shipping.calculate(package));
  
  shipping.setStratefy(usps);
  console.log("Usps: " + shipping.calculate(package));
  
  
  
  
  