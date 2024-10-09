const express = require("express");
const MenuMeal = require("./menuMealSchema.js");
const BurgerList = require("./homePageData.js");
const Popular = require("./popularSchema.js");
const router = express.Router();

// Get all data for menuMeal
router.get("/menumeal", async (req, reply) => {
  try {
    const meals = await MenuMeal.find();
    reply.status(200).json(meals);
  } catch (error) {
    console.log(error);
    reply.status(500).json({ message: "Server error while fetching meals" });
  }
});

// Get all data for HomePageData
router.get("/burgerList", async (req, reply) => {
  try {
    const burgerList = await BurgerList.find();
    reply.status(200).json(burgerList);
  } catch (error) {
    console.log(error);
    reply.status(500).json({ message: "Server error while fetching meals" });
  }
});

// Get all data for Popular Data
router.get("/popular", async (req, reply) => {
  try {
    const popular = await Popular.find();
    reply.status(200).json(popular);
  } catch (error) {
    console.log(error);
    reply.status(500).json({ message: "Server error while fetching meals" });
  }
});

// Get menu item by ID for Popular Data
router.get("/popular/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const menuItem = await Popular.findById(id);  
    console.log(menuItem, "mtch");
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(menuItem); 
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
