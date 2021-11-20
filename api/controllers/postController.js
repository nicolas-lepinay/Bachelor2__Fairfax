const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// * GET A POST *
module.exports.findOne_GET = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

// * CREATE A POST *
module.exports.create_POST = async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
}

// * UPDATE A POST *
module.exports.update_PUT = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("The post has been updated successfully.")
        } else {
            res.status(403).json("Current user doesn't have permission to edit this post.")
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// * DELETE A POST *
module.exports.delete_DELETE = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted successfully.")
        } else {
            res.status(403).json("Current user doesn't have permission to delete this post.")
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// * LIKE OR UNLIKE A POST *
module.exports.like_PUT = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Si le post n'a pas déjà été liké par l'utilisateur :
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked successfully.")
        }
        // Si le post a déjà été liké, on enlève le like :
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been unliked successfully.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// * GET A USER'S POSTS * (tous les posts d'un utilisateur)
module.exports.findByUser_GET = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }); // Trouve le user en fonction de son username
        const posts = await Post.find({ userId: user._id }) // Trouve les posts en fonction d'un user
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
}

// * GET TIMELINE POSTS (user's posts + followings' posts) *
module.exports.timeline_GET = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const followeePosts = await Promise.all(
            currentUser.following.map(followeeId => {
                return Post.find({ userId: followeeId });
            })
        );
        res.status(200).json(userPosts.concat(...followeePosts));
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
}

// * GET A POST'S COMMENTS *
module.exports.findComments_GET = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
}