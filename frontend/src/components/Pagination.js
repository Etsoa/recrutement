import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showInfo = false,
  totalItems = 0,
  itemsPerPage = 10,
  ...props
}) => {
  // Gestion des boutons précédent/suivant
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Calcul des numéros de pages à afficher
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Afficher toutes les pages si elles sont peu nombreuses
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logique pour afficher les pages avec des points de suspension
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      // Ajouter la première page et des points de suspension si nécessaire
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }
      
      // Ajouter les pages du milieu
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Ajouter des points de suspension et la dernière page si nécessaire
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  
  // Calcul des éléments affichés pour les informations
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`pagination-container ${className}`} {...props}>
      {showInfo && (
        <div className="pagination-info">
          <p>
            Affichage de {startItem} à {endItem} sur {totalItems} éléments
          </p>
        </div>
      )}
      
      <div className="cv-list__pagination">
        {/* Bouton Précédent */}
        <button
          className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
          Précédent
        </button>

        {/* Numéros de pages */}
        <div className="pagination-pages">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              className={`pagination-page ${
                page === currentPage ? 'active' : ''
              } ${page === '...' ? 'dots' : ''}`}
              onClick={() => {
                if (page !== '...' && typeof page === 'number') {
                  onPageChange(page);
                }
              }}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Bouton Suivant */}
        <button
          className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Suivant
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;