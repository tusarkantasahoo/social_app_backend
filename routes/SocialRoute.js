const express = require('express')
var multer = require('multer');
var upload = multer();
const router = express.Router()

const SocialController = require('../controllers/SocialController.js');



router.get('/all/',(req, res) => {
    SocialController.index(req, res)
});

router.post('/getPostByPage/',(req, res) => {
    SocialController.getPostByPage(req, res)
});
router.post('/getPostById/',(req, res) => {
    SocialController.getPostById(req, res)
});


router.post('/saveFiles/',upload.array('profileImg'),(req, res) => {
    SocialController.saveFilesInStorage(req, res);
});

router.post('/getFileById/',(req, res) => {
     SocialController.getFileById(req, res);
});

router.post('/createPost/',(req, res) => {
    SocialController.createPosts(req, res);
});

router.post('/addComment/',(req, res) => {
    SocialController.addComment(req, res);
});

router.post('/userResponse/',(req, res) => {
    // SocialController.addComment(req, res);
});

router.post('/delete/',(req, res) => {
     SocialController.destroy(req, res);
});



router.post('/addLike/',(req, res) => {
    SocialController.addLike(req, res);
});

router.post('/addDislike/',(req, res) => {
    SocialController.addDislike(req, res);
});

router.post('/checkUserAlreadyLikedOrDisliked/',(req, res) => {
    SocialController.checkUserLikedOrDisliked(req, res);
});

router.post('/checkUserIdAvailable/',(req, res) => {
    // SocialController.checkMatchingid(req, res);
});

router.post('/getPostForUser/',(req, res) => {
     SocialController.userCreatedPosts(req, res);
});










module.exports = router
