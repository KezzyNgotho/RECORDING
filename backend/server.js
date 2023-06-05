const express = require('express');
const mongoose = require('mongoose');
              
const app = express();
const PORT = 4000; // Use any port number you prefer

// Connect to MongoDB
mongoose.connect('mongodb://192.168.0.103:27017/KEEP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Body parsing middleware
app.use(express.json());

/* // Use user routes
app.use('/api', userRoutes); */

// Schema for the user
const userSchema = new mongoose.Schema({
  farmName: String,
  farmOwner: String,
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
});

// Model for the user
const User = mongoose.model('User', userSchema);

// Handle user sign-up
app.post('/signup', async (req, res) => {
  try {
    const { farmName, farmOwner, email, password, phoneNumber, address } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Create a new user instance
    const user = new User({
      farmName,
      farmOwner,
      email,
      password,
      phoneNumber,
      address,
    });

    // Save the user to the database
    await user.save();

    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Failed to sign up:', error);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

// Handle user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error('Failed to log in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
