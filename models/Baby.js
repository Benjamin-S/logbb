const mongoose = require("mongoose");
const formatDistanceToNowStrict = require("date-fns/formatDistanceToNowStrict");

const BabySchema = new mongoose.Schema(
  {
    name: String,
    gender: String,
    birthDate: Date,
    dueDate: Date,
    family: { type: mongoose.Types.ObjectId, ref: "Family" },
  },
  { timestamps: true }
);

BabySchema.virtual("age").get(function () {
  return formatDistanceToNowStrict(this.birthDate);
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
