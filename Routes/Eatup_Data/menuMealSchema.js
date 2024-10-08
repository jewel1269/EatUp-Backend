
const mongoose = require('mongoose');

const menuMealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    totalOrder: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }
});

const MenuMeal = mongoose.model('MenuMeal', menuMealSchema);

module.exports = MenuMeal;
