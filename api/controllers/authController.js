const User = require("../models/User");

// Handle error :
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // Duplicate email error:
    if (err.code === 11000) {
      errors.email = 'This email is already registered.';
      return errors;
    }
    // Validation errors
    if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  }

module.exports.signup_POST = async (req, res) => {
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
        const error = handleError(err);
        res.status(400).json(error);
    }
}

module.exports.signin_POST = async (req, res) => {
    const { identifier, password } = req.body;
}