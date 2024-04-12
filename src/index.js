import app from './app.js';
import config from './config/config.js';
import logger from './config/logger.js';
import { dataModel } from './models/index.js';
import DB from './models/db.js';
import OrbitDB from './models/orbitdb.js';
import Ipfs from './models/ipfs.js';

await dataModel
  .init()
  .then((db) => {
    console.log('db', db);
  })
  .catch((err) => logger.error(err));

let db = DB.getDb();
let orbitdb = OrbitDB.getOrbitDB();
let ipfs = Ipfs.getIpfs();

// Listen for the connection of ipfs1 to ipfs2.
db.events.on('join', async (peerId, heads) => {
  console.log('peerId', peerId);
});

// Listen for any updates to db2.
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
