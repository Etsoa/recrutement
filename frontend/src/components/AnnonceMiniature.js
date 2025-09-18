import React from 'react';
import Button from './Button';
import '../styles/AnnonceMiniature.css';

const AnnonceMiniature = ({
  poste = '',
  genre = '',
  ageMin = '',
  ageMax = '',
  ville = '',
  onViewDossiers = null,
  className = ''
}) => {
  return (
    <div className={`annonce-miniature ${className}`}>
      {/* Header */}
      <div className="annonce-miniature__header">
        <h3 className="annonce-miniature__poste">{poste}</h3>
        <p className="annonce-miniature__genre">Genre : {genre}</p>
        <p className="annonce-miniature__age">
          Âge requis : {ageMin} - {ageMax} ans
        </p>
        <p className="annonce-miniature__ville">{ville}</p>
      </div>

      {/* Footer */}
      <div className="annonce-miniature__footer">
        <Button
          variant="primary"
          size="sm"
          onClick={onViewDossiers}
          fullWidth
        >
          Voir les dossiers
        </Button>
      </div>
    </div>
  );
};

export default AnnonceMiniature;
