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

  // Prochaine dispo
  const [prochaineModalOpen, setProchaineModalOpen] = useState(false);
  const [prochaineStack, setProchaineStack] = useState([]);
  const [prochaineIndex, setProchaineIndex] = useState(0);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const data = await rhService.getSuggestions();
      if (data.success) {
        setSuggestions(data.data);
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
      const resp = await rhService.createRhEntretien({
        id_rh_suggestion: selectedSuggestion.id_rh_suggestion,
        id_candidat: selectedSuggestion.candidat.id_candidat,
        date_entretien: `${selectedDate} ${selectedTime}`,
        duree: 60
      });

      if (resp.success) {
        setMessage('Entretien planifié avec succès');
        setMessageType('success');
        setSelectedSuggestion(null);
        setDisponibilites([]);
        setSelectedTime('');
        fetchSuggestions();
      } else {
        setMessage(resp.message || 'Erreur lors de la planification');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur lors de la planification');
      setMessageType('error');
    }
  };

  // === Prochaine dispo ===
  const handleProchaineDispo = (suggestion) => {
    if (!suggestion?.id_rh_suggestion) return;
    setSelectedSuggestion(suggestion);
    setProchaineModalOpen(true);
    setProchaineStack([]);
    setProchaineIndex(0);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleNextProchaine = async () => {
    try {
      let dateDepart;

      if (prochaineStack.length === 0) {
        if (!selectedDate || !selectedTime) {
          setMessage("Veuillez choisir une date et une heure de départ");
          setMessageType("error");
          return;
        }
        dateDepart = `${selectedDate} ${selectedTime}:00`;
      } else {
        dateDepart = prochaineStack[prochaineIndex].date_disponible;
      }

      const resp = await rhService.getProchaineDisponibilite(
        selectedSuggestion.id_rh_suggestion,
        dateDepart
      );

      if (resp.success) {
        const newStack = [...prochaineStack, resp.data];
        setProchaineStack(newStack);
        setProchaineIndex(newStack.length - 1);
      } else {
        setMessage(resp.message || "Pas de prochaine dispo");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur serveur");
      setMessageType("error");
    }
  };

  const handleBackProchaine = () => {
    if (prochaineIndex > 0) {
      setProchaineIndex(prochaineIndex - 1);
    }
  };

  const handleConfirmProchaine = () => {
    if (prochaineStack[prochaineIndex]) {
      setMessage(`Entretien confirmé le ${formatDateTime(prochaineStack[prochaineIndex].date_disponible)}`);
      setMessageType('success');
      setProchaineModalOpen(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('rhLoggedIn');
    sessionStorage.removeItem('rhData');
    alert("Vous avez été déconnecté");
    window.location.href = '/rh/login';
  };

  if (loading) return <div className="rh-suggestions__loading">Chargement...</div>;

  return (
    <div className="rh-suggestions">
      <div className="rh-suggestions__container">
        <div className="rh-suggestions__header">
          <h1 className="rh-suggestions__title">Suggestions des unités</h1>
          <p className="rh-suggestions__subtitle">Gérez les demandes d'entretien des unités</p>
        </div>
        <form onSubmit={handleLogout}>
          <Button type="submit">
            Se Deconnecter
          </Button>
        </form>

        <div className="rh-suggestions__list">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id_rh_suggestion} className="rh-suggestions__item">
              <div className="rh-suggestions__item-info">
                <div className="rh-suggestions__header-info">
                  <h3>Unité: {suggestion.entretien?.unite?.nom}</h3>
                  <span className="rh-suggestions__date">
                    Suggéré le: {formatDateTime(suggestion.date_suggestion)}
                  </span>
                </div>

                <div className="rh-suggestions__candidate">
                  <h4>Informations du candidat :</h4>
                  <p>{suggestion.candidat?.Tier?.nom} {suggestion.candidat?.Tier?.prenom}</p>
                  <p>Email: {suggestion.candidat?.Tier?.email}</p>
                  <p>CV: {suggestion.candidat?.cv}</p>
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
                      {/* <div>
                        Statuts:
                        {suggestion.status?.length > 0 ? (
                          suggestion.status.map((s, i) => (
                            <div key={i}>
                              {s.typeStatus.valeur} (depuis le {formatDateTime(s.date_changement)})
                            </div>
                          ))
                        ) : (
                          "Aucun statut"
                        )}
                      </div> */}


                </div>
              </div>

              <div className="rh-suggestions__item-actions" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button variant="success" onClick={() => handleDisponibilites(suggestion)}>
                  Confirmer
                </Button>
                <Button variant="danger" onClick={async () => {
                  await rhService.updateStatusSuggestion({
                    id_rh_suggestion: suggestion.id_rh_suggestion,
                    id_type_status_suggestion: 2 // Invalide
                  });
                  fetchSuggestions();
                }}>Annuler</Button>
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
                <Button variant="success" onClick={handleConfirmEntretien}>
                  Confirmer
                </Button>
                <Button variant="secondary" onClick={() => setSelectedSuggestion(null)}>
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
