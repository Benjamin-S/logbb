const mongoose = require("mongoose");

const FamilySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

mongoose.model("Family", FamilySchema);
