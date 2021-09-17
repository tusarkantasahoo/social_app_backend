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

const addCollegeFromExcel =(req,res,next)=>{

  var XLSX = require('xlsx');
  var workbook = XLSX.readFile('C:/Users/SADEPTA/Downloads/CollegesinIndia.xlsx');
  var sheet_name_list = workbook.SheetNames;
  const ws = workbook.Sheets['West Bengal'];
           
                console.log("Fetching seet data.....");
                var data = XLSX.utils.sheet_to_json(ws);
            
                console.log("Data from excel", data);
                if (data === null || data === undefined || data.length === 0) {
                   
                }
                else{
                  console.log(data);
                  var collegeList = [];
                  for(j=1;j<data.length;j++){
                    collegeList.push({
                      nameOfCollege:data[j].__EMPTY,
                      address:data[j].__EMPTY_1,
                      coursesfees :data[j].__EMPTY_10,
                      cutoff:data[j].__EMPTY_11,
                      admission:data[j].__EMPTY_12,
                      examAccepted:data[j].__EMPTY_13,
                      facilities:data[j].__EMPTY_14,
                      placement:data[j].__EMPTY_15,
                      reviewRating:data[j].__EMPTY_16,
                      ranking:data[j].__EMPTY_17,
                      comparision:data[j].__EMPTY_18,
                      state:data[j].__EMPTY_3,
                      sity:data[j].__EMPTY_4,
                      afilliation:data[j].__EMPTY_5,
                      type:data[j].__EMPTY_6,
                      contact:data[j].__EMPTY_7,
                      website:data[j].__EMPTY_8,
                      email:data[j].__EMPTY_9
                      


                    })
                  }
                  res.send(collegeList)
                }

  
}

module.exports = {
  index,
  saveFilesInStorage,
  createPosts,
  getFileById,
  destroy,
  addComment,
  addCollegeFromExcel
};
