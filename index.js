const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ContactRouter = require("./src/contact/contact.router");

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
  app.use("/contacts", ContactRouter);
}
async function connectToDb() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
function listen(app) {
  app.listen(PORT, () => {
    console.log("Server is lisening on port", PORT);
  });
}
