const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');



const app = express();

app.use(bodyParser.json());
app.use(cors());


const uri = "mongodb+srv://simaygumus:Simay@cluster0.xbmit.mongodb.net/?appName=Cluster0";
mongoose.connect(uri);


// Check the connection status
mongoose.connection.on('connected', () => {
    console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

app.use('/items', itemRoutes);
app.use('/users', userRoutes);

app.listen(4000, '0.0.0.0', () => {
    console.log('Server is running on port 4000');
});
