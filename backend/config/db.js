const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected to ${mongoose.connection.name}...`);
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    console.error("Exiting the application due to database connection issues.");
    process.exit(1);
  }
};

// Graceful shutdown handling
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination.');
  process.exit(0);
});

module.exports = connectDB;
