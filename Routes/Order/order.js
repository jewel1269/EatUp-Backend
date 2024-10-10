const express = require("express");
const router = express.Router();
const Order = require("./orderSchema.js");

// POST: Create a new order
router.post("/", async (req, res) => {
  try {
    const {
      address,
      contactNumber,
      paymentMethod,
      bkashNumber,
      bkashPin,
      orderItems,
      userEmail,
     status
    } = req.body;

    console.log(
      address,
      contactNumber,
      paymentMethod,
      bkashNumber,
      bkashPin,
      orderItems,userEmail
    );

    // Validate required fields
    if (
      !address ||
      !userEmail ||
      !contactNumber ||
      !paymentMethod ||
      !orderItems ||
      orderItems.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate Bkash details if Bkash payment method is selected
    if (paymentMethod === "bkash" && (!bkashNumber || !bkashPin)) {
      return res
        .status(400)
        .json({
          message: "Bkash number and PIN are required for Bkash payments.",
        });
    }

    // Calculate total price from the order items
    const totalPrice = orderItems.price;

    // Create a new order instance
    const newOrder = new Order({
      address,
      contactNumber,
      paymentMethod,
      // Save Bkash number and pin only if Bkash is the payment method
      bkashNumber: paymentMethod === "bkash" ? bkashNumber : '',
      bkashPin: paymentMethod === "bkash" ? bkashPin : '',
      orderItems,
      totalPrice,
      userEmail,
      status
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Success response
    res.status(201).json({
      message: "Order placed successfully.",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    // Server error response
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
