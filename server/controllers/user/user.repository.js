const UserModel = require('../../database/models/UserModel');

class UserRepository {
    constructor() {
        this.user = UserModel;
    }

    async _create(user) {
        return await this.user.create(user);
    }

    async _findOne(user) {
        return await this.user.findOne(user);
    }

    async _findAll() {
        return await this.user.find();
    }

    async _updateOne(user) {
        return await this.user.updateOne(user);
    }

    async _deleteOne(user) {
        return await this.user.deleteOne(user);
    }
}

module.exports = UserRepository;