import React from 'react';
import Button from './Button';
import '../styles/CVMiniature.css';

const CVMiniature = ({
  // Informations personnelles
  nom = '',
  prenom = '',
  photo = null,
  ville = '',
  
  // Informations professionnelles
  filiere = '',
  niveau = '',
  
  // Actions
  onViewDetails = null,
  className = ''
}) => {
  
  const getInitials = () => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  };

  return (
    <div className={`cv-miniature ${className}`}>
      {/* En-tête avec photo et infos principales */}
      <div className="cv-miniature__header">
        <div className="cv-miniature__photo-container">
          {photo ? (
            <img src={photo} alt={`${prenom} ${nom}`} className="cv-miniature__photo" />
          ) : (
            <div className="cv-miniature__photo cv-miniature__photo--placeholder">
              {getInitials()}
            </div>
          )}
        </div>
        
        <div className="cv-miniature__identity">
          <h3 className="cv-miniature__name">
            <span className="cv-miniature__prenom">{prenom}</span>
            <span className="cv-miniature__nom">{nom}</span>
          </h3>
          <p className="cv-miniature__title">{filiere}</p>
          <p className="cv-miniature__level">{niveau}</p>
          {ville && (
            <p className="cv-miniature__location">{ville}</p>
          )}
        </div>
      </div>

      {/* Footer avec bouton */}
      <div className="cv-miniature__footer">
        <Button
          variant="primary"
          size="sm"
          onClick={onViewDetails}
          fullWidth
        >
          Voir détail
        </Button>
      </div>
    </div>
  );
};

export default CVMiniature;
