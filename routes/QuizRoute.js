const express = require('express')
const router = express.Router()

const QuizController = require('../controllers/QuizschemaController.js');


router.post('/addQuiz/',(req, res) => {
    QuizController.createQuiz(req, res);
});

router.post('/Questions/',(req, res) => {
    QuizController.getQuestionsByqusid(req, res);
});

router.post('/Question/',(req, res) => {
    QuizController.getQuestionsByquzid(req, res);
});


module.exports = router