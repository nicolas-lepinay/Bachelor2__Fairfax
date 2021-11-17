const MEMBER = process.env.MEMBER;
const ADMIN = process.env.ADMIN;
const NPC = process.env.NPC;

const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            max: 50
        },
        theme: {
            type: String,
            required: true,
            max: 50
        },
        description: {
            type: String,
            required: true,
            max: 5000
        }
    }, { timestamps: true } // Pour ajouter des champs 'createdAt' et 'updatedAt' mis à jour automatiquement par Mongo
);

module.exports = mongoose.model("Comment", CommentSchema);

/** List of parameters for mongoose.model(...) :
 * @param name  <String> : model name
 * @param schema <Schema> : schema variable
 * @param collection <String> : explicit collection name [OPTIONAL] (induced from model name, made plural and lowercase)
 * @param skipInit <Boolean> : whether to skip initialisation [OPTIONAL] (default to false)
 */