const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register_POST); // REGISTER A USER
router.post("/login", authController.login_POST);       // LOGIN A USER

module.exports = router