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
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

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

// Create a Cattle schema
const cattleSchema = new mongoose.Schema({
  name: String,
  age: String,
  breed: String,
  gender: String,
  isPregnant: Boolean,
});

// Create a Cattle model
const Cattle = mongoose.model('Cattle', cattleSchema);

// Routes
app.get('/cattles', async (req, res) => {
  try {
    const cattleList = await Cattle.find();
    res.json(cattleList);
  } catch (error) {
    console.error('Error fetching cattle data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/cattle', async (req, res) => {
  const newCattleData = req.body;
  try {
    // Validate the required fields
    if (!newCattleData.name || !newCattleData.age || !newCattleData.breed || !newCattleData.gender) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const newCattle = await Cattle.create(newCattleData);
    res.status(201).json(newCattle);
  } catch (error) {
    console.error('Error registering new cattle:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a milk schema
const milkSchema = new mongoose.Schema({
  timeOfDay: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Milk = mongoose.model('Milk', milkSchema);

// Milk production
app.post('/recordMilkProduction', async (req, res) => {
  const { timeOfDay, amount, date } = req.body;

  // Validate the required fields
  if (!timeOfDay) {
    return res.status(400).json({ error: 'Please select a time of day' });
  }

  if (!amount) {
    return res.status(400).json({ error: 'Please enter the amount' });
  }

  try {
    // Create a new Milk object
    const milkProduction = new Milk({
      timeOfDay,
      amount,
      date,
    });

    // Save the milk production record to the database
    await milkProduction.save();

    res.status(200).json({ message: 'Milk production recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to record milk production' });
  }
});

app.post('/recordMilkUsage', async (req, res) => {
  const { usage, quantity } = req.body;

  try {
    // Calculate the total milk produced per time
    const totalMilkProduced = await Milk.aggregate([
      {
        $group: {
          _id: '$timeOfDay',
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const milkProductionPerTime = {};
    totalMilkProduced.forEach((milk) => {
      milkProductionPerTime[milk._id] = milk.totalAmount;
    });

    // Validate the required fields
    if (!usage || !quantity) {
      return res.status(400).json({ error: 'Usage and quantity are required fields' });
    }

    const timeOfDay = Object.keys(milkProductionPerTime)[0]; // Assuming there is only one time of day recorded

    const milkUsage = new Milk({
      timeOfDay,
      amount: milkProductionPerTime[timeOfDay],
      date: new Date(),
      usage,
      quantity,
    });

    if (milkUsage.quantity > milkUsage.amount) {
      return res.status(400).json({ error: 'Milk usage cannot exceed milk production' });
    }

    await milkUsage.save();
    res.json({ message: 'Milk usage recorded successfully.' });
  } catch (error) {
    console.error('Failed to record milk usage:', error);
    res.status(500).json({ error: 'Failed to record milk usage.' });
  }
});


app.get('/generateMilkStatements', (req, res) => {
  res.json({ message: 'Milk statements generated successfully.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
