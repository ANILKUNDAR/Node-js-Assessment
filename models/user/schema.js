const userModel = (mongoose, utils, logger) => {

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  var UserSchema = new Schema({
    firstName: {
      type: String
    },
    doB: {
      type: Date
    },
    address: {
      type: String
    },
    gender: {
      type: String
    },
    age: {
      type: String
    },
    phoneNumber: {
      type: String,
    },
    state: {
      type: String
    },
    zip: {
      type: String,

    },
    email: {
      type: String
    },
    userType: {
      type: String
    }
  }, {
    timestamps: true
  });
  UserSchema.index({
    phone: 1
  });

  return mongoose.model("User", UserSchema);

}

module.exports = userModel