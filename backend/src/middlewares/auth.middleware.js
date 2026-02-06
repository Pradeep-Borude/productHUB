const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authUserMiddleware(req, res, next) {
  const token = req.cookies?.userToken;

  if (!token) {
    return res.status(401).json({
      message: "Please login first"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = {
  authUserMiddleware
};
