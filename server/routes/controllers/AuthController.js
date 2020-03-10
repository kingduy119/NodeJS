
const bcrypt = require('bcryptjs');

const UserModel = require("../../database/models/UserModel");

class AuthAPI {
    constructor() {
        if(AuthAPI.exists) return AuthAPI.instance;
        this.service = new AuthService();
        AuthAPI.instance = this;
        AuthAPI.exists = true;
        return this;
    }

    register(user) {
        this.service.create(user);
    }

    async login(user) {
        let {hash} = await this.service.findOne({username: user.username});
        // let {hash} = u;
        let result = await bcrypt.compare(user.password, hash);
        console.log("RES: " + result);
        return result;
    }

    update(user) {
        return this.service.updateOne(user);
    }

    delete(user) {
        return this.service.deleteOne(user);
    }
}

class AuthService{
    constructor() {
        this.repository = UserModel;
    }

    create(user){
        let { password } = user;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                console.log("HASH: " + hash);
                this.repository.create({
                    username: user.username,
                    password: user.password,
                    hash: hash
                });
            });
        });
        // return this.repository.create(user);
    }

    findOne(user) {
        return this.repository.findOne(user);
    }
    fillAll() { return this.repository.find(); }
    updateOne(user){ return this.repository.updateOne(user); }
    deleteOne(user){ return this.repository.deleteOne(user); }
};

module.exports = AuthAPI;