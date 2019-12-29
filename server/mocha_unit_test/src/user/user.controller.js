
class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async register(req, res, next) {
        const { username, email, password } = req.body;

        if (
            !username ||
            typeof username !== "string" ||
            (!email || typeof email !== "string")
        ) {
            return res.status(400).json({
                message: "Invalid Params"
            });
        }

        const user = await this.userService.create(username, email, password);
        return res.status(201).json({ data: user });
    }

    async getUser(req, res) {
        const { username } = req.params;
        const user = await this.userService.getUser(username);
        return res.json({ data: user });
    }
}

module.exports = UserController;

















