const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.post("/", commentController.create_POST);        // CREATE A COMMENT
router.get("/", commentController.findByParent_GET);    // GET A POST'S COMMENTS OR A COMMENT'S SUBCOMMENTS
router.get("/userId/:userId", commentController.findByUser_GET);    // GET A POST'S COMMENTS OR A COMMENT'S SUBCOMMENTS
router.put("/:id/like", commentController.like_PUT);    // LIKE OR UNLIKE A COMMENT

// todo: UPDATE A COMMENT
// todo: DELETE A COMMENT

// To get all comments from a posts --> posts route

module.exports = router;