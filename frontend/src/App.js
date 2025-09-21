import React from "react";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Annonces, Home, DetailQCM, Historiques, Unites } from "./pages";
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
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/detailQCM" element={<DetailQCM />} />
          <Route path="/historique" element={<Historiques />} />
          <Route path="/back-office" element={<Unites />} />
          {/* <Route path="/rh/login" element={<LoginRh />} />
          <Route path="/rh/form-annonce" element={<FormAnnonce />} />
          <Route path="/rh/suggestions" element={<RhSuggestions />} />
          <Route path="/rh/entretiens" element={<RhCalendrier />} />
          <Route path="/rh/ceoSuggestions" element={<RhCeoSuggestions />} /> */}
          <Route path="/rh/login" element={<LoginRh />} />
          <Route path="/rh/suggestions" element={ <ProtectedRoute> <RhSuggestions /> </ProtectedRoute> } />
          <Route path="/rh/form-annonce" element={ <ProtectedRoute> <FormAnnonce /> </ProtectedRoute> } />
          <Route path="/rh/entretiens" element={ <ProtectedRoute> <RhCalendrier /> </ProtectedRoute> } />
          <Route path="/rh/ceoSuggestions" element={ <ProtectedRoute> <RhCeoSuggestions /> </ProtectedRoute> } />
        </Routes>
    </Router>
  );
}

export default App;
