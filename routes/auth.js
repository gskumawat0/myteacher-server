const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/signup', (req, res, next) => {
    let { email, password, profileType } = req.body
    let newUser = new User({
        email,
        password,
        profileType
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log(err)
            res.json({ success: false, message: `${err.message}` });
        }
        else {
            res.json({ success: true, message: `User registered. please signin <a href='/auth/signin'>here</a>` });
        }
    });
});

// Authenticate
router.post('/signin', (req, res, next) => {
    const { email, password } = req.body.email;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        email: user.email,
                        profileType: user.profileType,
                        message: `welcome back!! ${user.email}`
                    }
                });
            }
            else {
                return res.json({ success: false, message: 'Wrong password' });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;
