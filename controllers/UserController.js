const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
//show all employess
const index = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })
}
//show single employee
const show = (req, res, next) => {
    let userId = req.body.userId
    User.findById(userId)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })
}


const store = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            name: req.body.user,
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob,
            password: hashedPass
        })
        user.save()
            .then(response => {
                res.json({
                    message: "User Added Successfully"
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occured'
                })
            })

    })

}

//update by id
const update = (req, res, next) => {
    let userId = req.body.userId;
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let updateData = new User({
            name: req.body.user,
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob,
            password: hashedPass
        })
        User.findByIdAndUpdate(userId, { $set: updateData })
            .then(response => {
                res.json({
                    message: "User Updated Successfully"
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occured'
                })
            })
    })

}

//delete employee

const destroy = (req, res, next) => {
    let userId = req.body.userId;
    User.findByIdAndRemove(userId)
        .then(response => {
            res.json({
                message: "User Deleted Successfully"
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })
}

module.exports = {
    index, show, store, update, destroy
}