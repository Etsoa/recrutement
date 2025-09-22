const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const publicRoutes = require('./routes/publicRoutes');
const tokenInfoRoutes = require('./routes/tokenInfoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/public', publicRoutes);
app.use('/api/token-info', tokenInfoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
