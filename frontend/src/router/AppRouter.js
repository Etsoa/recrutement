import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/variables.css';

// Importation du Layout
import Layout from '../components/Layout';

// Importation des pages
import Home from '../pages/Home';
import Annonces from '../pages/Annonces';
import DetailQCM from '../pages/DetailQCM';
import Historiques from '../pages/Historiques';
import CVtest from '../pages/CVtest';
import CVList from '../pages/CVList';
import Users from '../pages/Users';
import AnnonceList from '../pages/AnnonceList';

// Configuration des routes
const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/detailQCM" element={<DetailQCM />} />
          <Route path="/historique" element={<Historiques />} />
          <Route path="/cv" element={<CVtest />} />
          <Route path="/cv-list" element={<CVList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/annonces-list" element={<AnnonceList />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
