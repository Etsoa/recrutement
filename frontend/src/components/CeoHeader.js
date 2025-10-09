import React from 'react';
import { useNavigate } from '../router/useNavigateHelper';
import { ROUTES } from '../router/routes';
import { ceoService } from '../services/ceoService';

const CeoHeader = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleLogout = () => {
    ceoService.logout();
    navigate(ROUTES.LOGIN_CEO);
  };

  const headerStyle = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  };
  
  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#176c2fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };
  
  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  };
  
  const buttonStyle = {
    backgroundColor: 'transparent',
    color: '#1e293b',
    border: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };
  
  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f0fdf4',
    color: '#176c2fff'
  };
  
  const logoutButtonStyle = {
    backgroundColor: '#176c2fff',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    marginLeft: '0.5rem'
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle} onClick={() => navigate(ROUTES.HOME)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        Dashboard CEO
      </div>
      
      <nav style={navStyle}>
        <button 
          style={currentPath === ROUTES.CEO_EMP_LIST ? activeButtonStyle : buttonStyle} 
          onClick={() => navigate(ROUTES.CEO_EMP_LIST)}
        >
          Employés
        </button>
        
        <button 
          style={currentPath === ROUTES.CEO_SUGG_TABLE ? activeButtonStyle : buttonStyle}
          onClick={() => navigate(ROUTES.CEO_SUGG_TABLE)}
        >
          Suggestions
        </button>
        
        <button 
          style={currentPath === ROUTES.CEO_CONTRAT_LIST ? activeButtonStyle : buttonStyle}
          onClick={() => navigate(ROUTES.CEO_CONTRAT_LIST)}
        >
          Contrats d'essai
        </button>
        
        <button 
          style={buttonStyle}
          onClick={() => navigate(ROUTES.HOME)}
        >
          Accueil
        </button>
        
        <button 
          style={logoutButtonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#176c2fff'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#176c2fff'}
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </nav>
    </header>
  );
};

export default CeoHeader;
