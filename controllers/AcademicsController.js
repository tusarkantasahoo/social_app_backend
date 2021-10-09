var multer = require("multer");
var upload = multer();
const AcademicsModel = require("../models/AcademicsModel");

const getCollegeById = (req, res, next) => {
  var id = req.body.id;
  AcademicsModel.findById(id)
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

const  AutoFilterCollege = (req,res,next) =>{
  console.log(req.body.term);
 var regex=new RegExp(req.body.term,'i');
 var collegeFilter = AcademicsModel.find({name:regex},{'name':1}).limit(20);
var result=[];

 collegeFilter.exec(function (err,data){

  if(!err){
    if(data && data.length && data.length>0){
      data.forEach(college => {
        let obj={
          name : college.name,
          id:college.id
        }
        result.push(obj);
      })
    }
    res.json(result);
  }
 })

}


const  AutoFilterCollegeSpecilazation = (req,res,next) =>{

 var regex=new RegExp(req.body.term,'i');
 var collegeFilter = AcademicsModel.find({courseAndFees:regex},{'courseAndFees':1});
var result=[];

 collegeFilter.exec(function (err,data){

  if(!err){
    if(data && data.length && data.length>0){
      data.forEach(college => {
        let obj={
          name : college.courseAndFees,
          id:college.name
        }
        result.push(obj);
      })
    }
    res.json(result);
  }
 })

}




const FilterClgByTypeStateCity = (req, res, next) => {

  
  var state = req.body.state;
  var city = req.body.city;
  var query={academicType:req.body.academictype}
  
 
  if(state!==null && state!==undefined&&city!==null&&city!==undefined) {
    query.state = state;
    query.city = city;
  }
  else if(state!==null && state!==undefined) {
    query.state = state;
  }
  else {
    query = query
  }

 if(req.body.affiliation!==null&&req.body.affiliation!==undefined&&req.body.specialization!==null&&req.body.specialization!==undefined){
    console.log("==",req.body.affiliation)
    var regexaff=new RegExp(req.body.affiliation,'i');
    var regexSpec=new RegExp(req.body.specialization,'i');
    AcademicsModel.find(query).find({affiliation:regexaff},{'affiliation':1}).find({courseAndFees:regexSpec},{'courseAndFees':1})
    .then((response) => {
      console.log(response)
      res.send({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });
  
  }

  // var regex=new RegExp(req.body.specilaztion,'i');
if(req.body.specialization!==null&&req.body.specialization!==undefined){
  console.log("==",req.body.specialization)
  var regex=new RegExp(req.body.specialization,'i');
  AcademicsModel.find(query).find({courseAndFees:regex},{'courseAndFees':1})
  .then((response) => {
    console.log(response)
    res.send({
      response,
    });
  })
  .catch((error) => {
    res.json({
      message: "An error Occured",
    });
  });

}

else if(req.body.affiliation!==null&&req.body.affiliation!==undefined){
  console.log("==",req.body.affiliation)
  var regex=new RegExp(req.body.affiliation,'i');
  AcademicsModel.find(query).find({affiliation:regex},{'affiliation':1})
  .then((response) => {
    console.log(response)
    res.send({
      response,
    });
  })
  .catch((error) => {
    res.json({
      message: "An error Occured",
    });
  });

}


else{
  AcademicsModel.find(query)
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
}
 
 
};

async function functionToInsertCollegeInInterval(postJson, i) {
  //run in 1 seconds
  console.log("Colle Ind",postJson)
  setTimeout(async function timer() {
    let academicsData = new AcademicsModel({
        academicType:"college",
        name: postJson.nameOfCollege,
        address:postJson.address,
        description: "",
        state: postJson.state,
        city: "",
        affiliation: postJson.affiliation,
        pinCode: "",
        collegeType: postJson.type,
        contact: postJson.contact,
        website: postJson.website,
        email:postJson.email,
        courseAndFees: postJson.coursesfees,
        cutoff:postJson.cutoff,
        admission:postJson.admission,
        examAccepted:postJson.examAccepted,
        facilities: postJson.facilities,
        placement:postJson.placement,
        reviewAndRating: postJson.reviewRating,
        ranking:postJson.ranking,
        comparison:postJson.comparision,
      });
      academicsData
        .save()
        .then((response) => {
         console.log("Inserted Successfuly")
        })
        .catch((error) => {
            console.log("Error while insertion")
        });

  }, 1000 * i);
}

const addCollegeFromExcel = (req, res, next) => {
  var XLSX = require("xlsx");
  var workbook = XLSX.readFile("CollegesinIndia.xlsx");
  var sheet_name_list = workbook.SheetNames;
  const ws = workbook.Sheets["Andhra Pradesh"];

  console.log("Fetching seet data.....");
  var data = XLSX.utils.sheet_to_json(ws);

  console.log("Data from excel", data);
  if (data === null || data === undefined || data.length === 0) {
  } else {
    // console.log(data);
    var collegeList = [];
    for (j = 1; j < data.length; j++) {
      collegeList.push({
        nameOfCollege: data[j].NAME,
        address: data[j].Address,
        coursesfees: data[j].Fees,
        cutoff: data[j].Cutoff,
        admission: data[j].Admission,
        examAccepted: data[j].ExamAccepted,
        facilities: data[j].Facilities,
        placement: data[j].Placement,
        reviewRating: data[j].ReviewRating,
        ranking: data[j].Ranking,
        comparision: data[j].Comparision,
        state: data[j].State,
        // city: data[j].__EMPTY_4,
        affilliation: data[j].Afilliation,
        type: data[j].Type,
        contact: data[j].Contact,
        website: data[j].Website,
        email: data[j].Email
        // description:data[j].__EMPTY_2
      });
    }
    res.send(data);

    // for (var k = 0; k < collegeList.length; k++) {
    //     // console.log("Inserting data",collegeList[k].nameOfCollege)
    //     functionToInsertCollegeInInterval(collegeList[k], k);
    // }
  }
};


const GetTopcolleges = (req, res, next) => {
  AcademicsModel.find().limit(6)
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

module.exports = {
  addCollegeFromExcel,
  FilterClgByTypeStateCity,
  getCollegeById,
  AutoFilterCollege,
  AutoFilterCollegeSpecilazation,
  GetTopcolleges
};
