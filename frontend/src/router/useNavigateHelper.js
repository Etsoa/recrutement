import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from './routes';

// Hook personnalisé pour faciliter la navigation (version simplifiée)
const useNavigateHelper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path, options = {}) => {
    navigate(path, {
      replace: options.replace || false,
      state: options.state || null,
      ...options
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const goToHome = () => {
    navigateTo(ROUTES.HOME);
  };

  const goToCV = () => {
    navigateTo(ROUTES.CV);
  };

  const getCurrentPath = () => {
    return location.pathname;
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return {
    // Navigation de base
    navigateTo,
    goBack,
    goForward,
    
    // Navigation spécifique
    goToHome,
    goToCV,
    
    // Utilitaires de localisation
    getCurrentPath,
    isCurrentPath,
    isPathActive,
    
    // Accès direct aux hooks React Router
    location,
    navigate
  };
};

export default useNavigateHelper;
