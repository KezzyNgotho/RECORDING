const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000; // Use any port number you prefer

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://keziengotho18:kezie5585@cluster0.peasyvh.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000, // Set a shorter timeout for server selection
    socketTimeoutMS: 45000, // Set a longer socket timeout
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Rest of the code remains the same...

// Rest of the code remains the same...


// Body parsing middleware
app.use(express.json());

// Schema for the user
const userSchema = new mongoose.Schema({
  farmName: String,
  farmOwner: String,
  email: { type: String, index: true }, // Add index: true to the email field
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

    const userCount = await User.countDocuments({ email });
    if (userCount > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      farmName,
      farmOwner,
      email,
      password,
      phoneNumber,
      address,
    });

    // Save the user to the database
    await newUser.save();

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

    const userCount = await User.countDocuments({ email });
    if (userCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the user
    const user = await User.findOne({ email });

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    console.error('Failed to log in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
