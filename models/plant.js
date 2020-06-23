const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlantSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 120 },
  description: { type: String, required: true },
  catagory: { type: Schema.Types.ObjectId, ref: "Catagory", required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String },
});

PlantSchema.virtual("url").get(function () {
  return "/plant/" + this._id;
});

module.exports = mongoose.model("Plant", PlantSchema);
