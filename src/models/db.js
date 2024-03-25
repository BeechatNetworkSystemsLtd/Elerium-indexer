class DB {
  constructor(db) {
    // You may either pass couchbase and config as params, or import directly into the controller
    this.db = db;
  }

  getDb() {
    return this.db;
  }
  setDb(newDb) {
    this.db = newDb;
  }
}

export default new DB();
