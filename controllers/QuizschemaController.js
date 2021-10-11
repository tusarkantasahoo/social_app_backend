const Quizschema = require("../models/QuizschemaModel");
const mongoose = require('mongoose');

const createQuiz = (req, res) => {
 
    let quiz = new Quizschema({
      title: req.body.title,
      question: req.body.question,
      surveyType: req.body.surveyType,
      duration: req.body.duration,
      user: req.body.user,
      createdAt:new Date()
    });
    quiz
      .save()
      .then((response) => {
        res.send({
          message: "quiz created Successfully",
          code: "quiz_create_success",
        });
      })
      .catch((error) => {
        res.send({
          message: "An error Occured",
        });
      });
}
const getQuestionsByqusid = async (req, res) => {
  const result = await Quizschema.find({ "question.quesid": req.body.qusid, "_id": req.body.quizid })
    .then((response) => {
      res.json({
        response,
      });
    })
  console.log(result);
}

const getQuestionsByquzid = async (req, res) => {
  const result = await Quizschema.find({ "_id": req.body.quizid })
    .then((response) => {
      res.json({
        response,
      });
    })
  //const usercheck=result.find( ({ user }) => user === req.body.userid )

  console.log(result);
}


module.exports = {
  createQuiz,
  getQuestionsByqusid,
  getQuestionsByquzid
};