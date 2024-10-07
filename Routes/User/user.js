const express = require('express');
const User = require('./userSchema.js');
const router = express.Router();


// Create a new user
router.post('/', async (req, res) => {
  const {name, email, password} = req.body;
  console.log(name, email, password);


  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists!' });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully!', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

//user get with email
router.get('/users', async (req, res) => {
    const email = req.query.email;
  
    // Log the email to ensure you're receiving it
    console.log("Email query:", email);
  
    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    // Search for the user in your database
    const user = await User.findOne({ email });
  
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  });

// Delete a user by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});


module.exports = router;
