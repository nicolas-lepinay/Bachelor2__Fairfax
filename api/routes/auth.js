const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register_POST); // REGISTER A USER
router.post("/login", authController.login_POST);       // LOGIN A USER
router.post("/passwordForgot", authController.passwordForgot_POST);
router.post("/resetPassword/:id", authController.passwordReset_POST);

module.exports = router