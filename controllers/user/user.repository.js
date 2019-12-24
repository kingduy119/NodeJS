const UserModel = require('../../database/models/UserModel');

class UserRepository {
    constructor() {
        this.user = UserModel;
    }

    async create(username, email, password) {
        return this.user.create({
            username,
            email,
            password
        });
    }

    async getUser(username) {
        return this.findOne({username});
    }
}

module.exports = UserRepository;