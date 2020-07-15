const mongoose = require("mongoose");
const formatDistanceToNowStrict = require("date-fns/formatDistanceToNowStrict");

const BabySchema = new mongoose.Schema(
  {
    name: String,
    gender: String,
    birthDate: Date,
    dueDate: Date,
  },
  { timestamps: true }
);

BabySchema.virtual("age").get(function () {
  return formatDistanceToNowStrict(this.birthdate);
});

BabySchema.methods.toAuthJSON = function () {
  return {
    name: this.name,
    gender: this.gender,
    birthDate: this.birthDate,
    dueDate: this.dueDate,
    age: this.age,
  };
};

mongoose.model("Baby", BabySchema);
