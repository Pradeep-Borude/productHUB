const express = require("express");
const authController = require("../controllers/auth.controller");
const { authUserMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

router.get("/me", authUserMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

module.exports = router;
