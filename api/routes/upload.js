const router = require("express").Router();
const multer = require("multer"); // Pour l'upload d'images
const uploadController = require("../controllers/uploadController");

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/media/profile");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
      },
});

const avatarUpload = multer({ storage: avatarStorage });

router.post("/avatar", avatarUpload.single("file"), uploadController.uploadAvatar_POST);       // 

module.exports = router