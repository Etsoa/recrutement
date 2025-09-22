import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import { unitesService } from '../services';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Récupérer les informations de l'unité connectée
  const currentUnite = unitesService.getCurrentUnite();
  const isLoggedIn = unitesService.isLoggedIn();

  // Fonction de déconnexion
  const handleLogout = () => {
    // Détruire la session
    unitesService.logout();
    // Rediriger vers la page de connexion
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">Axiom</h1>
        
        <nav className="header__nav">
          <Link 
            to={ROUTES.HOME} 
            className={`header__nav-item ${location.pathname === ROUTES.HOME ? 'header__nav-item--active' : ''}`}
          >
            Accueil
          </Link>
          <Link 
            to={ROUTES.LISTE_ANNONCES} 
            className={`header__nav-item ${location.pathname === ROUTES.LISTE_ANNONCES ? 'header__nav-item--active' : ''}`}
          >
            Annonces
          </Link>
          <Link 
            to={ROUTES.PARAMETRES} 
            className={`header__nav-item ${location.pathname === ROUTES.PARAMETRES ? 'header__nav-item--active' : ''}`}
          >
            Paramètres
          </Link>
          <Link 
            to={ROUTES.CREATE_ANNONCE} 
            className={`header__nav-item ${location.pathname === ROUTES.CREATE_ANNONCE ? 'header__nav-item--active' : ''}`}
          >
            Créer une annonce
          </Link>
          
        </nav>
        
        <div className="header__actions">
          {isLoggedIn && (
            <div className="header__user-info">
              <span className="header__user-name">
                {currentUnite?.nom || 'Unité connectée'}
              </span>
              <button 
                className="btn btn--ghost header__logout-btn" 
                onClick={handleLogout}
                title="Se déconnecter"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
