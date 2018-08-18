const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log("=> connect to existing database");
    return Promise.resolve();
  }
  console.log("=> connect to new database");
  return mongoose.connect(process.env.DB).then(db => {
    isConnected = db.connections[0].readyState;
  });
};