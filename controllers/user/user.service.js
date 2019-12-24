const UserRepository = require('./user.repository');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async create(username, email, password) {
        return this.userRepository.create(username, email, password);
    }

    async getUser(username) {
        return this.userRepository.getUser(username);
    }
}


module.exports = UserService;