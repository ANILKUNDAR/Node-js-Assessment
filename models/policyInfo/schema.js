const policyInfoModel = (mongoose, utils, logger) => {

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  var policyInfoSchema = new Schema({
    policy_number: {
      type: String
    },
    category_name: {
      type: String
    },
    user_id: {
      type: ObjectId,
      ref: "User"
    },
    Policycarrier_id: {
      type: ObjectId,
      ref: "policycarrier"
    },
    Policycategory_id: {
      type: ObjectId,
      ref: "policycategory"
    },
    agent_id: {
      type: ObjectId,
      ref: "Agent"
    },
    account_id: {
      type: ObjectId,
      ref: "Account"
    },
    start_date: {
      type: Date
    },
    end_date: {
      type: Date
    },
    premium_amount: {
      type: String
    }

  }, {
    timestamps: true
  });
  policyInfoSchema.index({
    user_id: 1,
    policy_number: 1
  })
  return mongoose.model("policyInfo", policyInfoSchema);

}

module.exports = policyInfoModel