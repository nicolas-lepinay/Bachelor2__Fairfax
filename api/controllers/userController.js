const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// * GET A USER *
module.exports.findOne_GET = async (req, res) => {
    // Query strings :
    const userId = req.query.userId;        // .../users?userId=616ef78085e9a2...
    const username = req.query.username;    // .../users?username="John"
    const slug = req.query.slug;            // .../users?slug="john"
    const email = req.query.email;          // .../users?email="john@gmail.com"

    try {
        const user = userId ?
            await User.findById(userId)                 // Je fetch le user soit par son ID...
            : username ?
            await User.findOne({ username: username })  // ...soit par son username...
            : slug ?
            await User.findOne({ slug: slug })          // ...soit par son slug.
            : 
            await User.findOne({ email: email })       // ...soit par son email.

        !user && res.status(404).json("No user was found."); // Si la requête ne renvoit aucun utilisateur
        const { password, updatedAt, ...rest } = user._doc; // On ne récupère pas le mot de passe ou la date de mise à jour
        res.status(200).json(rest);
    } catch (err) {
        res.status(500).json(err);
    }
}

// * GET ALL USERS *
module.exports.findAll_GET = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err);
    }
}

// * UPDATE A USER *
module.exports.update_PUT = async (req, res) => {

    const user = await User.findById(req.body.userId);

    // console.log("**************")
    // console.log(req.body)
    // console.log("**************")
    // Remove null properties from req.body :
    Object.keys(req.body).forEach( (key) => req.body[key] == null && delete req.body[key]);

    // Si l'utilisateur veut modifier son mot de passe :
    if (req.body.password && req.body.currentPassword) {
        try {
            // Comparaison du mot de passe saisi avec le mot de passe hashé stocké dans la DB :
            const passwordIsValid = bcrypt.compareSync(req.body.currentPassword, user.password);
            // Si le mot de passe est incorrect...
            !passwordIsValid && res.status(401).json("The password you entered is incorrect.");
            // Si le mot de passe est correct, on hâche le nouveau mot de passe :
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        } catch(err) {
            console.log(err)
        }
    }
    // Sinon, on modifie les autres champs :
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            $set: req.body,
        }, {new: true});

        // Génération d'un nouvel accessToken :
        const accessToken = jwt.sign({
            id: user._id, 
            role: user.role,
        }, process.env.JWT_SECRET)

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json({accessToken, ...rest}); // On renvoit tous les champs (+ l'accesToken) sauf le mot de passe (par sécurité)
    } catch (err) {
        return res.status(500).json(err);
    }
}

// * DELETE A USER *
module.exports.delete_DELETE = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Account has been deleted successfully.")
    } catch(err) {
        res.status(500).json(err)
    }
}

// * FOLLOW OR UNFOLLOW A USER *
module.exports.follow_PUT = async (req, res) => {
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
                // Si l'utilisateur à suivre est déjà suivi par l'utilisateur loggé, on le unfollow :
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("User has been unfollowed successfully.");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Users cannot follow themselves.")
    }
}

// * GET FOLLOWINGS LIST *
module.exports.findFollowings_GET = async (req, res) => {
    try {
        // Utilisateur dont on cherche les amis :
        const user = await User.findById(req.params.userId);
        // Amis de l'utilisateur :
        const friends = await Promise.all(
            user.following.map(friendId => {
                return User.findById(friendId)
            })
        );
        // // On ne garde que l'ID, le username, le slug et l'avatar :
        let friendList = [];
        friends.map(friend => {
            // const { _id, username, slug, avatar } = friend;
            // friendList.push( { _id, username, avatar } )
            const { password, updatedAt, ...rest } = friend._doc; // On ne récupère pas le mot de passe ou la date de mise à jour
            friendList.push(rest);
        });
        res.status(200).json(friendList);
        
    } catch (err) {
        res.status(500).json(err);
    }
}

// * GET FOLLOWERS LIST *
module.exports.findFollowers_GET = async (req, res) => {
    try {
        // Utilisateur dont on cherche les amis :
        const user = await User.findById(req.params.userId);
        
        // Amis de l'utilisateur :
        const followers = await Promise.all(
            user.followers.map(friendId => {
                return User.findById(friendId)
            })
        );
        let friendList = [];
        followers.map(friend => {
            if(friend) {
                const { password, updatedAt, ...rest } = friend._doc; // On ne récupère pas le mot de passe ou la date de mise à jour
                friendList.push(rest);
            }
        });
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
}