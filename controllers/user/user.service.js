const UserRepository = require('./user.repository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    _create(username, email, password) {
        return this.userRepository._create({username, email, password});
    }

    _findOne(user) {
        return this.userRepository._findOne(user);
    }

    _findAll() {
        return this.userRepository._findAll();
    }

    _updateOne(user) {
        return this.userRepository.updateOne(user);
    }

    _deleteOne(user) {
        return this.userRepository.deleteOne(user);
    }
}


module.exports = UserService;