require('dotenv').config();

const { env } = process;

const ONE_HOUR = 1000 * 60 * 60;

module.exports = {
  port: env.PORT,
  ONE_HOUR,
  successRedirect: env.SUCCESS_REDIRECT,

  google: {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSECRET: env.GOOGLE_CLIENT_SECRET,
    callback: env.GOOGLE_CALLBACK,
  },

  db: {
    url: env.DB_URL,
    name: env.DB_NAME,
  },

  session: {
    name: env.SESSION_NAME,
    secret: env.SESSION_SECRET,
    idleTimeout: ONE_HOUR,
    ttl: 24 * ONE_HOUR,
  },
};
