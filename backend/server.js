const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const ceoRoutes = require('./routes/ceoRoutes');

const uniteRoutes = require('./routes/uniteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/ceo', ceoRoutes);
app.use('/api/unite', uniteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
