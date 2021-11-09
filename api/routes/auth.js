const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// * REGISTER *
router.post("/register", async(req, res) => {
    try {
        // Hashage du mot de passe :
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // Création d'un nouvel utilisateur m:
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
router.post("/login", async(req, res) => {

    try {
        // Return un document 'user' qui réponde à la query 'username = req.body.identifier' OU 'email = req.body.identifier' :
        const user = await User.findOne({
            $or: [
                { username: req.body.identifier },
                { email: req.body.identifier }
            ]
        });
        !user && res.status(404).json("No matching account was found."); // Si la requête ne renvoit aucun utilisateur

        // Comparaison du mot de passe saisi avec le mot de passe hashé stocké dans la DB :
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        !validPassword && res.status(400).json("Password is incorrect."); // Si le mot de passe saisi est faux.

        res.status(200).json(user) // Requête valide ✔️

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router // Export public pour qu'il puisse être importé ailleurs