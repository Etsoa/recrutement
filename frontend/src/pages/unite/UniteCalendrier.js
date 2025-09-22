import React, { useState, useEffect } from 'react';
import { unitesService } from '../../services';
import '../../styles/RhCalendrier.css';
import { Button } from '../../components';

const UniteCalendrier = () => {
  // ===== ÉTAT LOCAL =====
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entretiens, setEntretiens] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [entretiensParJour, setEntretiensParJour] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  // ===== CONSTANTES =====
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // ===== EFFETS =====
  useEffect(() => {
    fetchEntretiensMois();
  }, [currentDate]);

  // ===== FONCTIONS UTILITAIRES =====
  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Non disponible';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  // ===== APPELS API =====
  const fetchEntretiensMois = async () => {
    setLoading(true);
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const start = new Date(year, month, 1).toISOString().split('T')[0];
      const end = new Date(year, month + 1, 0).toISOString().split('T')[0];

      const data = await unitesService.getEntretiensParMois(start, end);
      
      if (data && data.success) {
        setEntretiens(data.data || []);
      } else {
        setEntretiens([]);
        showMessage('Aucun entretien trouvé pour ce mois', 'info');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des entretiens:', err);
      setEntretiens([]);
      showMessage('Erreur lors du chargement des entretiens', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchEntretiensParJour = async (dateStr) => {
    setLoading(true);
    try {
      const data = await unitesService.getEntretiensParJour(dateStr);
      if (data && data.success) {
        setEntretiensParJour(data.data || []);
      } else {
        setEntretiensParJour([]);
        showMessage('Aucun entretien pour cette date', 'info');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des entretiens du jour:', err);
      setEntretiensParJour([]);
      showMessage('Erreur lors du chargement', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ===== ACTIONS ENTRETIENS =====
  const updateStatusEntretien = async (idEntretien, newStatus) => {
    try {
      const data = await unitesService.updateStatusUniteEntretien(idEntretien, newStatus);
      if (data && data.success) {
        showMessage('Statut mis à jour avec succès', 'success');
        // Rafraîchir les données
        if (selectedDate) {
          fetchEntretiensParJour(formatDateKey(selectedDate));
        }
        fetchEntretiensMois();
      } else {
        showMessage(data.message || 'Erreur lors de la mise à jour', 'error');
      }
    } catch (err) {
      console.error('Erreur:', err);
      showMessage('Erreur serveur', 'error');
    }
  };

  const createScore = async (idEntretien, score) => {
    if (!score || score < 0 || score > 20) {
      showMessage('Score invalide (0-20)', 'error');
      return;
    }

    try {
      const data = await unitesService.createScoreUniteEntretien(idEntretien, parseInt(score));
      if (data && data.success) {
        showMessage('Score ajouté avec succès', 'success');
        if (selectedDate) {
          fetchEntretiensParJour(formatDateKey(selectedDate));
        }
        fetchEntretiensMois();
      } else {
        showMessage(data.message || 'Erreur lors de l\'ajout du score', 'error');
      }
    } catch (err) {
      console.error('Erreur:', err);
      showMessage('Erreur serveur', 'error');
    }
  };

  const suggestToRh = async (idUniteEntretien, idCandidat) => {
    try {
      const data = await unitesService.suggestToRh(idUniteEntretien, idCandidat);
      if (data && data.success) {
        showMessage('Suggestion envoyée à la RH avec succès', 'success');
        if (selectedDate) {
          fetchEntretiensParJour(formatDateKey(selectedDate));
        }
      } else {
        showMessage(data.message || 'Erreur lors de la suggestion', 'error');
      }
    } catch (err) {
      console.error('Erreur:', err);
      showMessage('Erreur serveur', 'error');
    }
  };

  // ===== NAVIGATION CALENDRIER =====
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
    setSelectedDate(null);
    setEntretiensParJour([]);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
    setSelectedDate(null);
    setEntretiensParJour([]);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
    setEntretiensParJour([]);
  };

  // ===== GESTION SÉLECTION DATE =====
  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchEntretiensParJour(formatDateKey(date));
  };

  // ===== GÉNÉRATION CALENDRIER =====
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeek = firstDayOfMonth.getDay(); // 0 = Dimanche
    const daysInMonth = lastDayOfMonth.getDate();
    
    const days = [];
    
    // Jours du mois précédent pour remplir la première semaine
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonth.getDate() - i);
      days.push({
        date,
        isCurrentMonth: false,
        entretiens: getEntretiensForDate(date)
      });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        entretiens: getEntretiensForDate(date)
      });
    }
    
    // Jours du mois suivant pour compléter la grille
    const totalCells = Math.ceil(days.length / 7) * 7;
    for (let day = 1; days.length < totalCells; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        entretiens: getEntretiensForDate(date)
      });
    }
    
    return days;
  };

  const getEntretiensForDate = (date) => {
    const dateKey = formatDateKey(date);
    return entretiens.filter(entretien => {
      if (!entretien.date_entretien) return false;
      const entretienDate = new Date(entretien.date_entretien);
      return formatDateKey(entretienDate) === dateKey;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return formatDateKey(date) === formatDateKey(today);
  };

  const isSelected = (date) => {
    return selectedDate && formatDateKey(date) === formatDateKey(selectedDate);
  };

  // ===== RENDU =====
  const calendarDays = generateCalendarDays();

  return (
    <div className="rh-calendar-container">
      <div className="rh-calendar">
        
        {/* En-tête principal */}
        <div className="calendar-header-main">
          <div className="header-content">
            <div className="header-left">
              <div className="calendar-icon">
                📅
              </div>
              <div className="header-text">
                <h1>Calendrier des Entretiens</h1>
                <p>Gérez vos entretiens d'unité</p>
              </div>
            </div>
            
            <div className="header-right">
              <Button variant="secondary" onClick={goToToday} size="sm">
                Aujourd'hui
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className={`message-banner ${messageType}`}>
            {message}
          </div>
        )}

        {/* Navigation du calendrier */}
        <div className="calendar-navigation">
          <div className="nav-controls">
            <Button variant="ghost" onClick={goToPreviousMonth} size="sm">
              ← Précédent
            </Button>
            
            <div className="current-month">
              <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            </div>
            
            <Button variant="ghost" onClick={goToNextMonth} size="sm">
              Suivant →
            </Button>
          </div>
        </div>

        {/* Grille du calendrier */}
        <div className="calendar-grid-container">
          {loading && <div className="calendar-loading">Chargement...</div>}
          
          <div className="calendar-grid">
            {/* En-têtes des jours */}
            <div className="calendar-weekdays">
              {dayNames.map(day => (
                <div key={day} className="weekday-header">
                  {day}
                </div>
              ))}
            </div>

            {/* Jours du calendrier */}
            <div className="calendar-days">
              {calendarDays.map((dayInfo, index) => (
                <div
                  key={index}
                  className={`
                    calendar-day 
                    ${dayInfo.isCurrentMonth ? 'current-month' : 'other-month'}
                    ${isToday(dayInfo.date) ? 'today' : ''}
                    ${isSelected(dayInfo.date) ? 'selected' : ''}
                    ${dayInfo.entretiens.length > 0 ? 'has-events' : ''}
                  `}
                  onClick={() => dayInfo.isCurrentMonth && handleDateClick(dayInfo.date)}
                >
                  <span className="day-number">{dayInfo.date.getDate()}</span>
                  
                  {dayInfo.entretiens.length > 0 && (
                    <div className="entretiens-indicator">
                      <span className="entretiens-count">
                        {dayInfo.entretiens.length}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Détails du jour sélectionné */}
        {selectedDate && (
          <div className="day-details-panel">
            <div className="day-details-header">
              <h3>
                Entretiens du {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedDate(null)}
              >
                ✕
              </Button>
            </div>
            
            <div className="day-details-content">
              {loading ? (
                <div className="loading-state">Chargement des entretiens...</div>
              ) : entretiensParJour.length > 0 ? (
                <div className="entretiens-list">
                  {entretiensParJour.map((entretien, index) => (
                    <EntretienCard
                      key={index}
                      entretien={entretien}
                      onUpdateStatus={updateStatusEntretien}
                      onCreateScore={createScore}
                      onSuggestToRh={suggestToRh}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Aucun entretien prévu pour cette date</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== COMPOSANT CARTE ENTRETIEN =====
const EntretienCard = ({ entretien, onUpdateStatus, onCreateScore, onSuggestToRh }) => {
  const [scoreInput, setScoreInput] = useState('');

  const handleScoreSubmit = () => {
    if (scoreInput && !isNaN(scoreInput)) {
      onCreateScore(entretien.id_unite_entretien, parseInt(scoreInput));
      setScoreInput('');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'terminé':
      case 'termine':
        return '#22c55e';
      case 'a venir':
      case 'à venir':
        return '#f59e0b';
      case 'en attente':
        return '#64748b';
      default:
        return '#94a3b8';
    }
  };

  return (
    <div className="entretien-card">
      <div className="entretien-header">
        <div className="candidat-info">
          <h4>{entretien.prenom_candidat} {entretien.nom_candidat}</h4>
          <span className="poste-badge">{entretien.poste_nom}</span>
        </div>
        <div className="entretien-meta">
          <span className="entretien-time">
            {entretien.date_entretien ? new Date(entretien.date_entretien).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            }) : 'Heure non définie'}
          </span>
          <span className="entretien-duration">
            ({entretien.duree || 60} min)
          </span>
        </div>
      </div>

      <div className="entretien-details">
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{entretien.email_candidat || 'Non renseigné'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Contact:</span>
            <span className="detail-value">{entretien.contact_candidat || 'Non renseigné'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Statut:</span>
            <span 
              className="status-badge" 
              style={{ backgroundColor: getStatusColor(entretien.status_entretien) }}
            >
              {entretien.status_entretien || 'A venir'}
            </span>
          </div>
          {entretien.score && (
            <div className="detail-item">
              <span className="detail-label">Score:</span>
              <span className="score-value">{entretien.score}/20</span>
            </div>
          )}
        </div>
      </div>

      <div className="entretien-actions">
        {entretien.status_entretien?.toLowerCase() === 'a venir' && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onUpdateStatus(entretien.id_unite_entretien, 2)}
          >
            Marquer terminé
          </Button>
        )}

        {entretien.status_entretien?.toLowerCase() === 'terminé' && !entretien.score && (
          <div className="score-input-group">
            <input
              type="number"
              min="0"
              max="20"
              placeholder="Score /20"
              value={scoreInput}
              onChange={(e) => setScoreInput(e.target.value)}
              className="score-input"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleScoreSubmit}
              disabled={!scoreInput}
            >
              Valider
            </Button>
          </div>
        )}

        {entretien.score && parseInt(entretien.score) >= 10 && (
          <Button
            variant="success"
            size="sm"
            onClick={() => onSuggestToRh(entretien.id_unite_entretien, entretien.id_candidat)}
          >
            Suggérer à la RH
          </Button>
        )}

        {entretien.cv && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(`/uploads/cv/${entretien.cv}`, '_blank')}
          >
            Voir CV
          </Button>
        )}
      </div>

      {entretien.score && parseInt(entretien.score) < 10 && (
        <div className="warning-message">
          ⚠️ Score insuffisant pour une suggestion RH (minimum 10/20)
        </div>
      )}
    </div>
  );
};

export default UniteCalendrier;