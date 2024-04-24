import { tcp } from '@libp2p/tcp';
import { identify } from '@libp2p/identify';
import { gossipsub } from '@chainsafe/libp2p-gossipsub';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { mdns } from '@libp2p/mdns';
import { bootstrap } from '@libp2p/bootstrap';
import config from '../config/config.js';

const bootstrapMultiaddrs = config.OrbitDB.bootstrap_list.split(',');

export const Libp2pOptions = {
  peerDiscovery: [
    bootstrap({
      list: bootstrapMultiaddrs,
      timeout: 1000, // in ms,
      tagName: 'bootstrap',
      tagValue: 50,
      tagTTL: 120000, // in ms
    }),
  ],
  addresses: {
    listen: ['/ip4/0.0.0.0/tcp/0'],
  },
  transports: [tcp()],
  connectionEncryption: [noise()],
  streamMuxers: [yamux()],
  services: {
    identify: identify(),
    pubsub: gossipsub({ allowPublishToZeroPeers: true, emitSelf: true }),
  },
};
