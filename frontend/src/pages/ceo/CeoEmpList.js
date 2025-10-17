import React, { useState, useEffect } from 'react';
import { ceoService } from '../../services';

const CeoEmpList = () => {
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    fetchEmployes();
  }, []);

  const fetchEmployes = async () => {
    try {
      const response = await ceoService.getAllEmployes();
      setEmployes(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleAcceptEmploye = async (employeId) => {
    try {
      await ceoService.acceptEmploye(employeId);
      fetchEmployes();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="ceo-emp-list">
      <h2>Liste des Employés</h2>
      <div className="employes-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Poste</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employes.map(emp => (
              <tr key={emp.id}>
                <td>{emp.nom}</td>
                <td>{emp.email}</td>
                <td>{emp.poste}</td>
                <td>{emp.status}</td>
                <td>
                  <button onClick={() => handleAcceptEmploye(emp.id_employe)}>
                    Accepter
                  </button>
                </td>
                <td>{emp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CeoEmpList;