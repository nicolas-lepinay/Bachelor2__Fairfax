const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug); // Initialize slugs

const HouseSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        image: {
            type: String
        },
        score: {
            type: Number,
            default: 0
        },
        slug: {
            type: String,
            slug: "name",
            unique: true
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Reward", HouseSchema);