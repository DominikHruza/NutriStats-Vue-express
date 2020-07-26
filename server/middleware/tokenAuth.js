const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  // Get token form header
  const token = req.header("x-auth-token");

  //If not token
  if (!token) {
    return res.status(401).json({ msg: "No token, unauthorized!" });
  }

  //Token verification
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
