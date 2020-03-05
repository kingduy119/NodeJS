
const UserModel = require("../database/models/UserModel");
const RedisClient = require("../cache/Redis").getClient();

class AuthAPI {
    constructor() {
        if(AuthAPI.exists) return AuthAPI.instance;
        this.service = new AuthService();
        AuthAPI.instance = this;
        AuthAPI.exists = true;
        return this;
    }

    Signup(user) {
        // #1: Invalid
        this.service.create(user); // #2: Save to server
    }

    Login(user) {
        return this.service.findOne(user);
    }

    Update(user) {
        return this.service.updateOne(user);
    }

    Delete(user) {
        return this.service.deleteOne(user);
    }
}

function AuthService() {
    this.repository = UserModel;
}

AuthService.prototype = {
    create: user => { return this.repository.create(user); },
    findOne: user => { return this.repository.findOne(user);},
    fillAll: () => { return this.repository.find(); },
    updateOne: user => { return this.repository.updateOne(user); },
    deleteOne: user => { return this.repository.deleteOne(user); }
};

module.exports = AuthAPI;