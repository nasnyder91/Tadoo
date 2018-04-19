const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Show todos index Route
router.get('/', (req, res) => {
  res.render('todos/index');
});

// Add Todo Route
router.get('/add', (req, res) => {
  res.render('todos/add');
});


module.exports = router;
