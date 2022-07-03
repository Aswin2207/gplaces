const { MongoClient } = require("mongodb");
require('dotenv').config();
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function () {
    client.connect(function (err, db) {
      if (err || !db) {
        console.log("Error connecting to MongoDB.");
      }

      dbConnection = db.db("MOS_DATA");
      console.log("Successfully connected to MongoDB.");

    });
  },

  getDb: function () {
    return dbConnection;
  },
};