import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import '../styles/FormAnnonce.css';
import rhService from '../services/rhService';

const STATUS_TYPES = {
  EN_COURS: 1,
  PUBLIE: 2,
  NON_PUBLIE: 3
};

const FormAnnonce = () => {
  const [annonces, setAnnonces] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const annoncesData = await rhService.getAllAnnonces();
        console.log('Réponse du serveur:', annoncesData);
        if (annoncesData.success) {
          setAnnonces(annoncesData.data);
        } else {
          setMessage(annoncesData.message || 'Erreur de chargement des données');
          setMessageType('error');
        }
      } catch (err) {
        console.error('Erreur détaillée:', err);
        setMessage('Erreur de connexion au serveur');
        setMessageType('error');
      }
    };
    fetchData();
  }, []);

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

      const response = await rhService.updateAnnonceStatus({
        id_annonce,
        id_type_status_annonce: newStatus,
        id_unite: 2
      });

      if (response.success) {
        const updatedAnnonces = annonces.map(annonce => {
          if (annonce.id_annonce === id_annonce) {
            return { ...annonce, id_type_status_annonce: newStatus };
          }
          return annonce;
        });
        setAnnonces(updatedAnnonces);
        setMessage('Statut mis à jour avec succès');
        setMessageType('success');
      }
    } catch (err) {
      setMessage('Erreur lors de la mise à jour du statut');
      setMessageType('error');
    }
  };

  const getStatusActions = (annonce) => {
    if (annonce.id_type_status_annonce === STATUS_TYPES.EN_COURS) {
      return (
        <div className="form-annonce__status-actions" onClick={e => e.stopPropagation()}>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(annonce.id_annonce, STATUS_TYPES.PUBLIE);
            }}
            variant="primary"
          >
            Publier
          </Button>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(annonce.id_annonce, STATUS_TYPES.NON_PUBLIE);
            }}
            variant="secondary"
          >
            Ne pas publier
          </Button>
        </div>
      );
    }
    return (
      <div onClick={e => e.stopPropagation()}>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(annonce.id_annonce, STATUS_TYPES.EN_COURS);
          }}
          variant="success"
        >
          Modifier le statut
        </Button>
      </div>
    );
  };

  return (
    <div className="form-annonce">
      <div className="form-annonce__container">
        <div className="form-annonce__header">
          <h1 className="form-annonce__title">Gestion des annonces</h1>
        </div>

        <div className="form-annonce__layout">
          <div className="form-annonce__list">
            {annonces.map(annonce => (
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
                        annonce.id_type_status_annonce === STATUS_TYPES.EN_COURS ? 'pending' :
                        annonce.id_type_status_annonce === STATUS_TYPES.PUBLIE ? 'published' : 'rejected'
                      }`}>
                        {annonce.id_type_status_annonce === STATUS_TYPES.EN_COURS ? 'En cours' :
                         annonce.id_type_status_annonce === STATUS_TYPES.PUBLIE ? 'Publié' : 'Non publié'}
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