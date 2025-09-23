import React, { useState, useEffect } from 'react';
import { ceoService } from '../../services';

const CeoContratList = () => {
  const [contrats, setContrats] = useState([]);

  useEffect(() => {
    fetchContrats();
  }, []);

  const fetchContrats = async () => {
    try {
      const response = await ceoService.getContratsEssai();
      setContrats(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="ceo-contrat-list">
      <h2>Contrats d'Essai</h2>
      <div className="contrats-table">
        <table>
          <thead>
            <tr>
              <th>Employé</th>
              <th>Poste</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {contrats.map(contrat => (
              <tr key={contrat.id}>
                <td>{contrat.employe}</td>
                <td>{contrat.poste}</td>
                <td>{contrat.dateDebut}</td>
                <td>{contrat.dateFin}</td>
                <td>{contrat.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CeoContratList;