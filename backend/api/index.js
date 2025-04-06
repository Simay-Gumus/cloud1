const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('../routes/itemRoutes');
const userRoutes = require('../routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const uri = "mongodb+srv://simaygumus:Simay@cluster0.xbmit.mongodb.net/?appName=Cluster0";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// MongoDB connection logs
mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Export the Express app for Vercel
module.exports = app;
