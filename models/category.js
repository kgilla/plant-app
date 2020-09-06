const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, min: 3, max: 120 },
  description: { type: String, max: 300 },
  image: { type: String },
});

CategorySchema.virtual("url").get(function () {
  return "/category/" + this._id;
});

module.exports = mongoose.model("Category", CategorySchema);
