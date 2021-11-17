const mongoose = require("mongoose")

const HouseSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            max: 50
        },
        image: {
            type: String
        },
        points: {
            type: Number,
            default: 0
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Reward", HouseSchema);