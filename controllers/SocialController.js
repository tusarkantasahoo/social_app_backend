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

const getPostByPage = (req, res, next) => {
  var pageNo = req.body.pageNo;
  SocialModelPosts.find().sort({"_id":-1}).skip(4*pageNo)
  .limit(4)
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
    postType: req.body.postType,
    likes: 0,
    dislikes: 0,
    user: req.body.user,
    fileStorageId: req.body.fileStorageId,
    videoLink: req.body.videoLink,
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

const destroy = (req, res, next) => {
  // let postId = req.body.postId;
  let postItem = req.body;
  if (postItem.postType === "image" || postItem.postType === "video") {
    SocialModelPosts.findByIdAndRemove(postItem._id)
      .then((response) => {
        SocialModelFiles.findByIdAndRemove(postItem.fileStorageId)
          .then((response) => {
            res.send({
              message: "post deleted successfully",
            });
          })
          .catch((error) => {
            res.send({
              message: "An error Occured",
            });
          });
      })
      .catch((error) => {
        res.send({
          message: "An error Occured",
        });
      });
  }


  else{
    SocialModelPosts.findByIdAndRemove(postItem._id)
    .then((response) => {
      res.send({
        message: "post deleted successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });

  }
  console.log("body", req.body);
};
const addComment = (req, res, next) => {
  var postId = req.body.id;
  var commentsObject = req.body.commentData;

  SocialModelPosts.findByIdAndUpdate(postId, {
    $push: {
      comments: commentsObject,
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

const addLike = (req, res, next) => {
  var postId = req.body.id;
  var userId = req.body.userId;
  var data = req.body.data;

  SocialModelPosts.findByIdAndUpdate(postId, {
    $push: {
      userResponses: {id:userId,response:data},
    },
    $inc:{
      likes:1
    }
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
const addDislike = (req, res, next) => {
  var postId = req.body.id;
  var userId = req.body.userId;
  var data = req.body.data;
  SocialModelPosts.findByIdAndUpdate(postId, {
    $push: {
      userResponses: {id:userId,response:data},
    },
    $inc:{
      dislikes:1
    }
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
const checkUserLiked = (req, res, next) => {
  var userId = req.body.userId;

  SocialModelPosts.find({userResponses: userId})
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

const checkMatchingid=async(req, res, next)=>{
  
  
  const result=await SocialModelPosts.find({ "user.id": req.body.userid,"_id":req.body.socialid } )
  .then((response) => {
    res.json({
      response,
    });
  })
  //const usercheck=result.find( ({ user }) => user === req.body.userid )
  
  console.log(result);
}


module.exports = {
  index,
  saveFilesInStorage,
  createPosts,
  getFileById,
  destroy,
  addComment,
  addLike,
  checkUserLiked,
  checkMatchingid,
  getPostByPage,
  addDislike
};
