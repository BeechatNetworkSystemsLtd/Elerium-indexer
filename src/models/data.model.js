import { createLibp2p } from 'libp2p';
import { createHelia } from 'helia';
import { createOrbitDB, IPFSAccessController } from '@orbitdb/core';
import { LevelBlockstore } from 'blockstore-level';
import { Libp2pOptions } from '../config/libp2p.js';
import DB from './db.js';
import Ipfs from './ipfs.js';
import OrbitDB from './orbitdb.js';
import config from '../config/config.js';

const createIpfs = async () => {
  // Create an IPFS instance.
  const blockstore = new LevelBlockstore('./_ipfs');
  const libp2p = await createLibp2p(Libp2pOptions);

  libp2p.getMultiaddrs().forEach((ma) => console.log(ma.toString()));

  return createHelia({ libp2p, blockstore });
};

const init = async () => {
  const ipfs = await createIpfs();
  const orbitdb = await createOrbitDB({ ipfs, directory: `./_orbitdb` });

  let db;

  if (config.OrbitDB.isNew)
    db = await orbitdb.open('my-db', {
      type: 'keyvalue',
      AccessController: IPFSAccessController({ write: ['*'] }),
      replicate: true,
    });
  else db = await orbitdb.open(config.OrbitDB.url);

  await DB.setDb(db);
  await Ipfs.setIpfs(ipfs);
  await OrbitDB.setOrbitDB(orbitdb);

  return db.address;
};

export default {
  init,
};
