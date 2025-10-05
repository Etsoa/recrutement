import React, { useState, useEffect } from "react";
import { useNavigate } from '../../router/useNavigateHelper';
import { statService } from "../../services/statService";
import '../../styles/StatistiquesUnite.css';

function StatistiquesUnite() {
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(65);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async (customAgeRange = null) => {
    try {
      setLoading(true);
      setError(null);
      
      const id_unite = localStorage.getItem('id_unite');
      if (!id_unite) {
        setError('ID de l\'unité non trouvé');
        return;
      }

      const ageRange = customAgeRange || { age1: ageMin, age2: ageMax };
      const response = await statService.getStatsByUnite(id_unite, ageRange);
      
      if (response.success) {
        setStatistics(response.data);
      } else {
        setError(response.message || 'Erreur lors de la récupération des statistiques');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques:', err);
      setError('Erreur lors de la récupération des statistiques');
    } finally {
      setLoading(false);
    }
  };

  const handleAgeFilter = () => {
    fetchStatistics({ age1: ageMin, age2: ageMax });
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="stats-loading">
          <div className="stats-loading-spinner"></div>
          <p>Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-container">
        <div className="stats-content">
          <div className="stats-error">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h1 className="stats-title">Statistiques des Candidatures</h1>
        <p className="stats-subtitle">Analyse des candidats pour votre unité</p>
      </div>

      <div className="stats-content">
        {/* Résumé général */}
        <div className="stats-grid">
          <div className="stats-card stats-summary">
            <div className="stats-card-header">
              <div className="stats-card-icon">📊</div>
              <h2 className="stats-card-title">Résumé Général</h2>
            </div>
            <div className="stats-summary-grid">
              <div className="stats-summary-item">
                <div className="stats-summary-value">{statistics?.totalCandidatures || 0}</div>
                <div className="stats-summary-label">Total candidatures</div>
              </div>
              <div className="stats-summary-item">
                <div className="stats-summary-value">{statistics?.age_min || 0}</div>
                <div className="stats-summary-label">Âge minimum</div>
              </div>
              <div className="stats-summary-item">
                <div className="stats-summary-value">{statistics?.age_max || 0}</div>
                <div className="stats-summary-label">Âge maximum</div>
              </div>
              <div className="stats-summary-item">
                <div className="stats-summary-value">{Math.round(statistics?.age_moyen || 0)}</div>
                <div className="stats-summary-label">Âge moyen</div>
              </div>
            </div>
          </div>

          {/* Filtre par âge personnalisé */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">🎯</div>
              <h3 className="stats-card-title">Filtre par Âge</h3>
            </div>
            <div className="stats-filter-grid">
              <div className="stats-filter-group">
                <label className="stats-filter-label">Âge minimum</label>
                <input
                  type="number"
                  className="stats-filter-input"
                  value={ageMin}
                  onChange={(e) => setAgeMin(parseInt(e.target.value))}
                  min="1"
                  max="100"
                />
              </div>
              <div className="stats-filter-group">
                <label className="stats-filter-label">Âge maximum</label>
                <input
                  type="number"
                  className="stats-filter-input"
                  value={ageMax}
                  onChange={(e) => setAgeMax(parseInt(e.target.value))}
                  min="1"
                  max="100"
                />
              </div>
              <button className="stats-filter-button" onClick={handleAgeFilter}>
                Filtrer
              </button>
            </div>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fff8', borderRadius: '12px', textAlign: 'center' }}>
              <strong>Candidats dans la tranche {ageMin}-{ageMax} ans : {statistics?.byAgeRange || 0}</strong>
            </div>
          </div>

          {/* Tranches d'âge prédéfinies */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">👥</div>
              <h3 className="stats-card-title">Répartition par Âge</h3>
            </div>
            <ul className="stats-list">
              {statistics?.ageRanges?.map((item, index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{item.tranche_age}</span>
                  <span className="stats-list-value">{item.total}</span>
                </li>
              )) || <li className="stats-list-item"><span>Aucune donnée disponible</span></li>}
            </ul>
          </div>

          {/* Répartition par ville */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">🏙️</div>
              <h3 className="stats-card-title">Répartition par Ville</h3>
            </div>
            <ul className="stats-list">
              {statistics?.byVilles?.slice(0, 10).map((item, index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{item.ville}</span>
                  <span className="stats-list-value">{item.total}</span>
                </li>
              )) || <li className="stats-list-item"><span>Aucune donnée disponible</span></li>}
            </ul>
          </div>

          {/* Répartition par genre */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">⚖️</div>
              <h3 className="stats-card-title">Répartition par Genre</h3>
            </div>
            <ul className="stats-list">
              {statistics?.byGenre?.map((item, index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{item.genre}</span>
                  <span className="stats-list-value">{item.total}</span>
                </li>
              )) || <li className="stats-list-item"><span>Aucune donnée disponible</span></li>}
            </ul>
          </div>

          {/* Répartition par langues */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">🌍</div>
              <h3 className="stats-card-title">Candidats par Nombre de Langues</h3>
            </div>
            <ul className="stats-list">
              {statistics?.byLangues && Object.entries(statistics.byLangues).map(([key, value], index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{key}</span>
                  <span className="stats-list-value">{value}</span>
                </li>
              )) || <li className="stats-list-item"><span>Aucune donnée disponible</span></li>}
            </ul>
          </div>

          {/* Répartition par niveau d'études */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">🎓</div>
              <h3 className="stats-card-title">Répartition par Niveau d'Études</h3>
            </div>
            <ul className="stats-list">
              {statistics?.byNiveau?.map((item, index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{item.niveau}</span>
                  <span className="stats-list-value">{item.nbr_candidats}</span>
                </li>
              )) || <li className="stats-list-item"><span>Aucune donnée disponible</span></li>}
            </ul>
          </div>

          {/* Répartition par expérience */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">💼</div>
              <h3 className="stats-card-title">Répartition par Expérience</h3>
            </div>
            <ul className="stats-list">
              {statistics?.byExperience?.map((item, index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{item.tranche_experience}</span>
                  <span className="stats-list-value">{item.nbr_candidats}</span>
                </li>
              )) || <li className="stats-list-item"><span>Aucune donnée disponible</span></li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatistiquesUnite;