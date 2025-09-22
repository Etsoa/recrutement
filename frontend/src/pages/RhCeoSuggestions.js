import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import rhService from "../services/rhService";
import "../styles/RhCeoSuggestions.css";

const SuggestionsPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await rhService.getCeoSuggestions();
        setSuggestions(response.data || []);
      } catch (err) {
        console.error("Erreur lors du chargement des suggestions:", err);
        setMessage("Erreur lors du chargement des suggestions");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDateTime = (dateString) => {
    if (!dateString) return "Non disponible";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const getStatusInfo = (suggestion) => {
    const lastStatus = suggestion.StatusCeoSuggestions?.length
      ? suggestion.StatusCeoSuggestions[suggestion.StatusCeoSuggestions.length - 1]
      : null;
    return {
      value: lastStatus?.TypeStatusSuggestion?.valeur || "Non defini",
      date: lastStatus?.date_changement
    };
  };

  const getStatusClass = (status) => {
    const normalized = status.toLowerCase().replace(/\s+/g, '-');
    switch (normalized) {
      case 'valide': return 'status-valid';
      case 'invalide': return 'status-invalid';
      case 'en-attente-de-validation': return 'status-pending';
      default: return 'status-default';
    }
  };

  const filteredSuggestions = suggestions.filter(s => {
    const status = getStatusInfo(s).value.toLowerCase();
    const fullName = `${s.Candidat?.Tier?.nom} ${s.Candidat?.Tier?.prenom}`.toLowerCase();
    
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'valid' && status.includes('valide')) ||
      (filterStatus === 'invalid' && status.includes('invalide')) ||
      (filterStatus === 'pending' && status.includes('attente'));
    
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
      s.Candidat?.Tier?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatsData = () => {
    const stats = suggestions.reduce((acc, s) => {
      const status = getStatusInfo(s).value.toLowerCase();
      if (status.includes('valide')) acc.valid++;
      else if (status.includes('invalide')) acc.invalid++;
      else if (status.includes('attente')) acc.pending++;
      else acc.other++;
      return acc;
    }, { valid: 0, invalid: 0, pending: 0, other: 0 });
    
    return stats;
  };

  const stats = getStatsData();

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement des suggestions...</p>
        </div>
      </div>
    );
  }
  const handleLogout = () => {
    sessionStorage.removeItem('rhLoggedIn');
    sessionStorage.removeItem('rhData');
    alert("Vous avez été déconnecté");
    window.location.href = '/rh/login';
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1>Suggestions au CEO</h1>
          <p className="subtitle">Gestion des candidatures soumises au comite de direction</p>
        </div>

      </div>

      {/* Controls */}
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            Tous
          </button>
          <button
            className={`filter-tab ${filterStatus === 'valid' ? 'active' : ''}`}
            onClick={() => setFilterStatus('valid')}
          >
            Validees
          </button>
          <button
            className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            En attente
          </button>
          <button
            className={`filter-tab ${filterStatus === 'invalid' ? 'active' : ''}`}
            onClick={() => setFilterStatus('invalid')}
          >
            Invalidees
          </button>
        </div>
      </div>

      {message && <div className="error-message">{message}</div>}

      {/* Suggestions Grid */}
      <div className="suggestions-grid">
        {filteredSuggestions.length > 0 ? (
          filteredSuggestions.map((s) => {
            const statusInfo = getStatusInfo(s);
            return (
              <div
                key={s.id_ceo_suggestion}
                className="suggestion-card"
                onClick={() => setSelectedSuggestion(s)}
              >
                <div className="card-header">
                  <div className="candidate-info">
                    <div className="candidate-avatar">
                      {s.Candidat?.Tier?.nom?.charAt(0)}{s.Candidat?.Tier?.prenom?.charAt(0)}
                    </div>
                    <div className="candidate-details">
                      <h3 className="candidate-name">
                        {s.Candidat?.Tier?.nom} {s.Candidat?.Tier?.prenom}
                      </h3>
                      <p className="candidate-email">{s.Candidat?.Tier?.email || "—"}</p>
                    </div>
                  </div>
                  <div className={`status-badge ${getStatusClass(statusInfo.value)}`}>
                    {statusInfo.value}
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="info-row">
                    <span className="info-label">Suggestion</span>
                    <span className="info-value">{formatDateTime(s.date_suggestion)}</span>
                  </div>
                  {s.RhEntretien && (
                    <div className="info-row">
                      <span className="info-label">Entretien</span>
                      <span className="info-value">
                        {formatDateTime(s.RhEntretien.date_entretien)} ({s.RhEntretien.duree}min)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>Aucune suggestion trouvee</h3>
            <p>Aucune suggestion ne correspond aux critères de recherche.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedSuggestion && (
        <div className="modal-overlay" onClick={() => setSelectedSuggestion(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Details de la suggestion</h2>
              <button
                className="close-button"
                onClick={() => setSelectedSuggestion(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h3>Informations du candidat</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Nom complet</span>
                    <span className="detail-value">
                      {selectedSuggestion.Candidat?.Tier?.nom} {selectedSuggestion.Candidat?.Tier?.prenom}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">
                      {selectedSuggestion.Candidat?.Tier?.email || "—"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Statut de la suggestion</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Date de suggestion</span>
                    <span className="detail-value">{formatDateTime(selectedSuggestion.date_suggestion)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Statut actuel</span>
                    <div className={`status-badge ${getStatusClass(getStatusInfo(selectedSuggestion).value)}`}>
                      {getStatusInfo(selectedSuggestion).value}
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date du statut</span>
                    <span className="detail-value">
                      {getStatusInfo(selectedSuggestion).date ? formatDateTime(getStatusInfo(selectedSuggestion).date) : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {selectedSuggestion.RhEntretien && (
                <div className="detail-section">
                  <h3>Entretien planifie</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Date et heure</span>
                      <span className="detail-value">{formatDateTime(selectedSuggestion.RhEntretien.date_entretien)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Duree</span>
                      <span className="detail-value">{selectedSuggestion.RhEntretien.duree} minutes</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuggestionsPage;