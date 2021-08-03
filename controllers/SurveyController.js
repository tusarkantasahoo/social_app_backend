const SurveyModel = require("../models/SurveyModel");

//create poll survey

const createSurvey = (req, res, next) => {
  let survey = new SurveyModel({
    title: req.body.title,
    question: req.body.question,
    surveyType: req.body.surveyType,
    options: req.body.options,
    duration: req.body.duration,
    createdUser: req.body.createdUser,
    answer: req.body.answer,
  });
  survey
    .save()
    .then((response) => {
      res.send({
        message: "Survey created Successfully",
        code: "survey_create_success",
      });
    })
    .catch((error) => {
      res.send({
        message: "An error Occured",
      });
    });
};

const index = (req, res, next) => {
  SurveyModel.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });
};

const addComment = (req, res, next) => {
  var surveyId = req.body.id;
  var comments = req.body.comment;

  SurveyModel.findByIdAndUpdate(surveyId, {
    $push: {
      comments: {
        comment: comments,
      },
    },
  })
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });
};

const pollAnswer = (req, res, next) => {
  var surveyId = req.body.surveyId;
  var pollAnswer = req.body.pollAnswer;
  var userName = req.body.userName;
  var userId = req.body.userId;
  var email = req.body.email;

  SurveyModel.findById(surveyId)
    .then((response) => {
      // console.log(response);
      var options = response.options;
      for (var i = 0; i < options.length; i++) {
        if (pollAnswer === options[i].title) {
          options[i].response = options[i].response + 1;
        }
      }
      console.log(options);

      SurveyModel.findByIdAndUpdate(surveyId, { $set: { options: options } })
        .then((response) => {
          console.log("options updated successfully");
          res.send({
            details: "PollsUpdated",
          });
        })
        .catch((error) => {
          res.json({
            message: "An error Occured",
          });
        });

      SurveyModel.findByIdAndUpdate(surveyId, {
        $push: {
          userResponses: {
            name: userName,
            userId: userId,
            email: email,
            answer: pollAnswer,
          },
        },
      })
        .then((response) => {
          console.log("details added successfully");
        })
        .catch((error) => {
          res.json({
            message: "An error Occured",
          });
        });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });
};

const quizAnswer = (req, res, next) => {
  var surveyId = req.body.surveyId;
  var pollAnswer = req.body.pollAnswer;
  var userName = req.body.userName;
  var userId = req.body.userId;
  var email = req.body.email;

  SurveyModel.findById(surveyId)
    .then((response) => {
      // console.log(response);
      var options = response.options;
      for (var i = 0; i < options.length; i++) {
        if (pollAnswer === options[i].title) {
          options[i].response = options[i].response + 1;
        }
      }
      console.log(options);

      SurveyModel.findByIdAndUpdate(surveyId, { $set: { options: options } })
        .then((response) => {
          console.log("options updated successfully");
          res.send({
            details: "PollsUpdated",
          });
        })
        .catch((error) => {
          res.json({
            message: "An error Occured",
          });
        });

      SurveyModel.findByIdAndUpdate(surveyId, {
        $push: {
          userResponses: {
            name: userName,
            userId: userId,
            email: email,
            answer: pollAnswer,
          },
        },
      })
        .then((response) => {
          console.log("details added successfully");
        })
        .catch((error) => {
          res.json({
            message: "An error Occured",
          });
        });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });
};

const researchAnswer = (req, res, next) => {
  var surveyId = req.body.surveyId;
  var pollAnswer = req.body.pollAnswer;
  var userName = req.body.userName;
  var userId = req.body.userId;
  var email = req.body.email;

  SurveyModel.findById(surveyId)
    .then((response) => {
      // console.log(response);
      var options = response.options;
      for (var i = 0; i < options.length; i++) {
        if (pollAnswer === options[i].title) {
          options[i].response = options[i].response + 1;
        }
      }
      console.log(options);

      SurveyModel.findByIdAndUpdate(surveyId, { $set: { options: options } })
        .then((response) => {
          console.log("options updated successfully");
          res.send({
            details: "PollsUpdated",
          });
        })
        .catch((error) => {
          res.json({
            message: "An error Occured",
          });
        });

      SurveyModel.findByIdAndUpdate(surveyId, {
        $push: {
          userResponses: {
            name: userName,
            userId: userId,
            email: email,
            answer: pollAnswer,
          },
        },
      })
        .then((response) => {
          console.log("details added successfully");
        })
        .catch((error) => {
          res.json({
            message: "An error Occured",
          });
        });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });
};


module.exports = {
  index,
  createSurvey,
  addComment,
  pollAnswer,
  quizAnswer,
  researchAnswer
};
