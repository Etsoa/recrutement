import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import rhService from '../services/rhService';
import '../styles/RhSuggestions.css';

const RhSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [disponibilites, setDisponibilites] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');


  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const data = await rhService.getSuggestions();
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

  // Helpers statut
  const getCurrentStatusValue = (sugg) => {
    const last = sugg?.status && sugg.status.length > 0 ? sugg.status[sugg.status.length - 1] : null;
    const val = last?.typeStatus?.valeur || 'En attente de validation';
    return String(val);
  };

  const getCurrentStatusLc = (sugg) => getCurrentStatusValue(sugg).toLowerCase();

  const getStatusColor = (statusText) => {
    const s = (statusText || '').toLowerCase();
    if (s.includes('valide')) return '#176c2f';
    if (s.includes('invalide') || s.includes('refus')) return '#e74c3c';
    if (s.includes('attente')) return '#f39c12';
    return '#95a5a6';
  };

  const StatusBadge = ({ value }) => (
    <span
      className="rh-suggestions__status-badge"
      style={{
        backgroundColor: getStatusColor(value),
        color: '#fff',
        padding: '2px 8px',
        borderRadius: '999px',
        fontSize: '12px',
      }}
    >
      {value}
    </span>
  );

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

  // === Vérifier créneaux ===
  const handleDisponibilites = async (suggestion) => {
    if (!suggestion?.id_rh_suggestion) return;
    const date = suggestion.entretien?.date_entretien?.split('T')[0] || new Date().toISOString().split('T')[0];
    try {
  const resp = await rhService.getDisponibilites(suggestion.id_rh_suggestion, date);
      if (resp.success) {
        setDisponibilites(resp.data || []);
        setSelectedSuggestion(suggestion);
        setSelectedDate(date);
        setSelectedTime('');
      } else {
        setDisponibilites([]);
        setMessage(resp.message || 'Pas de créneaux disponibles');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur lors de la récupération des créneaux');
      setMessageType('error');
    }
  };

  // === Changer la date pour voir les créneaux ===
  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    if (!selectedSuggestion) return;

    try {
      const resp = await rhService.getDisponibilites(selectedSuggestion.id_rh_suggestion, date);
      if (resp.success) {
        setDisponibilites(resp.data || []);
      } else {
        setDisponibilites([]);
        setMessage(resp.message || 'Pas de créneaux disponibles pour cette date');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur lors de la récupération des créneaux');
      setMessageType('error');
    }
  };

  // === Réserver un créneau ===
  const handleConfirmEntretien = async () => {
    if (!selectedDate || !selectedTime) {
      setMessage('Veuillez sélectionner une date et une heure');
      setMessageType('error');
      return;
    }

    try {
      let response;
      // Si la suggestion a déjà un entretien planifié ou un statut
      if (selectedSuggestion.entretien?.date_entretien || selectedSuggestion.status?.length > 0) {
        response = await rhService.updateStatusSuggestion({
          id_rh_suggestion: selectedSuggestion.id_rh_suggestion,
          id_type_status_suggestion: 1, // Status "Validé"
          date_entretien: `${selectedDate} ${selectedTime}`
        });
        alert("Entretien mis à jour avec succès!");
      } else {
        // Sinon créer un nouvel entretien
        response = await rhService.createRhEntretien({
          id_rh_suggestion: selectedSuggestion.id_rh_suggestion,
          id_candidat: selectedSuggestion.candidat.id_candidat,
          date_entretien: `${selectedDate} ${selectedTime}`,
          duree: 60
        });
        alert("Nouvel entretien créé avec succès!");
      }

      if (response.success) {
        setMessage(response.message);
        setMessageType('success');
        setSelectedSuggestion(null);
        setDisponibilites([]);
        setSelectedTime('');
        fetchSuggestions();
      } else {
        setMessage(response.message || 'Erreur lors de la planification');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur lors de la planification');
      setMessageType('error');
    }
  };


  if (loading) return <div className="rh-suggestions__loading">Chargement...</div>;

  return (
    <div className="rh-suggestions">
      <div className="rh-suggestions__container">
        <div className="rh-suggestions__header">
          <h1 className="rh-suggestions__title">Suggestions des unités</h1>
          <p className="rh-suggestions__subtitle">Gérez les demandes d'entretien des unités</p>
        </div>

        <div className="rh-suggestions__list">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id_rh_suggestion} className="rh-suggestions__item">
              <div className="rh-suggestions__item-info">
                <div className="rh-suggestions__header-info">
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0 }}>Unité: {suggestion.entretien?.unite?.nom || '—'}</h3>
                    <StatusBadge value={getCurrentStatusValue(suggestion)} />
                    <span className="rh-suggestions__date" style={{ opacity: 0.8 }}>
                      Suggéré le: {formatDateTime(suggestion.date_suggestion)}
                    </span>
                  </div>
                </div>

                <div className="rh-suggestions__candidate">
                  <h4>Informations du candidat :</h4>
                  <p>{suggestion.candidat?.Tier?.nom} {suggestion.candidat?.Tier?.prenom}</p>
                  <p>Email: {suggestion.candidat?.Tier?.email || '—'}</p>
                  {suggestion.candidat?.cv && (
                    <p>CV: {suggestion.candidat.cv}</p>
                  )}
                </div>

                <div className="rh-suggestions__entretien">
                  <h4>Détails de l'entretien avec l'unite :</h4>
                  <p>Date: {formatDateTime(suggestion.entretien?.date_entretien)}</p>
                  <p>Durée: {suggestion.entretien?.duree || '-'} minutes</p>

                  {/* Dernier score */}
                  <p>
                    Score:{" "}
                    {suggestion.entretien?.scores?.length > 0
                      ? `${suggestion.entretien.scores[0].score}/20 (le ${formatDateTime(suggestion.entretien.scores[0].date_score)})`
                      : "Aucun score"}
                  </p>

                  {/* Dernier statut */}
                  <p>
                    Statut:{" "}
                    {suggestion.status?.length > 0
                      ? `${suggestion.status[suggestion.status.length - 1].typeStatus.valeur} (depuis le ${formatDateTime(suggestion.status[suggestion.status.length - 1].date_changement)})`
                      : "Aucun statut"}
                  </p>
                </div>
              </div>

              <div className="rh-suggestions__item-actions" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                {getCurrentStatusLc(suggestion).includes('invalide') ? (
                  <>
                    <Button variant="success" onClick={() => handleDisponibilites(suggestion)}>
                      Valider et planifier
                    </Button>
                    <Button variant="danger" disabled>
                      Déjà refusée
                    </Button>
                  </>
                ) : getCurrentStatusLc(suggestion).includes('valide') ? (
                  <>
                    <Button variant="secondary" onClick={() => handleDisponibilites(suggestion)}>
                      Replanifier
                    </Button>
                    <Button variant="danger" onClick={async () => {
                      await rhService.updateStatusSuggestion({
                        id_rh_suggestion: suggestion.id_rh_suggestion,
                        id_type_status_suggestion: 2
                      });
                      alert('Suggestion refusée!');
                      setMessage('Suggestion refusée');
                      setMessageType('success');
                      fetchSuggestions();
                    }}>
                      Ne pas valider
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="success" onClick={() => handleDisponibilites(suggestion)}>
                      Planifier
                    </Button>
                    <Button variant="danger" onClick={async () => {
                      await rhService.updateStatusSuggestion({
                        id_rh_suggestion: suggestion.id_rh_suggestion,
                        id_type_status_suggestion: 2
                      });
                      alert('Suggestion refusée!');
                      setMessage('Suggestion refusée');
                      setMessageType('success');
                      fetchSuggestions();
                    }}>
                      Ne pas valider
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modale créneaux pour confirmation */}
        {selectedSuggestion && (
          <div className="rh-suggestions__modal">
            <div className="rh-suggestions__modal-content">
              <h3>Planifier l'entretien</h3>
              <div className="rh-suggestions__form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </div>
              <div className="rh-suggestions__form-group">
                <label>Heure</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Sélectionnez une heure</option>
                  {disponibilites.map((heure) => (
                    <option key={heure} value={heure}>{heure}</option>
                  ))}
                </select>
              </div>
              <div className="rh-suggestions__modal-actions">
                <Button variant="success" onClick={() => {
                  handleConfirmEntretien();
                  setMessage('Entretien validé et planifié avec succès');
                  setMessageType('success');
                }}>
                  Confirmer
                </Button>
                <Button variant="secondary" onClick={() => {
                  setSelectedSuggestion(null);
                  setMessage('Planification annulée');
                  setMessageType('info');
                }}>
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className={`rh-suggestions__message rh-suggestions__message--${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RhSuggestions;