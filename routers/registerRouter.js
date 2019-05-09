const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("./users-model");

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db.add(user)
    .then(done => {
      res.status(201).json(done);
    })
    .catch(error => {
      sendUserError(500, error, res);
    });
});

module.exports = router;
