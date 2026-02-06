// backend\src\controllers\user.auth.js
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodpartner.model");
const  userModel = require("../models/user.model");

async function verifyFoodPartner(req, res, next) {
  try {
    const token = req.cookies.foodPartnerToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel
      .findById(decoded.id)
      .select("_id name email contact address createdAt updatedAt");

    if (!foodPartner) {
      return res.status(401).json({ success: false, message: "Account not found" });
    }

    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}


async function verifyUser(req, res, next) {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decoded.id)
      .select("_id fullName email contact address createdAt updatedAt");

    if (!user) {
      return res.status(401).json({ success: false, message: "Account not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

module.exports = { 
    verifyFoodPartner,
    verifyUser

 };
