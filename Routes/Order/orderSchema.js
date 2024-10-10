const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "bkash"],
      required: true,
    },
    bkashNumber: {
      type: String,
      required: function () {
        return this.paymentMethod === "bkash";
      },
    },
    bkashPin: {
      type: String,
      required: function () {
        return this.paymentMethod === "bkash";
      },
    },
    orderItems: [orderItemSchema], 
    totalPrice: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
