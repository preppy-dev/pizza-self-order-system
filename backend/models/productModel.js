const mongoose = require("mongoose");

const prodctSchema = new mongoose.Schema({
  sabor: { type: String, required: true },
  image: { type: String, required: true },
  ref: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  ingredients: { type: String, required: true },
});

const productModel = mongoose.model("Product", prodctSchema);

module.exports = productModel;
