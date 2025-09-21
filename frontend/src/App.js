import React from "react";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Annonces, Home, DetailQCM, Historiques, Unites, LoginCeo } from "./pages";
import { EmployeCEOList } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/annonces" element={<Annonces />} />
        <Route path="/detailQCM" element={<DetailQCM />} />
        <Route path="/historique" element={<Historiques />} />
        <Route path="/back-office" element={<Unites />} />
        
        // Tsisy header sy footer et tout le tralala
        <Route path="/login-ceo" element={<LoginCeo />} /> 
        // Mbola mila asiana page manokana fa juste hoe component aloha eto fa maika
        <Route path="/ceo-emp-list" element={<EmployeCEOList />} /> 
      </Routes>
    </Router>
  );
}

export default App;
