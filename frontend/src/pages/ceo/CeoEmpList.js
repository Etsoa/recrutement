import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { ceoService } from '../../services/ceoService';
import CeoHeader from '../../components/CeoHeader';
import '../../styles/ceoEmpList.css';

const CeoEmpList = () => {
  const navigate = useNavigate();
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmploye, setSelectedEmploye] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getStatusBadgeClass = (status) => {
    if (status === "En période d'essai") return 'is-essai';
    if (status !== 'Actif') return 'is-inactif';
    return 'is-actif';
  };

  useEffect(() => {
    if (!ceoService.isLoggedIn()) { navigate(ROUTES.LOGIN_CEO); return; }
    const fetchEmployes = async () => {
      try {
        setLoading(true);
        const response = await ceoService.getAllEmployes();
        if (response.success) { setEmployes(response.data || []); } else { setError(response.message || 'Erreur lors du chargement des employés'); }
      } catch (err) { console.error('Erreur de connexion:', err); setError('Erreur de connexion au serveur'); }
      finally { setLoading(false); }
    };
    fetchEmployes();
  }, [navigate]);

  const handleViewDetails = (employeId) => {
    const employe = employes.find(emp => emp.id_employe === employeId);
    if (employe) { setSelectedEmploye(employe); setShowDetails(true); }
    else { console.error(`Employé ID ${employeId} non trouvé`); alert('Erreur lors du chargement des détails'); }
  };

  const getEmployeeStatus = (employee) => {
    const hasActiveTrialContract = employee.ContratEssais && employee.ContratEssais.length > 0;
    if (hasActiveTrialContract) { return "En période d'essai"; }
    return employee.type_status_employe || 'Non spécifié';
  };

  const DetailModal = () => {
    if (!selectedEmploye) return null;
    const status = selectedEmploye.ContratEssais && selectedEmploye.ContratEssais.length > 0 ? "En période d'essai" : selectedEmploye.type_status_employe || 'Non spécifié';
    return (
      <div className="ceo-emp__modal-overlay">
        <div className="ceo-emp__modal-content">
          <div className="ceo-emp__modal-header">
            <h3 className="ceo-emp__modal-title">Détails de l'employé</h3>
            <button className="ceo-emp__modal-close" onClick={() => setShowDetails(false)}>×</button>
          </div>
          <div className="ceo-emp__modal-body">
            <div className="ceo-emp__modal-section">
              <h4 className="ceo-emp__modal-section-title">Informations personnelles</h4>
              <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Nom:</span><span className="ceo-emp__modal-info-value">{selectedEmploye.nom || 'Non spécifié'}</span></div>
              <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Prénom:</span><span className="ceo-emp__modal-info-value">{selectedEmploye.prenom || 'Non spécifié'}</span></div>
              <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Email:</span><span className="ceo-emp__modal-info-value">{selectedEmploye.email || 'Non spécifié'}</span></div>
              <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Téléphone:</span><span className="ceo-emp__modal-info-value">{selectedEmploye.contact || 'Non spécifié'}</span></div>
              <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Date de naissance:</span><span className="ceo-emp__modal-info-value">{selectedEmploye.date_naissance ? new Date(selectedEmploye.date_naissance).toLocaleDateString('fr-FR') : 'Non spécifiée'}</span></div>
              <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Genre:</span><span className="ceo-emp__modal-info-value">{selectedEmploye.genre || 'Non spécifié'}</span></div>
            </div>
            <div className="ceo-emp__modal-section">
              <h4 className="ceo-emp__modal-section-title">Informations professionnelles</h4>
              <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Unité:</span><span className="ceo-emp__modal-info-value">{selectedEmploye.unite || 'Non assignée'}</span></div>
              <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Poste:</span><span className="ceo-emp__modal-info-value">{selectedEmploye.poste || 'Non spécifié'}</span></div>
              <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Statut:</span><span className="ceo-emp__modal-info-value">{status}</span></div>
            </div>
            {selectedEmploye.ContratEssais && selectedEmploye.ContratEssais.length > 0 && (
              <div className="ceo-emp__modal-section">
                <h4 className="ceo-emp__modal-section-title">Contrats d'essai</h4>
                {selectedEmploye.ContratEssais.map((contrat, index) => (
                  <div key={index} className="ceo-emp__modal-contrat-item">
                    <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Date de début:</span><span className="ceo-emp__modal-info-value">{contrat.date_debut ? new Date(contrat.date_debut).toLocaleDateString('fr-FR') : 'Non spécifiée'}</span></div>
                    <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Durée:</span><span className="ceo-emp__modal-info-value">{contrat.duree} mois</span></div>
                    <div className="ceo-emp__modal-info-row"><span className="ceo-emp__modal-info-label">Date de fin:</span><span className="ceo-emp__modal-info-value">{contrat.date_debut ? new Date(new Date(contrat.date_debut).setMonth(new Date(contrat.date_debut).getMonth() + contrat.duree)).toLocaleDateString('fr-FR') : 'Non spécifiée'}</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="ceo-emp__modal-footer">
            <button className="btn-view btn-secondary" onClick={() => setShowDetails(false)}>Fermer</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ceo-emp">
      <CeoHeader />
      <div className="ceo-emp__content">
        <h1 className="ceo-emp__title">Liste des Employés</h1>
        {loading ? (
          <div className="ceo-emp__loading">
            <div className="ceo-emp__spinner"></div>
            <p>Chargement des données...</p>
          </div>
        ) : error ? (
          <div className="ceo-emp__error">
            <p><strong>Erreur:</strong> {error}</p>
            <button className="btn-view" onClick={() => window.location.reload()}>Réessayer</button>
          </div>
        ) : (
          <div className="ceo-emp__table-container">
            <table className="ceo-emp__table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Unité</th>
                  <th>Statut</th>
                  <th>Voir détails</th>
                </tr>
              </thead>
              <tbody>
                {employes.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="ceo-emp__td--empty">Aucun employé trouvé</td>
                  </tr>
                ) : (
                  employes.map((employe) => {
                    const status = getEmployeeStatus(employe);
                    const badgeClass = getStatusBadgeClass(status);
                    return (
                      <tr key={employe?.id_employe || `emp-${Math.random()}`}>
                        <td>{employe?.nom || 'Non spécifié'}</td>
                        <td>{employe?.prenom || 'Non spécifié'}</td>
                        <td>{employe?.email || 'Non spécifié'}</td>
                        <td>{employe?.unite || 'Non assigné'}</td>
                        <td><span className={`status-badge ${badgeClass}`}>{status}</span></td>
                        <td>
                          <button className="btn-view" onClick={() => handleViewDetails(employe.id_employe)}>Voir détails</button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showDetails && <DetailModal />}
    </div>
  );
};

export default CeoEmpList;