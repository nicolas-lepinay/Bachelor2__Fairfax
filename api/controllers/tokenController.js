const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader) {
        const token = authHeader;
        jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
            if(err) { 
                res.status(403).json("Token is invalid.") 
            } else {
                res.user = userData;
                next();
            }
        })
    } else {
        return res.status(401).json("You are not authenticated.")
    }
}

const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.body.userId === req.params.userId || req.body.role > 1) {
            next();
        } else {
            res.status(403).json("You are not allowed to perform this action.")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.body.role > 1) {
            next();
        } else {
            res.status(403).json("You are not allowed to perform this action.")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };