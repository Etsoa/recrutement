import React from "react";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Annonces, Home, DetailQCM, Historiques, Unites } from "./pages";
import LoginRh from "./pages/LoginRh";// In App.js
import FormAnnonce from './pages/FormAnnonce';
import RhCalendrier from './pages/RhCalendrier';
import RhSuggestions from './pages/RhSuggestions';

// Dans tes routes

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/detailQCM" element={<DetailQCM />} />
          <Route path="/historique" element={<Historiques />} />
          <Route path="/back-office" element={<Unites />} />
          <Route path="/rh/login" element={<LoginRh />} />
          <Route path="/rh/form-annonce" element={<FormAnnonce />} />
          <Route path="/rh/suggestions" element={<RhSuggestions />} />
          <Route path="/rh/entretiens" element={<RhCalendrier />} />
        </Routes>
    </Router>
  );
}

export default App;
