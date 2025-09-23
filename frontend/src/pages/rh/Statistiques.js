import React, { useState, useEffect } from 'react';
import { statService } from '../../services';

const Statistiques = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistiques();
  }, []);

  const fetchStatistiques = async () => {
    try {
      setLoading(true);
      const response = await statService.getAllStats();
      setStats(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement des statistiques...</div>;
  }

  return (
    <div className="statistiques-container">
      <h2>Statistiques RH</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Candidatures totales</h3>
          <p className="stat-number">{stats.totalCandidatures || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Entretiens programmés</h3>
          <p className="stat-number">{stats.totalEntretiens || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Annonces actives</h3>
          <p className="stat-number">{stats.annoncesActives || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Suggestions envoyées</h3>
          <p className="stat-number">{stats.totalSuggestions || 0}</p>
        </div>
      </div>
      
      <div className="charts-section">
        {/* Ajoutez vos graphiques ici */}
      </div>
    </div>
  );
};

export default Statistiques;