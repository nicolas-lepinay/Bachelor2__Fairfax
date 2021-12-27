const ChatMessage = require("../models/ChatMessage");

// * CREATE A NEW MESSAGE *
module.exports.create_POST = async (req, res) => {
    const newMessage = new ChatMessage(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch(err) {
        res.status(500).json(err)
    }
}

// * GET ALL MESSAGES OF A CONVERSATION *
module.exports.findAll_GET = async (req, res) => {
    try {
        const messages = await ChatMessage.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch(err) {
        res.status(500).json(err)
    }
}