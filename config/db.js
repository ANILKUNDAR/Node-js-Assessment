const mongoose = require("mongoose");
const config = require("./config");

module.exports = function () {
  const db = config.db;
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch(e => console.log(`Not Connected to ${db}`));
  var dbconnect = mongoose.connection;
};