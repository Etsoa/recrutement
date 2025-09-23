import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();

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
            to={ROUTES.ANNONCES} 
            className={`header__nav-item ${location.pathname === ROUTES.ANNONCES ? 'header__nav-item--active' : ''}`}
          >
            Offres d'emploi
          </Link>
          {/* <Link 
            to={ROUTES.CV_LIST} 
            className={`header__nav-item ${location.pathname === ROUTES.CV_LIST ? 'header__nav-item--active' : ''}`}
          >
            Liste des CVs
          </Link>
          <Link 
            to={ROUTES.CV} 
            className={`header__nav-item ${location.pathname === ROUTES.CV ? 'header__nav-item--active' : ''}`}
          >
            CV Détail
          </Link>
          <Link 
            to="/qcm?token=test_token_hardcode" 
            className={`header__nav-item ${location.pathname.startsWith('/qcm') ? 'header__nav-item--active' : ''}`}
          >
            QCM Test
          </Link> */}
        </nav>
        
        {/* <div className="header__actions">
          <button className="btn btn--ghost">
            Profil
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
