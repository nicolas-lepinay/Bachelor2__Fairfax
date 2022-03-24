
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");
const Comment = require("../models/Comment");

// * GET CHARTS *
module.exports.charts_GET = async (req, res) => {

    try {
        var chart = {};
        chart.comments = await Comment.count();
        chart.categories = await Category.count();
        chart.posts = await Post.count();
        chart.users = await User.count();
        
        res.status(200).json([chart]);
    } catch (err) {
        res.status(500).json(err);
    }
}

//Get Comment Number By Number of Day

module.exports.comment_Date_GET = async (req, res) => {
    const day = parseInt(req.query.day); // /day=1
    try {
        var comments = await Comment.count({
            createdAt: {
                $gte: new Date(new Date() - day * 60 * 60 * 24 * 1000)
            }
        })

        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
}

//Get Post Number By Number of Day
module.exports.postCatDate_GET = async (req, res) => {
    const day = parseInt(req.query.day); // /day=1
    try {
        var match_stage = {
            $match: { 
                createdAt: { $gte: new Date(new Date() - day * 60 * 60 * 24 * 1000)  } 
            }
        }
        
        var group_stage = {
            $group: {
                _id: "$categoryId",
                count: { $sum: 1 }
            }
        }
        
        var pipeline = [ match_stage, group_stage ]
        var posts = await Post.aggregate(pipeline)

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}

//Get Post Number By Number of Day
module.exports.postDate_GET = async (req, res) => {
    const day = parseInt(req.query.day); // /day=1
    try {
        var posts = await Post.count({
            createdAt: {
                $gte: new Date(new Date() - day * 60 * 60 * 24 * 1000)
            }
        })

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// * GET ALL POST *
module.exports.posts_GET = async (req, res) => {

    try {
        var posts = await Post.find()

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// * GET ALL CATEGORY *
module.exports.categories_GET = async (req, res) => {

    try {
        var categories = await Category.find()

        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
}

// * LIKE OR UNLIKE A COMMENT *
module.exports.like_PUT = async (req, res) => {
    try {
        // Je cherche un comment correspondant à l'id ET avec un like du user :
        let comment = await Comment.findOne({$and: [ { _id: req.params.id }, { "likes.userId": req.body.userId } ] } )
        // Si un post a bien été trouvé, je retire le like du user :
        if(comment) {
            await comment.updateOne({ $pull: { likes : { userId: req.body.userId } } });
            res.status(200).json("The comment has been unliked successfully.");
        // Si aucun comment n'a été trouvé, je cherche le comment en fonction de son id et ajoute un like du user :
        } else {
            comment = await Comment.findById(req.params.id);
            await comment.updateOne({ $push: { likes : { userId: req.body.userId } } });
            res.status(200).json("The comment has been liked successfully.")
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


// todo: UPDATE A COMMENT
module.exports.update_PUT = async (req, res) => {}

// todo: DELETE A COMMENT
module.exports.delete_DELETE = async (req, res) => {}