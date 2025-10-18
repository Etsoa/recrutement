import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { annoncesService } from "./services/annoncesService";
import "./styles/globals.css";
import "./styles/variables.css";

function App() {
  useEffect(() => {
    annoncesService.initializeSession();
  }, []);

  return <AppRouter />;
}

export default App;


        // <Route path="/back-office" element={<Unites />} />
        //   <Route path="/rh/login" element={<LoginRh />} />
        //   <Route path="/rh/suggestions" element={ <ProtectedRoute> <RhSuggestions /> </ProtectedRoute> } />
        //   <Route path="/rh/form-annonce" element={ <ProtectedRoute> <FormAnnonce /> </ProtectedRoute> } />
        //   <Route path="/rh/entretiens" element={ <ProtectedRoute> <RhCalendrier /> </ProtectedRoute> } />
        //   <Route path="/rh/ceoSuggestions" element={ <ProtectedRoute> <RhCeoSuggestions /> </ProtectedRoute> } />
