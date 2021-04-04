const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

MAX_LOGIN_ATTEMPTS = 2,
LOCK_TIME = 2 * 60 * 60 * 1000;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: String,
  joined: { type: Date, default: Date.now() },

  loginAttempts: { type: Number, required: true, default: 3 },
    lockUntil: { type: Number },
  /*
  bookIssueInfo: [
    {
      book_info: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Issue",
        },
      },
    },
  ],*/
  gender: String,
  address: String,
  image: {
    type: String,
    default: "",
  },
  violationFlag: { type: Boolean, default: false },
  fines: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
