const router = require('express').Router();
const passport = require('../../config/passport');
const { successRedirect } = require('../../config');
const { isAuth } = require('../../middleware/auth-middleware');
const { global } = require('@/utils');
const controllers = require('./controllers');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  global.use(passport.authenticate('google')),
  global.use(async (req, res, next) => {
    return res.redirect(successRedirect);
  })
);

router.get('/account', isAuth, global.use(controllers.account));

router.post('/register', global.use(controllers.register));

router.post(
  '/login',
  passport.authenticate('local'),
  global.use(controllers.login)
);

router.post('/logout', global.use(controllers.logout));

module.exports = router;
