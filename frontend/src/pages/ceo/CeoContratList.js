import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { ceoService } from '../../services/ceoService';
import CeoHeader from '../../components/CeoHeader';
import ContractModal from '../../components/ContractModal';
import '../../styles/CeoContratList.css';

const CeoContratList = () => {
  const navigate = useNavigate();
  const [contrats, setContrats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({ nom: '', unite: '', statut: '', jours: '' });

  useEffect(() => {
    if (!ceoService.isLoggedIn()) { navigate(ROUTES.LOGIN_CEO); return; }
    fetchContrats();
  }, [navigate]);

  const calculateDaysRemaining = (dateDebut, duree) => {
    if (!dateDebut) return 0;
    try {
      const dateStart = new Date(dateDebut);
      if (isNaN(dateStart.getTime())) return 0;
      const dateEnd = new Date(dateStart);
      dateEnd.setMonth(dateStart.getMonth() + duree);
      const today = new Date();
      const diffTime = dateEnd.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return 0;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Date invalide';
      return date.toLocaleDateString('fr-FR');
    } catch {
      return 'Date invalide';
    }
  };

  const getLatestContract = (contracts) => {
    if (!contracts || contracts.length === 0) return null;
    return contracts.reduce((latest, current) => {
      if (!latest) return current;
      const latestDate = new Date(latest.date_debut);
      const currentDate = new Date(current.date_debut);
      return currentDate > latestDate ? current : latest;
    }, null);
  };

  const prepareContractData = (employeeData) => {
    const contracts = employeeData.ContratEssais || [];
    const latestContract = getLatestContract(contracts);
    if (!latestContract) return null;
    const nbContrats = contracts.length;
    const ordre = Math.min(nbContrats, 2);
    const dateFin = new Date(latestContract.date_debut);
    dateFin.setMonth(dateFin.getMonth() + latestContract.duree);
    return {
      id_contrat: latestContract.id_contrat_essai,
      id_employe: employeeData.id_employe,
      nom: employeeData.nom,
      prenom: employeeData.prenom,
      unite: employeeData.unite,
      poste: employeeData.poste,
      email: employeeData.email,
      date_debut: latestContract.date_debut,
      date_fin: dateFin.toISOString().split('T')[0],
      duree_mois: latestContract.duree,
      jours_restants: calculateDaysRemaining(latestContract.date_debut, latestContract.duree),
      nb_contrats: nbContrats,
      contrat_ordre: ordre
    };
  };

  const fetchContrats = async () => {
    try {
      setLoading(true);
      const response = await ceoService.getEmpEnContratDEssai();
      if (response.success) {
        const contratData = (response.data || [])
          .map(prepareContractData)
          .filter(Boolean);
        setContrats(contratData || []);
      } else {
        setError(response.message || 'Erreur lors du chargement des contrats');
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const filteredContrats = contrats.filter((c) => {
    const nameOk = (c.nom + ' ' + c.prenom).toLowerCase().includes((filters.nom || '').toLowerCase());
    const uniteOk = !filters.unite || c.unite === filters.unite;
    const jours = c.jours_restants;
    const statutOk = !filters.statut || (filters.statut === 'urgent' ? jours <= 10 : filters.statut === 'attention' ? jours <= 30 && jours > 10 : jours > 30);
    const joursOk = !filters.jours || (filters.jours === 'moins10' ? jours <= 10 : filters.jours === '10a30' ? jours > 10 && jours <= 30 : jours > 30);
    return nameOk && uniteOk && statutOk && joursOk;
  });

  const handleViewContract = (contrat) => { setSelectedContract(contrat); setShowModal(true); };
  const handleRenew = async (contrat) => {
    try {
      const resp = await ceoService.renewContract(contrat.id_contrat, contrat.duree_mois);
      if (!resp.success) return alert(resp.message || 'Renouvellement impossible');
      // On peut ouvrir directement le nouveau contrat si renvoyé
      if (resp.data && resp.data.contrat) { setSelectedContract(resp.data.contrat); setShowModal(true); }
      fetchContrats();
    } catch (e) { alert('Erreur lors du renouvellement'); }
  };

  if (loading) return <p className="ceo-contrat__loading">Chargement des employés en contrat d'essai...</p>;

  return (
    <div className="ceo-contrat">
      <div className="ceo-contrat__content">
        <h1 className="ceo-contrat__title">Contrats d'essai</h1>

        <div className="ceo-contrat__filters">
          <div className="ceo-contrat__filter-group">
            <label>Nom / Prénom</label>
            <input className="ceo-contrat__input" value={filters.nom} onChange={(e)=>setFilters(p=>({...p, nom: e.target.value}))} placeholder="Rechercher..." />
          </div>
          <div className="ceo-contrat__filter-group">
            <label>Statut</label>
            <select className="ceo-contrat__select" value={filters.statut} onChange={(e)=>setFilters(p=>({...p, statut: e.target.value}))}>
              <option value="">Tous</option>
              <option value="urgent">Urgents (&lt; 10 jours)</option>
              <option value="attention">Attention (&lt; 30 jours)</option>
              <option value="ok">OK (&gt; 30 jours)</option>
            </select>
          </div>
          <div className="ceo-contrat__filter-group">
            <label>Jours restants</label>
            <select className="ceo-contrat__select" value={filters.jours} onChange={(e)=>setFilters(p=>({...p, jours: e.target.value}))}>
              <option value="">Tous</option>
              <option value="moins10">Moins de 10 jours</option>
              <option value="10a30">Entre 10 et 30 jours</option>
              <option value="plus30">Plus de 30 jours</option>
            </select>
          </div>
          <button className="btn btn-secondary" onClick={()=>setFilters({ nom:'', unite:'', statut:'', jours:'' })}>Réinitialiser</button>
        </div>

        <div className="ceo-contrat__table-container">
          <table className="ceo-contrat__table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Unité</th>
                <th>Poste</th>
                <th>Contrat</th>
                <th>Date de fin</th>
                <th>Jours restants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContrats.length === 0 ? (
                <tr>
                  <td colSpan="7" className="ceo-contrat__td--empty">Aucun contrat trouvé</td>
                </tr>
              ) : (
                filteredContrats.map((contrat) => {
                  const joursRestants = contrat.jours_restants;
                  return (
                    <tr key={contrat.id_contrat || `contrat-${Math.random()}`}>
                      <td>{contrat.nom || 'Non spécifié'}</td>
                      <td>{contrat.prenom || 'Non spécifié'}</td>
                      <td>{contrat.unite || 'Non spécifiée'}</td>
                      <td>{contrat.poste || 'Non spécifié'}</td>
                      <td>{contrat.contrat_ordre === 1 ? '1er' : '2e'}</td>
                      <td>{formatDate(contrat.date_fin)}</td>
                      <td><span className={`status-badge ${joursRestants <= 10 ? 'is-urgent' : joursRestants <= 30 ? 'is-attention' : 'is-ok'}`}>{joursRestants} jour{joursRestants !== 1 ? 's' : ''}</span></td>
                      <td>
                        <div className="ceo-contrat__actions">
                          <button className="btn" onClick={() => handleViewContract(contrat)}>Voir contrat</button>
                          <button className="btn btn-renew" disabled={contrat.nb_contrats >= 2} title={contrat.nb_contrats >= 2 ? 'Limite de renouvellement atteinte' : ''} onClick={() => handleRenew(contrat)}>Renouveler</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <ContractModal contract={selectedContract} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CeoContratList;