require('module-alias/register');

const { createServer } = require('http');
const { Server } = require('socket.io');
const getApp = require('..');
const getDB = require('./config/db');
const getSessionOptions = require('./middleware/session');
const { port, db } = require('./config');

const { url, name } = db;

const dbObj = getDB();
const dbConn = dbObj.connect(`${url}${name}`);

const sessionOptions = getSessionOptions(dbConn, name);
const app = getApp(sessionOptions);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:9000',
    methods: ['GET', 'POST'],
  },
});

httpServer.listen(port, () => {
  console.log(`Gist Server API is on port ${port}`);
});

io.on('connection', (socket) => {
  const { id } = socket;

  // console.log(`${id} connected`);

  socket.on('disconnect', () => {
    // console.log(`${id} disconnected`);
  });
});
