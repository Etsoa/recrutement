import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnnonceMiniature from '../components/AnnonceMiniature';
import { annonceService } from '../services/annonceService';
import '../styles/AnnonceList.css';

const AnnonceList = () => {
  const navigate = useNavigate();
  const [annonceList, setAnnonceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadAnnonceList = async () => {
      try {
        setLoading(true);
        setError(null);

        // Appel du service backend avec pagination
        const response = await annonceService.getPaginatedAnnonces(currentPage, itemsPerPage, {id :1});

        if (response.success) {
          setAnnonceList(response.annonces);
          // Mettre à jour les informations de pagination depuis le service
          setTotalPages(response.totalPages);
          setTotalItems(response.total);
        } else {
          setError(response.message || 'Erreur lors du chargement des annonces');
        }
      } catch (err) {
        setError('Erreur de connexion au serveur');
        console.error('Erreur lors du chargement des annonces:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAnnonceList();
  }, [currentPage]); // Recharger à chaque changement de page

  const handleViewDossiers = (id) => {
    navigate(`/annonces/${id}/details`);
  };

  return (
    <div className="annonce-list">
      <div className="annonce-list__header">
        <h1 className="annonce-list__title">Liste des Annonces</h1>
        <p className="annonce-list__count">
          {totalItems} annonce{totalItems > 1 ? 's' : ''} - Page {currentPage} sur {totalPages}
        </p>
      </div>

      {loading ? (
        <div className="annonce-list__loading">Chargement des annonces...</div>
      ) : error ? (
        <div className="annonce-list__error">{error}</div>
      ) : annonceList.length === 0 ? (
        <div className="annonce-list__empty">Aucune annonce disponible</div>
      ) : (
        <>
          <div className="annonce-list__grid">
            {annonceList.map((a, index) => (
              <AnnonceMiniature
                key={a.id}
                {...a}
                onViewDossiers={() => handleViewDossiers(a.id)}
                className={`annonce-miniature--animation-delay-${index}`}
              />
            ))}
          </div>

          <div className="annonce-list__pagination">
            <button 
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
              disabled={currentPage === 1}
            >
              ‹ Précédent
            </button>
            <span>Page {currentPage} / {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
              disabled={currentPage === totalPages}
            >
              Suivant ›
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AnnonceList;