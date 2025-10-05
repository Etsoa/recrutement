import React from 'react';
import HeaderUnite from './HeaderUnite';
import '../styles/StatistiquesUnite.css';

// Composant de démonstration pour tester le design
function StatistiquesDemo() {
  // Données de démonstration
  const demoStats = {
    totalCandidatures: 156,
    age_min: 22,
    age_max: 58,
    age_moyen: 31.5,
    byAgeRange: 45,
    ageRanges: [
      { tranche_age: '18-25 ans', total: 34 },
      { tranche_age: '26-35 ans', total: 67 },
      { tranche_age: '36-45 ans', total: 32 },
      { tranche_age: '46-55 ans', total: 18 },
      { tranche_age: '56+ ans', total: 5 }
    ],
    byVilles: [
      { ville: 'Antananarivo', total: 89 },
      { ville: 'Antsirabe', total: 23 },
      { ville: 'Fianarantsoa', total: 15 },
      { ville: 'Mahajanga', total: 12 },
      { ville: 'Toamasina', total: 10 },
      { ville: 'Toliary', total: 7 }
    ],
    byGenre: [
      { genre: 'Homme', total: 78 },
      { genre: 'Femme', total: 78 }
    ],
    byLangues: {
      '2 langues': 45,
      '3 langues': 67,
      '4+ langues': 23
    },
    byNiveau: [
      { niveau: 'Baccalauréat', nbr_candidats: 23 },
      { niveau: 'Licence', nbr_candidats: 67 },
      { niveau: 'Master', nbr_candidats: 45 },
      { niveau: 'Doctorat', nbr_candidats: 21 }
    ],
    byExperience: [
      { tranche_experience: '1-3 ans', nbr_candidats: 56 },
      { tranche_experience: '4-6 ans', nbr_candidats: 45 },
      { tranche_experience: '7-9 ans', nbr_candidats: 34 },
      { tranche_experience: '10+ ans', nbr_candidats: 21 }
    ]
  };

  return (
    <div className="stats-container">
      <HeaderUnite />
      
      <div className="stats-header">
        <h1 className="stats-title">Statistiques des Candidatures</h1>
        <p className="stats-subtitle">Analyse des candidats pour votre unité - Version Démo</p>
      </div>

      <div className="stats-content">
        <button className="stats-back-button">
          Retour
        </button>

        {/* Résumé général */}
        <div className="stats-grid">
          <div className="stats-card stats-summary">
            <div className="stats-card-header">
              <div className="stats-card-icon">📊</div>
              <h2 className="stats-card-title">Résumé Général</h2>
            </div>
            <div className="stats-summary-grid">
              <div className="stats-summary-item">
                <div className="stats-summary-value">{demoStats.totalCandidatures}</div>
                <div className="stats-summary-label">Total candidatures</div>
              </div>
              <div className="stats-summary-item">
                <div className="stats-summary-value">{demoStats.age_min}</div>
                <div className="stats-summary-label">Âge minimum</div>
              </div>
              <div className="stats-summary-item">
                <div className="stats-summary-value">{demoStats.age_max}</div>
                <div className="stats-summary-label">Âge maximum</div>
              </div>
              <div className="stats-summary-item">
                <div className="stats-summary-value">{Math.round(demoStats.age_moyen)}</div>
                <div className="stats-summary-label">Âge moyen</div>
              </div>
            </div>
          </div>

          {/* Filtre par âge */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">🎯</div>
              <h3 className="stats-card-title">Filtre par Âge</h3>
            </div>
            <div className="stats-filter-grid">
              <div className="stats-filter-group">
                <label className="stats-filter-label">Âge minimum</label>
                <input type="number" className="stats-filter-input" defaultValue="25" />
              </div>
              <div className="stats-filter-group">
                <label className="stats-filter-label">Âge maximum</label>
                <input type="number" className="stats-filter-input" defaultValue="35" />
              </div>
              <button className="stats-filter-button">Filtrer</button>
            </div>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fff8', borderRadius: '12px', textAlign: 'center' }}>
              <strong>Candidats dans la tranche 25-35 ans : {demoStats.byAgeRange}</strong>
            </div>
          </div>

          {/* Tranches d'âge */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">👥</div>
              <h3 className="stats-card-title">Répartition par Âge</h3>
            </div>
            <ul className="stats-list">
              {demoStats.ageRanges.map((item, index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{item.tranche_age}</span>
                  <span className="stats-list-value">{item.total}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Répartition par ville */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">🏙️</div>
              <h3 className="stats-card-title">Répartition par Ville</h3>
            </div>
            <ul className="stats-list">
              {demoStats.byVilles.map((item, index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{item.ville}</span>
                  <span className="stats-list-value">{item.total}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Répartition par genre */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">⚖️</div>
              <h3 className="stats-card-title">Répartition par Genre</h3>
            </div>
            <ul className="stats-list">
              {demoStats.byGenre.map((item, index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{item.genre}</span>
                  <span className="stats-list-value">{item.total}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Répartition par langues */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">🌍</div>
              <h3 className="stats-card-title">Candidats par Nombre de Langues</h3>
            </div>
            <ul className="stats-list">
              {Object.entries(demoStats.byLangues).map(([key, value], index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{key}</span>
                  <span className="stats-list-value">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Répartition par niveau d'études */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">🎓</div>
              <h3 className="stats-card-title">Répartition par Niveau d'Études</h3>
            </div>
            <ul className="stats-list">
              {demoStats.byNiveau.map((item, index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{item.niveau}</span>
                  <span className="stats-list-value">{item.nbr_candidats}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Répartition par expérience */}
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon">💼</div>
              <h3 className="stats-card-title">Répartition par Expérience</h3>
            </div>
            <ul className="stats-list">
              {demoStats.byExperience.map((item, index) => (
                <li key={index} className="stats-list-item">
                  <span className="stats-list-label">{item.tranche_experience}</span>
                  <span className="stats-list-value">{item.nbr_candidats}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatistiquesDemo;