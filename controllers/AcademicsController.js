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

const FilterClgByTypeStateCity = (req, res, next) => {
  var state = req.body.state;
  var city = req.body.city;
  var query={state: state,city:city,academicType:req.body.academictype};
  
 
  if(req.body.state!="" && req.body.city=="" && req.body.academictype==""){
    query={state: state};
  }
  if(req.body.state=="" && req.body.city!="" && req.body.academictype==""){
    query={city:city} ;
  }
  if(req.body.state=="" && req.body.city=="" && req.body.academictype!=""){
    query={academicType:req.body.academictype} ;
  }

  if(req.body.state!="" && req.body.city!="" && req.body.academictype==""){
    query={state: state,city:city};
  }
  if(req.body.state=="" && req.body.city!="" && req.body.academictype!=""){
    query={city:city,academicType:req.body.academictype} ;
  }
  if(req.body.state!="" && req.body.city=="" && req.body.academictype!=""){
    query={academicType:req.body.academictype,state: state} ;
  }


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
};

async function functionToInsertCollegeInInterval(postJson, i) {
  //run in 1 seconds
  console.log("Colle Ind",postJson)
  setTimeout(async function timer() {
    let academicsData = new AcademicsModel({
        academicType:"college",
        name: postJson.nameOfCollege,
        address:postJson.address,
        description: postJson.description,
        state: postJson.state,
        city: postJson.city,
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
  const ws = workbook.Sheets["West Bengal"];

  console.log("Fetching seet data.....");
  var data = XLSX.utils.sheet_to_json(ws);

  console.log("Data from excel", data);
  if (data === null || data === undefined || data.length === 0) {
  } else {
    // console.log(data);
    var collegeList = [];
    for (j = 1; j < data.length; j++) {
      collegeList.push({
        nameOfCollege: data[j].__EMPTY,
        address: data[j].__EMPTY_1,
        coursesfees: data[j].__EMPTY_10,
        cutoff: data[j].__EMPTY_11,
        admission: data[j].__EMPTY_12,
        examAccepted: data[j].__EMPTY_13,
        facilities: data[j].__EMPTY_14,
        placement: data[j].__EMPTY_15,
        reviewRating: data[j].__EMPTY_16,
        ranking: data[j].__EMPTY_17,
        comparision: data[j].__EMPTY_18,
        state: data[j].__EMPTY_3,
        city: data[j].__EMPTY_4,
        afilliation: data[j].__EMPTY_5,
        type: data[j].__EMPTY_6,
        contact: data[j].__EMPTY_7,
        website: data[j].__EMPTY_8,
        email: data[j].__EMPTY_9,
        description:data[j].__EMPTY_2
      });
    }
    res.send(collegeList);

    // for (var k = 0; k < collegeList.length; k++) {
    //     // console.log("Inserting data",collegeList[k].nameOfCollege)
    //     functionToInsertCollegeInInterval(collegeList[k], k);
    // }
  }
};

module.exports = {
  addCollegeFromExcel,
  FilterClgByTypeStateCity,
  getCollegeById
};
