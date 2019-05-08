const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const KnexSessionsStore = require("connect-session-knex")(session);

const registerRouter = require("./routers/registerRouter");
const loginRouter = require("./routers/loginRouter");
const usersRouter = require("./routers/usersRouter");

const server = express();

const sessionConfig = {
  name: "cookie",
  secret: "This is a secret phrase!",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 2,
    secure: false
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionsStore({
    knex: require("./database/dbConfig"),
    createtable: true,
    clearInterval: 1000 * 60 * 15
  })
};

server.use(session(sessionConfig));
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
  if (req.session && req.session.username) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "YOU SHALL NOT GET THE SECRET FILES, SCUM!" });
  }
}

module.exports = server;
