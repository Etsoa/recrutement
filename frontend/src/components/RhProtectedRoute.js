import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem('rhLoggedIn') === 'true';

  if (!isLoggedIn) return <Navigate to="/rh/login" replace />;

  return children;
};

export default ProtectedRoute;
