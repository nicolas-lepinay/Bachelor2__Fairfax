const multer = require("multer"); // Pour l'upload d'images

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/media/profile");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
      },
});

const avatarUpload = multer({ storage: storage });

export default avatarUpload.single('file');