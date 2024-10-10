const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require("./Routes/User/user.js")
const menumeal = require("./Routes/Eatup_Data/data.js")
const Cart = require("./Routes/Cart/cart.js")
const Order = require("./Routes/Order/order.js")

// Load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.URI; 

// Middleware
app.use(express.json());

// Only allow requests from your emulator or localhost
app.use(cors({
  origin: ['http://10.0.2.2:5000', 'http://localhost:5000'], 
}));

// MongoDB connection using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Successfully connected to MongoDB using Mongoose!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
app.use("/users", userRoutes);
app.use("/menu", menumeal);
app.use("/order", Order);
app.use("/cart", Cart);

app.get('/', (req, res) => {
  res.send('Hello, Eatup!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
