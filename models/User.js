const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  address: {
    type: String,
    required: [true, "Please enter your address"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter phone number"],
    minlength: 9,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    validate: [isEmail, "Please enter valid email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  } else {
    throw Error("incorrect email");
  }
};

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
