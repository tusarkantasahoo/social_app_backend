var multer = require("multer");
var upload = multer();
const SocialModelPosts = require("../models/SocialModelPosts");
const SocialModelFiles = require("../models/SocialModelFiles");
const index = (req, res, next) => {
  SocialModelPosts.find()
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

const getFileById = (req, res, next) => {
  var fileId = req.body.id;
  SocialModelFiles.findById(fileId)
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

const saveFilesInStorage = (req, res, next) => {
  var fileData = req.files[0];
  var base64FormatFile = fileData.buffer.toString("base64");
  let file = new SocialModelFiles({
    file: base64FormatFile,
  });
  file
    .save()
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send({
        message: "An error Occured while uploading image",
      });
    });
};

const createPosts = (req, res, next) => {
  let post = new SocialModelPosts({
    title: req.body.title,
    description: req.body.description,
    postType:req.body.postType ,
    likes: 0,
    dislikes: 0,
    user: req.body.user,
    fileStorageId: req.body.fileStorageId,
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
  saveFilesInStorage,
  createPosts,
  getFileById
};

