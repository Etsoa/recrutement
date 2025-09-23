const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
// const publicRoutes = require('./routes/publicRoutes');
const uniteRoutes = require('./routes/uniteRoutes');
const rhRoutes = require('./routes/rhRoutes');
// const ceoRoutes = require('./routes/ceoRoutes');

const ceoRoutes = require('./routes/ceoRoutes');

const statRoutes = require('./routes/statRoutes ');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use('/api/public', publicRoutes);
app.use('/api/unite', uniteRoutes);
app.use('/api/rh', rhRoutes);
// app.use('/api/ceo', ceoRoutes);
app.use('/api/ceo', ceoRoutes);
app.use('/api/stat', statRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
