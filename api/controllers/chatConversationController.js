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
    // Je vérifie que la conversation n'existe pas déjà :
    try {
        const conversation = await ChatConversation.findOne({
            users: {
                $all: [req.body.senderId, req.body.receiverId]
            },
        });
        // Si la conversation existe déjà...
        conversation && res.status(400).json("A conversation between these two users already exists.");
        // ...sinon, je la crée :
        if(!conversation) {
            const newConv = new ChatConversation({
                users: [req.body.senderId, req.body.receiverId],
                states: [ {userId: req.body.senderId}, {userId: req.body.receiverId} ],
            }); 
            try {
                const savedConv = await newConv.save();
                res.status(200).json(savedConv);
            } catch(err) {
                res.status(500).json(err); 
            }
        }
    } catch(err) {
        res.status(500).json(err);
    }
        
}

// * GET TWO USERS' CONVERSATION *
module.exports.findByTwoUsers_GET = async (req, res) => {
    try {
        const conversation = await ChatConversation.findOne({
            users: {
                $all: [req.params.userId_1, req.params.userId_2]
            },
        });
        res.status(200).json(conversation);
    } catch(err) {
        res.status(500).json(err);
    }
}

// * DELETE A CONVERSATION *
module.exports.delete_DELETE = async (req, res) => {
    try {
        const conversation = await ChatConversation.findById(req.params.id);
        await conversation.deleteOne();
        res.status(200).json("The conversation has been deleted successfully.");
    } catch (err) {
        res.status(500).json(err);
    }
}