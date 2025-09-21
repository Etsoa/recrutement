import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/variables.css';

// Importation du Layout
import Layout from '../components/Layout';

// Importation des pages
import Home from '../pages/Home';
import AnnonceList from '../pages/AnnonceList';
import DetailsAnnonce from '../pages/DetailsAnnonce';

// Configuration des routes
const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/annonces" element={<AnnonceList />} />
          <Route path="/annonces/:id/details" element={<DetailsAnnonce />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;