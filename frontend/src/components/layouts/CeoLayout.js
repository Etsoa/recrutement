import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { ceoService } from '../../services/ceoService';
import CeoHeader from './CeoHeader';

const CeoLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si le CEO est connecté
    if (!ceoService.isLoggedIn()) {
      // Redirection vers la page de connexion si non connecté
      navigate(ROUTES.LOGIN_CEO);
    }
  }, [navigate]);

  // Si l'utilisateur n'est pas connecté, ne rien afficher pendant la redirection
  if (!ceoService.isLoggedIn()) {
    return null;
  }

  return (
    <div className="ceo-layout">
      <CeoHeader />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default CeoLayout;
