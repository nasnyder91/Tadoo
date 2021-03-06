const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');



// Load User Model
require('../models/User');
const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Login Form Post
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/todos',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req,res,next);
});

// Register Form Post
router.post('/register', (req, res) => {
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text: 'Passwords do not match!'});
  }

  if(req.body.password.length < 5){
    errors.push({text: 'Password must be at least 5 characters'});
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else{
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email Already Registered.  Please log in.');
          res.redirect('/users/login');
        } else{
          const newUser = new User({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'User now registered and can login!');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          })
        }
      });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You have logged out successfully');
  res.redirect('/');
});

module.exports = router;
