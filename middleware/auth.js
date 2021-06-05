const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = function(req, res, next) {
  if (!config.requiresAuth) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    req.user = decoded;
    if (!req.user.isAdmin) {
      return res.status(401).send("Access Denied");
    }
    next();
  } catch (ex) {
    res.status(400).send("invalid Token");
  }
};
