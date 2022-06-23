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

    if (!user.password && user.googleID) {
      return done({ code: 401, message: 'Sign in with Google' }, false);
    }

    // Check if password is correct
    return authUtils
      .comparePasswords(password, user.password)
      .then((value) => {
        // If the password does not match
        if (!value) {
          return done(null, false, { message: 'Incorrect email or password' });
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

const googleCallback = async (
  request,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const { id, displayName, emails } = profile;
  const email = emails[0].value;

  // Get user
  const user = await userService.getItem({ email });
  // User exists proceed
  if (user) return done(null, user);

  // User does not exists
  // Create the user
  const newUser = await userService.create({
    googleID: id,
    username: displayName,
    email,
  });

  return done(null, newUser);
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
