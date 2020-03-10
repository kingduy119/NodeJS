const express = require('express');
const router = express.Router();
const UserController = require('./controllers/AuthController');

router.get('/', (req, res) => {
    res.send("User Index");
});

// Login:
router.get('/login', async (req, res) => {
    const {username, password} = req.query;
    let users = new UserController();
    let result = await users.login({username, password});
    res.send(result ? 'Success' : 'Failt');
});

// Register:
router.get('/register', (req, res) => {
    console.log(req.query);
    const {username, password} = req.query;
    let users = new UserController();
    users.register({username, password});
    res.send(`Username: ${username} Password: ${password}`);
});


module.exports = router;
