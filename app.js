const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const { authRouter } = require("./routes/api/authRouter");
const { contactsRouter } = require("./routes/api/contactsRouter");
const {
  errorHandlerNotFound,
  errorHandlerServerError,
} = require("./srs/helpers/apiHelpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use(errorHandlerNotFound);

app.use(errorHandlerServerError);

module.exports = app;
