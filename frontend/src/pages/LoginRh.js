import React, { useState } from 'react';
import Button from '../components/Button';
import '../styles/LoginRh.css';  // Il faudra créer ce fichier
import rhService from '../services/rhService';

const LoginRh = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await rhService.login(email, password);
      if (data.success) {
        setMessage('Connexion réussie');
        // Exemple : localStorage.setItem('token', data.data.token);
        // window.location.href = '/dashboard'; // Redirection si besoin
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Erreur serveur');
    }
  };

  return (
    <div className="login-rh">
      <div className="login-rh__container">
        <div className="login-rh__header">
          <h1 className="login-rh__title">Espace RH</h1>
          <p className="login-rh__subtitle">Connectez-vous pour accéder à votre espace</p>
        </div>

        <form className="login-rh__form" onSubmit={handleSubmit}>
          <div className="login-rh__form-group">
            <input
              className="login-rh__input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />
          </div>

          <div className="login-rh__form-group">
            <div className="login-rh__password-wrapper">
              <input
                className="login-rh__input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
              />
              <button
                type="button"
                className="login-rh__toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Masquer" : "Voir"}
              </button>
            </div>
          </div>

          <div className="login-rh__actions">
            <Button 
              type="submit"
            >
              Se connecter
            </Button>
          </div>
        </form>

        {message && (
          <div className={`login-rh__message ${message.includes('réussie') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRh;
