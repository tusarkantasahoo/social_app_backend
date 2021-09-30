const AcademicspostModel = require("../models/AcademicspostModel");



const createPosts = (req, res, next) => {
    let post = new AcademicspostModel({
        image: req.body.image,
        comment: [],
        addedBy: req.body.addedby,
        collegename: req.body.collegename,
        description: req.body.description,
        collegeId:req.body.collegeid
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
      var data={
          image:response[0].image,
          id:response[0]._id,
          description:response[0].description,
          collegename:response[0].collegename,
      }
      res.send({response});
    })
  }


  module.exports = {
    createPosts,
    getbycollegeid
    
  };