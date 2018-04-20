const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureGuest, ensureAuthenticated } = require('../helpers/auth');

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome');
});

module.exports = router;
