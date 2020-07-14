const mongoose = require("mongoose");

const FamilySchema = new mongoose.Schema(
  {
    name: String,
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

mongoose.model("Family", FamilySchema);
