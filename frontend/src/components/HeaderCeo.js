import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import '../styles/HeaderCeo.css';

const HeaderCeo = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ceo');
    navigate(ROUTES.HOME);
  };

  return (
    <header className="header-ceo">
      <div className="header-container">
        <div className="header-left">
          <h1>CEO Dashboard</h1>
        </div>
        <nav className="header-nav">
          <button onClick={() => navigate(ROUTES.CEO_EMP_LIST)}>
            Employés
          </button>
          <button onClick={() => navigate(ROUTES.CEO_SUGG_TABLE)}>
            Suggestions
          </button>
          <button onClick={() => navigate(ROUTES.CEO_CONTRAT_LIST)}>
            Contrats d'essai
          </button>
        </nav>
        <div className="header-right">
          <button onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderCeo;