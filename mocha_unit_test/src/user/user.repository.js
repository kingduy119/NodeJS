const UserModel = require('../../../models/UserModel');

class UserRepository {
    constructor() {
        this.user = UserModel;
    }

    async create(userame, email, password) {
        return this.user.create({
            userame,
            email,
            password
        });
    }

    async getUser(username) {
        return this.user.findOne({username});
    }
}

module.exports = UserRepository;