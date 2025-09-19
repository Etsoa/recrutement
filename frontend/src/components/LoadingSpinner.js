import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ message = "Chargement...", size = "medium" }) => {
  return (
    <div className="loading-container">
      <div className={`loading-spinner ${size}`}></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;