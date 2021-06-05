const collectionOneModel = (mongoose, utils, logger) => {

  const Schema = mongoose.Schema;

  var collectionOneSchema = new Schema({
    message: {
      type: String
    },
    scheduledAt: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }, {
    timestamps: true
  });


  return mongoose.model("collectionOne", collectionOneSchema);

}

module.exports = collectionOneModel