import React from "react";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Annonces, Home, DetailQCM, Historiques, Unites, Dashboard, Parametres, CreateAnnonce, QCM } from "./pages";
import LoginRh from "./pages/RhLoginRh";// In App.js
import FormAnnonce from './pages/RhFormAnnonce';
import RhCalendrier from './pages/RhCalendrier';
import RhSuggestions from './pages/RhSuggestions';
import RhCeoSuggestions from './pages/RhCeoSuggestions';
import ProtectedRoute from './components/RhProtectedRoute';

// Dans tes routes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/back-office" element={<Unites />} />
          <Route path="/rh/login" element={<LoginRh />} />
          <Route path="/rh/suggestions" element={ <ProtectedRoute> <RhSuggestions /> </ProtectedRoute> } />
          <Route path="/rh/form-annonce" element={ <ProtectedRoute> <FormAnnonce /> </ProtectedRoute> } />
          <Route path="/rh/entretiens" element={ <ProtectedRoute> <RhCalendrier /> </ProtectedRoute> } />
          <Route path="/rh/ceoSuggestions" element={ <ProtectedRoute> <RhCeoSuggestions /> </ProtectedRoute> } />
        <Route path="/back-office/dashboard" element={<Dashboard />} />
        <Route path="/back-office/parametres" element={<Parametres />} />
        <Route path="/back-office/createAnnonce" element={<CreateAnnonce />} />
        <Route path="/back-office/updateAnnonce" element={<CreateAnnonce />} />
        <Route path="/back-office/createQCM/:id" element={<QCM />} />
        <Route path="/back-office/listeAnnonce" element={<Annonces />} />
        <Route path="/back-office/detailQCM/:id" element={<DetailQCM />} />
        <Route path="/back-office/historique" element={<Historiques />} />
      </Routes>
    </Router>
  );
}

export default App;
