const router = require("express").Router();
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("../controllers/tokenController");
const chatMessageController = require("../controllers/chatMessageController");

router.post("/", chatMessageController.create_POST);                // CREATE A NEW MESSAGE
router.get("/:conversationId", chatMessageController.findAll_GET);  // GET A CONVERSATION'S MESSAGES

module.exports = router;