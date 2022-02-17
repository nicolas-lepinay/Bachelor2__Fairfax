const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        postId: {
            type: String,
            required: true
        },
        commentId: {
            type: String
        },
        content: {
            type: String,
            required: true
        },
        likes: [
            {
                type: new mongoose.Schema(
                    {
                        userId: String
                    }, 
                    { timestamps: true }
                )
            }
        ],
        state: {
            type: Number,
            default: 0
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);