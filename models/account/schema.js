const accountModel = (mongoose, utils, logger) => {

  const Schema = mongoose.Schema;

  var accountSchema = new Schema({
    account_name: {
      type: String
    },
    account_type: {
      type: String
    }
  }, {
    timestamps: true
  });


  return mongoose.model("Account", accountSchema);

}

module.exports = accountModel