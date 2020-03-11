
const bcrypt = require('bcryptjs');

const UserModel = require("../../database/models/UserModel");

class UserController {
    constructor() {
        if(UserController.exists) return UserController.instance;
        this.service = new UserService();
        UserController.instance = this;
        UserController.exists = true;
        return this;
    }

    async register(req, res, next) {
        let user = req.query;
        console.log(user);
        const existed = await this.service.findUsername(user);
        if(existed) {
            res.status(501).send({message: 'Username existed!'});
        } else {
            this.service.createUser(user);
            res.status(200).send({message: "Successfuly!"});
        }
    }

    async login(user) {
        let {hash} = await this.service.findUsername(user);
        let result = await bcrypt.compare(user.password, hash);
        console.log("RES: " + result);
        return result;
    }

    update(user) {
        return this.service.updateOne(user);
    }

    delete(user) {
        return this.service.deleteOne(user);
    }
}

class UserService{
    constructor() {
        this.repository = UserModel;
    }

    createUser(user){
        const { password } = user;
        user.salt = bcrypt.genSaltSync(10);
        user.hash = bcrypt.hashSync(password, user.salt);
        this.repository.create(user);
    }

    async findUsername(user) {
        return await this.repository.findOne({username: user.username});
    }

    findOne(user) {
        return this.repository.findOne(user);
    }
    fillAll() { return this.repository.find(); }
    updateOne(user){ return this.repository.updateOne(user); }
    deleteOne(user){ return this.repository.deleteOne(user); }
};

module.exports = new UserController();