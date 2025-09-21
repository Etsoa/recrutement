import React from "react";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Annonces, Home, DetailQCM, Historiques, Unites, LoginCeo } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/annonces" element={<Annonces />} />
        <Route path="/detailQCM" element={<DetailQCM />} />
        <Route path="/historique" element={<Historiques />} />
        <Route path="/back-office" element={<Unites />} />
        <Route path="/login-ceo" element={<LoginCeo />} />
      </Routes>
    </Router>
  );
}

export default App;
