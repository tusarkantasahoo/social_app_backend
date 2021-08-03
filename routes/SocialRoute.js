const express = require('express')
const router = express.Router()

const SocialController = require('../controllers/SocialController.js');



router.get('/all/',(req, res) => {
    SocialController.index(req, res)
});


router.post('/create/',(req, res) => {
    SocialController.createPost(req, res);
});

router.post('/addComment/',(req, res) => {
    SocialController.addComment(req, res);
});




router.post('/delete/',(req, res) => {
    // SurveyController.createSurvey(req, res);
});










module.exports = router
