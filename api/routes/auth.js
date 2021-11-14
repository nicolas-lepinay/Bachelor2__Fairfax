const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./verifyToken");

// * REGISTER *
router.post("/register", async(req, res) => {
    try {
        // Hashage du mot de passe :
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // Création d'un nouvel utilisateur :
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        // Sauvegarde de l'utilisateur dans la base de données :
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// * LOGIN *
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [
                { username: req.body.identifier },
                { email: req.body.identifier }
            ]
        });
        // Si la requête ne renvoit aucun utilisateur :
        !user && res.status(404).json("No matching account was found."); 

        // Comparaison du mot de passe saisi avec le mot de passe hashé stocké dans la DB :
        const validPassword = bcrypt.compareSync(req.body.password, user.password);

        // Si le mot de passe saisi est faux :
        !validPassword && res.status(400).json("Password is incorrect.");

        const accessToken = jwt.sign({
            id: user._id, 
            role: user.role,
        }, process.env.JWT_SECRET, {expiresIn: "1d"})

        // ✔️ Requête valide :
        const { password, ...rest } = user._doc;
        res.status(200).json({...rest, accessToken}); // On renvoit tous les champs sauf le mot de passe (par sécurité)

    } catch (err) {
        res.status(500).json(err);
    }
});

// * REFRESH TOKEN *
router.post("/refresh", (req, res) => {

});

// * LOGOUT *
router.post("/logout", verifyToken, (req, res) => {
     
});



module.exports = router // Export public pour qu'il puisse être importé ailleurs