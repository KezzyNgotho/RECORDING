const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://keziengotho18:kezie5585@cluster0.peasyvh.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};
const userSchema = new mongoose.Schema({
  farmName: String,
  farmOwner: String,
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
});

const User = mongoose.model('User', userSchema);

module.exports = { connectDB, User };


module.exports = connectDB;
