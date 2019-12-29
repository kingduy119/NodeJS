const UserService = require('./user.service');
const bcryptjs = require('bcryptjs');

class UserController {
    constructor() {
        if(UserController.exists) return UserController.instance;

        this.userService = new UserService();
        UserController.instance = this;
        UserController.exists = true;
        return this;
    }

    async Signup(user) {
        // let oldUser = this.userService._findOne(user);
        // console.log(oldUser);
        // if(oldUser) { return new Error("User existed!"); }

        console.log("Check invalid");
        const { username, email, password } = user;
        if((!username || typeof username !== "string")
            ||
            (!email || typeof email !== "string")
            ||
            (!password || typeof password !== "string")
        ) { console.log("Invalid Params");
            return ({data: "Invalid Params"}); }

        let hashpwd = await bcryptjs.hash(password, 10);
        user.password = hashpwd;
        return this.userService._create(user);
    }

    Login(user) {
        return this.userService._findOne(user);
    }

    _findAll() {
        return this.userService._findAll();
    }

    ChangeInfo(user) {
        return this.userService._updateOne(user);
    }

    Delete(user) {
        return this.userService._deleteOne(user);
    }
}

module.exports = new UserController();