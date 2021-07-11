const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ $or: [{ email: username }, { password: password }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'verySecreatvalue', { expiresIn: '1hr' });
                        res.json({
                            message: 'Login successful',
                            token
                        })
                    }
                    else {
                        res.json({
                            message: 'password not match'
                        })
                    }
                })
            }
            else {
                res.json({
                    message: "No user found"
                })
            }
        })
}

const reAuthenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, "verySecreatvalue")
        console.log("decode val", decode);
        if (decode) {
            res.json({
                details: "reloggedin",
                message: "Relogin Successful",
                token: token
            })
        }
    }
    catch (error) {
        res.status(400).json({
            details: "reloginFailed",
            message: "Token Invalid"
        })
    }
}


module.exports = {
    login, reAuthenticate
}