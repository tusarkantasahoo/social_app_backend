const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController');

router.get('/', UserController.index);
router.post('/show', UserController.show);
router.post('/store', (req, res) => {
    UserController.store(req,res);
})


router.post('/update', UserController.update);
router.post('/delete', UserController.destroy);


module.exports = router
