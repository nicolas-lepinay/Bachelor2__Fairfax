const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");
const Comment = require("../models/Comment");

// * GET A POST BY ID *
module.exports.findById_GET = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

// * GET A POST BY ID OR SLUG *
module.exports.findOne_GET = async (req, res) => {
    // Query strings :
    const id = req.query.id;        // .../posts?id=61f1115d86f7e859e1e2f2c7
    const slug = req.query.slug;    // .../posts?slug=lorem-ipsum-whwv6765
    try {
        const post = id ?
            await Post.findById(id) // Je fetch le post soit par son ID...
            :
            await Post.findOne({ slug: slug }); // ...soit par son slug.

        !post && res.status(404).json("No post was found."); // Si la requête ne renvoit aucun post
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

// * LIKE OR UNLIKE A POST * (v1)
// module.exports.like_PUT = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         // Si le post n'a pas déjà été liké par l'utilisateur :
//         if (!post.likes.includes(req.body.userId)) {
//             await post.updateOne({ $push: { likes: req.body.userId } });
//             res.status(200).json("The post has been liked successfully.")
//         }
//         // Si le post a déjà été liké, on enlève le like :
//         else {
//             await post.updateOne({ $pull: { likes: req.body.userId } });
//             res.status(200).json("The post has been unliked successfully.");
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

// * LIKE OR UNLIKE A POST * (v2)
module.exports.like_PUT = async (req, res) => {
    try {
        // Je cherche un post correspondant à l'id ET avec un like du user :
        let post = await Post.findOne({$and: [ { _id: req.params.id }, { "likes.userId": req.body.userId } ] } )
        // Si un post a bien été trouvé, je retire le like du user :
        if(post) {
            await post.updateOne({ $pull: { likes : { userId: req.body.userId } } });
            res.status(200).json("The post has been unliked successfully.");
        // Si aucun post n'a été trouvé, je cherche le post en fonction de son id et ajoute un like du user :
        } else {
            post = await Post.findById(req.params.id);
            await post.updateOne({ $push: { likes : { userId: req.body.userId } } });
            res.status(200).json("The post has been liked successfully.")
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// * INCREASE POST'S VIEWS *
module.exports.views_PUT = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId != req.body.userId) {
            await post.updateOne({ $push: { views : { userId: req.body.userId } } });
            res.status(200).json("The post's view counter has been increased.")
        } else {
            res.status(403).json("A user cannot increase their own post's view counter.")
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

// * GET A USER'S POSTS * (tous les posts d'un utilisateur)
module.exports.findByUserId_GET = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId }); // Trouve les posts dont le userId est l'ID passé en paramètre
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
}

// * GET A USER'S FAVOURITE POSTS * (tous les posts likés par un utilisateur)
module.exports.findLikedPosts_GET = async (req, res) => {
    try {
        const posts = await Post.find({ "likes.userId": req.params.userId }); // Trouve les posts likés par l'utilisateur dont l'ID est userId
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
}

// * GET POSTS BY CATEGORY * (tous les posts dans une catégorie)
module.exports.findByCategory_GET = async (req, res) => {
    try {
        // Exemple : api/posts/category/61f1115d86f7e859e1e2f2c7?skip=20?limit=10
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 0;
        const posts = await Post.find({ categoryId: req.params.categoryId }).sort({createdAt: -1 }).skip(skip).limit(limit);
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
        const userPosts = await Post.find({ userId: currentUser._id }).sort({createdAt: -1 });
        const followeePosts = await Promise.all(
            currentUser.following.map(followeeId => {
                return Post.find({ userId: followeeId }).sort({createdAt: -1 });
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