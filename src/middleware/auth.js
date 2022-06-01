`use strict`;

const jwt = require('jsonwebtoken');
const config = process.env;

const tokenVerif = (req, res, next) => {
    const token = req.body.data.token || req.query.token || req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send("⛔A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch(err) {
        return res.status(401).send("⛔Invalid Token");
    }
    return next();
};

module.exports = tokenVerif;