const express = require("express"); // Framework JS
const mongoose = require("mongoose"); // MongoDB
const dotenv = require("dotenv"); // Pour stocker les variables d'environnements
const helmet = require("helmet"); // Pour la sécurité HHTPS
const morgan = require("morgan"); // Pour les logs et résultats des requêtes
const multer = require("multer"); // Pour l'upload d'images
const path = require("path");

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const commentRoute = require("./routes/comments")
const conversationRoute = require("./routes/chatConversations")
const messageRoute = require("./routes/chatMessages")
const categoryRoute = require("./routes/categories")

const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// Connection à MongoDB :
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✔️  Connected to MongoDB."))
    .catch((err) => console.log(err));

//
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// app.use("/media", express.static(path.join(__dirname, "public/media")));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public')); 
app.use('/assets', express.static('assets'));
app.use('/media', express.static('media'));

// Middleware :
app.use(express.json()); // Body parser for POST requests
app.use(helmet());
app.use(morgan("common"));

// File uploading :
// (more info 👉 https://www.npmjs.com/package/multer) 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/media/post");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
      },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (err) {
      console.error(err);
    }
  }
);

const storageAvatar = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "public/media/profile");

  },
  
  filename: (req, file, cb) => {

    cb(null, req.body.name);

  }

});

const uploadAvatar = multer({ storage: storageAvatar });

app.post("/api/uploadAvatar", uploadAvatar.single("file"), (req, res) => {

  try {

    return res.status(200).json("File uplodedAvatar successfully");

  } catch(err) {

    console.error(err);

  }

});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/categories", categoryRoute);

const port = 8000

app.listen(port, () => {
    console.log("✔️  Server listening on port " + port + "...")
})