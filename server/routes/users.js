const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');

router.get('/', (req, res) => {
    res.send("User Index");
});

// Register:
router.get('/register', UserController.register);

// Login:
// router.get('/login', async (req, res) => {
//     const {username, password} = req.query;
//     let users = new UserController();
//     let result = await users.login({username, password});
//     res.send(result ? 'Success' : 'Failt');
// });

router.get('/changePassword', (req, res) => {
    const {username, password} = req.query;

});

module.exports = router;
