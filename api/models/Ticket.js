const MEMBER = process.env.MEMBER;
const ADMIN = process.env.ADMIN;
const NPC = process.env.NPC;

const mongoose = require("mongoose")

const TicketSchema = new mongoose.Schema({
        authorUUID: {
            type: String,
            required: true,
            max: 50
        },
        presentAdmins: {
            type: Array,
            default: []
        },
        Title: {
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
        }
    }, { timestamps: false } // Pour ajouter des champs 'createdAt' et 'updatedAt' mis à jour automatiquement par Mongo
);

module.exports = mongoose.model("Ticket", TicketSchema);

/** List of parameters for mongoose.model(...) :
 * @param name  <String> : model name
 * @param schema <Schema> : schema variable
 * @param collection <String> : explicit collection name [OPTIONAL] (induced from model name, made plural and lowercase)
 * @param skipInit <Boolean> : whether to skip initialisation [OPTIONAL] (default to false)
 */