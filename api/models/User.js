const MEMBER = process.env.MEMBER;
const ADMIN = process.env.ADMIN;
const NPC = process.env.NPC;

const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug); // Initialize slugs

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        avatar: {
            type: String,
            // default: "defaultAvatar.jpg"
        },
        followers: {
            type: Array,
            default: []
        },
        following: {
            type: Array,
            default: []
        },
        friends: {
            type: Array,
            default: []
        },
        houseId: {
            type: String
        },
        rewards: {
            type: Array,
            default: []
        },
        inventory: {
            type: Array,
            default: []
        },
        role: {
            type: Number,
            default: 1
        },
        state: {
            type: Number,
            default: 0,
        },
        slug: {
            type: String,
            slug: "username",
            unique: true
        },
        resetPasswordToken: {
            type: String,
            unique: true
        },
        PasswordTokenExpire:{
            type: Date
        }
    }, { timestamps: true } // Pour ajouter des champs 'createdAt' et 'updatedAt' mis à jour automatiquement par Mongo
);

module.exports = mongoose.model("User", UserSchema);

/** List of parameters for mongoose.model(...) :
 * @param name  <String> : model name
 * @param schema <Schema> : schema variable
 * @param collection <String> : explicit collection name [OPTIONAL] (induced from model name, made plural and lowercase)
 * @param skipInit <Boolean> : whether to skip initialisation [OPTIONAL] (default to false)
 */