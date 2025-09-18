import React, { useState, useEffect } from 'react';
import AnnonceMiniature from '../components/AnnonceMiniature';
import Button from '../components/Button';
import '../styles/AnnonceList.css';

const AnnonceList = () => {
  const [annonceList, setAnnonceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadAnnonceList = async () => {
      try {
        setLoading(true);
        setError(null);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const data = [
          { id: 1, poste: 'Développeur Web', genre: 'Homme ou Femme', ageMin: 22, ageMax: 35, ville: 'Antananarivo' },
          { id: 2, poste: 'Assistant RH', genre: 'Femme', ageMin: 20, ageMax: 30, ville: 'Toamasina' },
          { id: 3, poste: 'Technicien Réseau', genre: 'Homme', ageMin: 23, ageMax: 40, ville: 'Fianarantsoa' },
          { id: 4, poste: 'Comptable', genre: 'Homme ou Femme', ageMin: 25, ageMax: 45, ville: 'Antsirabe' },
          { id: 5, poste: 'Designer Graphique', genre: 'Homme ou Femme', ageMin: 21, ageMax: 33, ville: 'Mahajanga' },
          { id: 6, poste: 'Chef de Projet IT', genre: 'Homme', ageMin: 28, ageMax: 45, ville: 'Antananarivo' },
          { id: 7, poste: 'Secrétaire Administratif', genre: 'Femme', ageMin: 19, ageMax: 28, ville: 'Toliara' },
          { id: 8, poste: 'Agent Commercial', genre: 'Homme ou Femme', ageMin: 20, ageMax: 35, ville: 'Antananarivo' },
          { id: 9, poste: 'Community Manager', genre: 'Homme ou Femme', ageMin: 21, ageMax: 32, ville: 'Toamasina' },
        ];

        setAnnonceList(data);
      } catch (err) {
        setError('Erreur lors du chargement des annonces');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAnnonceList();
  }, []);

  const handleViewDossiers = (id) => {
    alert(`Redirection vers les dossiers pour l'annonce ID: ${id}`);
  };

  const totalPages = Math.ceil(annonceList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnnonces = annonceList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="annonce-list">
      <div className="annonce-list__header">
        <h1 className="annonce-list__title">Liste des Annonces</h1>
        <p className="annonce-list__count">
          {annonceList.length} annonce{annonceList.length > 1 ? 's' : ''} - Page {currentPage} sur {totalPages}
        </p>
      </div>

      {loading ? (
        <div className="annonce-list__loading">Chargement des annonces...</div>
      ) : error ? (
        <div className="annonce-list__error">{error}</div>
      ) : currentAnnonces.length === 0 ? (
        <div className="annonce-list__empty">Aucune annonce disponible</div>
      ) : (
        <>
          <div className="annonce-list__grid">
            {currentAnnonces.map((a, index) => (
              <AnnonceMiniature
                key={a.id}
                {...a}
                onViewDossiers={() => handleViewDossiers(a.id)}
                className={`annonce-miniature--animation-delay-${index}`}
              />
            ))}
          </div>

          <div className="annonce-list__pagination">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              ‹ Précédent
            </button>
            <span>Page {currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
              Suivant ›
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AnnonceList;
