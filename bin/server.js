const app = require("../app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Rapita:y9-J2FjPgbJsWMy@cluster0.yfi21.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(() => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
