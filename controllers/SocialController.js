const SocialModel = require("../models/SocialModel");

const index = (req, res, next) => {
    SocialModel.find()
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

  const createPost = (req, res, next) => {
    let post = new SocialModel({
      title: req.body.title,
      description: req.body.description,
      postType: req.body.postType,
      likes: 0,
      dislikes: 0,
      user: req.body.createdUser,
      imageB64:req.body.imageB64,
       filePath:req.body.filePath
    });
    post
      .save()
      .then((response) => {
        res.send({
          message: "Socialpost created Successfully",
          code: "post_create_success",
        });
      })
      .catch((error) => {
        res.send({
          message: "An error Occured",
        });
      });
  };
  


  module.exports = {
    index,
    createPost

  };
  