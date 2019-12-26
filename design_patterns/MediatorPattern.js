
// Mediator Design Pattern -> https://youtu.be/ZuhgOu-DGA4

// Implement #1:
function Member(name) {
    this.name = name;
    this.chatroom = null;
}

Member.prototype = {
    send: function(message, toMember) {
        this.chatroom.send(message, this, toMember);
    },
    receive: function(message, fromMember) {
        console.log(`${fromMember.name} to ${this.name}: ${message}`);
    }
}

function Chatroom() {
    this.members = {};
}

Chatroom.prototype = {
    addMember: function(member) {
        this.members[member.name] = member;
        member.chatroom = this
    },
    send: function(message, fromMember, toMember) {
        toMember.receive(message, fromMember);
    }
}

// Example:
const chat = new Chatroom();

const bob = new Member("Bob");
const john = new Member("John");
const tim = new Member("Tim");


chat.addMember(bob);
chat.addMember(john);
chat.addMember(tim);

bob.send("Hey, John", john);
john.send("What's up, Bob", bob);
tim.send("John, are you ok?", john);


// Implement #2:
class TrafficTower {
    constructor() {
      this._airplanes = [];
    }
  
    register(airplane) {
      this._airplanes.push(airplane);
      airplane.register(this);
    }
  
    requestCoordinates(airplane) {
      return this._airplanes.filter(plane => airplane !== plane).map(plane => plane.coordinates);
    }
  }
  
  class Airplane {
    constructor(coordinates) {
      this.coordinates = coordinates;
      this.trafficTower = null;
    }
  
    register(trafficTower) {
      this.trafficTower = trafficTower;
    }
  
    requestCoordinates() {
      if (this.trafficTower) return this.trafficTower.requestCoordinates(this);
      return null;
    }
  }
  
  // usage
  const tower = new TrafficTower();
  
  const airplanes = [new Airplane(10), new Airplane(20), new Airplane(30)];
  airplanes.forEach(airplane => {
    tower.register(airplane);
  });
  
  console.log(airplanes.map(airplane => airplane.requestCoordinates())) 
  // [[20, 30], [10, 30], [10, 20]]




