import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from '../router/useNavigateHelper';
import { ROUTES } from '../router/routes';
import { rhService } from '../services';
import '../styles/Header.css';

const HeaderRh = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Récupérer les informations RH connectées
  const currentRh = rhService.getCurrentRh ? rhService.getCurrentRh() : null;
  const isLoggedIn = rhService.isLoggedIn ? rhService.isLoggedIn() : false;

  // Fonction de déconnexion
  const handleLogout = () => {
    // Détruire la session
    if (rhService.logout) {
      rhService.logout();
    }
    // Rediriger vers la page d'accueil
    navigate(ROUTES.HOME);
  };

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">Axiom</h1>
        
        <nav className="header__nav">
          <Link 
            to={ROUTES.RH_CALENDRIER} 
            className={`header__nav-item ${location.pathname === ROUTES.RH_CALENDRIER ? 'header__nav-item--active' : ''}`}
          >
            Calendrier
          </Link>
          <Link 
            to={ROUTES.RH_SUGGESTIONS} 
            className={`header__nav-item ${location.pathname === ROUTES.RH_SUGGESTIONS ? 'header__nav-item--active' : ''}`}
          >
            Suggestions
          </Link>
          <Link 
            to={ROUTES.RH_CEO_SUGGESTIONS} 
            className={`header__nav-item ${location.pathname === ROUTES.RH_CEO_SUGGESTIONS ? 'header__nav-item--active' : ''}`}
          >
            Suggestions CEO
          </Link>
          <Link 
            to={ROUTES.RH_FORM_ANNONCE} 
            className={`header__nav-item ${location.pathname === ROUTES.RH_FORM_ANNONCE ? 'header__nav-item--active' : ''}`}
          >
            Créer une annonce
          </Link>
        </nav>
        
        <div className="header__actions">
          <div className="header__user-info">
            <span className="header__user-name">
              {currentRh?.nom || 'RH connecté'}
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

export default HeaderRh;
