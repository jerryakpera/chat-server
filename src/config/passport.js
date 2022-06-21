const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userService = require('../services')('User');
const { authUtils } = require('../lib');
const { google } = require('.');

// Change this obj to macth your login/signup credentials
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
const googleStrategyConfig = {
  clientID: google.clientID,
  clientSecret: google.clientSECRET,
  callbackURL: google.callback,
  passReqToCallback: true,
};

const googleCallback = (request, accessToken, refreshToken, profile, done) => {
  const { id, displayName, emails } = profile;
  const email = emails[0].value;

  // Get user
  userService.getItem({ email }).then((user) => {
    if (!user) {
      // If no user was found create that user
      userService
        .create({
          googleID: id,
          username: displayName,
          email,
        })
        .then((result) => {
          return done(null, result);
        })
        .catch((err) => done(err, false));
    }

    return done(null, user);
  });
};

const googleStrategy = new GoogleStrategy(googleStrategyConfig, googleCallback);

passport.use(googleStrategy);
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
