import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import { ceoService } from '../services/ceoService';
import CeoHeader from './CeoHeader';

const EmployeCEOList = () => {
  const navigate = useNavigate();
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmploye, setSelectedEmploye] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

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
    statusBadge: (status) => {
      let bgColor = '#f0fdf4'; // Default light green
      let textColor = '#059669'; // Default green
      
      if (status === 'Inactif') {
        bgColor = '#fef2f2';
        textColor = '#dc2626';
      } else if (status === 'En période d\'essai') {
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
    },
    modal: {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      content: {
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        width: '100%',
        maxWidth: '32rem',
        overflow: 'hidden',
        position: 'relative'
      },
      header: {
        borderBottom: '1px solid #e2e8f0',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      title: {
        color: '#059669',
        fontSize: '1.125rem',
        fontWeight: '600',
        margin: 0
      },
      closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        color: '#64748b'
      },
      body: {
        padding: '1.5rem'
      },
      section: {
        marginBottom: '1.5rem'
      },
      sectionTitle: {
        color: '#059669',
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '0.75rem',
        paddingBottom: '0.25rem',
        borderBottom: '1px solid #e2e8f0'
      },
      infoRow: {
        display: 'flex',
        marginBottom: '0.5rem'
      },
      infoLabel: {
        fontWeight: '500',
        color: '#64748b',
        width: '40%'
      },
      infoValue: {
        color: '#1e293b',
        width: '60%'
      },
      footer: {
        borderTop: '1px solid #e2e8f0',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }
  };

  // Fetch employee data from API
  useEffect(() => {
    // Vérifier l'authentification du CEO
    if (!ceoService.isLoggedIn()) {
      navigate(ROUTES.LOGIN_CEO);
      return;
    }

    // Charger les données des employés
    const fetchEmployes = async () => {
      try {
        setLoading(true);
        const response = await ceoService.getAllEmployes();
        
        if (response.success) {
          console.log("Employees data:", response.data);
          setEmployes(response.data || []);
        } else {
          setError(response.message || 'Erreur lors du chargement des employés');
        }
      } catch (err) {
        console.error('Erreur de connexion:', err);
        setError('Erreur de connexion au serveur');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployes();
  }, [navigate]);

  // Handle view details action
  const handleViewDetails = (employeId) => {
    const employe = employes.find(emp => emp.id_employe === employeId);
    if (employe) {
      setSelectedEmploye(employe);
      setShowDetails(true);
    } else {
      console.error(`Employé ID ${employeId} non trouvé`);
      alert('Erreur lors du chargement des détails');
    }
  };

  // Determine the employee status for display
  const getEmployeeStatus = (employee) => {
    // Check if employee is in trial period (has active contract)
    const hasActiveTrialContract = employee.ContratEssais && employee.ContratEssais.length > 0;
    
    // Return the status from API with trial period indicator if applicable
    if (hasActiveTrialContract) {
      return "En période d'essai";
    }
    
    // Return the regular status from API
    return employee.type_status_employe || 'Non spécifié';
  };

  // Get status badge style based on status
  const getStatusBadgeStyle = (status) => {
    let bgColor = '#f0fdf4'; // Default light green
    let textColor = '#059669'; // Default green
    
    if (status === 'En période d\'essai') {
      bgColor = '#fff7ed';
      textColor = '#ea580c';
    } else if (status !== 'Actif') {
      bgColor = '#fef2f2';
      textColor = '#dc2626';
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
  };

  // Modal for employee details
  const DetailModal = () => {
    if (!selectedEmploye) return null;

    const status = selectedEmploye.ContratEssais && selectedEmploye.ContratEssais.length > 0 
      ? "En période d'essai" 
      : selectedEmploye.type_status_employe || 'Non spécifié';

    return (
      <div style={styles.modal.overlay}>
        <div style={styles.modal.content}>
          <div style={styles.modal.header}>
            <h3 style={styles.modal.title}>
              Détails de l'employé
            </h3>
            <button style={styles.modal.closeButton} onClick={() => setShowDetails(false)}>×</button>
          </div>
          
          <div style={styles.modal.body}>
            <div style={styles.modal.section}>
              <h4 style={styles.modal.sectionTitle}>Informations personnelles</h4>
              
              <div style={styles.modal.infoRow}>
                <span style={styles.modal.infoLabel}>Nom:</span>
                <span style={styles.modal.infoValue}>{selectedEmploye.nom || 'Non spécifié'}</span>
              </div>
              
              <div style={styles.modal.infoRow}>
                <span style={styles.modal.infoLabel}>Prénom:</span>
                <span style={styles.modal.infoValue}>{selectedEmploye.prenom || 'Non spécifié'}</span>
              </div>
              
              <div style={styles.modal.infoRow}>
                <span style={styles.modal.infoLabel}>Email:</span>
                <span style={styles.modal.infoValue}>{selectedEmploye.email || 'Non spécifié'}</span>
              </div>
              
              <div style={styles.modal.infoRow}>
                <span style={styles.modal.infoLabel}>Téléphone:</span>
                <span style={styles.modal.infoValue}>{selectedEmploye.contact || 'Non spécifié'}</span>
              </div>
              
              <div style={styles.modal.infoRow}>
                <span style={styles.modal.infoLabel}>Date de naissance:</span>
                <span style={styles.modal.infoValue}>{
                  selectedEmploye.date_naissance ? 
                  new Date(selectedEmploye.date_naissance).toLocaleDateString('fr-FR') : 
                  'Non spécifiée'
                }</span>
              </div>
              
              <div style={styles.modal.infoRow}>
                <span style={styles.modal.infoLabel}>Genre:</span>
                <span style={styles.modal.infoValue}>{selectedEmploye.genre || 'Non spécifié'}</span>
              </div>
            </div>
            
            <div style={styles.modal.section}>
              <h4 style={styles.modal.sectionTitle}>Informations professionnelles</h4>
              
              <div style={styles.modal.infoRow}>
                <span style={styles.modal.infoLabel}>Unité:</span>
                <span style={styles.modal.infoValue}>{selectedEmploye.unite || 'Non assignée'}</span>
              </div>
              
              <div style={styles.modal.infoRow}>
                <span style={styles.modal.infoLabel}>Poste:</span>
                <span style={styles.modal.infoValue}>{selectedEmploye.poste || 'Non spécifié'}</span>
              </div>
              
              <div style={styles.modal.infoRow}>
                <span style={styles.modal.infoLabel}>Statut:</span>
                <span style={styles.modal.infoValue}>{status}</span>
              </div>
            </div>
            
            {selectedEmploye.ContratEssais && selectedEmploye.ContratEssais.length > 0 && (
              <div style={styles.modal.section}>
                <h4 style={styles.modal.sectionTitle}>Contrats d'essai</h4>
                
                {selectedEmploye.ContratEssais.map((contrat, index) => (
                  <div key={index} style={{marginBottom: '0.75rem'}}>
                    <div style={styles.modal.infoRow}>
                      <span style={styles.modal.infoLabel}>Date de début:</span>
                      <span style={styles.modal.infoValue}>{
                        contrat.date_debut ? 
                        new Date(contrat.date_debut).toLocaleDateString('fr-FR') : 
                        'Non spécifiée'
                      }</span>
                    </div>
                    <div style={styles.modal.infoRow}>
                      <span style={styles.modal.infoLabel}>Durée:</span>
                      <span style={styles.modal.infoValue}>{contrat.duree} mois</span>
                    </div>
                    <div style={styles.modal.infoRow}>
                      <span style={styles.modal.infoLabel}>Date de fin:</span>
                      <span style={styles.modal.infoValue}>{
                        contrat.date_debut ? 
                        new Date(new Date(contrat.date_debut).setMonth(
                          new Date(contrat.date_debut).getMonth() + contrat.duree
                        )).toLocaleDateString('fr-FR') : 
                        'Non spécifiée'
                      }</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={styles.modal.footer}>
            <button
              style={{ ...styles.viewButton, backgroundColor: '#64748b' }}
              onClick={() => setShowDetails(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <CeoHeader />
      
      <div style={styles.content}>
        <h1 style={styles.title}>Liste des Employés</h1>
        
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
            <p>Chargement des données...</p>
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
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Unité</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employes.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{...styles.td, textAlign: 'center', padding: '2rem'}}>
                      Aucun employé trouvé
                    </td>
                  </tr>
                ) : (
                  employes.map((employe) => {
                    const status = getEmployeeStatus(employe);
                    return (
                      <tr key={employe?.id_employe || `emp-${Math.random()}`}>
                        <td style={styles.td}>{employe?.nom || 'Non spécifié'}</td>
                        <td style={styles.td}>{employe?.prenom || 'Non spécifié'}</td>
                        <td style={styles.td}>{employe?.email || 'Non spécifié'}</td>
                        <td style={styles.td}>{employe?.unite || 'Non assigné'}</td>
                        <td style={styles.td}>
                          <span style={getStatusBadgeStyle(status)}>
                            {status}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <button
                            style={styles.viewButton}
                            onClick={() => handleViewDetails(employe.id_employe)}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
                          >
                            Voir détails
                          </button>
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

export default EmployeCEOList;