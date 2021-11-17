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
        content: {
            type: String,
            required: true,
            max: 5000
        },
        state: {
            type: Number,
            default: 0
        }
    }, { timestamps: true } // Pour ajouter des champs 'createdAt' et 'updatedAt' mis à jour automatiquement par Mongo
);

module.exports = mongoose.model("Comment", CommentSchema);