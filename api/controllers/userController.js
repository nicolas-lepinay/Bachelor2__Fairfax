const User = require("../models/User");
const bcrypt = require("bcrypt")

// * GET A USER *
module.exports.findOne_GET = async (req, res) => {
    // Query strings :
    const userId = req.query.userId; // .../users?userId=616ef78085e9a2...
    const username = req.query.username; // .../users?username="John"
    try {
        const user = userId ?
            await User.findById(userId) // Je fetch le user soit par son ID...
            :
            await User.findOne({ username: username }); // ...soit par son username.

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

    let userId = req.body.userId;
    let userName = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let checkPassword = req.body.checkPassword;
    let avatar = req.body.avatar;
    let regexUserName = /^[ a-zA-Z0-9._]{3,20}/;
    let regexEmail = /([a-zA-Z0-9._\-]{1,20})+@([a-zA-Z\-]{5,25})+.([a-z]{2,5})/;
    let regexPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!_@.$\\-]).{6,30}/m;

    if (password) {

        try {

            if (userName === "") throw "UserName ne peut pas être vide!";

            if (email === "") throw "L'email ne peut pas être vide!";

            if (!regexUserName.test(userName)) throw "Test Ko!";
            
            if (!regexEmail.test(email)) throw "Test Ko!";

            if (!regexPassword.test(password)) throw "MDP pas assez fort ou pas assez long!";

            if (!regexPassword.test(checkPassword)) throw "MDP pas assez fort ou pas assez long!";

            if (!password === checkPassword) throw "Le MDP doit être identique";

            password = bcrypt.hashSync(password, 10);

            if (avatar === undefined) {
                
                const updateUser = await User.findByIdAndUpdate(userId, {

                    $set: {
        
                        username: userName,
                        email: email,
                        password: password
        
                    }
        
                }, {new: true});
        
                res.status(200).json(updateUser);

            } else {

                const updateUser = await User.findByIdAndUpdate(userId, {

                    $set: {
        
                        username: userName,
                        email: email,
                        avatar: avatar,
                        password: password
        
                    }
        
                }, {new: true});
        
                res.status(200).json(updateUser);

            }

        } catch(err) {

            return res.status(500).json(err);

        }

    } 

    try {
        
        if (avatar === undefined) {
            
            const updateUser = await User.findByIdAndUpdate(userId, {

                $set: {
    
                    username: userName,
                    email: email,
    
                }
    
            }, {new: true});
    
            res.status(200).json(updateUser);

        } else {

            const updateUser = await User.findByIdAndUpdate(userId, {

                $set: {
    
                    username: userName,
                    email: email,
                    avatar: avatar
    
                }
    
            }, {new: true});
    
            res.status(200).json(updateUser);

        }

    } catch (error) {
        
        return res.status(500).json(error);

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
}