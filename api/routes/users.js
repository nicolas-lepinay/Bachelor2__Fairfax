const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("../controllers/tokenController");
const userController = require("../controllers/userController");

router.get("/", userController.findOne_GET);                             // GET A USER
router.get("/findAll", userController.findAll_GET);                      // GET ALL USERS
router.put("/:userId", verifyTokenAndAuth, userController.update_PUT);       // UPDATE A USER
router.delete("/:id", verifyTokenAndAuth, userController.delete_DELETE); // DELETE A USER
router.put("/:id/follow", userController.follow_PUT);                    // FOLLOW OR UNFOLLOW A USER
router.get("/friends/:userId", userController.findFollowings_GET);       // GET USER'S FOLLOWINGS

module.exports = router