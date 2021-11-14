const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// * GET A USER *
router.get("/", async(req, res) => {
    // Query strings :
    const userId = req.query.userId; // .../users?userId=616ef78085e9a2...
    const username = req.query.username; // .../users?username="John"
    try {
        const user = userId ?
            await User.findById(userId) // Je fetch le user soit par son ID...
            :
            await User.findOne({ username: username }); // ...soit par son username.

        !user && res.status(404).json("No user was found."); // Si la requête ne renvoit aucun utilisateur
        const { password, updatedAt, ...other } = user._doc; // On ne récupère pas le mot de passe ou la date de mise à jour
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }

})

// * UPDATE A USER *
router.put("/:id", async(req, res) => {
    // Si l'utilisateur est bien celui dont l'ID est dans l'URL, ou un admin :
    if (req.body.userId === req.params.id || req.body.role === ADMIN) {
        // Si l'utilisateur veut modifier son mot de passe :
        if (req.body.password) {
            try {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        // Sinon, on modifie les autres champs :
        try {
            const user = await User.findByIdAndUpdate(req.body.userId, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated successfully.")
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(401).json("UPDATE ACCOUNT: Invalid credentials.")
    }
})

// * DELETE A USER *
router.delete("/:id", async(req, res) => {
    // Si l'utilisateur est bien celui dont l'ID est dans l'URL, ou un admin :
    if (req.body.userId === req.params.id || req.body.role === ADMIN) {
        try {
            const user = await User.findByIdAndDelete(req.body.userId);
            res.status(200).json("Account has been deleted successfully.")
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(401).json("DELETE ACCOUNT: Invalid credentials.")
    }
});

// * FOLLOW A USER *
router.put("/:id/follow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            // On récupère l'utilisateur à suivre et l'utilisateur loggé :
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            // Si l'utilisateur à suivre n'est pas déjà suivi par l'utilisateur loggé :
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json("User has been followed successfully.");
            } else {
                res.status(403).json("You already follow this user.");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Users cannot follow themselves.")
    }
});

// * UNFOLLOW A USER *
router.put("/:id/unfollow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            // On récupère l'utilisateur à suivre et l'utilisateur loggé :
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            // Si l'utilisateur à suivre est bien déjà suivi par l'utilisateur loggé :
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("User has been unfollowed successfully.");
            } else {
                res.status(403).json("You are not following this user yet, so you cannot unfollow them.");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Users cannot unfollow themselves.")
    }
});

// * GET A FRIEND (FOLLOWINGS) *
router.get("/friends/:userId", async (req, res) => {
    try {
        // Utilisateur dont on cherche les amis :
        const user = await User.findById(req.params.userId);
        // Amis de l'utilisateur :
        const friends = await Promise.all(
            user.following.map(friendId => {
                return User.findById(friendId)
            })
        );
        // On ne garde que l'ID, l'avatar et le nom :
        let friendList = [];
        friends.map(friend => {
            const { _id, username, avatar } = friend;
            friendList.push( { _id, username, avatar } )
        });
        res.status(200).json(friendList);
        
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router // Export public pour qu'il puisse être importé ailleurs