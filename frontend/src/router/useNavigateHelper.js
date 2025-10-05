import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from './routes';

// Hook de compatibilité pour remplacer useNavigate
export const useNavigate = () => {
  const history = useHistory();
  
  return (path, options = {}) => {
    if (typeof path === 'string') {
      if (options.replace) {
        history.replace(path);
      } else {
        history.push(path);
      }
    } else if (typeof path === 'number') {
      history.go(path);
    }
  };
};

// Hook personnalisé pour faciliter la navigation (version simplifiée)
const useNavigateHelper = () => {
  const history = useHistory();
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTo = (path, options = {}) => {
    if (options.replace) {
      history.replace(path, options.state);
    } else {
      history.push(path, options.state);
    }
  };

  const goBack = () => {
    history.goBack();
  };

  const goForward = () => {
    history.goForward();
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
    history
  };
};

export default useNavigateHelper;
