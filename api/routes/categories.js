const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.post("/", categoryController.create_POST);       // CREATE A CATEGORY
router.get("/", categoryController.findOne_GET);        // GET A CATEGORY BY ID OR BY SLUG
router.get("/findAll", categoryController.findAll_GET); // GET ALL CATEGORIES

module.exports = router