const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register_POST); // REGISTER A USER
router.post("/login", authController.login_POST);       // LOGIN A USER

router.post("/resetPassword/:id", async (req, res) => {
    try {
        const URL = req.params.id;
        res.status(200).json(URL);
    } catch(err) {
        res.status(500).json(err)
    }

})

module.exports = router