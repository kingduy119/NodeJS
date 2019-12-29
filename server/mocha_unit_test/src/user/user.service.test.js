const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const faker = require('faker');

const UserService = require('./user.service');
const UserRepository = require('./user.repository');

describe("UserService", () => {
    const stubValue = {
        id: faker.random.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
    
    describe("Create", () => {
        it("should create a new user", async () => {
            const userRepo = new UserRepository();
            const stub = sinon.stub(userRepo, "create").returns(stubValue);
            const userService = new UserService(userRepo);
            const user = await userService.create(
                                    stubValue.username,
                                    stubValue.email,
                                    stubValue.password
                                );

            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(stubValue.id);
            expect(user.username).to.equal(stubValue.username);
            expect(user.email).to.equal(stubValue.email);
            expect(user.password).to.equal(stubValue.password);
        });
    });

    describe("getUser", () => {
        it("Should return a user by username", async () => {
            const userRepo = new UserRepository();
            const stub = sinon.stub(userRepo, "getUser").returns(stubValue);
            const userService = new UserService(userRepo);
            const user = await userService.getUser(stubValue.username);

            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(stubValue.id);
            expect(user.username).to.equal(stubValue.username);
            expect(user.email).to.equal(stubValue.email);
            expect(user.password).to.equal(stubValue.password);
        });
    });
});







