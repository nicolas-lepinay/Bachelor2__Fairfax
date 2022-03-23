const router = require("express").Router();
const adminController = require("../controllers/adminController.js");
const userController = require("../controllers/userController.js");

router.get("/chart", adminController.charts_GET);
router.get("/posts", adminController.posts_GET); 
router.get("/category", adminController.categories_GET);
router.get("/user", userController.findAll_GET);

module.exports = router
 