const { Router } = require("express");
const router = Router();

const { authenticate } = require("../../srs/middlewares");

const {
  signupController,
  loginController,
  logoutController,
  currentController,
} = require("../../srs/controllers/authController");

router.post("/signup", signupController);

router.post("login", loginController);

router.get("/logout", authenticate, logoutController);

router.get("/current", authenticate, currentController);

module.exports = { authRouter: router };
