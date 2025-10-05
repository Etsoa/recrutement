// EmpContratEssaiList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from '../router/useNavigateHelper';
import { ROUTES } from '../router/routes';
import { ceoService } from '../services/ceoService';
import CeoHeader from './CeoHeader';
import ContractModal from './ContractModal';
import "../styles/EmpContratEssaiList.css";

const API_BASE = "http://localhost:5000/api/ceo";

const EmpContratEssaiList = () => {
  const navigate = useNavigate();
  const [contrats, setContrats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // État pour les filtres
  const [filters, setFilters] = useState({
    nom: '',
    statut: '',
    unite: '',
    joursRestants: ''
  });

  // Styles constants
  const styles = {
    container: {
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
    },
    title: {
      color: '#059669',
      marginBottom: '1.5rem',
      fontSize: '1.875rem',
      fontWeight: '600'
    },
    filterSection: {
      backgroundColor: '#f8fafc',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1.5rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      alignItems: 'center'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    filterLabel: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#475569'
    },
    filterInput: {
      padding: '0.5rem',
      borderRadius: '0.375rem',
      border: '1px solid #e2e8f0',
      fontSize: '0.875rem'
    },
    filterSelect: {
      padding: '0.5rem',
      borderRadius: '0.375rem',
      border: '1px solid #e2e8f0',
      fontSize: '0.875rem',
      minWidth: '150px'
    },
    filterButton: {
      backgroundColor: '#059669',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: 'auto',
      transition: 'background-color 0.2s ease'
    },
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      backgroundColor: '#f8fafc',
      color: '#475569',
      fontWeight: '600',
      fontSize: '0.875rem',
      padding: '0.75rem 1rem',
      textAlign: 'left',
      borderBottom: '1px solid #e2e8f0'
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid #e2e8f0',
      color: '#1e293b',
      fontSize: '0.875rem'
    },
    statusBadge: (jours) => {
      let bgColor = '#f0fdf4'; // Default light green
      let textColor = '#059669'; // Default green
      
      if (jours < 10) {
        bgColor = '#fef2f2';
        textColor = '#dc2626';
      } else if (jours < 30) {
        bgColor = '#fff7ed';
        textColor = '#ea580c';
      }
      
      return {
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: '9999px',
        padding: '0.25rem 0.75rem',
        fontWeight: '500',
        fontSize: '0.75rem',
        display: 'inline-block'
      };
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.5rem'
    },
    viewButton: {
      backgroundColor: '#059669',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    renewButton: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    loadingState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem',
      color: '#475569'
    },
    errorState: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '0.5rem',
      padding: '1rem',
      color: '#b91c1c'
    }
  };

  useEffect(() => {
    // Vérifier l'authentification
    if (!ceoService.isLoggedIn()) {
      navigate(ROUTES.LOGIN_CEO);
      return;
    }

    // Charger les contrats d'essai
    fetchContrats();
  }, [navigate]);

  // Calculate days remaining from contract start date and duration
  const calculateDaysRemaining = (dateDebut, duree) => {
    if (!dateDebut) return 0;
    
    try {
      const dateStart = new Date(dateDebut);
      if (isNaN(dateStart.getTime())) return 0;
      
      // Calculate end date (start date + duration in months)
      const dateEnd = new Date(dateStart);
      dateEnd.setMonth(dateStart.getMonth() + duree);
      
      // Calculate days remaining
      const today = new Date();
      const diffTime = dateEnd.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.error("Error calculating days remaining:", error);
      return 0;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Date invalide';
      return date.toLocaleDateString('fr-FR');
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Date invalide';
    }
  };

  // Get latest contract for each employee
  const getLatestContract = (contracts) => {
    if (!contracts || contracts.length === 0) return null;
    
    return contracts.reduce((latest, current) => {
      if (!latest) return current;
      
      const latestDate = new Date(latest.date_debut);
      const currentDate = new Date(current.date_debut);
      
      return currentDate > latestDate ? current : latest;
    }, null);
  };

  // Prepare contract data for display
  const prepareContractData = (employeeData) => {
    const contracts = employeeData.ContratEssais || [];
    const latestContract = getLatestContract(contracts);
    
    if (!latestContract) return null;
    
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
      jours_restants: calculateDaysRemaining(latestContract.date_debut, latestContract.duree)
    };
  };

  // Fetch contracts from API
  const fetchContrats = async () => {
    try {
      setLoading(true);
      // Get data from API
      const response = await ceoService.getEmpEnContratDEssai();
      
      if (response.success) {
        // Map employee data to contract display format
        const contratData = response.data
          .map(prepareContractData)
          .filter(contract => contract !== null);
          
        console.log("Prepared contract data:", contratData);
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

  // Fonction pour filtrer les contrats
  const filteredContrats = contrats.filter(contrat => {
    const nom = contrat?.nom || '';
    const prenom = contrat?.prenom || '';
    const unite = contrat?.unite || '';
    const joursRestants = contrat?.jours_restants || calculateDaysRemaining(contrat?.date_fin);
    
    return (
      (nom.toLowerCase().includes(filters.nom.toLowerCase()) || 
       prenom.toLowerCase().includes(filters.nom.toLowerCase())) &&
      (filters.unite === '' || unite === filters.unite) &&
      (filters.statut === '' || 
        (filters.statut === 'urgent' && joursRestants <= 10) || 
        (filters.statut === 'attention' && joursRestants > 10 && joursRestants <= 30) ||
        (filters.statut === 'ok' && joursRestants > 30)) &&
      (filters.joursRestants === '' || 
        (filters.joursRestants === 'moins10' && joursRestants <= 10) ||
        (filters.joursRestants === '10a30' && joursRestants > 10 && joursRestants <= 30) ||
        (filters.joursRestants === 'plus30' && joursRestants > 30))
    );
  });

  // Gérer les changements de filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      nom: '',
      statut: '',
      unite: '',
      joursRestants: ''
    });
  };

  // Voir le contrat d'un employé
  const handleViewContract = (contrat) => {
    setSelectedContract(contrat);
    setShowModal(true);
  };

  // Renouveler un contrat
  const handleRenewContract = async (contratId) => {
    try {
      // Trouver le contrat à renouveler
      const contratToRenew = contrats.find(c => c.id_contrat === contratId);
      
      if (contratToRenew) {
        // Appel à l'API pour renouveler le contrat (à implémenter)
        const response = await ceoService.renewContract(contratId, contratToRenew.duree_mois);
        
        if (response.success) {
          // Afficher le nouveau contrat dans le modal
          if (response.data && response.data.contrat) {
            setSelectedContract(response.data.contrat);
            setShowModal(true);
          }
          // Rafraîchir la liste des contrats
          fetchContrats();
        } else {
          alert(`Erreur: ${response.message}`);
        }
      }
    } catch (error) {
      console.error('Erreur lors du renouvellement du contrat:', error);
      alert('Erreur lors du renouvellement du contrat');
    }
  };

  if (loading) {
    return <p className="loading">Chargement des employés en contrat d'essai...</p>;
  }

  return (
    <div className="emp-contrat-table-container">
      <CeoHeader />
      
      <div style={styles.content}>
        <h1 style={styles.title}>Contrats d'essai</h1>
        
        {/* Section de filtres */}
        <div style={styles.filterSection}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Nom / Prénom</label>
            <input 
              type="text" 
              name="nom" 
              value={filters.nom} 
              onChange={handleFilterChange}
              style={styles.filterInput}
              placeholder="Rechercher..."
            />
          </div>
          
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Unité</label>
            <select 
              name="unite" 
              value={filters.unite} 
              onChange={handleFilterChange}
              style={styles.filterSelect}
            >
              <option value="">Toutes</option>
              <option value="Marketing">Marketing</option>
              <option value="RH">RH</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Statut</label>
            <select 
              name="statut" 
              value={filters.statut} 
              onChange={handleFilterChange}
              style={styles.filterSelect}
            >
              <option value="">Tous</option>
              <option value="urgent">Urgents (&lt; 10 jours)</option>
              <option value="attention">Attention (&lt; 30 jours)</option>
              <option value="ok">OK (&gt; 30 jours)</option>
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Jours restants</label>
            <select 
              name="joursRestants" 
              value={filters.joursRestants} 
              onChange={handleFilterChange}
              style={styles.filterSelect}
            >
              <option value="">Tous</option>
              <option value="moins10">Moins de 10 jours</option>
              <option value="10a30">Entre 10 et 30 jours</option>
              <option value="plus30">Plus de 30 jours</option>
            </select>
          </div>
          
          <button 
            onClick={resetFilters}
            style={{
              ...styles.filterButton,
              backgroundColor: '#64748b'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#475569'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#64748b'}
          >
            Réinitialiser
          </button>
        </div>
        
        {loading ? (
          <div style={styles.loadingState}>
            <div style={{
              border: '4px solid #f3f4f6',
              borderTop: '4px solid #059669',
              borderRadius: '50%',
              width: '2rem',
              height: '2rem',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }}></div>
            <p>Chargement des contrats...</p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : error ? (
          <div style={styles.errorState}>
            <p><strong>Erreur:</strong> {error}</p>
            <button 
              style={styles.viewButton} 
              onClick={() => window.location.reload()}
              onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
            >
              Réessayer
            </button>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nom</th>
                  <th style={styles.th}>Prénom</th>
                  <th style={styles.th}>Unité</th>
                  <th style={styles.th}>Poste</th>
                  <th style={styles.th}>Date de fin</th>
                  <th style={styles.th}>Jours restants</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContrats.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{...styles.td, textAlign: 'center', padding: '2rem'}}>
                      Aucun contrat trouvé
                    </td>
                  </tr>
                ) : (
                  filteredContrats.map((contrat) => {
                    const joursRestants = contrat.jours_restants || calculateDaysRemaining(contrat.date_fin);
                    
                    return (
                      <tr key={contrat.id_contrat || `contrat-${Math.random()}`}>
                        <td style={styles.td}>{contrat.nom || 'Non spécifié'}</td>
                        <td style={styles.td}>{contrat.prenom || 'Non spécifié'}</td>
                        <td style={styles.td}>{contrat.unite || 'Non spécifiée'}</td>
                        <td style={styles.td}>{contrat.poste || 'Non spécifié'}</td>
                        <td style={styles.td}>{formatDate(contrat.date_fin)}</td>
                        <td style={styles.td}>
                          <span style={styles.statusBadge(joursRestants)}>
                            {joursRestants} jour{joursRestants !== 1 ? 's' : ''}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.buttonGroup}>
                            <button 
                              style={styles.viewButton}
                              onClick={() => handleViewContract(contrat)}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
                              onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
                            >
                              Voir contrat
                            </button>
                            <button 
                              style={styles.renewButton}
                              onClick={() => handleRenewContract(contrat.id_contrat)}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                              onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
                            >
                              Renouveler
                            </button>
                          </div>
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
      
      {/* Modal pour afficher/télécharger un contrat */}
      {showModal && (
        <ContractModal 
          contract={selectedContract} 
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default EmpContratEssaiList;