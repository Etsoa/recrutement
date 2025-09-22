const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./config/db');
const ceoRoutes = require('./routes/ceoRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/public', publicRoutes);
app.use('/api/ceo', ceoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
