const express = require("express"); // Framework JS
const mongoose = require("mongoose"); // MongoDB
const dotenv = require("dotenv"); // Pour stocker les variables d'environnements
const helmet = require("helmet"); // Pour la sécurité HHTPS
const morgan = require("morgan"); // Pour les logs et résultats des requêtes
const multer = require("multer"); // Pour l'upload d'images
const path = require("path");
const proxy = require('http-proxy-middleware'); // Proxy for Axios
const cors = require('cors');

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const commentRoute = require("./routes/comments")
const conversationRoute = require("./routes/chatConversations")
const messageRoute = require("./routes/chatMessages")
const categoryRoute = require("./routes/categories")
const uploadRoute = require("./routes/upload")

const port = process.env.PORT || 8000;

const app = express();

dotenv.config();

// Connection à MongoDB :
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✔️  Connected to MongoDB."))
    .catch((err) => console.log(err));

app.use(express.static('public')); 
app.use('/assets', express.static('assets'));
app.use('/media', express.static('media'));

// Middleware :
app.use(express.json()); // Body parser for POST requests
app.use(morgan("common"));

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "allowedHeaders": ["Content-Type"]
};
app.use(cors(corsOptions));

app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

// API routes :
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/upload", uploadRoute);

// Proxy :
module.exports = function(app) {
    app.use(proxy(['/api'], { target: `http://45.9.191.110:${port}` }));
} 

app.listen(port, () => {
    console.log("✔️  Server listening on port " + port + "...")
})