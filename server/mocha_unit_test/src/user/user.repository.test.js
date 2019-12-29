const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const faker = require('faker');

const UserModel = require('../../../models/UserModel');
const UserRepository = require('./user.repository');

describe("UserRepository", () => {
    const stubValue = {
        id: faker.random.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    describe("create", () => {
        it("should add a new user to the db", async () => {
            const stub = sinon.stub(UserModel, "create").returns(stubValue);
            const userRepository = new UserRepository();
            const user = await userRepository.create(stubValue.username, stubValue.email, stubValue.password);
            
            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(stubValue.id);
            expect(user.username).to.equal(stubValue.username);
            expect(user.email).to.equal(stubValue.email);
            expect(user.password).to.equal(stubValue.password);
        });
    });

    describe("getUser", () => {
        it("Should return a user by username", async () => {
            const stub = sinon.stub(UserModel, "findOne").returns(stubValue);
            const userRepository = new UserRepository();
            const user = await userRepository.getUser(stubValue.username);

            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(stubValue.id);
            expect(user.username).to.equal(stubValue.username);
            expect(user.email).to.equal(stubValue.email);
            expect(user.password).to.equal(stubValue.password);
        });
    })
});











