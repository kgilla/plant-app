const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlantSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 120 },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String },
});

PlantSchema.virtual("url").get(function () {
  return "/plants/" + this._id;
});

module.exports = mongoose.model("Plant", PlantSchema);
