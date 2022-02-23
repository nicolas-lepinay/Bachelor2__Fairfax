const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug); // Initialize slugs

const CategorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        slug: {
            type: String,
            slug: "name",
            unique: true
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);