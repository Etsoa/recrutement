import React, { useState, useEffect } from 'react';
import CVMiniature from '../components/CVMiniature';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/CVList.css';

const CVList = () => {
  const [cvList, setCvList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Simulation de chargement des données des CVs
  useEffect(() => {
    const loadCVList = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulation d'un délai de chargement API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées de plusieurs CVs
        const data = [
          {
            id: 1,
            nom: 'RAKOTO',
            prenom: 'Jean',
            photo: null,
            email: 'jean.rakoto@email.com',
            contact: '+261 34 12 456 78',
            ville: 'Antananarivo',
            filiere: 'Développement Web',
            niveau: 'Master en Génie Logiciel'
          },
          {
            id: 2,
            nom: 'ANDRY',
            prenom: 'Marie',
            photo: null,
            email: 'marie.andry@email.com',
            contact: '+261 33 98 765 43',
            ville: 'Antananarivo',
            filiere: 'Data Science',
            niveau: 'Master en Intelligence Artificielle'
          },
          {
            id: 3,
            nom: 'RABE',
            prenom: 'Paul',
            photo: null,
            email: 'paul.rabe@email.com',
            contact: '+261 32 55 123 45',
            ville: 'Fianarantsoa',
            filiere: 'Cybersécurité',
            niveau: 'Master en Sécurité Informatique'
          },
          {
            id: 4,
            nom: 'RASOA',
            prenom: 'Hery',
            photo: null,
            email: 'hery.rasoa@email.com',
            contact: '+261 34 87 654 32',
            ville: 'Toamasina',
            filiere: 'Développement Mobile',
            niveau: 'Licence en Informatique'
          },
          {
            id: 5,
            nom: 'RAJAO',
            prenom: 'Nina',
            photo: null,
            email: 'nina.rajao@email.com',
            contact: '+261 33 11 22 33',
            ville: 'Antsirabe',
            filiere: 'DevOps',
            niveau: 'Master en Architecture Logicielle'
          },
          {
            id: 6,
            nom: 'RAZAFY',
            prenom: 'Lova',
            photo: null,
            email: 'lova.razafy@email.com',
            contact: '+261 34 44 55 66',
            ville: 'Mahajanga',
            filiere: 'Intelligence Artificielle',
            niveau: 'Master en Machine Learning'
          },
          {
            id: 7,
            nom: 'RANDRIANASOLO',
            prenom: 'Fidy',
            photo: null,
            email: 'fidy.randrianasolo@email.com',
            contact: '+261 33 77 88 99',
            ville: 'Antananarivo',
            filiere: 'Analyse de Données',
            niveau: 'Master en Statistiques'
          },
          {
            id: 8,
            nom: 'RANDRIAMANANTSOA',
            prenom: 'Tahiry',
            photo: null,
            email: 'tahiry.randriamanantsoa@email.com',
            contact: '+261 34 55 66 77',
            ville: 'Mahajanga',
            filiere: 'UX/UI Design',
            niveau: 'Master en Design Numérique'
          },
          {
            id: 9,
            nom: 'RASOAMANANTSOA',
            prenom: 'Mialy',
            photo: null,
            email: 'mialy.rasoamanantsoa@email.com',
            contact: '+261 33 88 99 00',
            ville: 'Toliara',
            filiere: 'Marketing Digital',
            niveau: 'Master en Communication Digitale'
          },
          {
            id: 10,
            nom: 'RAKOTOMANANA',
            prenom: 'Solofo',
            photo: null,
            email: 'solofo.rakotomanana@email.com',
            contact: '+261 34 11 22 33',
            ville: 'Antananarivo',
            filiere: 'Blockchain',
            niveau: 'Master en Cryptographie'
          },
          {
            id: 11,
            nom: 'RANAIVOSON',
            prenom: 'Volatiana',
            photo: null,
            email: 'volatiana.ranaivoson@email.com',
            contact: '+261 33 44 55 66',
            ville: 'Antsirabe',
            filiere: 'Cloud Computing',
            niveau: 'Master en Infrastructure Cloud'
          },
          {
            id: 12,
            nom: 'RANDRIANARISOA',
            prenom: 'Hasina',
            photo: null,
            email: 'hasina.randrianarisoa@email.com',
            contact: '+261 34 77 88 99',
            ville: 'Fianarantsoa',
            filiere: 'Machine Learning',
            niveau: 'Doctorat en Intelligence Artificielle'
          },
          {
            id: 13,
            nom: 'RAKOTONDRAINIBE',
            prenom: 'Aina',
            photo: null,
            email: 'aina.rakotondrainibe@email.com',
            contact: '+261 33 00 11 22',
            ville: 'Toamasina',
            filiere: 'Robotique',
            niveau: 'Master en Ingénierie Robotique'
          },
          {
            id: 14,
            nom: 'ANDRIANJAFY',
            prenom: 'Rova',
            photo: null,
            email: 'rova.andrianjafy@email.com',
            contact: '+261 34 33 44 55',
            ville: 'Antananarivo',
            filiere: 'IoT Development',
            niveau: 'Master en Systèmes Embarqués'
          },
          {
            id: 15,
            nom: 'RAHARISON',
            prenom: 'Mamy',
            photo: null,
            email: 'mamy.raharison@email.com',
            contact: '+261 33 66 77 88',
            ville: 'Mahajanga',
            filiere: 'Game Development',
            niveau: 'Licence en Développement de Jeux'
          }
        ];

        setCvList(data);
      } catch (err) {
        setError('Erreur lors du chargement des CVs');
        console.error('Erreur de chargement CVs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCVList();
  }, []);

  // Fonction pour voir les détails d'un CV
  const handleViewDetails = (cvId) => {
    console.log('Voir détails du CV:', cvId);
    alert(`Redirection vers le CV détaillé de l'ID: ${cvId}`);
  };

  // Pagination
  const totalPages = Math.ceil(cvList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCVs = cvList.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="cv-list__loading">
        <LoadingSpinner message="Chargement des CVs..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="cv-list__error">
        <ErrorMessage
          title="Erreur de chargement"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="cv-list">
      {/* Header simple */}
      <div className="cv-list__header">
        <div className="cv-list__title-section">
          <h1 className="cv-list__title">Liste des CVs</h1>
          <p className="cv-list__count">
            {cvList.length} CV{cvList.length > 1 ? 's' : ''} au total - Page {currentPage} sur {totalPages}
          </p>
        </div>
      </div>

      {/* Liste des CVs en horizontal */}
      {currentCVs.length === 0 ? (
        <div className="cv-list__empty">
          <div className="empty-state">
            <svg className="empty-state__icon" width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            <h3>Aucun CV disponible</h3>
            <p>La liste des CVs est vide pour le moment.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="cv-list__horizontal">
            {currentCVs.map((cv, index) => (
              <CVMiniature
                key={cv.id}
                {...cv}
                onViewDetails={() => handleViewDetails(cv.id)}
                className={`cv-miniature--animation-delay-${index}`}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages >= 1 && (
            <div className="cv-list__pagination">
              <button
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={goToPrevious}
                disabled={currentPage === 1}
              >
                ‹ Précédent
              </button>

              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`pagination-page ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => goToPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={goToNext}
                disabled={currentPage === totalPages}
              >
                Suivant ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CVList;
