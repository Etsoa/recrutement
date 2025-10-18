import React, { useState, useEffect } from 'react';
import { statService } from '../../services';
import '../../styles/StatistiquesRh.css';
import '../../styles/StatistiquesEmpty.css';

const StatistiquesRh = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ageRange, setAgeRange] = useState({ age1: '', age2: '' });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async (customAgeRange = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        age1: customAgeRange.age1 || ageRange.age1 || 1,
        age2: customAgeRange.age2 || ageRange.age2 || 100
      };
      
      // Validation des paramètres
      if (params.age1 < 0 || params.age2 < 0 || params.age1 > params.age2) {
        setError('Paramètres d\'âge invalides. Vérifiez vos critères de filtrage.');
        return;
      }
      
      const response = await statService.getRhStats(params);
      
      if (response && response.success && response.data) {
        // Contrôle supplémentaire des données côté frontend
        const data = response.data;
        
        // Vérification si les données sont vides
        if (!data.hasData) {
          setStats({
            ...data,
            isEmpty: true,
            message: 'Aucune donnée de candidature disponible dans le système'
          });
        } else {
          setStats({
            ...data,
            isEmpty: false
          });
        }
      } else {
        throw new Error(response?.message || 'Données invalides reçues du serveur');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques RH:', error);
      setError(error.message || 'Erreur lors du chargement des statistiques');
      // Définir des données par défaut en cas d'erreur
      setStats({
        totalCandidatures: 0,
        ageMin: 0,
        ageMax: 0,
        ageMoyen: 0,
        byAge: [],
        byVille: [],
        byGenre: [],
        byLangues: {},
        byNiveau: [],
        byExperience: [],
        isEmpty: true,
        hasData: false
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAgeFilter = () => {
    // Validation des entrées
    if (ageRange.age1 && ageRange.age2) {
      const age1 = parseInt(ageRange.age1);
      const age2 = parseInt(ageRange.age2);
      
      if (age1 < 0 || age2 < 0) {
        setError('Les âges ne peuvent pas être négatifs');
        return;
      }
      
      if (age1 > age2) {
        setError('L\'âge minimum doit être inférieur ou égal à l\'âge maximum');
        return;
      }
      
      if (age2 > 150) {
        setError('L\'âge maximum ne peut pas dépasser 150 ans');
        return;
      }
      
      setError(null);
      fetchStatistics({ age1, age2 });
    } else {
      setError('Veuillez saisir des âges valides');
    }
  };

  const formatNumber = (num) => {
    return Number(num).toLocaleString('fr-FR');
  };

  if (loading) {
    return (
      <div className="stats-rh-container">
        <div className="stats-rh-loading">
          <div className="stats-rh-loading-spinner"></div>
          <p>Chargement des statistiques RH...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-rh-container">
        <div className="stats-rh-error">
          <h3>Erreur</h3>
          <p>{error}</p>
          <button onClick={() => fetchStatistics()} className="stats-rh-filter-button">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-rh-container">
      <div className="stats-rh-header">
        <h1 className="stats-rh-title">📊 Statistiques RH Générales</h1>
        <p className="stats-rh-subtitle">Analyse complète de tous les candidats</p>
      </div>

      <div className="stats-rh-content">
        {/* Message d'état vide */}
        {stats?.isEmpty && (
          <div className="stats-rh-empty-state">
            <div className="stats-rh-empty-icon">📊</div>
            <h3 className="stats-rh-empty-title">Aucune donnée disponible</h3>
            <p className="stats-rh-empty-message">
              {stats.message || 'Aucune candidature n\'a encore été soumise dans le système.'}
            </p>
            <div className="stats-rh-empty-suggestions">
              <p><strong>Suggestions :</strong></p>
              <ul>
                <li>Vérifiez que les unités ont publié des annonces</li>
                <li>Attendez que des candidats postulent aux annonces</li>
                <li>Modifiez les critères de filtrage par âge</li>
                <li>Contactez les responsables d'unités pour promouvoir les offres</li>
              </ul>
            </div>
          </div>
        )}

        {/* Contenu des statistiques si données disponibles */}
        {!stats?.isEmpty && (
          <>
        <div className="stats-rh-grid">
          <div className="stats-rh-card stats-rh-summary">
            <div className="stats-rh-card-header">
              <span className="stats-rh-card-icon">📈</span>
              <h2 className="stats-rh-card-title">Résumé Général</h2>
            </div>
            <div className="stats-rh-summary-grid">
              <div className="stats-rh-summary-item">
                <div className="stats-rh-summary-value">{formatNumber(stats.totalCandidatures || 0)}</div>
                <div className="stats-rh-summary-label">Total Candidatures</div>
              </div>
              <div className="stats-rh-summary-item">
                <div className="stats-rh-summary-value">{stats.ageMin || 0}</div>
                <div className="stats-rh-summary-label">Âge Minimum</div>
              </div>
              <div className="stats-rh-summary-item">
                <div className="stats-rh-summary-value">{stats.ageMax || 0}</div>
                <div className="stats-rh-summary-label">Âge Maximum</div>
              </div>
              <div className="stats-rh-summary-item">
                <div className="stats-rh-summary-value">{Math.round(stats.ageMoyen || 0)}</div>
                <div className="stats-rh-summary-label">Âge Moyen</div>
              </div>
            </div>
          </div>

          <div className="stats-rh-card">
            <div className="stats-rh-card-header">
              <span className="stats-rh-card-icon">🎯</span>
              <h3 className="stats-rh-card-title">Filtrer par Âge</h3>
            </div>
            <div className="stats-rh-filter-grid">
              <div className="stats-rh-filter-group">
                <label className="stats-rh-filter-label">Âge minimum</label>
                <input
                  type="number"
                  className="stats-rh-filter-input"
                  value={ageRange.age1}
                  onChange={(e) => setAgeRange({...ageRange, age1: e.target.value})}
                  placeholder="Ex: 25"
                />
              </div>
              <div className="stats-rh-filter-group">
                <label className="stats-rh-filter-label">Âge maximum</label>
                <input
                  type="number"
                  className="stats-rh-filter-input"
                  value={ageRange.age2}
                  onChange={(e) => setAgeRange({...ageRange, age2: e.target.value})}
                  placeholder="Ex: 45"
                />
              </div>
              <button onClick={handleAgeFilter} className="stats-rh-filter-button">
                Filtrer
              </button>
            </div>
          </div>

          <div className="stats-rh-card">
            <div className="stats-rh-card-header">
              <span className="stats-rh-card-icon">👥</span>
              <h3 className="stats-rh-card-title">Candidats par Tranches d'Âge</h3>
            </div>
            <ul className="stats-rh-list">
              {stats.byAge && stats.byAge.length > 0 ? (
                stats.byAge.map((tranche, index) => (
                  <li key={index} className="stats-rh-list-item">
                    <span className="stats-rh-list-label">{tranche.tranche_age}</span>
                    <span className="stats-rh-list-value">{formatNumber(tranche.total)}</span>
                  </li>
                ))
              ) : (
                <li className="stats-rh-list-item">
                  <span className="stats-rh-list-label">Aucune donnée disponible</span>
                  <span className="stats-rh-list-value">0</span>
                </li>
              )}
            </ul>
          </div>

          <div className="stats-rh-card">
            <div className="stats-rh-card-header">
              <span className="stats-rh-card-icon">🌍</span>
              <h3 className="stats-rh-card-title">Candidats par Ville</h3>
            </div>
            <ul className="stats-rh-list">
              {stats.byVille && stats.byVille.length > 0 ? (
                stats.byVille.slice(0, 10).map((ville, index) => (
                  <li key={index} className="stats-rh-list-item">
                    <span className="stats-rh-list-label">{ville.ville || 'Non spécifié'}</span>
                    <span className="stats-rh-list-value">{formatNumber(ville.total)}</span>
                  </li>
                ))
              ) : (
                <li className="stats-rh-list-item">
                  <span className="stats-rh-list-label">Aucune donnée disponible</span>
                  <span className="stats-rh-list-value">0</span>
                </li>
              )}
            </ul>
          </div>

          <div className="stats-rh-card">
            <div className="stats-rh-card-header">
              <span className="stats-rh-card-icon">⚧️</span>
              <h3 className="stats-rh-card-title">Candidats par Genre</h3>
            </div>
            <ul className="stats-rh-list">
              {stats.byGenre && stats.byGenre.length > 0 ? (
                stats.byGenre.map((genre, index) => (
                  <li key={index} className="stats-rh-list-item">
                    <span className="stats-rh-list-label">
                      {genre.genre === 'Masculin' ? '👨 Homme' : 
                       genre.genre === 'Féminin' ? '👩 Femme' : 
                       `${genre.genre}`}
                    </span>
                    <span className="stats-rh-list-value">{formatNumber(genre.total)}</span>
                  </li>
                ))
              ) : (
                <li className="stats-rh-list-item">
                  <span className="stats-rh-list-label">Aucune donnée disponible</span>
                  <span className="stats-rh-list-value">0</span>
                </li>
              )}
            </ul>
          </div>

          <div className="stats-rh-card">
            <div className="stats-rh-card-header">
              <span className="stats-rh-card-icon">🗣️</span>
              <h3 className="stats-rh-card-title">Candidats par Compétences Linguistiques</h3>
            </div>
            <ul className="stats-rh-list">
              {stats.byLangues && Object.keys(stats.byLangues).length > 0 ? (
                Object.entries(stats.byLangues).map(([category, total], index) => (
                  <li key={index} className="stats-rh-list-item">
                    <span className="stats-rh-list-label">{category}</span>
                    <span className="stats-rh-list-value">{formatNumber(total)}</span>
                  </li>
                ))
              ) : (
                <li className="stats-rh-list-item">
                  <span className="stats-rh-list-label">Aucune donnée disponible</span>
                  <span className="stats-rh-list-value">0</span>
                </li>
              )}
            </ul>
          </div>

          <div className="stats-rh-card">
            <div className="stats-rh-card-header">
              <span className="stats-rh-card-icon">🎓</span>
              <h3 className="stats-rh-card-title">Candidats par Niveau d'Éducation</h3>
            </div>
            <ul className="stats-rh-list">
              {stats.byNiveau && stats.byNiveau.length > 0 ? (
                stats.byNiveau.map((niveau, index) => (
                  <li key={index} className="stats-rh-list-item">
                    <span className="stats-rh-list-label">
                      {niveau.niveau === 'Baccalauréat' ? '🎯 Baccalauréat' :
                       niveau.niveau === 'Licence' ? '📚 Licence' :
                       niveau.niveau === 'Master' ? '🏆 Master' :
                       niveau.niveau === 'Doctorat' ? '👨‍🎓 Doctorat' :
                       niveau.niveau}
                    </span>
                    <span className="stats-rh-list-value">{formatNumber(niveau.nbr_candidats)}</span>
                  </li>
                ))
              ) : (
                <li className="stats-rh-list-item">
                  <span className="stats-rh-list-label">Aucune donnée disponible</span>
                  <span className="stats-rh-list-value">0</span>
                </li>
              )}
            </ul>
          </div>

          <div className="stats-rh-card">
            <div className="stats-rh-card-header">
              <span className="stats-rh-card-icon">💼</span>
              <h3 className="stats-rh-card-title">Candidats par Expérience Professionnelle</h3>
            </div>
            <ul className="stats-rh-list">
              {stats.byExperience && stats.byExperience.length > 0 ? (
                stats.byExperience.map((exp, index) => (
                  <li key={index} className="stats-rh-list-item">
                    <span className="stats-rh-list-label">
                      {exp.tranche_experience === 'Moins de 1 an' ? '🌱 ' + exp.tranche_experience :
                       exp.tranche_experience === '2-4 ans' ? '📈 ' + exp.tranche_experience :
                       exp.tranche_experience === '5-7 ans' ? '⭐ ' + exp.tranche_experience :
                       exp.tranche_experience === '+8 ans' ? '🏅 ' + exp.tranche_experience :
                       exp.tranche_experience}
                    </span>
                    <span className="stats-rh-list-value">{formatNumber(exp.total)}</span>
                  </li>
                ))
              ) : (
                <li className="stats-rh-list-item">
                  <span className="stats-rh-list-label">Aucune donnée disponible</span>
                  <span className="stats-rh-list-value">0</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default StatistiquesRh;