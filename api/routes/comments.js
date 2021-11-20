const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.post("/", commentController.create_POST);    // CREATE A COMMENT
// todo: UPDATE A COMMENT
// todo: DELETE A COMMENT

// To get all comments from a posts --> posts route

module.exports = router;