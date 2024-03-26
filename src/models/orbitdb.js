class OrbitDB {
  constructor(orbitdb) {
    // You may either pass couchbase and config as params, or import directly into the controller
    this.orbitdb = orbitdb;
  }

  getOrbitDB() {
    return this.orbitdb;
  }
  setOrbitDB(newOrbitDB) {
    this.orbitdb = newOrbitDB;
  }
}

export default new OrbitDB();
