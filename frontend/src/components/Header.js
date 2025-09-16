import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">Axiom</h1>
        
        <nav className="header__nav">
          <a href="#dashboard" className="header__nav-item header__nav-item--active">
            Tableau de bord
          </a>
          <a href="#jobs" className="header__nav-item">
            Offres d'emploi
          </a>
          <a href="#candidates" className="header__nav-item">
            Candidats
          </a>
          <a href="#cvtheque" className="header__nav-item">
            CVthèque
          </a>
        </nav>
        
        <div className="header__actions">
          <button className="btn btn--ghost">
            Profil
          </button>
          <button className="btn btn--primary">
            Nouvelle offre
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
