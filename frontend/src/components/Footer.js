import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__logo">Axiom</h3>
            <p className="footer__description">
              Plateforme de recrutement moderne et élégante pour connecter 
              les talents aux opportunités.
            </p>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Axiom. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
