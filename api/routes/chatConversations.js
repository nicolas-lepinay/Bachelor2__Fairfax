const router = require("express").Router();
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("../controllers/tokenController");
const chatConversationController = require("../controllers/chatConversationController");

router.post("/", chatConversationController.create_POST);           // CREATE A NEW CONVERSATION
router.get("/:userId", chatConversationController.findByUser_GET);  // GET A USER'S CONVERSATIONS
router.get("/find/:userId_1/:userId_2", chatConversationController.findByTwoUsers_GET);  // GET TWO USERS' CONVERSATIONS
router.delete("/:id", ); // DELETE A CONVERSATION

module.exports = router;