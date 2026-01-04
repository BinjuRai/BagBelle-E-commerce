const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
    author: { type: String, required: true },
    imagepath: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
