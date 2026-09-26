require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

app.use(express.json());

// Import routes
const atlasRoutes = require('./routes/atlas');

// Use CRUD routes
app.use('/', atlasRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Spend Wise API is running'
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
