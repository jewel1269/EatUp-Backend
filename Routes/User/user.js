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
    console.log(email);
  
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


 // Update or create user
router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, address, password } = req.body;
  console.log(name, phoneNumber, address, password);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, 
      { name, phoneNumber, address, password },
      { new: true, runValidators: true, upsert: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
