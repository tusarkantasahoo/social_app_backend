const SurveyModel = require("../models/SurveyModel");

//create poll survey

const createSurvey = (req, res, next) => {

  var surveyType= req.body.surveyType;
  if(surveyType==="poll"){
    let survey = new SurveyModel({
      title: req.body.title,
      question: req.body.question,
      surveyType: req.body.surveyType,
      options: req.body.options,
      duration: req.body.duration,
      user: req.body.user,
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
  
  }
  else if(surveyType === "quiz"){
    let survey = new SurveyModel({
      title: req.body.title,
      quizQuestion: req.body.question,
      surveyType: req.body.surveyType,
      user: req.body.user,
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
  }

  else if(surveyType === "research"){
    let survey = new SurveyModel({
      title: req.body.title,
      researchQuestion: req.body.question,
      surveyType: req.body.surveyType,
      user: req.body.user,
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
  }

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
  console.log("Poll ans called");
  var surveyId = req.body.surveyId;
  optionName = req.body.optionName;
  var dbData = {
    option: optionName,
    user: {
      name: req.body.user.name,
      email: req.body.user.email,
      id: req.body.user.id,
    },
  };
  SurveyModel.findById(surveyId)
    .then((response) => {
      var options = response.options;
      console.log(options);
      for (var i = 0; i < options.length; i++) {
        if (optionName === options[i].name) {
          options[i].vote = options[i].vote + 1;
        }
      }
      SurveyModel.findByIdAndUpdate(
        surveyId,
        { $set: { options: options } },
      )
        .then((response) => {
          SurveyModel.findByIdAndUpdate(surveyId, {
            $push: {
              userResponses: dbData,
            },
          })
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
        })
        .catch((error) => {
          res.json({
            message: "An error Occured",
          });
        });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

const quizAnswer = (req, res, next) => {
  // console.log("Poll ans called");
  var surveyId = req.body.surveyId;
  var userResponse = req.body;
  SurveyModel.findById(surveyId)
    .then((response) => {
          SurveyModel.findByIdAndUpdate(surveyId, {
            $push: {
              userResponses: userResponse,
            },
          })
            .then((response) => {
              console.log("Quiz updated successfully");
              res.send({
                details: "QuizsUpdated",
              });
            })
            .catch((error) => {
              res.json({
                message: "An error Occured",
              });
            });
  
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

const researchAnswer = (req, res, next) => {
  var surveyId = req.body.surveyId;
  var dbData = {
    comment: req.body.comment,
    user: {
      name: req.body.user.name,
      email: req.body.user.email,
      id: req.body.user.id,
    },
  };

  SurveyModel.findByIdAndUpdate(surveyId, {
    $push: {
      comments: dbData,
    },
  })
    .then((response) => {
      res.json("details added successfully");
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });

}

const getSurveyById = (req, res, next) => {
  var surveyId = req.body.id;
  SurveyModel.findById(surveyId)
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

const getSurveyCreatedByUser = (req, res, next) => {
  var userId = req.body.userId;
  SurveyModel.find({ "user._id": userId })
    .then((response) => {
      console.log(response);
      res.send({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });
};

const deleteSurveyById = (req, res, next) => {
  var surveyId = req.body.surveyId;
  SurveyModel.findByIdAndDelete(surveyId)
    .then((response) => {
      console.log(response);
      res.send({
        response,
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
  researchAnswer,
  getSurveyById,
  getSurveyCreatedByUser,
  deleteSurveyById
};
