const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../services')('User');
const { authUtils } = require('../lib');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallback = (email, password, done) => {
  userService.getItem({ email }).then((user) => {
    // Check if a user was found
    if (!user) return done(null, false);

    // Check if password is correct
    return authUtils
      .comparePasswords(password, user.password)
      .then((value) => {
        // If the password does not match
        if (!value) {
          return done(null, false, { message: 'Password does not match' });
        }

        // If the password is correct
        return done(null, user);
      })
      .catch((err) => done(err, false));
  });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  userService
    .getUserWithoutPassword({ _id })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

module.exports = passport;
