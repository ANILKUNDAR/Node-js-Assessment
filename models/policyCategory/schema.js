const policyCategoryModel = (mongoose, utils, logger) => {

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  var policyCategorySchema = new Schema({
    category_name: {
      type: String
    }
  }, {
    timestamps: true
  });

  return mongoose.model("policycategory", policyCategorySchema);

}

module.exports = policyCategoryModel