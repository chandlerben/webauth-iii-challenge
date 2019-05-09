const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const KnexSessionsStore = require("connect-session-knex")(session);
const jwt = require("jsonwebtoken");

const registerRouter = require("./routers/registerRouter");
const loginRouter = require("./routers/loginRouter");
const usersRouter = require("./routers/usersRouter");
const secrets = require("./config/secrets");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("I am working!");
});

server.use(
  "/api",
  registerRouter,
  loginRouter,
  authenticationMiddleware,
  usersRouter
);

function authenticationMiddleware(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    if (err) {
      res.status(400).json({ message: "YOU SHALL NOT PASS!" });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
}

module.exports = server;
