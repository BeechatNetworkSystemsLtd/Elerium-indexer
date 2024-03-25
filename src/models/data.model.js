import { createLibp2p } from 'libp2p';
import { createHelia } from 'helia';
import { createOrbitDB, IPFSAccessController } from '@orbitdb/core';
import { LevelBlockstore } from 'blockstore-level';
import { Libp2pOptions } from '../config/libp2p.js';
import DB from './db.js';
import config from '../config/config.js';

const create = async () => {
  // Create an IPFS instance.
  const blockstore = new LevelBlockstore('./ipfs');
  const libp2p = await createLibp2p(Libp2pOptions);
  const ipfs = await createHelia({ libp2p, blockstore });

  const orbitdb = await createOrbitDB({ ipfs });

  const db = await orbitdb.open(config.OrbitDB.url);
  // const db = await orbitdb.open('my-db', { type: 'keyvalue', AccessController: IPFSAccessController({ write: ['*'] }) });

  console.log('=======db', db.address);

  await DB.setDb(db);

  return db.address;
};

export default {
  create,
};
