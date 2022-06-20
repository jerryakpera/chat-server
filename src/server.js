const getApp = require('..');
const getDB = require('./config/db');
const getSessionOptions = require('./middleware/session');
const { port, db } = require('./config');

const { url, name } = db;

const dbObj = getDB();
const dbConn = dbObj.connect(`${url}${name}`);

const sessionOptions = getSessionOptions(dbConn, name);
const app = getApp(sessionOptions);

app.listen(port, () => {
  console.log(`Auth API is on port ${port}`);
});
