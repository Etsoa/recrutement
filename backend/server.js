const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const uniteRoutes = require('./routes/uniteRoutes');
const rhRoutes = require('./routes/rhRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/unite', uniteRoutes);
app.use('/api/rh', rhRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
