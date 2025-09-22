import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <main className="App-main">
        <h1>Hello World</h1>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button
            style={{ 
              margin: "1rem", 
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
            onClick={() => navigate(ROUTES.LOGIN_UNITES)}
          >
            Connexion Unité
          </button>
          <button
            style={{ 
              margin: "1rem", 
              padding: "0.75rem 1.5rem",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
            onClick={() => navigate(ROUTES.RH_LOGIN)}
          >
            Connexion RH
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
