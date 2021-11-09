const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// * CREATE A POST *
router.post("/", async(req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

// * UPDATE A POST *
router.put("/:id", async(req, res) => {
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
})

// * DELETE A POST *
router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been delete successfully.")
        } else {
            res.status(403).json("Current user doesn't have permission to delete this post.")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// * LIKE OR UNLIKE A POST *
router.put("/:id/like", async(req, res) => {
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
})

// * GET A POST *
router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})

// * GET TIMELINE POST * (posts de l'utilisateur et de ses followees)
router.get("/timeline/:userId", async(req, res) => {
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
})

// * GET A USER'S POSTS * (tous les posts d'un utilisateur)
router.get("/profile/:username", async(req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }); // Trouve le user en fonction de son username
        const posts = await Post.find({ userId: user._id }) // Trouve les posts en fonction d'un user
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
})

module.exports = router;