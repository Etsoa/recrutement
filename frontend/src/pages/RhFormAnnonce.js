import React, { useState, useEffect, useCallback } from 'react';
import Button from '../components/Button';
import '../styles/FormAnnonce.css';
import rhService from '../services/rhService';

// Règles de transition de statuts
const ALLOWED_TRANSITIONS = {
  1: [2, 4], // En attente → Publié ou Refusé
  2: [3],    // Publié → Annulé (Non publié)
  3: [],     // Annulé → aucune transition
  4: []      // Refusé → aucune transition
};

const FormAnnonce = () => {
  const [annonces, setAnnonces] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [submittingId, setSubmittingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [statusTypes, setStatusTypes] = useState([]);

  const fetchStatusTypes = useCallback(async () => {
    try {
      const response = await rhService.getTypeStatusAnnonces();
      if (response.success) {
        setStatusTypes(response.data || []);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des types de statuts:', err);
    }
  }, []);

  const fetchAnnonces = useCallback(async () => {
    try {
      setLoading(true);
      const annoncesData = await rhService.getAllAnnonces();
      if (annoncesData.success) {
        setAnnonces(annoncesData.data || []);
      } else {
        setMessage(annoncesData.message || 'Erreur de chargement des données');
        setMessageType('error');
      }
    } catch (err) {
      console.error('Erreur détaillée:', err);
      setMessage('Erreur de connexion au serveur');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatusTypes();
    fetchAnnonces();
  }, [fetchAnnonces, fetchStatusTypes]);

  const handleLogout = () => {
    sessionStorage.removeItem('rhLoggedIn');
    sessionStorage.removeItem('rhData');
    alert("Vous avez été déconnecté");
    window.location.href = '/rh/login';
  };

  const toggleAnnonceDetails = (annonce) => {
    setSelectedAnnonce(selectedAnnonce?.id_annonce === annonce.id_annonce ? null : annonce);
  };

  const handleStatusChange = async (id_annonce, newStatus) => {
    try {
      setSubmittingId(id_annonce);
      // Conserver l'annonce sélectionnée pour la réouvrir après refresh
      const keepSelectedId = selectedAnnonce?.id_annonce;

      const annonceCourante = annonces.find(a => a.id_annonce === id_annonce);
      const idUnite = annonceCourante?.Poste?.Unite?.id_unite ?? 2; // fallback ancien comportement

      const response = await rhService.updateAnnonceStatus({
        id_annonce,
        id_type_status_annonce: newStatus,
        id_unite: idUnite
      });

      if (response?.success) {
        // Recharger depuis le serveur pour avoir currentStatus à jour
        await fetchAnnonces();
        // Rétablir la sélection si la même annonce existe encore
        if (keepSelectedId) {
          const anew = annonces.find(a => a.id_annonce === keepSelectedId);
          setSelectedAnnonce(anew || null);
        }
        setMessage('Statut mis à jour avec succès');
        setMessageType('success');
        // Effacer le message après un court délai
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 2000);
      } else {
        setMessage(response?.message || 'Impossible de mettre à jour le statut');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Erreur lors de la mise à jour du statut');
      setMessageType('error');
    }
    finally {
      setSubmittingId(null);
    }
  };

  const getStatusActions = (annonce) => {
    const currentStatusId = annonce?.currentStatus?.id_type_status_annonce ?? annonce?.id_type_status_annonce;
    const allowedTransitions = ALLOWED_TRANSITIONS[currentStatusId] || [];
    
    // Si aucune transition possible, ne rien afficher
    if (allowedTransitions.length === 0) {
      return null;
    }

    // Fonction helper pour obtenir le nom d'un statut
    const getStatusName = (statusId) => {
      const status = statusTypes.find(s => s.id_type_status_annonce === statusId);
      return status?.valeur || `Statut ${statusId}`;
    };

    // Fonction helper pour obtenir le variant approprié
    const getButtonVariant = (statusId) => {
      if (statusId === 2) return 'primary'; // Publier
      if (statusId === 3) return 'secondary'; // Annuler
      if (statusId === 4) return 'danger'; // Refuser
      return 'default';
    };

    return (
      <div className="form-annonce__status-actions" onClick={e => e.stopPropagation()}>
        {allowedTransitions.map(targetStatusId => (
          <Button 
            key={targetStatusId}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(annonce.id_annonce, targetStatusId);
            }}
            variant={getButtonVariant(targetStatusId)}
            disabled={submittingId === annonce.id_annonce}
          >
            {getStatusName(targetStatusId)}
          </Button>
        ))}
      </div>
    );
  };

  // Filtrage par statut sélectionné
  const filteredAnnonces = React.useMemo(() => {
    if (statusFilter === 'all') return annonces;
    return annonces.filter(a => {
      const current = a?.currentStatus?.id_type_status_annonce ?? a?.id_type_status_annonce;
      return current === parseInt(statusFilter);
    });
  }, [annonces, statusFilter]);

  return (
    <div className="form-annonce">
      <div className="form-annonce__container">
        <div className="form-annonce__header">
          <h1 className="form-annonce__title">Gestion des annonces</h1>
        </div>
        <div className="form-annonce__header-info">
          <div className="form-annonce__filters">
            <label>
              Statut:
              <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
                <option value="all">Tous</option>
                {statusTypes.map(status => (
                  <option key={status.id_type_status_annonce} value={status.id_type_status_annonce}>
                    {status.valeur}
                  </option>
                ))}
              </select>
            </label>
            </div>
        </div>

        <div className="form-annonce__layout">
          <div className="form-annonce__list">
            <div className="form-annonce__list">
              {loading && (
                <div className="form-annonce__skeleton-list">
                  {[1,2,3].map(i => (
                    <div key={i} className="form-annonce__skeleton-item" />
                  ))}
                </div>
              )}

              {!loading && filteredAnnonces.length === 0 && (
                <div className="form-annonce__empty">
                  <div className="form-annonce__empty-icon">🗂️</div>
                  <h3>Aucune annonce à traiter</h3>
                  <p>Les annonces publiées ou refusées n’apparaissent plus ici.</p>
                  <Button onClick={fetchAnnonces} variant="ghost">Rafraîchir</Button>
                </div>
              )}

              {!loading && filteredAnnonces.map(annonce => (
                <div
                  key={annonce.id_annonce}
                  className={`form-annonce__item ${selectedAnnonce?.id_annonce === annonce.id_annonce ? 'form-annonce__item--selected' : ''}`}
                  onClick={() => toggleAnnonceDetails(annonce)}
                >
                <div className="form-annonce__item-summary">
                  <div className="form-annonce__item-main">
                    <h3>{annonce.Poste.valeur}</h3>
                    <div className="form-annonce__item-summary-content">
                      <p><strong>Unité:</strong> {annonce.Poste.Unite.nom}</p>
                      <p><strong>Ville:</strong> {annonce.Ville.valeur}</p>
                      <span className={`form-annonce__status-badge form-annonce__status-badge--${
                        (annonce.currentStatus?.id_type_status_annonce ?? annonce.id_type_status_annonce) === 1 ? 'pending' :
                        (annonce.currentStatus?.id_type_status_annonce ?? annonce.id_type_status_annonce) === 2 ? 'published' : 'rejected'
                      }`}>
                        {(() => {
                          const statusId = annonce.currentStatus?.id_type_status_annonce ?? annonce.id_type_status_annonce;
                          const status = statusTypes.find(s => s.id_type_status_annonce === statusId);
                          return status?.valeur || 'Statut inconnu';
                        })()}
                      </span>
                    </div>
                  </div>
                  <span className="form-annonce__expand-icon">
                    {selectedAnnonce?.id_annonce === annonce.id_annonce ? '▼' : '▶'}
                  </span>
                </div>

                {selectedAnnonce?.id_annonce === annonce.id_annonce && (
                  <div className="form-annonce__item-details" onClick={e => e.stopPropagation()}>
                    <div className="form-annonce__item-section">
                      <h4>Informations générales</h4>
                      <p><strong>Âge requis:</strong> {annonce.age_min} - {annonce.age_max} ans</p>
                      <p><strong>Genre:</strong> {annonce.Genre?.valeur || 'Tous'}</p>
                    </div>

                    <div className="form-annonce__item-section">
                      <h4>Formation requise</h4>
                      {annonce.niveauFiliereAnnonces.map(nf => (
                        <p key={nf.id_niveau_filiere_annonce}>
                          {nf.Niveau.valeur} en {nf.Filiere.valeur}
                        </p>
                      ))}
                    </div>

                    <div className="form-annonce__item-section">
                      <h4>Langues requises</h4>
                      <p>{annonce.Langues.map(l => l.Langue.valeur).join(', ')}</p>
                    </div>

                    <div className="form-annonce__item-section">
                      <h4>Qualités recherchées</h4>
                      <p>{annonce.Qualites.map(q => q.Qualite.valeur).join(', ')}</p>
                    </div>

                    <div className="form-annonce__item-section">
                      <h4>Expérience requise</h4>
                      {annonce.Experiences.map(exp => (
                        <p key={exp.id_experience_annonce}>
                          {exp.nombre_annee} ans en {exp.Domaine.valeur}
                        </p>
                      ))}
                    </div>

                    <div className="form-annonce__actions">
                      {getStatusActions(annonce)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>

        {message && (
          <div className={`form-annonce__message form-annonce__message--${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormAnnonce;