const UserService = require('./user.service');

class UserController {
    constructor() {
        if(UserController.exists) return UserController.instance;

        this.userService = new UserService();
        UserController.instance = this;
        UserController.exists = true;
        return this;
    }

    register(user) {
        const { username, email, password } = user;
        if((!username || typeof username !== "string")
            ||
            (!email || typeof email !== "string")
        ) { return ({message: "Invalid Params"}); }

        return this.userService.create(username, email, password);
    }

    _findOne(user) {
        return this.userService._findOne(user);
    }

    _findAll() {
        return this.userService._findAll();
    }

    _updateOne(user) {
        return this.userService.updateOne(user);
    }

    _deleteOne(user) {
        return this.userService.deleteOne(user);
    }
}

module.exports = new UserController();