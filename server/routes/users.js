const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Login:
router.get('/login', (req, res) => { res.render('Login')});

// Register:
router.get('/register', (req, res) => { res.send('Register')});


module.exports = router;
