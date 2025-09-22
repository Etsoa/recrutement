import React from "react";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Annonces, Home, DetailQCM, Historiques, Unites, LoginCeo } from "./pages";
import { EmployeCEOList, SuggestionTable, EmpContratEssaiList } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/annonces" element={<Annonces />} />
        <Route path="/detailQCM" element={<DetailQCM />} />
        <Route path="/historique" element={<Historiques />} />
        <Route path="/back-office" element={<Unites />} />
        
        {/* Tsisy header sy footer et tout le tralala */}
        <Route path="/login-ceo" element={<LoginCeo />} /> 
         {/* Mbola mila asiana page manokana fa juste hoe component aloha eto fa maika */}
        <Route path="/ceo-emp-list" element={<EmployeCEOList />} /> 
        <Route path="/ceo-sugg-table" element={<SuggestionTable />} /> 
        <Route path="/emp-contrat-list" element={<EmpContratEssaiList />} />
      </Routes>
    </Router>
  );
import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { annoncesService } from "./services/annoncesService";

function App() {
  // Initialiser la session au démarrage de l'application
  useEffect(() => {
    annoncesService.initializeSession();
  }, []);

  return <AppRouter />;
}

export default App;
