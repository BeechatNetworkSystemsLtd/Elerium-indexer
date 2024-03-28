import app from './app.js';
import config from './config/config.js';
import logger from './config/logger.js';
import { dataModel } from './models/index.js';
import DB from './models/db.js';
import OrbitDB from './models/orbitdb.js';
import Ipfs from './models/ipfs.js';

await dataModel
  .create()
  .then((db) => console.log('db', db))
  .catch((err) => console.log('err', err));

let db = DB.getDb();
let orbitdb = OrbitDB.getOrbitDB();
let ipfs = Ipfs.getIpfs();

// Listen for the connection of ipfs1 to ipfs2.
// If we want to listen for connections from ipfs2 to ipfs1, add a "join"
// listener to db1.
db.events.on('join', async (peerId, heads) => {
  // The peerId of the ipfs1 node.
  console.log(peerId);
});

// Listen for any updates to db2.
// If we want to listen for new data on db2, add an "update" listener to db1.
db.events.on('update', async (entry) => {
  console.log('update =', entry.payload);
});

let server;

server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received');

  await db.close();
  await orbitdb.stop();
  await ipfs.stop();

  if (server) {
    server.close();
  }
  process.exit(0);
});
