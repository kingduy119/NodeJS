
const UserController = require('./UserController');

function ServiceAPI() {
    this.getType = type => {
        switch(type) {
            case 'User':
                return new UserController();
            default:
                return null;
        }
    }
}

function ServiceManager() {
    this.api = new ServiceAPI();
    this.services = {};

    this.getType = type => {
        if(this.services[type] == null) {
            this.services[type] = this.api.getType(type);
        }
        return this.services[type];
    }
}
const serviceMgr = new ServiceManager();
module.exports = serviceMgr;




