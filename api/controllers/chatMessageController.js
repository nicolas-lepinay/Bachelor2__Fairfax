const ChatMessage = require("../models/ChatMessage");
const ChatConversation = require("../models/ChatConversation");

// * CREATE A NEW MESSAGE *
module.exports.create_POST = async (req, res) => {
    const newMessage = new ChatMessage(req.body);
    try {
        const savedMessage = await newMessage.save();
        const conversation = await ChatConversation.findById(req.body.conversationId);
        await conversation.updateOne({ $push: { messages: savedMessage._id } }); // Ajout de l'id du nouveau message dans l'array messages de la conversation
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