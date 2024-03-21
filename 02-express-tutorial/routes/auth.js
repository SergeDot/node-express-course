const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400)
      .json({ success: false, msg: `Oopsie doopsie no such user` });
  };
  res.cookie('name', name);
  res.status(201).send(`hello ${name}`);
})

router.delete('/', (_, res) => {
  res.clearCookie("name");
  res.status(200).send('logged off');
});

router.get('/', auth, (req, res) => {
  const userName = req.user;
  res.status(200).send(`Well hello, ${userName}`);
});

module.exports = router;
