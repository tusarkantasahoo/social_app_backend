const express = require('express')
const router = express.Router()

const AcademicsController = require('../controllers/AcademicsController.js');


router.post('/addCollegeFromExcel/',(req, res) => {
    AcademicsController.addCollegeFromExcel(req, res);
});

router.post('/filterbyTypeStateCity/',(req, res) => {
    AcademicsController.FilterClgByTypeStateCity(req, res)
});





module.exports = router
