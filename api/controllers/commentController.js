const Comment = require("../models/Comment");

// * CREATE A COMMENT *
module.exports.create_POST = async (req, res) => {
    const newComment = new Comment(req.body)
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment)
    } catch (err) {
        res.status(500).json(err)
    }
}

// todo: UPDATE A COMMENT
module.exports.update_PUT = async (req, res) => {}

// todo: DELETE A COMMENT
module.exports.delete_DELETE = async (req, res) => {}