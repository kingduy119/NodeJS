const UserRepository = require('./user.repository');
const Client = require('../../cache/Redis').getClient();

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    _create(username, email, password) {
        return this.userRepository._create({username, email, password});
    }

    _findOne(user) {
        console.log(user);
        Client.get(user.username, (err, data) => {
            if(data){ return data; }
        });

        let data = this.userRepository._findOne(user);
        Client.setex(user.username, 3600, JSON.stringify(data));
        return data;
    }

    _findAll() {
        return this.userRepository._findAll();
    }

    _updateOne(user) {
        return this.userRepository._updateOne(user);
    }

    _deleteOne(user) {
        return this.userRepository._deleteOne(user);
    }
}


module.exports = UserService;