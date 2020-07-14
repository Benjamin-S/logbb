const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema(
  {
    name: String,
    birthDate: Date,
    dueDate: Date,
  },
  { timestamps: true }
);

ChildSchema.virtual("age").get(function () {
  var now = Date.now();
});

mongoose.model("Child", ChildSchema);
