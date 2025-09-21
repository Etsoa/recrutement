import React from "react";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Annonces, Home, DetailQCM, Historiques, Unites,Dashboard, Parametres, CreateAnnonce,QCM } from "./pages";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detailQCM" element={<DetailQCM />} />
          <Route path="/historique" element={<Historiques />} />
          <Route path="/back-office" element={<Unites />} />
          <Route path="/back-office/dashboard" element={<Dashboard />} />
          <Route path="/back-office/parametres" element={<Parametres />} />
          <Route path="/back-office/createAnnonce" element={<CreateAnnonce />} />
          <Route path="/back-office/createQCM/:id"  element={<QCM />}/>
          <Route path="/back-office/listeAnnonce" element={<Annonces />} />
        </Routes>
    </Router>
  );
}

export default App;
