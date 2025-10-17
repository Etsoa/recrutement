import React, { useState, useEffect, useMemo } from 'react';
import { unitesService } from '../../services';
import '../../styles/RhCalendrier.css';
import { Button } from '../../components';

const UniteCalendrier = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entretiens, setEntretiens] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [entretiensParJour, setEntretiensParJour] = useState([]);
  const [message, setMessage] = useState('');

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  useEffect(() => {
    fetchEntretiensMois(currentDate);
  }, [currentDate]);

  // API calls
  const fetchEntretiensMois = async (monthDate) => {
    try {
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const start = new Date(year, month, 1).toISOString().split('T')[0];
      const end = new Date(year, month + 1, 0).toISOString().split('T')[0];

      const data = await unitesService.getEntretiensParMois(start, end);
      
      if (data.success) {
        setEntretiens(data.data);
      } else {
        setEntretiens([]);
        setMessage('Pas d\'entretiens pour ce mois');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur serveur');
    }
  };

  const handleSelectDate = async (day) => {
    setSelectedDate(day);
    const dayStr = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;

    try {
      const resp = await unitesService.getEntretiensParJour(dayStr);
      
      if (resp.success && resp.data) {
        const filtered = resp.data.filter(e => {
          const d = new Date(e.date_entretien);
          return d.getFullYear() === day.getFullYear() &&
                 d.getMonth() === day.getMonth() &&
                 d.getDate() === day.getDate();
        });
        setEntretiensParJour(filtered);
      } else {
        setEntretiensParJour([]);
      }
    } catch (err) {
      console.error(err);
      setEntretiensParJour([]);
    }
  };

  // Navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Génération du calendrier
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Ajustement pour que lundi soit le premier jour
    let firstDayWeekday = firstDayOfMonth.getDay();
    firstDayWeekday = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;
    
    const days = [];
    
    // Jours du mois précédent
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
        isPrevMonth: false
      });
    }
    
    // Jours du mois suivant pour compléter la grille
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isPrevMonth: false
      });
    }
    
    return days;
  };

  const hasEntretienOnDate = (date) => {
    return entretiens.some(e => {
      const entretienDate = new Date(e.date_entretien);
      return entretienDate.toDateString() === date.toDateString();
    });
  };

  const getEntretiensCount = (date) => {
    return entretiens.filter(e => {
      const entretienDate = new Date(e.date_entretien);
      return entretienDate.toDateString() === date.toDateString();
    }).length;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const calendarDays = generateCalendarDays();

  // États pour gestion des scores et suggestions
  const [scores, setScores] = useState({});
  const [sending, setSending] = useState(false);
  const [rhSuggestions, setRhSuggestions] = useState([]);
  const [loadingRhSuggestions, setLoadingRhSuggestions] = useState(false);

  // Helpers: formatting and status computation
  const isValidDate = (d) => d instanceof Date && !isNaN(d.getTime());
  const formatTimeOrDash = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (!isValidDate(d)) return '—';
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    if (hh === '00' && mm === '00') return '—';
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };
  const formatDateOrDash = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (!isValidDate(d)) return '—';
    return d.toLocaleDateString('fr-FR');
  };
  const computeStatus = (entretien) => {
    const hasScore = entretien.dernier_score !== null && entretien.dernier_score !== undefined;
    const d = new Date(entretien.date_entretien);
    const passed = isValidDate(d) && d.getTime() <= Date.now();
    return (passed || hasScore) ? 'Terminé' : 'À venir';
  };
  const statusClass = (label) => {
    const safe = (label || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return safe.toLowerCase().replace(/\s+/g, '-');
  };

  const handleScoreChange = (id, value) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  const submitScore = async (id) => {
    if (!id) {
      alert('Entretien introuvable (id manquant)');
      return;
    }
    const raw = scores[id];
    if (raw === undefined || raw === null || raw === '') {
      alert('Veuillez saisir un score !');
      return;
    }
    const num = Number(raw);
    if (Number.isNaN(num) || num < 0 || num > 20) {
      alert('Le score doit être un nombre entre 0 et 20');
      return;
    }
    setSending(true);
    const now = new Date();
    const dateScore = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ` +
                      `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    try {
      const resp = await unitesService.createScoreUniteEntretien({
        id_unite_entretien: Number(id),
        score: num,
        date_score: dateScore
      });
      if (resp.success) {
        setSelectedDate(null);
        alert("Score enregistré avec succès !");
      } else {
        alert(resp.message || "Erreur serveur");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setSending(false);
    }
  };

  const suggestToRh = async (id_unite_entretien, id_candidat) => {
    setSending(true);
    try {
      const resp = await unitesService.suggestToRh({ id_unite_entretien, id_candidat });
      if (resp.success) {
        alert("Suggestion envoyée à la RH !");
      } else {
        alert(resp.message || "Erreur serveur");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setSending(false);
    }
  };

  // Charger les suggestions RH existantes (pour éviter les doublons côté front)
  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        setLoadingRhSuggestions(true);
        const resp = await unitesService.getAllRhSuggestions();
        if (resp?.success && Array.isArray(resp.data)) {
          setRhSuggestions(resp.data);
        }
      } catch (e) {
        console.error('Erreur chargement suggestions RH:', e);
      } finally {
        setLoadingRhSuggestions(false);
      }
    };
    loadSuggestions();
  }, []);

  const isAlreadySuggested = (entretien) => {
    if (!entretien) return false;
    const idC = entretien.id_candidat;
    const idU = entretien.id_unite_entretien;
    return rhSuggestions.some(s => {
      const sameCandidat = s.id_candidat === idC;
      const sameEntretien = s.id_unite_entretien === idU;
      return sameCandidat || sameEntretien;
    });
  };

  const handleSuggest = async (entretien) => {
    if (!entretien?.id_unite_entretien || !entretien?.id_candidat) {
      alert('Données incomplètes pour la suggestion');
      return;
    }
    if (isAlreadySuggested(entretien)) {
      alert('Ce candidat a déjà été suggéré au RH');
      return;
    }
    setSending(true);
    try {
      const resp = await unitesService.suggestToRh({
        id_unite_entretien: entretien.id_unite_entretien,
        id_candidat: entretien.id_candidat
      });
      if (resp.success) {
        // Mémoriser localement pour bloquer les renvois
        setRhSuggestions(prev => ([...prev, { id_unite_entretien: entretien.id_unite_entretien, id_candidat: entretien.id_candidat }]));
        alert('Suggestion envoyée à la RH !');
      } else {
        alert(resp.message || 'Erreur serveur');
      }
    } catch (e) {
      console.error('Erreur suggestion RH:', e);
      alert('Erreur lors de la suggestion');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rh-calendar-container">
      <div className="rh-calendar">
        {/* Header */}
        <div className="calendar-header-main">
          <div className="header-content">
            <div className="header-left">
              <div className="calendar-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="header-text">
                <h1>Calendrier Unité</h1>
                <p>Gestion des entretiens unité</p>
              </div>
            </div>
            <div className="header-center">
              {/* Navigation du calendrier */}
              <div className="calendar-navigation">
                <button onClick={goToPreviousMonth} className="nav-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"></polyline>
                  </svg>
                </button>

                <h2 className="month-title">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>

                <button onClick={goToNextMonth} className="nav-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div className="header-right">
              <div className="calendar-jump">
                <div className="month-year-selector">
                  {/* Mois */}
                  <select
                    value={currentDate.getMonth()}
                    onChange={(e) => setCurrentDate(new Date(currentDate.getFullYear(), Number(e.target.value), 1))}
                  >
                    {monthNames.map((m, i) => (
                      <option key={i} value={i}>{m}</option>
                    ))}
                  </select>

                  {/* Année */}
                  <select
                    value={currentDate.getFullYear()}
                    onChange={(e) => setCurrentDate(new Date(Number(e.target.value), currentDate.getMonth(), 1))}
                  >
                    {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendrier principal */}
        <div className="calendar-main">
          {/* En-têtes des jours */}
          <div className="calendar-weekdays">
            {dayNames.map((day) => (
              <div key={day} className="weekday-header">
                {day}
              </div>
            ))}
          </div>

          {/* Grille des jours */}
          <div className="calendar-grid">
            {calendarDays.map((dayObj, index) => {
              const { date, isCurrentMonth } = dayObj;
              const hasEntretien = hasEntretienOnDate(date);
              const entretiensCount = getEntretiensCount(date);
              const todayClass = isToday(date);

              return (
                <div
                  key={index}
                  onClick={() => handleSelectDate(date)}
                  className={`calendar-day 
                    ${!isCurrentMonth ? 'other-month' : ''}
                    ${todayClass ? 'today' : ''}
                    ${selectedDate && selectedDate.toDateString() === date.toDateString() ? 'selected' : ''}
                    ${hasEntretien ? 'has-entretien' : ''}
                  `}
                >
                  <span className="day-number">{date.getDate()}</span>
                  
                  {hasEntretien && (
                    <div className="entretien-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      {entretiensCount}
                    </div>
                  )}

                  {todayClass && <div className="today-indicator"></div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="calendar-message">
            {message}
          </div>
        )}

        {/* Modal détails du jour */}
        {selectedDate && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Entretiens du {selectedDate.toLocaleDateString('fr-FR', { 
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </h3>
              </div>

              <div className="modal-body">
                {entretiensParJour.length > 0 ? (
                  <div className="entretiens-list">
                    {entretiensParJour.map(entretien => (
                      <div key={entretien.id_unite_entretien} className="entretien-card">
                        <div className="entretien-header">
                          <div className="candidate-info">
                            <h4>{entretien.prenom_candidat} {entretien.nom_candidat}</h4>
                            <div className="unit-info">
                              RH Entretien ID: {entretien.id_rh_entretien} | Candidat ID: {entretien.id_candidat}
                            </div>
                          </div>
                          <div className={`status-badge ${statusClass(computeStatus(entretien))}`}>
                            {computeStatus(entretien) || '—'}
                          </div>
                        </div>

                        <div className="entretien-details">
                          <div className="detail-group">
                            <h5>📅 Informations Entretien</h5>
                            <div className="detail-item">
                              <span className="detail-label">Heure:</span>
                              <span className="detail-value">{new Date(entretien.date_entretien).toLocaleTimeString('fr-FR', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Durée:</span>
                              <span className="detail-value">{entretien.duree ? `${entretien.duree} minutes` : '—'}</span>
                            </div>
                            {entretien.status_date && (
                              <div className="detail-item">
                                <span className="detail-label">MAJ Status:</span>
                                <span className="detail-value">{formatDateOrDash(entretien.status_date)}</span>
                              </div>
                            )}
                            <div className="detail-item">
                              <span className="detail-label">Date de l'entretien:</span>
                              <span className="detail-value">{formatDateOrDash(entretien.date_entretien)}</span>
                            </div>
                            {/* Affichage du dernier score s'il existe */}
                            {entretien.dernier_score !== null && entretien.dernier_score !== undefined && (
                              <div className="detail-item">
                                <span className="detail-label">Dernier score:</span>
                                <span className="detail-value">
                                  {entretien.dernier_score}/20 le{' '}
                                  {new Date(entretien.date_dernier_score).toLocaleDateString('fr-FR')} à{' '}
                                  {new Date(entretien.date_dernier_score).toLocaleTimeString('fr-FR', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                            )}

                            <div className="entretien-actions">
                              {/* Input pour saisir un nouveau score */}
                              {entretien.id_unite_entretien ? (
                                <>
                                  <input
                                    type="number"
                                    min="0"
                                    max="20"
                                    placeholder="Score /20"
                                    value={scores[entretien.id_unite_entretien] ?? ''}
                                    onChange={(e) => handleScoreChange(entretien.id_unite_entretien, e.target.value)}
                                    disabled={sending}
                                  />

                                  {/* Bouton pour enregistrer le score */}
                                  <Button
                                    onClick={() => submitScore(entretien.id_unite_entretien)}
                                    disabled={sending || (scores[entretien.id_unite_entretien] === undefined || scores[entretien.id_unite_entretien] === '')}
                                  >
                                    Enregistrer Score
                                  </Button>
                                </>
                              ) : (
                                <span style={{ color: '#7f8c8d' }}>ID entretien manquant – impossible d'enregistrer le score</span>
                              )}

                              {/* Bouton Suggérer à la RH : s'affiche si un score existe en DB */}
                              {(entretien.dernier_score) && (
                                <Button
                                  onClick={() => handleSuggest(entretien)}
                                  disabled={sending || isAlreadySuggested(entretien) || loadingRhSuggestions}
                                >
                                  {isAlreadySuggested(entretien) ? 'Déjà suggéré' : 'Suggérer à la RH'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-entretiens">
                    <div className="no-entretiens-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <p>Aucun entretien prévu ce jour</p>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <Button onClick={() => setSelectedDate(null)} variant="secondary">
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniteCalendrier;