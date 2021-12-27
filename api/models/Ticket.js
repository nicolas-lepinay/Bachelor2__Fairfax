const mongoose = require("mongoose")

const TicketSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,
            max: 50
        },
        admins: {
            type: Array,
            default: []
        },
        title: {
            type: String,
            required: true,
            max: 50
        },
        content: {
            type: String,
            required: true,
            max: 500
        },
        messages: {
            type: Array,
            default: []
        },
        state: {
            type: Number,
            default: 0
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);