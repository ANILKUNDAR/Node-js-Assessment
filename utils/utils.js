const jwt = require("jsonwebtoken");
const config = require("../config/config");
module.exports = {

    generateToken: function (info) {
        return jwt.sign(info, config.jwtPrivateKey, {
            expiresIn: config.security.ACCESS_TOK
        });
    },

    generateRefreshToken: function (info) {
        info.isRefreshToken = true;
        return jwt.sign(info, config.jwtPrivateKey, {
            expiresIn: config.security.REFRESH_TOK
        });
    }
}