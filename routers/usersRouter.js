const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("./users-model");

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

router.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      sendUserError(500, "What is going on?", res);
    });
});

module.exports = router;
