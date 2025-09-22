import React from "react";
import Header from "../components/HeaderUnite";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";

function Home() {
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "2rem 1rem"
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "4rem 3.5rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    textAlign: "center",
    maxWidth: "520px",
    width: "100%",
    border: "1px solid #e9ecef"
  };

  const titleStyle = {
    fontSize: "3.5rem",
    fontWeight: "300",
    color: "#176c2fff",
    marginBottom: "2rem",
    letterSpacing: "0.1em"
  };

  const subtitleStyle = {
    fontSize: "1.3rem",
    color: "#7f8c8d",
    marginBottom: "3rem",
    lineHeight: "1.4",
    fontWeight: "300",
    letterSpacing: "0.05em"
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    width: "100%"
  };

  const baseButtonStyle = {
    padding: "1.5rem 3rem",
    border: "1px solid #ecf0f1",
    borderRadius: "8px",
    borderColor: "#176c2fff",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "400",
    transition: "all 0.3s ease",
    textTransform: "none",
    letterSpacing: "0.05em",
    position: "relative",
    width: "100%",
    backgroundColor: "#ffffff",
    color: "#176c2fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
  };

  const uniteButtonStyle = {
    ...baseButtonStyle
  };

  const rhButtonStyle = {
    ...baseButtonStyle
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#f8f9fa";
    e.target.style.transform = "translateY(-1px)";
    e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.12)";
    e.target.style.borderColor = "#bdc3c7";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#ffffff";
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
    e.target.style.borderColor = "#ecf0f1";
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Axiom</h1>
        <p style={subtitleStyle}>
          Recrutements
        </p>
        <div style={buttonContainerStyle}>
          <button
            style={uniteButtonStyle}
            onClick={() => navigate(ROUTES.LOGIN_UNITES)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Accès Unités
          </button>
          <button
            style={rhButtonStyle}
            onClick={() => navigate(ROUTES.RH_LOGIN)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Accès RH
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
