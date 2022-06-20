require('dotenv').config();

const { env } = process;

const ONE_HOUR = 1000 * 60 * 60;

module.exports = {
  port: env.PORT,

  ONE_HOUR,

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
