const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug); // Initialize slugs

const PostSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        categoryId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        img: {
            type: String
        },
        likes: [
            {
                type: new mongoose.Schema(
                    {
                        userId: String,
                    }, { timestamps: true }
                )
            }
        ],
        views: [
            {
                type: new mongoose.Schema(
                    {
                        userId: String,
                    }, { timestamps: true }
                )
            }
        ],
        state: {
            type: Number,
            default: 0
        },
        slug: { 
            type: String, 
            slug: "title",
            unique: true
        },
    }, { timestamps: true } // Pour ajouter des champs 'createdAt' et 'updatedAt' mis à jour automatiquement par Mongo
);

module.exports = mongoose.model("Post", PostSchema);