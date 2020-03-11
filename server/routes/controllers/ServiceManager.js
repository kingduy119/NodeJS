
// const UserController = require('./UserController');

// class ServiceManager {
//     constructor() {
//         if(ServiceManager.exists) {
//             return ServiceManager.instance;
//         }
//         ServiceManager.instance = this;
//         ServiceManager.exists = true;
//         this.services = [];
//         return this;
//     }

//     getService(type) {
//         if(!this.services[type])
//             this.createService(type);

//         console.log(`Service: ${type} existed`);
//         return this.services[type];
//     }

//     createService(type) {
//         console.log(`Service: ${type} not exists`);
//         if(type === 'user')
//             this.services[type] = new UserController();
//     }
// }

// module.exports = new ServiceManager();




