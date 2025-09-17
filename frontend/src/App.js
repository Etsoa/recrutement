import React from "react";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Annonces, Home, DetailQCM, Historiques } from "./pages";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/detailQCM" element={<DetailQCM />} />
          <Route path="/historique" element={<Historiques />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
