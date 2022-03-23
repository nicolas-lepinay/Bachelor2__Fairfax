const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Password reset :
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const url = require("url"); 

module.exports.register_POST = async (req, res) => {
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
        res.status(201).json(user)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports.login_POST = async (req, res) => {
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
    !validPassword && res.status(401).json("Password is incorrect.");

    const accessToken = jwt.sign({
        id: user._id, 
        role: user.role,
    }, process.env.JWT_SECRET, 
    /*{expiresIn: "1d"}*/
    )

    // ✔️ Requête valide :
    const { password, ...rest } = user._doc;
    res.status(200).json({...rest, accessToken}); // On renvoit tous les champs sauf le mot de passe (par sécurité)
  } catch (err) {
    res.status(500).json(err);
    }
}

// PASSWORD FORGOT :
module.exports.passwordForgot_POST = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email 
        });
        const email = req.body.email;
        if(email == user.email){
            const token = crypto.randomBytes(30).toString('hex');
            console.log(token);
            var date = new Date();
            date.setHours( date.getHours() + 1 );
            const updateUser = await User.findOneAndUpdate({email: req.body.email }, {$set:{resetPasswordToken: token, PasswordTokenExpire:date}},{new: true});
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'forum.fairfax@gmail.com',
                    pass: 'Abcd1234?'
                }
                });
        
                var mailOptions = {
                from: 'forum.fairfax@gmail.com',
                to: email,
                subject: 'Reset Password',
                text: 
                    'You are receiving this because you have requested the reset of the password for your account.\n\n'+
                    'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'+
                    `http://localhost:3000/resetPassword/${token}\n\n`+
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
        
                transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json("Email sent successfully.")
                }
            });
        }else{
            console.log("-----------------Email is incorrect----------------")
            res.status(400).json("Email is incorrect.")
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// PASSWORD RESET :
module.exports.passwordReset_POST = async (req, res) => {
    try {
        console.log("-------------------Test-----------------");
        // Hashage du mot de passe :
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const URL = req.params.id;
        const user2 = await User.findOne({
            resetPasswordToken: URL
        });
        var date2 = new Date();
        if(date2 < user2.PasswordTokenExpire){
            const user = await User.findOneAndUpdate({
                resetPasswordToken: URL
            }, {$set:{password: hashedPassword}},{new: true});
            console.log("Id is = " + URL);
            console.log("---------" + user.resetPasswordToken);
            res.status(200).json(user);
        }        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
