const UserModel = require('../../database/models/UserModel');
const Client = require('../../cache/Redis').getClient();

class UserRepository {
    constructor() {
        this.user = UserModel;
    }

    async _create(user) {
        return await this.user.create(user);
    }

    async _findOne(user) {
        Client.get(user.username, (err, data) => {
            if(data){ return data; }
        });

        let data = await this.user.findOne(user);
        Client.setex(user.username, 3600, JSON.stringify(data));
        return data;
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