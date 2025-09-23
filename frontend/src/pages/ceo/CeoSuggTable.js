import React, { useState, useEffect } from 'react';
import { ceoService } from '../../services';

const CeoSuggTable = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await ceoService.getAllSuggestions();
      setSuggestions(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="ceo-sugg-table">
      <h2>Suggestions RH</h2>
      <div className="suggestions-table">
        <table>
          <thead>
            <tr>
              <th>Candidat</th>
              <th>Poste</th>
              <th>Score</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map(sugg => (
              <tr key={sugg.id}>
                <td>{sugg.candidat}</td>
                <td>{sugg.poste}</td>
                <td>{sugg.score}</td>
                <td>{sugg.date}</td>
                <td>{sugg.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CeoSuggTable;