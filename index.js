const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
require('./src/config/passport');

module.exports = (sessionOptions) => {
  const app = express();

  app.use(session(sessionOptions));

  app.use(helmet());
  app.use(
    cors({
      origin: true,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/gist/api/v1', require('./src/routes'));

  app.use((req, res, next) => {
    return next({ code: 404, message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    console.log(err.message);
    const { code, message } = err;

    return res.status(code).send(message);
  });

  return app;
};
