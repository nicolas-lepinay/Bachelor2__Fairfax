const MEMBER = process.env.MEMBER;
const ADMIN = process.env.ADMIN;
const NPC = process.env.NPC;

const mongoose = require("mongoose")

const ChatSchema = new mongoose.Schema({
        users: {
            type: Array,
            default: []
        },
        messages: {
            type: Array,
            default: []
        },
        state: {
            type: Number,
            required: true,
            default:0
        }
    }, { timestamps: true } // Pour ajouter des champs 'createdAt' et 'updatedAt' mis à jour automatiquement par Mongo
);

module.exports = mongoose.model("Chat", ChatSchema);

/** List of parameters for mongoose.model(...) :
 * @param name  <String> : model name
 * @param schema <Schema> : schema variable
 * @param collection <String> : explicit collection name [OPTIONAL] (induced from model name, made plural and lowercase)
 * @param skipInit <Boolean> : whether to skip initialisation [OPTIONAL] (default to false)
 */