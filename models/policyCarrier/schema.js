const policyCarrierModel = (mongoose, utils, logger) => {

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  var policyCarrierSchema = new Schema({
    company_name: {
      type: String
    }
  }, {
    timestamps: true
  });

  return mongoose.model("policycarrier", policyCarrierSchema);

}

module.exports = policyCarrierModel