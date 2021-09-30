const express = require('express')
const router = express.Router()

const AcademicsController = require('../controllers/AcademicsController.js');


router.post('/addCollegeFromExcel/',(req, res) => {
    AcademicsController.addCollegeFromExcel(req, res);
});

router.post('/filterbyTypeStateCity/',(req, res) => {
    AcademicsController.FilterClgByTypeStateCity(req, res)
});

router.post('/findCollegeById/',(req, res) => {
    AcademicsController.getCollegeById(req, res);
});


router.post('/searchByAutoFiltr/',(req, res) => {
    AcademicsController.AutoFilterCollege(req, res)
});

router.post('/searchByAutoFiltrSpeci/',(req, res) => {
    AcademicsController.AutoFilterCollegeSpecilazation(req, res)
});
router.post('/gettopcolleges/',(req, res) => {
    AcademicsController.GetTopcolleges(req, res)
});




module.exports = router
