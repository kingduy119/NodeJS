const UserModel = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- MODULE
module.exports = {
    // --- QUERY
    login: async ({email, password}) => {
        const user = await UserModel.findOne({email: email});
        if(!user) throw new Error('User does not exist');

        const isEqual = bcrypt.compare(password, user.password);
        if(!isEqual) throw new Error('Password is incorrect!');

        const token = jwt.sign({userId: user.id, email: user.email},
            'whatisthis',
            {expiresIn: '1h'});

        return {
            userID: user.id,
            token: token,
            tokenExpiration: 1
        };
    },

    // --- MUTATION
    createUser: async args => {
        try {
            const oldUser = await UserModel.findOne( {email: args.userInput.email} );
            if(oldUser) { throw new Error('Email exists already'); }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const newUser = new UserModel({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await newUser.save();

            return {
                ...result._doc,
                password: result.password,
                _id: result.id
            };
        } catch (err) { throw err; }
    }
};















