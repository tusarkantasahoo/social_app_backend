const SurveyModel = require("../models/SurveyModel");

//create poll survey

const createSurvey = (req, res, next) => {
  let survey = new SurveyModel({
    title: req.body.title,
    question: req.body.question,
    surveyType: req.body.surveyType,
    options: req.body.options,
    duration: req.body.duration,
    user: req.body.user,
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

const quizAnswer2 = (req, res, next) => {
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


  var dbData = {
    comment:req.body.comment,
    user:{
      name:req.body.user.name,
      email:req.body.user.email,
      id:req.body.user.id
    }
  };

      SurveyModel.findByIdAndUpdate(surveyId, {
        $push: {
          comments: dbData
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
  var userId = req.body;
  SurveyModel.find( { user: userId } )
    .then((response) => {
      console.log(response);
      res.send({
        response
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });
};


const PollAnswer = (req, res, next) => {
  var surveyId = req.body.surveyId;
  optionName=req.body.optionName;
  var dbData = {
    comment:req.body.comment,
    user:{
      name:req.body.user.name,
      email:req.body.user.email,
      id:req.body.user.id
    },
  };
      SurveyModel.findByIdAndUpdate(surveyId, {
        $push: {
          comments: dbData
        },
      })
        .then((response) => {
          var options = response.options;
          console.log(options)
          for (var i = 0; i < options.length; i++) {
            if (optionName === options[i].name) {
              options[i].vote = options[i].vote + 1;
            }
          }
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
          
        })
        .catch((error) => {
          res.json({
            message: error,
    });
});
}


module.exports = {
  index,
  createSurvey,
  addComment,
  pollAnswer,
  quizAnswer2,
  researchAnswer,
  getSurveyById,
  getSurveyCreatedByUser,
  
};
