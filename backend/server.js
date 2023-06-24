const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Schema } = mongoose;
const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://keziengotho18:kezie5585@cluster0.peasyvh.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

app.use(express.json());

const userSchema = new mongoose.Schema({
  farmName: String,
  farmOwner: String,
  email: { type: String, index: true },
  password: String,
  phoneNumber: String,
  address: String,
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  try {
    const { farmName, farmOwner, email, password, phoneNumber, address } = req.body;

    const userCount = await User.countDocuments({ email });
    if (userCount > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const newUser = new User({
      farmName,
      farmOwner,
      email,
      password,
      phoneNumber,
      address,
    });

    await newUser.save();

    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Failed to sign up:', error);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userCount = await User.countDocuments({ email });
    if (userCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = await User.findOne({ email });

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    console.error('Failed to log in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

const cattleSchema = new mongoose.Schema({
  name: String,
  age: String,
  breed: String,
  gender: String,
  isPregnant: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
});

const Cattle = mongoose.model('Cattle', cattleSchema);

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

const milkSchema = new mongoose.Schema({
  timeOfDay: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
});

const Milk = mongoose.model('Milk', milkSchema);

app.get('/timeOfDayOptions', (req, res) => {
  const options = [
    { label: 'Select Time of Day', value: '' },
    { label: 'Morning', value: 'Morning' },
    { label: 'Afternoon', value: 'Afternoon' },
    { label: 'Evening', value: 'Evening' },
  ];
  res.json(options);
});

app.post('/recordMilkProduction', async (req, res) => {
  const { timeOfDay, amount, date } = req.body;

  if (!timeOfDay) {
    return res.status(400).json({ error: 'Please select a time of day' });
  }

  if (!amount) {
    return res.status(400).json({ error: 'Please enter the amount' });
  }

  try {
    const milkProduction = new Milk({
      timeOfDay,
      amount,
      date,
    });

    await milkProduction.save();

    res.status(200).json({ message: 'Milk production recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to record milk production' });
  }
});

app.get('/generateMilkStatements', (req, res) => {
  res.json({ message: 'Milk statements generated successfully.' });
});

const milkUsageSchema = new mongoose.Schema({
  timeOfDay: String,
  date: { type: Date, default: Date.now },
  usage: String,
  quantity: Number,
});

const MilkUsage = mongoose.model('MilkUsage', milkUsageSchema);

app.get('/usageOptions', (req, res) => {
  const options = [
    { label: 'Select Usage', value: '' },
    { label: 'Cattle Feeding', value: 'Cattle Feeding' },
    { label: 'Selling', value: 'Selling' },
    { label: 'Home Consumption', value: 'Home Consumption' },
  ];
  res.json(options);
});

app.post('/recordMilkUsage', async (req, res) => {
  const { usage, quantity } = req.body;

  try {
    const totalMilkProduced = await Milk.aggregate([
      {
        $group: {
          _id: '$timeOfDay',
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    if (!usage || !quantity) {
      return res.status(400).json({ error: 'Usage and quantity are required fields' });
    }

    const timeOfDay = totalMilkProduced[0]._id;
    const milkProduction = totalMilkProduced[0].totalAmount;

    const milkUsage = new MilkUsage({
      timeOfDay,
      amount: milkProduction,
      date: new Date(),
      usage,
      quantity,
    });

    if (milkUsage.quantity > milkUsage.amount) {
      return res.status(400).json({ error: 'Milk usage cannot exceed milk production' });
    }

    const savedMilkUsage = await milkUsage.save();

    res.json({ message: 'Milk usage recorded successfully.', milkUsage: savedMilkUsage });
  } catch (error) {
    console.error('Failed to record milk usage:', error);
    res.status(500).json({ error: 'Failed to record milk usage.' });
  }
});
//notification
const notificationSchema = new mongoose.Schema({
  title: String,
  description: String,
  datetime: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
});

const Notification = mongoose.model('Notification', notificationSchema);

app.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/notifications', async (req, res) => {
  try {
    const { title, description, datetime } = req.body;
    const notification = new Notification({ title, description, datetime });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Expense schema and routes
const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
});

const Expense = mongoose.model('Expense', expenseSchema);

app.post('/expenses', (req, res) => {
  const { description, amount, date } = req.body;

  const expense = new Expense({
    description,
    amount,
    date,
  });

  expense
    .save()
    .then((savedExpense) => {
      res.status(200).json(savedExpense);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to save the expense record' });
    });
});

app.get('/expenses', (req, res) => {
  Expense.find()
    .then((expenses) => {
      res.status(200).json(expenses);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve expense records' });
    });
});

//milk
const milkPriceSchema = new mongoose.Schema({
  pricePerLiter: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
});

const MilkPrice = mongoose.model('MilkPrice', milkPriceSchema);

app.post('/milk-prices', async (req, res) => {
  try {
    const { pricePerLiter } = req.body;

    const newMilkPrice = new MilkPrice({
      pricePerLiter,
    });

    await newMilkPrice.save();

    res.status(201).json({ message: 'Milk price set successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set milk price' });
  }
});

// Sales Data schema and routes
const salesDataSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  milkSold: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  expenseAmount: {
    type: Number,
    required: true,
  },
  profitLoss: {
    type: Number,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
});

const SalesData = mongoose.model('SalesData', salesDataSchema);

app.get('/sales/daily', async (req, res) => {
  try {
    const milkUsage = await MilkUsage.aggregate([
      {
        $match: {
          usage: 'Selling',
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          milkSold: { $sum: '$quantity' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const milkPrices = await MilkPrice.find();
    const expenses = await Expense.find();

    const salesData = milkUsage.map((data) => {
      const milkPrice = milkPrices.find(
        (price) => price.date.toISOString().split('T')[0] === data._id
      );
      const totalAmount = milkPrice ? data.milkSold * milkPrice.pricePerLiter : 0;

      const expense = expenses.find((exp) => exp.date.toISOString().split('T')[0] === data._id);
      const expenseAmount = expense ? expense.amount : 0;

      const profitLoss = totalAmount - expenseAmount;

      return {
        date: data._id,
        milkSold: data.milkSold,
        totalAmount,
        expenseAmount,
        profitLoss,
      };
    });

    await SalesData.insertMany(salesData);

    res.status(200).json(salesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch daily sales data' });
  }
});

// ...

const profitLossSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  milkSold: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  expenseAmount: {
    type: Number,
    required: true,
  },
  profitLoss: {
    type: Number,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
});

const ProfitLoss = mongoose.model('ProfitLoss', profitLossSchema);

app.get('/profitloss', async (req, res) => {
  try {
    const monthlySalesData = await SalesData.aggregate([
      {
        $group: {
          _id: { $substr: ['$date', 0, 7] },
          milkSold: { $sum: '$milkSold' },
          totalAmount: { $sum: '$totalAmount' },
          expenseAmount: { $sum: '$expenseAmount' },
          profitLoss: { $sum: '$profitLoss' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
    };

    const profitLossData = monthlySalesData.map((data) => {
      const month = months[data._id.slice(5)]; // Extract month from the date and get the corresponding month name
      return {
        month,
        milkSold: data.milkSold,
        totalAmount: data.totalAmount,
        expenseAmount: data.expenseAmount,
        profitLoss: data.profitLoss,
      };
    });

    await ProfitLoss.insertMany(profitLossData);

    res.status(200).json(profitLossData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch profit and loss data' });
  }
});

// FarmProfile schema
const farmProfileSchema =  new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' } // Reference to the User model
});

// Models

const FarmProfile = mongoose.model('FarmProfile', farmProfileSchema);

// Middleware


// Routes
app.get('/farmProfile', async (req, res) => {
  try {
    // Fetch the farm profile details from the database and populate the 'user' field
    const farmProfile = await FarmProfile.findOne({}).populate('user').exec();
    res.json(farmProfile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/farmProfile', async (req, res) => {
  try {
    // Update the farm profile details in the database
    const farmProfile = await FarmProfile.findOneAndUpdate({}, req.body, { upsert: true, new: true }).exec();
    res.json(farmProfile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

