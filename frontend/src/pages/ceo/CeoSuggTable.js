import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { ceoService } from '../../services/ceoService';
import CeoHeader from '../../components/CeoHeader';
import ContractModal from '../../components/ContractModal';
import '../../styles/CeoSuggTable.css';

const CeoSuggTable = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ candidat: '', status: '', date: '' });
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showAcceptForm, setShowAcceptForm] = useState(false);
  const [acceptForm, setAcceptForm] = useState({ date_debut: '', duree: 3, id_poste: '', id_tiers: '' });

  useEffect(() => {
    if (!ceoService.isLoggedIn()) { navigate(ROUTES.LOGIN_CEO); return; }
    fetchSuggestions();
  }, [navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Date invalide';
      return date.toLocaleDateString('fr-FR');
    } catch (e) { return 'Date invalide'; }
  };

  const mapSuggestionData = (suggestion) => {
    if (!suggestion) return {};
    const getStatusText = (statusId) => {
      switch (statusId) {
        case 1: return 'Valide';
        case 2: return 'Invalide';
        case 3: return 'En attente de validation';
        default: return 'Non spécifié';
      }
    };
    return {
      id_suggestion: suggestion.id_ceo_suggestion,
      candidat: suggestion.Candidat?.Tier ? `${suggestion.Candidat.Tier.prenom || ''} ${suggestion.Candidat.Tier.nom || ''}`.trim() : 'Non spécifié',
      poste: suggestion.Candidat?.Annonce?.Poste?.valeur || 'Poste candidat',
      id_poste: suggestion.Candidat?.Annonce?.Poste?.id_poste,
      unite: suggestion.Candidat?.unite || 'Unité RH',
      rh: suggestion.RH?.nom || 'RH',
      date: suggestion.date_suggestion,
      email: suggestion.Candidat?.Tier?.email || 'Non spécifié',
      status: getStatusText(suggestion.id_type_status_suggestion),
      id_tiers: suggestion.Candidat?.id_tiers
    };
  };

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ceoService.getAllSuggestions();
      if (response.success) {
        const mapped = (response.data || []).map(mapSuggestionData);
        setSuggestions(mapped);
      } else {
        setError(response.message || 'Erreur lors du chargement des suggestions');
      }
    } catch (err) {
      console.error('Erreur suggestions:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const filteredSuggestions = suggestions.filter((s) => {
    const name = (s?.candidat || '').toLowerCase();
    const status = s?.status || '';
    const date = s?.date || '';
    return (
      name.includes((filters.candidat || '').toLowerCase()) &&
      (filters.status === '' || status === filters.status) &&
      (filters.date === '' || date.includes(filters.date))
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => setFilters({ candidat: '', status: '', date: '' });

  const openAcceptForm = (sugg) => {
    setSelectedSuggestion(sugg);
    setAcceptForm({
      date_debut: new Date().toISOString().slice(0,10),
      duree: 3,
      id_poste: sugg?.id_poste || '',
      id_tiers: sugg?.id_tiers || ''
    });
    setShowAcceptForm(true);
  };

  const handleAcceptSubmit = async () => {
    try {
      if (!selectedSuggestion) return;
      const response = await ceoService.accepterSuggestion(selectedSuggestion.id_suggestion, {
        date_debut: acceptForm.date_debut,
        duree: Number(acceptForm.duree),
        id_poste: acceptForm.id_poste,
        id_tiers: acceptForm.id_tiers,
      });
      if (response.success) {
        setSuggestions((prev) => prev.map((s) => s.id_suggestion === selectedSuggestion.id_suggestion ? { ...s, status: 'Valide' } : s));
        setShowAcceptForm(false);
        if (response.data && response.data.contrat) {
          setSelectedSuggestion(response.data.contrat);
          setShowContractModal(true);
        }
      } else {
        alert(`Erreur: ${response.message}`);
      }
    } catch (err) {
      console.error('Erreur validation:', err);
      alert('Erreur lors de la validation de la suggestion');
    }
  };

  const handleReject = async (suggestionId) => {
    try {
      const response = await ceoService.refuserSuggestion(suggestionId);
      if (response.success) {
        setSuggestions((prev) => prev.map((s) => s.id_suggestion === suggestionId ? { ...s, status: 'Invalide' } : s));
      } else {
        alert(`Erreur: ${response.message}`);
      }
    } catch (err) {
      console.error('Erreur rejet:', err);
      alert("Erreur lors du rejet de la suggestion");
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'Invalide') return 'is-refused';
    if (status === 'En attente de validation') return 'is-pending';
    if (status === 'Valide') return 'is-accepted';
    return '';
  };

  return (
    <div className="ceo-sugg">
      <div className="ceo-sugg__content">
        <h1 className="ceo-sugg__title">Suggestions de recrutement</h1>

        <div className="ceo-sugg__filters">
          <div className="ceo-sugg__filter-group">
            <label className="ceo-sugg__filter-label">Candidat</label>
            <input type="text" name="candidat" value={filters.candidat} onChange={handleFilterChange} className="ceo-sugg__input" placeholder="Rechercher..." />
          </div>
          <div className="ceo-sugg__filter-group">
            <label className="ceo-sugg__filter-label">Statut</label>
            <select name="status" value={filters.status} onChange={handleFilterChange} className="ceo-sugg__select">
              <option value="">Tous</option>
              <option value="Valide">Validé</option>
              <option value="Invalide">Refusé</option>
              <option value="En attente de validation">En attente</option>
            </select>
          </div>
          <div className="ceo-sugg__filter-group">
            <label className="ceo-sugg__filter-label">Date</label>
            <input type="text" name="date" value={filters.date} onChange={handleFilterChange} className="ceo-sugg__input" placeholder="AAAA-MM-JJ" />
          </div>
          <button onClick={resetFilters} className="btn btn-secondary">Réinitialiser</button>
        </div>

        {loading ? (
          <div className="ceo-sugg__loading">
            <div className="ceo-sugg__spinner"></div>
            <p>Chargement des suggestions...</p>
          </div>
        ) : error ? (
          <div className="ceo-sugg__error">
            <p><strong>Erreur:</strong> {error}</p>
            <button className="btn" onClick={() => window.location.reload()}>Réessayer</button>
          </div>
        ) : (
          <div className="ceo-sugg__table-container">
            <table className="ceo-sugg__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Candidat</th>
                  <th>Poste</th>
                  <th>Unité</th>
                  <th>RH</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuggestions.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="ceo-sugg__td--empty">Aucune suggestion trouvée</td>
                  </tr>
                ) : (
                  filteredSuggestions.map((s) => (
                    <tr key={s?.id_suggestion || `sugg-${Math.random()}`}>
                      <td>{s?.id_suggestion || 'N/A'}</td>
                      <td>{s?.candidat || 'Non spécifié'}</td>
                      <td>{s?.poste || 'Non spécifié'}</td>
                      <td>{s?.unite || 'Non spécifié'}</td>
                      <td>{s?.rh || 'Non spécifié'}</td>
                      <td>{formatDate(s?.date)}</td>
                      <td><span className={`status-badge ${getStatusBadgeClass(s?.status || '')}`}>{s?.status || 'Non spécifié'}</span></td>
                      <td>
                        {s?.status === 'En attente de validation' ? (
                          <div className="ceo-sugg__actions">
                            <button className="btn" onClick={() => openAcceptForm(s)}>Accepter</button>
                            <button className="btn btn-danger" onClick={() => handleReject(s.id_suggestion)}>Refuser</button>
                          </div>
                        ) : (
                          <span>{s?.status === 'Valide' ? 'Acceptée' : 'Refusée'}</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showContractModal && (
        <ContractModal contract={selectedSuggestion} onClose={() => setShowContractModal(false)} />
      )}

      {showAcceptForm && (
        <div className="ceo-emp__modal-overlay">
          <div className="ceo-emp__modal-content">
            <div className="ceo-emp__modal-header">
              <h3 className="ceo-emp__modal-title">Valider la suggestion</h3>
              <button className="ceo-emp__modal-close" onClick={() => setShowAcceptForm(false)}>×</button>
            </div>
            <div className="ceo-emp__modal-body">
              <div className="ceo-emp__modal-section">
                <h4 className="ceo-emp__modal-section-title">Paramètres du contrat d'essai</h4>
                <div className="ceo-emp__modal-info-row">
                  <label className="ceo-emp__modal-info-label">ID Tiers</label>
                  <input type="text" className="ceo-sugg__input" value={acceptForm.id_tiers || ''} disabled />
                </div>
                <div className="ceo-emp__modal-info-row">
                  <label className="ceo-emp__modal-info-label">Date de début</label>
                  <input type="date" className="ceo-sugg__input" value={acceptForm.date_debut} onChange={(e)=>setAcceptForm(p=>({...p, date_debut: e.target.value}))} />
                </div>
                <div className="ceo-emp__modal-info-row">
                  <label className="ceo-emp__modal-info-label">Durée (mois)</label>
                  <input type="number" min="1" className="ceo-sugg__input" value={acceptForm.duree} onChange={(e)=>setAcceptForm(p=>({...p, duree: e.target.value}))} />
                </div>
                <div className="ceo-emp__modal-info-row">
                  <label className="ceo-emp__modal-info-label">Poste</label>
                  <input type="text" className="ceo-sugg__input" value={selectedSuggestion?.poste || ''} disabled />
                </div>
              </div>
            </div>
            <div className="ceo-emp__modal-footer">
              <button className="btn btn-secondary" onClick={()=>setShowAcceptForm(false)}>Annuler</button>
              <button className="btn" onClick={handleAcceptSubmit}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CeoSuggTable;