import { createLibp2p } from 'libp2p';
import { createHelia } from 'helia';
import { createOrbitDB, IPFSAccessController } from '@orbitdb/core';
import { LevelBlockstore } from 'blockstore-level';
import { Libp2pOptions } from '../config/libp2p.js';

const init = async (db_name) => {
  const blockstore = new LevelBlockstore('./ipfs');
  const libp2p = await createLibp2p(Libp2pOptions);
  const ipfs = await createHelia({ libp2p, blockstore });

  // create a random directory to avoid OrbitDB conflicts.
  let randDir = (Math.random() + 1).toString(36).substring(2);

  const orbitdb = await createOrbitDB({ ipfs, directory: `./${randDir}/orbitdb` });

  let db = await orbitdb.open(db_name);

  return db;
};

const create = async () => {
  // Create an IPFS instance.
  const blockstore = new LevelBlockstore('./ipfs');
  const libp2p = await createLibp2p(Libp2pOptions);
  const ipfs = await createHelia({ libp2p, blockstore });

  const orbitdb = await createOrbitDB({ ipfs });

  const db = await orbitdb.open('my-db');

  console.log('my-db address', db.address);

  // Add some records to the db.
  await db.add('hello world 1');
  //   await db.add('hello world 2');

  // Print out the above records.
  console.log(await db.all());
};

export default { init, create };
