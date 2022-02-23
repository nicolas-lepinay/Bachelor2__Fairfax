const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("/chart", adminController.charts_GET);        // GET A CATEGORY BY ID OR BY SLUG
router.get("/findAll", categoryController.findAll_GET); // GET ALL CATEGORIES

module.exports = router