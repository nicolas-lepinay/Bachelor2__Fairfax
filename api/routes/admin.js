const router = require("express").Router();
const adminController = require("../controllers/adminController.js");
const userController = require("../controllers/userController.js");
const commentController = require("../controllers/commentController.js");

router.get("/Charts", adminController.charts_GET);
router.get("/Posts", adminController.posts_GET); 
router.get("/Categories", adminController.categories_GET);
router.get("/Users", userController.findAll_GET);
router.get("/Comments", commentController.findAll_GET);
router.get("/Posts/date", adminController.postDate_GET); 
router.get("/Categories/date", adminController.postCatDate_GET); 
router.get("/Comments/date", adminController.comment_Date_GET); 

module.exports = router
 