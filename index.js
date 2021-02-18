const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ContactRouter = require("./src/contact/contact.router");
const AuthRouter = require("./src/auth/auth.router");
const UserRouter = require("./src/user/user.router");

dotenv.config();

const PORT = process.env.PORT || 8080;

start();

function start() {
  const app = initServer();
  connectMiddlewares(app);
  declareRouters(app);
  connectToDb();
  listen(app);
}

function initServer() {
  return express();
}
function connectMiddlewares(app) {
  app.use(express.json());
}
function declareRouters(app) {
  app.use("users/", UserRouter);
  app.use("/auth", AuthRouter);
  app.use("/contacts", ContactRouter);
}
async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
function listen(app) {
  app.listen(PORT, () => {
    console.log("Server is lisening on port", PORT);
  });
}
