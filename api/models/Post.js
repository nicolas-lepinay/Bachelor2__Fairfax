const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
            max: 5000
        },
        img: {
            type: String
        },
        likes: {
            type: Array,
            default: []
        },
        comments: {
            type: Array,
            default: []
        }
    }, { timestamps: true } // Pour ajouter des champs 'createdAt' et 'updatedAt' mis à jour automatiquement par Mongo
);

module.exports = mongoose.model("Post", PostSchema);