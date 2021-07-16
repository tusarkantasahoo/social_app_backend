const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController');


// router.post('/login', AuthController.login);
router.post('/login',(req, res) => {
    AuthController.login(req,res);
});


router.post('/relogin', (req, res) => {
    AuthController.reAuthenticate(req,res);
}
)

router.post('/resetPasswordMail', (req, res) => {
    AuthController.linkForForgotpassword(req,res);
}
)

router.post('/updatePassword', (req, res) => {
    AuthController.updatePassword(req, res);
}
)

module.exports = router
