// import React, { useEffect } from "react";
// import AppRouter from "./router/AppRouter";
// import { annoncesService } from "./services/annoncesService";

// function App() {
//   // Initialiser la session au démarrage de l'application
//   useEffect(() => {
//     annoncesService.initializeSession();
//   }, []);

//   return <AppRouter />;
// }
import React from "react";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Annonces, Home, DetailQCM, Historiques, Unites, Dashboard, Parametres, CreateAnnonce, QCM } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/back-office" element={<Unites />} />
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
