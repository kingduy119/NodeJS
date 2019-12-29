const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const faker = require('faker');

const UserController = require('./user.controller');
const UserService = require('./user.service');

describe("UserController", () => {
    describe("register", async () => {
        let status, json, req, res, userControler, userService;

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
            req = { body: {email: faker.internet.email() } };
            await new UserController().register(req, res);
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(400);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].message).to.equal("Invalid Params");
        });

        it("Should not register a user when username and email params is not provied",
        async () => {
            await new UserController().register(req, res);
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(400);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].message).to.equal("Invalid Params");
        });

        it("Should not register a user when email param is not provied",
        async () => {
            req = { body: {username: faker.internet.userName() } };
            await new UserController().register(req, res);
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(400);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].message).to.equal("Invalid Params");
        });

        it("Should register a user when email and username params are provided",
        async () => {
            req = {
                body: {
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: faker.internet.password()
                }
            };

            const stubValue = {
                id: faker.random.uuid(),
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const stub = sinon.stub(userService, "create").returns(stubValue);
            userControler = new UserController(userService);
            const user = await userControler.register(req, res);
            
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(201);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].data).to.equal(stubValue);
        });
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






















