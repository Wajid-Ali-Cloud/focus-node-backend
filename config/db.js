const mongoose = require("mongoose");
const uri = require("./keys");

const options = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // // useCreateIndex: true,
  // useFindAndModify: false,
  // autoIndex: false, // Don't build indexes
  // // poolSize: 10, // Maintain up to 10 socket connections
  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4, // Use IPv4, skip trying IPv6
};

// Connect and handle initial connection errors
const DB = () => {
  mongoose.connect(uri, options).then(
    () => {
      console.log("connected to mongodb");
    },
    (err) => {
      console.log("mongodb initial connection error", err);
    }
  );
};

// To handle errors after initial connection was established
mongoose.connection.on("error", (err) => {
  console.log("mongodb runtime error", err);
});

module.exports = DB;
