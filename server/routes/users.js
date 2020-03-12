const express = require('express');
const router = express.Router();
const serviceMgr = require('./controllers/ServiceManager');
const userAPI = serviceMgr.getType('User');

router.get('/', (req, res) => {
    res.send("User Index");
});

// Register:
router.get('/register', async (req, res, next) => {
    const user = req.query;
    const result = await userAPI.register(user);
    res.status(result.status).send(result.message);
});

// Login:
router.get('/login', async (req, res, next) => {
    const user = req.query;
    const result = await userAPI.login(user);
    res.status(result.status).send(result.message);
});

router.get('/change-password', (req, res) => {
    const user = req.query;
    const result = await userAPI.changePassword(user);
    res.status(result.status).send(result.message);
});

module.exports = router;
