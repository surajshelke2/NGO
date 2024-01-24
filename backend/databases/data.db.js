const mongoose = require('mongoose');

const connectDB = async () => {
  try {
   await mongoose.connect(process.env.MONGODB, {
      
    dbName:"NGO"
   
    });

    console.log(`MongoDB connected with ${mongoose.connection.name}`);

   
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};

module.exports = connectDB;