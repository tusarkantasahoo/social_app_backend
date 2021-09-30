const express = require('express')
const router = express.Router()

const AcademicpostController = require('../controllers/AcademicpostController.js');



router.post('/createPost/',(req, res) => {
    AcademicpostController.createPosts(req, res);
});

router.post('/getcollegebyid/',(req, res) => {
    AcademicpostController.getbycollegeid(req, res);
});

module.exports = router