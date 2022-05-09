const { Router } = require("express");
const router = Router();

const { authenticate, upload } = require("../../srs/middlewares");

const {
  signupController,
  loginController,
  logoutController,
  currentController,
  updateAvatar,
  emailVerification,
  emailReVerification,
} = require("../../srs/controllers/authController");

router.post("/signup", signupController);

router.post("login", loginController);

router.get("/logout", authenticate, logoutController);

router.get("/current", authenticate, currentController);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

router.get("verify/:verificationToken", emailVerification);

router.post("verify", emailReVerification);

module.exports = { authRouter: router };
