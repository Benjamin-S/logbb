const mongoose = require("mongoose");

const FamilySchema = new mongoose.Schema(
  {
    name: String,
    babies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Baby" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

mongoose.model("Family", FamilySchema);
