import { useNavigate as useRRNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from './routes';

// Hook de compatibilité pour unifier l'API navigate
export const useNavigate = () => {
  const navigate = useRRNavigate();
  return (path, options = {}) => {
    if (typeof path === 'string') {
      navigate(path, { replace: !!options.replace, state: options.state });
    } else if (typeof path === 'number') {
      navigate(path);
    }
  };
};

// Hook personnalisé pour faciliter la navigation (version simplifiée)
const useNavigateHelper = () => {
  const rrNavigate = useRRNavigate();
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTo = (path, options = {}) => {
    rrNavigate(path, { replace: !!options.replace, state: options.state });
  };

  const goBack = () => {
    rrNavigate(-1);
  };

  const goForward = () => {
    rrNavigate(1);
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
    navigate,
    // history n'existe plus en v6; on expose rrNavigate pour compat
    rrNavigate
  };
};

export default useNavigateHelper;
