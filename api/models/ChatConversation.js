const mongoose = require("mongoose")

const ChatConversationSchema = new mongoose.Schema({
        users: {
            type: Array,
            default: []
        },
        messages: {
            type: Array,
            default: []
        },
        states:[
            {
                userId: {type: String},
                state: {type: Number, default: 0}
            }
        ],
    }, { timestamps: true }
);

module.exports = mongoose.model("Chat_Conversation", ChatConversationSchema);