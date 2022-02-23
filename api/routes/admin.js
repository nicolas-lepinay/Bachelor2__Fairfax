const router = require("express").Router();
const adminController = require("../controllers/adminController.js");

router.get("/chart", adminController.charts_GET);
router.get("/posts", adminController.posts_GET); 

module.exports = router