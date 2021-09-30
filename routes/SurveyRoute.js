const express = require('express')
const router = express.Router()

const SurveyController = require('../controllers/SurveyController');



router.post('/',(req, res) => {
    res.send({message:"survey route working fine"});
});


router.post('/create/',(req, res) => {
    SurveyController.createSurvey(req, res);
});

router.post('/addComment/',(req, res) => {
     SurveyController.addComment(req, res);
});

router.post('/pollAnswer/',(req, res) => {
     SurveyController.pollAnswer(req, res);
});

router.post('/quizAnswer/',(req, res) => {
     SurveyController.QuizAnswer(req, res);
});

router.post('/researchAnswer/',(req, res) => {
     SurveyController.researchAnswer(req, res);
});



router.post('/delete/',(req, res) => {
    // SurveyController.createSurvey(req, res);
});

router.post('/getSurveyById/',(req, res) => {
     SurveyController.getSurveyById(req, res);
});

router.post('/getSurveyCreatedByUser/',(req, res) => {
     SurveyController.getSurveyCreatedByUser(req, res);
});






router.get('/all/',(req, res) => {
    SurveyController.index(req, res)
});





module.exports = router
