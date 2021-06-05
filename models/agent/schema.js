const agentModel = (mongoose, utils, logger) => {

  const Schema = mongoose.Schema;

  var agentSchema = new Schema({
    agent_name: {
      type: String
    }
  }, {
    timestamps: true
  });


  return mongoose.model("Agent", agentSchema);

}

module.exports = agentModel