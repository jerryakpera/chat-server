const MongoStore = require('connect-mongo');
const { session, ONE_HOUR } = require('../config');

module.exports = (clientP, dbName) => {
  return {
    secret: session.secret,
    name: session.name,
    store: MongoStore.create({
      clientPromise: clientP,
      dbName,
      stringify: false,
      autoRemove: 'interval',
      autoRemoveInterval: 1,
    }),
    cookie: {
      maxAge: +ONE_HOUR * 4,
      secure: false,
      sameSite: true,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  };
};
