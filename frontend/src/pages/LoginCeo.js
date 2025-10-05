import React, { useState } from 'react';
import { useNavigate } from '../router/useNavigateHelper';
import "../styles/LoginCeo.css";
import { ROUTES } from "../router/routes";
import { ceoService } from "../services/ceoService";

const LoginCeo = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const result = await ceoService.login(email, motDePasse);
      
      if (result.success) {
        navigate(ROUTES.CEO_EMP_LIST);
      } else {
        setMessage(result.message || "Identifiants incorrects");
      }
    } catch (err) {
      setMessage("Erreur réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="brand-logo">
          <h1>Axiom</h1>
        </div>
        
        <div className="login-header">
          <h2 className="login-title">Connexion CEO</h2>
          <p className="login-subtitle">Connectez-vous pour accéder à votre espace</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="motDePasse">Mot de passe</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="motDePasse"
                placeholder="Entrez votre mot de passe"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Masquer" : "Voir"}
              </button>
            </div>
          </div>

          <div className="login-actions">
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </div>
        </form>

        {message && (
          <div className={`login-message ${message.includes("réussie") ? "login-message--success" : "login-message--error"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginCeo;
