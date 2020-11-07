const MongoClient = require('mongodb').MongoClient;

class Connection {
  static async connectToMongo () {
    if (this.db) return this.db;
    try {
      const client = await MongoClient.connect(this.url);
      this.db = client.db(process.env.DBNAME);
    } catch (error) {
      console.error(error);
      this.db = null;
    }
    return this.db;
  }
}

Connection.db = null;
Connection.url = 'mongodb://localhost:27017/';

module.exports = Connection;

// address (building, coord, street, zipcode), borough, cuisine, grades (object(date, grade, score)), name, restaurant_id
