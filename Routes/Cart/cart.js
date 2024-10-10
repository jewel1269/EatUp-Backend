const express = require("express");
const Cart = require("./cartSchema.js");
const router = express.Router();

// Fetch all meals (GET request)
router.get("/meals", async (req, reply) => {
    try {
      const meals = await Cart.find(); 
      console.log(meals);
      reply.send(meals); 
    } catch (error) {
      console.log(error);
      reply.status(500).json({ message: "Server error while fetching meals" });
    }
  });
  
router.post("/add", async (req, reply) => {
    const {
      id,
      title,
      description,
      price,
      rating,
      totalOrder,
      category,
      image,
      quantity,
    } = req.body;
  
    const mealQuantity = quantity || 1;
  
    try {
      const existingMeal = await Cart.findOne({ id });
      console.log(existingMeal, "match");
  
      if (existingMeal) {
        existingMeal.quantity += mealQuantity;
        await existingMeal.save(); 
        reply
          .status(200)
          .json({ message: "Meal quantity updated successfully", existingMeal });
      } else {
        // Create a new meal if it doesn't exist
        const newMeal = new Cart({
          id,
          title,
          description,
          price,
          rating,
          totalOrder,
          category,
          image,
          quantity: mealQuantity,
        });
        await newMeal.save(); 
        reply.status(201).json({ message: "Meal added successfully", newMeal });
      }
    } catch (error) {
      console.log(error);
      reply.status(500).json({ message: "Server error while adding meal" });
    }
  });

  //Item delete With id

  router.delete("/meals/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
  
    try {
      const menuItem = await Cart.findById(id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
  
      // If quantity is greater than 1, decrease the quantity
      if (menuItem.quantity > 1) {
        menuItem.quantity -= 1; 
        await menuItem.save(); 
        return res.json({ message: "Quantity decreased successfully", item: menuItem });
      } else {
        
        await Cart.deleteOne({ _id: id });
        return res.json({ message: "Menu item deleted successfully" });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  

module.exports = router;
