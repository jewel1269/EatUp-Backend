
const mongoose = require('mongoose');

const HomePageDataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    totalOrder: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }
});

const HomePageData = mongoose.model('HomePageData', HomePageDataSchema);

module.exports = HomePageData;
