const collectionTwoModel = (mongoose, utils, logger) => {

  const Schema = mongoose.Schema;

  var collectionTwoSchema = new Schema({
    message: {
      type: String
    },
    scheduledAt: {
      type: Date
    }
  }, {
    timestamps: true
  });


  return mongoose.model("collectionTwo", collectionTwoSchema);

}

module.exports = collectionTwoModel