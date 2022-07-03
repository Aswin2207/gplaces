const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI || "mongodb+srv://vendor_2022:TR5Nv9Zcbchqms39@vendor.ewijid3.mongodb.net/?retryWrites=true&w=majority";
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