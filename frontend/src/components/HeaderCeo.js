import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import '../styles/Header.css';

const HeaderCeo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('ceoToken');
    navigate(ROUTES.HOME);
  };

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">Axiom</h1>
        
        <nav className="header__nav">
          <Link 
            to={ROUTES.CEO_EMP_LIST} 
            className={`header__nav-item ${location.pathname === ROUTES.CEO_EMP_LIST ? 'header__nav-item--active' : ''}`}
          >
            Employés
          </Link>
          <Link 
            to={ROUTES.CEO_SUGG_TABLE} 
            className={`header__nav-item ${location.pathname === ROUTES.CEO_SUGG_TABLE ? 'header__nav-item--active' : ''}`}
          >
            Suggestions
          </Link>
          <Link 
            to={ROUTES.CEO_CONTRAT_LIST} 
            className={`header__nav-item ${location.pathname === ROUTES.CEO_CONTRAT_LIST ? 'header__nav-item--active' : ''}`}
          >
            Contrats d'essai
          </Link>
        </nav>
        
        <div className="header__actions">
          <div className="header__user-info">
            <span className="header__user-name">
              CEO
            </span>
            <button 
              className="btn btn--ghost header__logout-btn" 
              onClick={handleLogout}
              title="Se déconnecter"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderCeo;