const express = require('express')
var multer = require('multer');
var upload = multer();
const router = express.Router()

const SocialController = require('../controllers/SocialController.js');



router.get('/all/',(req, res) => {
    SocialController.index(req, res)
});

router.post('/saveFiles/',upload.array('profileImg'),(req, res) => {
    SocialController.saveFilesInStorage(req, res);
});

router.post('/getFileById/',(req, res) => {
     SocialController.getFileById(req, res);
});

router.post('/createPost/',(req, res) => {
    SocialController.createPosts(req, res);
});

router.post('/addComment/',(req, res) => {
    SocialController.addComment(req, res);
});

router.post('/userResponse/',(req, res) => {
    // SocialController.addComment(req, res);
});

router.post('/delete/',(req, res) => {
     SocialController.destroy(req, res);
});






router.post('/delete/',(req, res) => {
    // SurveyController.createSurvey(req, res);
});

router.post('/addCollegeFromExcel/',(req, res) => {
    SocialController.addCollegeFromExcel(req, res);
});










module.exports = router
