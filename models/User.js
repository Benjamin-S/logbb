const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const Family = mongoose.model("Family");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    name: String,
    surname: String,
    family: { type: mongoose.Schema.Types.ObjectId, ref: "Family" },
    hash: String,
    salt: String,
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      family: this.family,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

// Requires population of family
UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    name: this.name,
    surname: this.surname,
    family: this.family,
  };
};

UserSchema.methods.toProfileJSONFor = function (user) {
  return {
    username: this.username,
    name: this.name,
    surname: this.surname,
  };
};

UserSchema.pre("save", async function (next) {
  console.log("Family Passed in: " + this.family);
  if (this.family === undefined || this.family === null) {
    var fam_id = await new Family({ name: `${this.username}'s Family` })
      .save()
      .then((document) => {
        return document._id;
      })
      .catch(next);
    this.set({ family: fam_id });
  }
  next();
});

mongoose.model("User", UserSchema);
