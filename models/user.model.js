 const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile:{
      type:Number,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    return next();
  });
});

userSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, same) {
      if (err) return reject(err);

      return resolve(same);
    });
  });
};



module.exports = mongoose.model("User", userSchema);
