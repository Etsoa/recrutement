import React, { useState, useEffect } from "react";
import { useNavigate } from '../../router/useNavigateHelper';
import { statService } from "../../services/statService";
import '../../styles/StatistiquesUnite.css';
import '../../styles/StatistiquesEmpty.css';

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
        setError('ID de l\'unité non trouvé. Veuillez vous reconnecter.');
        return;
      }

      const ageRange = customAgeRange || { age1: ageMin, age2: ageMax };
      
      // Validation des paramètres d'âge
      if (ageRange.age1 < 0 || ageRange.age2 < 0 || ageRange.age1 > ageRange.age2) {
        setError('Paramètres d\'âge invalides. L\'âge minimum doit être inférieur à l\'âge maximum.');
        return;
      }
      
      const response = await statService.getStatsByUnite(id_unite, ageRange);
      
      if (response && response.success) {
        // Contrôle supplémentaire des données côté frontend
        const data = response.data || {};
        
        // Vérification de la cohérence des données
        if (!data.hasData) {
          setStatistics({
            ...data,
            isEmpty: true,
            message: 'Aucune donnée de candidature disponible pour cette unité'
          });
        } else {
          setStatistics({
            ...data,
            isEmpty: false
          });
        }
      } else {
        setError(response?.message || 'Erreur lors de la récupération des statistiques');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques:', err);
      setError('Erreur de connexion. Veuillez vérifier votre connexion internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleAgeFilter = () => {
    // Validation des paramètres avant l'envoi
    if (ageMin < 0 || ageMax < 0) {
      setError('Les âges ne peuvent pas être négatifs');
      return;
    }
    
    if (ageMin > ageMax) {
      setError('L\'âge minimum doit être inférieur ou égal à l\'âge maximum');
      return;
    }
    
    if (ageMax > 150) {
      setError('L\'âge maximum ne peut pas dépasser 150 ans');
      return;
    }
    
    setError(null);
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
        {/* Message d'état vide */}
        {statistics?.isEmpty && (
          <div className="stats-empty-state">
            <div className="stats-empty-icon">📊</div>
            <h3 className="stats-empty-title">Aucune donnée disponible</h3>
            <p className="stats-empty-message">
              {statistics.message || 'Aucune candidature n\'a encore été soumise pour cette unité.'}
            </p>
            <div className="stats-empty-suggestions">
              <p>Suggestions :</p>
              <ul>
                <li>Vérifiez que des annonces ont été publiées</li>
                <li>Attendez que des candidats postulent</li>
                <li>Modifiez les critères de filtrage</li>
              </ul>
            </div>
          </div>
        )}

        {/* Contenu des statistiques si données disponibles */}
        {!statistics?.isEmpty && (
          <>
        {/* Résumé général */}
        <div className="stats-section">
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
        </div>

        {/* Section Filtre */}
        <div className="stats-section">
          <h2 className="stats-section-title">Filtre Personnalisé</h2>
          <div className="stats-grid-3">
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
          </div>
        </div>

        {/* Section Répartitions démographiques */}
        <div className="stats-section">
          <h2 className="stats-section-title">Répartitions Démographiques</h2>
          <div className="stats-grid-3">
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
          </div>
        </div>

        {/* Section Compétences et Qualifications */}
        <div className="stats-section">
          <h2 className="stats-section-title">Compétences et Qualifications</h2>
          <div className="stats-grid-3">
            {/* Répartition par langues */}
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">🌍</div>
                <h3 className="stats-card-title">Repartition par Nombre de Langues</h3>
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
                <h3 className="stats-card-title">Répartition par années d'expérience</h3>
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
        </>
        )}
      </div>
    </div>
  );
}

export default StatistiquesUnite;