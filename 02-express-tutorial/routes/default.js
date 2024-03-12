const express = require('express');
const router = express.Router();

router.all('/', (_, res) => {
  res.status(404).send('<h1>Resource not found<h1/>');
});

module.exports = router;
