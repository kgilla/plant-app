const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CatagorySchema = new Schema({
  name: { type: String, required: true, min: 3, max: 120 },
  description: { type: String, max: 300 },
});

CatagorySchema.virtual("url").get(function () {
  return "/catagory/" + this._id;
});

module.exports = mongoose.model("Catagory", CatagorySchema);
