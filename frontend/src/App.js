import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { annoncesService } from "./services/annoncesService";
import "./styles/globals.css";
import "./styles/variables.css";

function App() {
  // Initialiser la session au démarrage de l'application
  useEffect(() => {
    annoncesService.initializeSession();
  }, []);

  return <AppRouter />;
}

export default App;
