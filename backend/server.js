const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World from Backend!' });
});

app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
