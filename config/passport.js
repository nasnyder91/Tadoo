const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('users');

module.exports = function(passport){
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({
      email: email
    })
      .then(user => {
        if(!user){
          console.log('No user found');
          return done(null, false);
        }

        bcrypt.compare(password, user.password, (err, match) => {
          if(err) throw err;

          if(match){
            console.log('Logged In!');
            return done(null, user);
          } else{
            console.log('Incorrect Password');
            return done(null, false);
          }
        });
      });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
