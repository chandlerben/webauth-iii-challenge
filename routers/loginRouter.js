const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("./users-model");

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        sendUserError(401, "Your login is incorrect.", res);
      }
    })
    .catch(error => {
      sendUserError(500, error, res);
    });
});

module.exports = router;
