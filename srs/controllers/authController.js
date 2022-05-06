const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequest, Conflict, Unauthorized } = require("http-errors");

const { joiSignupSchema, joiLoginSchema } = require("../models/userModel");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

const signupController = async (req, res, next) => {
  try {
    const { body } = req;
    const { name, email, password, subscription } = req.body;
    const { error } = joiSignupSchema.validate(body);

    if (error) {
      throw new BadRequest(error.message);
    }

    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict("Email in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      subscription,
    });

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password } = req.body;
    const { error } = joiLoginSchema.validate(body);

    if (error) {
      throw new BadRequest(error.message);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw new Unauthorized("Email or password is wrong");
    }

    const { _id, subscription } = user;
    const payload = {
      id: _id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(_id, { token });

    res.json({
      token,
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
};

const currentController = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentController,
};
