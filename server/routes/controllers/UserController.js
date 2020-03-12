
const bcrypt = require('bcryptjs');

const UserModel = require("../../database/models/UserModel");

class UserController {
    constructor() {
        if(UserController.exists) {
            return UserController.instance;
        }
        this.service = new UserService();
        UserController.instance = this;
        UserController.exists = true;
        return this;
    }

    async register(user) {
        const existed = await this.service.findUsername(user);
        if(existed) { return {status: 200, message: 'Existed!'}; } 

        this.service.createUser(user);
        return {status: 201, message: 'Created!'};
    }

    async login(user) {
        const existed = await this.service.findUsername(user);
        if(!existed) {
            return {status: 200, message: 'Username isn\'t existed!'};
        }

        let result = await bcrypt.compare(user.password, existed.hash);
        console.log("Result: " + result);
        if(!result) {
            return {status: 200, message: 'Wrong Password'};
        }
        console.log("RES: " + result);
        return {status: 202, message: 'Accepted!'};
    }

    async changePassword(user) {
        const existed = await this.service.findUsername(user);
        if(!existed) {
            return {status: 200, message: 'Username isn\'t existed!'};
        }

        this.service.updateUser(user);
    }

    delete(user) {
        return this.service.deleteOne(user);
    }
}

function UserService() {
    this.repository = UserModel;

    this.createUser = user => {
        const { password } = user;
        user.salt = bcrypt.genSaltSync(10);
        user.hash = bcrypt.hashSync(password, user.salt);
        this.repository.create(user);
    }

    this.findUsername = async user => {
        return await this.repository.findOne({username: user.username});
    }

    this.updateUser = user => {
        this.repository.updateOne(user);
    }

    // this.fillAll = () => { return this.repository.find(); }
    // updateOne(user){ return this.repository.updateOne(user); }
    // deleteOne(user){ return this.repository.deleteOne(user); }
};

module.exports = UserController;