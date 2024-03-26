class Ipfs {
  constructor(ipfs) {
    // You may either pass couchbase and config as params, or import directly into the controller
    this.ipfs = ipfs;
  }

  getIpfs() {
    return this.ipfs;
  }
  setIpfs(newIpfs) {
    this.ipfs = newIpfs;
  }
}

export default new Ipfs();
