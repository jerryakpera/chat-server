const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const getApp = require('..');
const getDB = require('./config/db');
const getSessionOptions = require('./middleware/session');
const { port, db } = require('./config');

const { url, name } = db;

const dbObj = getDB();
const dbConn = dbObj.connect(`${url}${name}`);

const sessionOptions = getSessionOptions(dbConn, name);
const app = getApp(sessionOptions);

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

server.listen(port, () => {
  console.log(`Auth API is on port ${port}`);
});
