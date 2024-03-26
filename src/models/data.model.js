import { createLibp2p } from 'libp2p';
import { createHelia } from 'helia';
import { createOrbitDB, IPFSAccessController } from '@orbitdb/core';
import { LevelBlockstore } from 'blockstore-level';
import { Libp2pOptions } from '../config/libp2p.js';
import DB from './db.js';
import Ipfs from './ipfs.js';
import OrbitDB from './orbitdb.js';
import config from '../config/config.js';
import logger from '../config/logger.js';

const create = async () => {
  // Create an IPFS instance.
  const blockstore = new LevelBlockstore('./_ipfs');
  const libp2p = await createLibp2p(Libp2pOptions);
  const ipfs = await createHelia({ libp2p, blockstore });

  const orbitdb = await createOrbitDB({ ipfs, directory: `./_orbitdb` });

  const db = await orbitdb.open(config.OrbitDB.url);
  // const db = await orbitdb.open('my-db', { type: 'keyvalue', AccessController: IPFSAccessController({ write: ['*'] }) });

  logger.info(`OrbitDB : ${db.address}`);

  await DB.setDb(db);
  await Ipfs.setIpfs(ipfs);
  await OrbitDB.setOrbitDB(orbitdb);

  return db.address;
};

export default {
  create,
};
