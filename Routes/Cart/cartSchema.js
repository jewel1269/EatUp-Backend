const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  totalOrder: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 } ,
  id: { type: String} 
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
