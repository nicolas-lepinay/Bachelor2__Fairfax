const ChatConversation = require("../models/ChatConversation");

// * GET A USER'S CONVERSATIONS *
module.exports.findByUser_GET = async (req, res) => {
    try {
        const conv = await ChatConversation.find({
            users: { $in: [req.params.userId] },
        });
        res.status(200).json(conv);
    } catch (err) {
        res.status(500).json(err); 
    }
}

// * CREATE A NEW CONVERSATION *
module.exports.create_POST = async (req, res) => {
    const newConv = new ChatConversation({
        users: [req.body.senderId, req.body.receiverId]
    })
    try {
        const savedConv = await newConv.save();
        res.status(200).json(savedConv);
    } catch(err) {
        res.status(500).json(err); 
    }
}