
const mongoose = require('mongoose');

const PupolarDataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    totalOrder: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }
});

const PupolarData = mongoose.model('PupolarData', PupolarDataSchema);

module.exports = PupolarData;
