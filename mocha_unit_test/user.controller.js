
class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async register(req, res, next) {
        const { username, email, password } = req.body;

        if (
            !username ||
            typeof username !== "String" ||
            (!email || typeof email !== "String")
        ) {
            return res.status(400).jsion({
                message: "Invalid Params"
            });
        }

        const user = await this.userService.create(username, email, password);
        return res.json({
            data: user
        });
    }
}

module.exports = UserController;

















