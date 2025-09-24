import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginRh.css';
import { ROUTES } from '../router/routes';
import { rhService } from '../services/rhService';

const LoginRh = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    try {
      const data = await rhService.login(email, password);

      if (data.success) {
        setMessage('Connexion réussie');
        navigate(ROUTES.RH_SUGGESTIONS);
      } else {
        setMessage(data.message || 'Identifiants incorrects');
      }
    } catch (err) {
      setMessage('Erreur de connexion au serveur');
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
          <h2 className="login-title">Espace RH</h2>
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
            <label htmlFor="password">Mot de passe</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

export default LoginRh;
