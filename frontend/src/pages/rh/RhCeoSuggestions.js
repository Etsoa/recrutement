import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../../components';
import { rhService } from '../../services';
import '../../styles/RhCeoSuggestions.css';

const RhCeoSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const data = await rhService.getAllCeoSuggestions();
      if (data.success) {
        setSuggestions(Array.isArray(data.data) ? data.data : []);
      } else {
        setMessage(data.message || 'Erreur lors du chargement');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur serveur');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionStatus = (s) => {
    const val = s?.StatusCeoSuggestions?.[0]?.TypeStatusSuggestion?.valeur;
    return val ? String(val).toLowerCase() : 'inconnu';
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Non disponible';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'valide':
      case 'validé':
        return '#176c2fff'; // Vert
      case 'invalide':
      case 'invalidé':
      case 'refuse':
      case 'refusé':
        return '#e74c3c'; // Rouge
      case 'en attente de validation':
      case 'en_attente':
        return '#f39c12'; // Orange
      default:
        return '#95a5a6'; // Gris
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'valide':
        return 'Validé par CEO';
      case 'invalide':
        return 'Refusé par CEO';
      case 'en attente de validation':
        return 'En attente';
      default:
        return status || 'Statut inconnu';
    }
  };

  const filteredSuggestions = useMemo(() => {
    if (filterStatus === 'all') return suggestions;
    return suggestions.filter(s => getSuggestionStatus(s) === filterStatus);
  }, [suggestions, filterStatus]);

  if (loading) {
    return (
      <div className="rh-ceo-suggestions-container">
        <div className="loading">Chargement des suggestions...</div>
      </div>
    );
  }

  return (
    <div className="rh-ceo-suggestions-container">
      <div className="rh-ceo-suggestions-header">
        <h1>Suggestions Envoyées au CEO</h1>
        <p className="description">
          Suivez ici l'état des suggestions de candidats que vous avez envoyées au CEO.
        </p>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </div>

      <div className="filters-section">
        <h3>Filtrer par statut:</h3>
        <div className="filter-buttons">
          <Button
            variant={filterStatus === 'all' ? 'primary' : 'ghost'}
            onClick={() => setFilterStatus('all')}
          >
            Toutes ({suggestions.length})
          </Button>
          <Button
            variant={filterStatus === 'en attente de validation' ? 'primary' : 'ghost'}
            onClick={() => setFilterStatus('en attente de validation')}
          >
            En attente ({suggestions.filter(s => getSuggestionStatus(s) === 'en attente de validation').length})
          </Button>
          <Button
            variant={filterStatus === 'valide' ? 'primary' : 'ghost'}
            onClick={() => setFilterStatus('valide')}
          >
            Validées ({suggestions.filter(s => getSuggestionStatus(s) === 'valide').length})
          </Button>
          <Button
            variant={filterStatus === 'invalide' ? 'primary' : 'ghost'}
            onClick={() => setFilterStatus('invalide')}
          >
            Refusées ({suggestions.filter(s => getSuggestionStatus(s) === 'invalide').length})
          </Button>
        </div>
      </div>

      {filteredSuggestions.length > 0 ? (
        <div className="ceo-suggestions-list">
          {filteredSuggestions.map((suggestion) => (
            <div key={suggestion.id_ceo_suggestion} className="ceo-suggestion-card">
              <div className="suggestion-header">
                <div className="candidat-info">
                  <h3>{suggestion?.Candidat?.Tier?.prenom || 'Prénom inconnu'} {suggestion?.Candidat?.Tier?.nom || ''}</h3>
                  {/* Poste / Unité non fournis dans la réponse actuelle */}
                </div>
                <div className="suggestion-meta">
                  <span className="suggestion-date">
                    Suggéré le: {formatDateTime(suggestion.date_suggestion)}
                  </span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(suggestion?.StatusCeoSuggestions?.[0]?.TypeStatusSuggestion?.valeur) }}
                  >
                    {getStatusText(suggestion?.StatusCeoSuggestions?.[0]?.TypeStatusSuggestion?.valeur)}
                  </span>
                </div>
              </div>

              <div className="suggestion-details">
                <div className="candidat-details-grid">
                  <div className="detail-item">
                    <strong>Email:</strong>
                    <span>{suggestion?.Candidat?.Tier?.email || 'N/A'}</span>
                  </div>
                  {suggestion?.RhEntretien?.date_entretien && (
                    <div className="detail-item">
                      <strong>Date entretien RH:</strong>
                      <span>{formatDateTime(suggestion.RhEntretien.date_entretien)}</span>
                    </div>
                  )}
                </div>

                {/* Section d'évaluation RH non fournie dans la réponse courante; on cache si non disponible */}

                {suggestion?.StatusCeoSuggestions?.[0]?.date_changement && (
                  <div className="status-history">
                    <p><strong>Dernière mise à jour:</strong> {formatDateTime(suggestion.StatusCeoSuggestions[0].date_changement)}</p>
                  </div>
                )}
              </div>

              <div className="suggestion-actions">
                {suggestion?.Candidat?.cv && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(`/uploads/cv/${suggestion.Candidat.cv}`, '_blank')}
                  >
                    Voir CV
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fetchSuggestions()} // Rafraîchir
                >
                  Actualiser
                </Button>
              </div>

              {getSuggestionStatus(suggestion) === 'valide' && (
                <div className="success-notice">
                  🎉 Ce candidat a été validé par le CEO ! Il peut maintenant être embauché.
                </div>
              )}

              {getSuggestionStatus(suggestion) === 'invalide' && suggestion.commentaire_ceo && (
                <div className="rejection-notice">
                  <strong>Commentaire CEO:</strong> {suggestion.commentaire_ceo}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-suggestions">
          <h3>
            {filterStatus === 'all' 
              ? 'Aucune suggestion envoyée' 
              : `Aucune suggestion ${filterStatus === 'valide' ? 'validée' : filterStatus === 'invalide' ? 'refusée' : 'en attente'}`
            }
          </h3>
          <p>
            {filterStatus === 'all' 
              ? 'Vous n\'avez encore envoyé aucune suggestion au CEO.'
              : 'Aucune suggestion ne correspond à ce filtre.'
            }
          </p>
          
          {filterStatus === 'all' && (
            <div className="suggestions-help">
              <h4>Comment suggérer un candidat au CEO ?</h4>
              <ol>
                <li>Le candidat doit d'abord passer l'entretien unité avec succès</li>
                <li>Organisez un entretien RH avec le candidat</li>
                <li>Attribuez-lui un score RH d'au moins 15/20</li>
                <li>Utilisez le bouton "Suggérer au CEO" dans le calendrier RH</li>
                <li>Suivez l'évolution de votre suggestion ici</li>
              </ol>
            </div>
          )}
        </div>
      )}

      <div className="statistics-section">
        <h3>Statistiques</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{suggestions.length}</span>
            <span className="stat-label">Total suggestions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {suggestions.filter(s => getSuggestionStatus(s) === 'valide').length}
            </span>
            <span className="stat-label">Validées</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {suggestions.filter(s => getSuggestionStatus(s) === 'en attente de validation').length}
            </span>
            <span className="stat-label">En attente</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {suggestions.filter(s => getSuggestionStatus(s) === 'invalide').length}
            </span>
            <span className="stat-label">Refusées</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RhCeoSuggestions;