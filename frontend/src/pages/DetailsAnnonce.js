import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { annonceService } from '../services/annonceService';
import Header from '../components/Header';
import AnnonceComp from '../components/AnnonceComp';
import CVComp from '../components/CVComp';
import CVMiniature from '../components/CVMiniature';
import Button from '../components/Button';
import '../styles/AnnonceCVComp.css';
import '../styles/CVList.css';

const DetailsAnnonce = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [annonceDetails, setAnnonceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidat, setSelectedCandidat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadAnnonceDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await annonceService.getAnnonceById(id);

        if (response.success) {
          setAnnonceDetails(response.data);
          console.log('Détails de l\'annonce récupérés:', response.data);
        } else {
          setError(response.message || 'Erreur lors du chargement des détails');
        }
      } catch (err) {
        setError('Erreur de connexion au serveur');
        console.error('Erreur lors du chargement des détails:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadAnnonceDetails();
    }
  }, [id]);

  const formatAnnonceData = (data) => {
    if (!data || !data.annonce) return null;
    return {
      id: data.annonce.id_annonce,
      post: data.annonce.Poste?.valeur || 'Poste non défini',
      ville: data.annonce.Ville?.valeur || 'Ville non définie',
      ageMin: data.annonce.age_min || 0,
      ageMax: data.annonce.age_max || 0,
      genre: data.annonce.Genre?.valeur || 'Non spécifié',
      langues: data.langues?.map(l => l.Langue?.valeur).filter(Boolean) || [],
      qualites: data.qualites?.map(q => q.Qualite?.valeur).filter(Boolean) || [],
      experiences: data.experiences?.map(e => ({
        poste: e.Domaine?.valeur || 'Domaine non défini',
        duree: e.duree_experience_min ? `${e.duree_experience_min} - ${e.duree_experience_max || e.duree_experience_min} ans` : 'Non spécifié'
      })) || [],
      filiere: data.niveauxFiliere?.map(nf => nf.Filiere?.valeur).filter(Boolean) || [],
      niveau: data.niveauxFiliere?.map(nf => nf.Niveau?.valeur).filter(Boolean) || []
    };
  };

  const formatCVData = (candidatDetail) => {
    if (!candidatDetail || !candidatDetail.candidat?.Tiers) return null;
    const tiers = candidatDetail.candidat.Tiers;
    return {
      id: tiers.id_tiers,
      nom: tiers.nom || 'Nom non défini',
      prenom: tiers.prenom || 'Prénom non défini',
      dateNaissance: tiers.date_naissance || '',
      contact: tiers.contact || '',
      email: tiers.email || '',
      cin: tiers.cin || '',
      photo: tiers.photo || '',
      genre: tiers.id_genre || '',
      situationMatrimoniale: tiers.id_situation_matrimoniale || '',
      nombreEnfants: tiers.nombre_enfants || 0,
      ville: tiers.id_ville || '',
      langues: candidatDetail.langues?.map(l => l.Langue?.valeur).filter(Boolean) || [],
      qualites: candidatDetail.qualites?.map(q => q.Qualite?.valeur).filter(Boolean) || [],
      experiences: candidatDetail.experiences?.map(e => ({
        poste: e.Domaine?.valeur || 'Domaine non défini',
        duree: e.duree_experience || 'Non spécifié'
      })) || [],
      filiere: candidatDetail.niveauxFiliere?.map(nf => nf.Filiere?.valeur).filter(Boolean) || [],
      niveau: candidatDetail.niveauxFiliere?.map(nf => nf.Niveau?.valeur).filter(Boolean) || [],
      envoisQcm: candidatDetail.envoisQcm || [],
      reponsesQcm: candidatDetail.reponsesQcm || [],
      uniteEntretiens: candidatDetail.unite_entretiens || []
    };
  };

  const formatCVMiniatureData = (candidatDetail) => {
    if (!candidatDetail || !candidatDetail.candidat?.Tiers) return null;
    const tiers = candidatDetail.candidat.Tiers;
    return {
      id: tiers.id_tiers,
      nom: tiers.nom || 'Nom non défini',
      prenom: tiers.prenom || 'Prénom non défini',
      photo: tiers.photo || null,
      email: tiers.email || '',
      contact: tiers.contact || '',
      ville: tiers.id_ville || 'Ville non définie',
      filiere: candidatDetail.niveauxFiliere?.map(nf => nf.Filiere?.valeur).filter(Boolean).join(', ') || 'Filière non définie',
      niveau: candidatDetail.niveauxFiliere?.map(nf => nf.Niveau?.valeur).filter(Boolean).join(', ') || 'Niveau non défini'
    };
  };

  const handleCandidatSelect = (candidatDetail) => {
    setSelectedCandidat(candidatDetail);
  };

  const totalPages = annonceDetails?.candidatsDetails ? Math.ceil(annonceDetails.candidatsDetails.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidats = annonceDetails?.candidatsDetails ? annonceDetails.candidatsDetails.slice(startIndex, endIndex) : [];

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const goToNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="cv-list__loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Chargement des détails de l'annonce...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="cv-list__error">
          <div className="error-state">
            <h3>Erreur de chargement</h3>
            <p>{error}</p>
            <Button onClick={() => navigate('/annonces')}>Retour aux annonces</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!annonceDetails) {
    return (
      <div>
        <Header />
        <Button onClick={() => navigate('/annonces')}>Retour</Button>
        <div>Aucun détail trouvé pour cette annonce</div>
      </div>
    );
  }

  const annonceData = formatAnnonceData(annonceDetails);
  const cvData = selectedCandidat ? formatCVData(selectedCandidat) : null;

  return (
    <div>
      <Header />
      <Button onClick={() => navigate('/annonces')}>Retour aux annonces</Button>

      {selectedCandidat ? (
        <div className="annoncecv-container">
          <div className="annoncecv-left">
            <AnnonceComp {...annonceData} />
            <Button onClick={() => setSelectedCandidat(null)} style={{ marginTop: '20px' }}>
              Retour à la liste des candidats
            </Button>
          </div>
          <div className="annoncecv-right">
            <CVComp {...cvData} />
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '30px' }}>
            <h2>Détails de l'annonce</h2>
            <AnnonceComp {...annonceData} />
          </div>

          <div className="cv-list">
            <div className="cv-list__header">
              <div className="cv-list__title-section">
                <h1 className="cv-list__title">Candidats postulants</h1>
                <p className="cv-list__count">
                  {annonceDetails.candidatsDetails?.length || 0} candidat
                  {(annonceDetails.candidatsDetails?.length || 0) > 1 ? 's' : ''} au total - Page {currentPage} sur {totalPages}
                </p>
              </div>
            </div>

            {currentCandidats.length === 0 ? (
              <div className="cv-list__empty">
                <div className="empty-state">
                  <svg className="empty-state__icon" width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <h3>Aucun candidat</h3>
                  <p>Aucun candidat n'a postulé pour cette annonce.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="cv-list__horizontal">
                  {currentCandidats.map((candidatDetail, index) => {
                    const cvMiniatureData = formatCVMiniatureData(candidatDetail);
                    if (!cvMiniatureData) return null;
                    return (
                      <CVMiniature
                        key={cvMiniatureData.id}
                        {...cvMiniatureData}
                        onViewDetails={() => handleCandidatSelect(candidatDetail)}
                        className={`cv-miniature--animation-delay-${index}`}
                      />
                    );
                  })}
                </div>

                <div style={{ marginTop: '30px' }}>
                  <h3 style={{ marginBottom: '20px' }}>Vue en carrés</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '15px'
                  }}>
                    {currentCandidats.map((candidatDetail) => {
                      const tiers = candidatDetail.candidat?.Tiers;
                      if (!tiers) return null;
                      return (
                        <div key={`card-${tiers.id_tiers}`}
                          style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backgroundColor: '#f9f9f9'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                          onClick={() => handleCandidatSelect(candidatDetail)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '50%',
                              backgroundColor: '#007bff',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '18px',
                              fontWeight: 'bold',
                              marginRight: '12px'
                            }}>
                              {tiers.nom.charAt(0)}{tiers.prenom.charAt(0)}
                            </div>
                            <div>
                              <h4 style={{ margin: '0', fontSize: '16px' }}>{tiers.nom} {tiers.prenom}</h4>
                              <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>ID: {tiers.id_tiers}</p>
                            </div>
                          </div>
                          <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
                            <p style={{ margin: '5px 0' }}><strong>Email:</strong> {tiers.email || 'Non renseigné'}</p>
                            <p style={{ margin: '5px 0' }}><strong>Contact:</strong> {tiers.contact || 'Non renseigné'}</p>
                            <p style={{ margin: '5px 0' }}><strong>CIN:</strong> {tiers.cin || 'Non renseigné'}</p>
                            <p style={{ margin: '5px 0' }}><strong>Date naissance:</strong> {tiers.date_naissance || 'Non renseigné'}</p>
                            <p style={{ margin: '5px 0' }}><strong>Enfants:</strong> {tiers.nombre_enfants || 0}</p>
                            {candidatDetail.langues?.length > 0 && (
                              <p style={{ margin: '5px 0' }}><strong>Langues:</strong> {candidatDetail.langues.map(l => l.Langue?.valeur).join(', ')}</p>
                            )}
                            {candidatDetail.qualites?.length > 0 && (
                              <p style={{ margin: '5px 0' }}><strong>Qualités:</strong> {candidatDetail.qualites.map(q => q.Qualite?.valeur).join(', ')}</p>
                            )}
                            {candidatDetail.envoisQcm?.length > 0 && (
                              <p style={{ margin: '5px 0' }}><strong>QCM:</strong> {candidatDetail.envoisQcm.length} envoi(s)</p>
                            )}
                            {candidatDetail.unite_entretiens?.length > 0 && (
                              <p style={{ margin: '5px 0' }}><strong>Entretiens:</strong> {candidatDetail.unite_entretiens.length} entretien(s)</p>
                            )}
                          </div>
                          <Button style={{ marginTop: '12px', width: '100%', fontSize: '14px' }}>
                            Voir le détail complet
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {totalPages > 1 && (
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
        </div>
      )}
    </div>
  );
};

export default DetailsAnnonce;
