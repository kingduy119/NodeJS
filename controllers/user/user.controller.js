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

    Signup(user) {
        let oldUser = this.userService._findOne(user);
        console.log(oldUser);
        if(oldUser) { return {data: "User exists"}; }

        console.log("Check invalid");
        const { username, email, password } = user;
        if((!username || typeof username !== "string")
            ||
            (!email || typeof email !== "string")
            ||
            (!password || typeof password !== "string")
        ) { console.log("Invalid Params");
            return ({data: "Invalid Params"}); }

        bcryptjs.hash(password, 10, (err, hash) => {
            if(err) console.log(err);
            else {
                console.log("Created user");
                return this.userService._create(username, email, hash);
            }
    });
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