const AcademicspostModel = require("../models/AcademicspostModel");



const createPosts = (req, res, next) => {
    let post = new AcademicspostModel({
        image: req.body.image,
        comment: [],
        addedBy: req.body.addedby,
        collegename: req.body.collegename,
        description: req.body.description,
        collegeId:req.body.collegeid,
        title:req.body.title
    });
    post
      .save()
      .then((response) => {
        res.send({
          message: "Academicspost created Successfully",
          code: "post_create_success",
        });
      })
      .catch((error) => {
        res.send({
          message: "An error Occured",
        });
      });
  };



  const getbycollegeid=async(req, res, next)=>{
  
  
    const result=await AcademicspostModel.find({ "collegeId": req.body.collegeid } )
    .then((response) => {
 
      res.send({response});
    })
  }


  module.exports = {
    createPosts,
    getbycollegeid
    
  };