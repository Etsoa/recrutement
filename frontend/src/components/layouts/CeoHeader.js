import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { ceoService } from '../../services/ceoService';

const CeoHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    ceoService.logout();
    navigate(ROUTES.LOGIN_CEO);
  };

  return (
    <header className="header" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="header-logo">
        <h1 style={{ margin: 0 }}>Dashboard CEO</h1>
      </div>
      
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link 
          to={ROUTES.CEO_EMP_LIST} 
          style={{ 
            textDecoration: 'none', 
            padding: '0.5rem 1rem',
            color: '#333',
            fontWeight: 'bold'
          }}
        >
          Employés
        </Link>
        <Link 
          to={ROUTES.CEO_SUGG_TABLE} 
          style={{ 
            textDecoration: 'none', 
            padding: '0.5rem 1rem',
            color: '#333',
            fontWeight: 'bold'
          }}
        >
          Suggestions
        </Link>
        <Link 
          to={ROUTES.CEO_CONTRAT_LIST} 
          style={{ 
            textDecoration: 'none', 
            padding: '0.5rem 1rem',
            color: '#333',
            fontWeight: 'bold'
          }}
        >
          Contrats d'essai
        </Link>
        <Link 
          to={ROUTES.HOME} 
          style={{ 
            textDecoration: 'none', 
            padding: '0.5rem 1rem',
            color: '#333',
            fontWeight: 'bold'
          }}
        >
          Accueil
        </Link>
        <button 
          onClick={handleLogout} 
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
          }}
        >
          Déconnexion
        </button>
      </nav>
    </header>
  );
};

export default CeoHeader;
