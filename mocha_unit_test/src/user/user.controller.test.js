const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const faker = require('faker');

const UserController = require('./user.controller');
const UserService = require('./user.service');

describe("UserController", () => {
    describe("register", async () => {
        let status, json, res, userControler, userService;

        beforeEach(() => {
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
            const userRepo = sinon.spy();
            userService = new UserService(userRepo);
        });

        it("Should not register a user when username param is not provied",
        async () => {
            const req = { body: {email: faker.internet.email() } };
            await new UserController().register(req, res);
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(400);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].message).to.equal("Invalid Params");
        });

        // it("Should not register a user when username param is not provied",
        // async () => {
            
        // });
    });

    describe("getUser", async () => {
        
        let req, res, userService;
        beforeEach(()=> {
            req = {params: {username: faker.internet.userName() } };
            res = { json: () => {} };
            const userRepo = sinon.spy();
            userService = new UserService(userRepo);
        });

        it("Should return a user that mathces the username param", async () => {
            const stubValue = {
                id: req.params.id,
                username: req.params.username,
                email: req.params.email,
                password: req.params.password
            };

            const mock = sinon.mock(res);
            mock
                .expects("json")
                .once()
                .withExactArgs({data: stubValue});

            const stub = sinon.stub(userService, "getUser").returns(stubValue);
            const userController = new UserController(userService);
            const user = await userController.getUser(req, res);
            expect(stub.calledOnce).to.be.true;
            mock.verify();
        });
    });
});






















