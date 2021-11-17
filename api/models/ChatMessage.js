const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
    conversationId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
      max: 5000
    },
    state: {
        type: Number,
        default: 0
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat_Message", ChatMessageSchema);