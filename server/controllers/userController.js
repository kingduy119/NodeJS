const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.user_index = (req, res, next) => {
    res.render('users/login', {title: 'Account'});
}

exports.user_signup = (req, res, next) => {

    let email = 'example@email.com';
    let password = 'testpassword';
    bcrypt.hash(password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                email: email,
                password: hash
            });
            user.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'User created'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    });
};

exports.user_login = (req, res, next) => {
    let mail = 'example@email.com';
    let password = 'testpassword';
    User.find({email: mail})
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(400).json({
                    message: 'Mail not  fond, user doesn\'t exist'
                });
            }
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 'secret',
                    {
                        expiresIn: '1h'
                    });
                    return res.status(200).json({
                        message: 'Auth successfully',
                        token: token
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};