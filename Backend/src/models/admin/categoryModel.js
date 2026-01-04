const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imagepath: { type: String } // Changed from 'filepath'
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
