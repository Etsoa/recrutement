import React, { useState, useEffect } from 'react';
import { useNavigate } from '../router/useNavigateHelper';
import { ROUTES } from "../router/routes";
import { ceoService } from "../services/ceoService";
import CeoHeader from "./CeoHeader";
import ContractModal from "./ContractModal";

const SuggestionTable = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    candidat: "",
    status: "",
    date: "",
  });
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [showContractModal, setShowContractModal] = useState(false);

  // Styles constants
  const styles = {
    container: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
    },
    title: {
      color: "#059669",
      marginBottom: "1.5rem",
      fontSize: "1.875rem",
      fontWeight: "600",
    },
    filterSection: {
      backgroundColor: "#f8fafc",
      borderRadius: "0.5rem",
      padding: "1rem",
      marginBottom: "1.5rem",
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      alignItems: "center",
    },
    filterGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    filterLabel: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#475569",
    },
    filterInput: {
      padding: "0.5rem",
      borderRadius: "0.375rem",
      border: "1px solid #e2e8f0",
      fontSize: "0.875rem",
    },
    filterSelect: {
      padding: "0.5rem",
      borderRadius: "0.375rem",
      border: "1px solid #e2e8f0",
      fontSize: "0.875rem",
      minWidth: "150px",
    },
    filterButton: {
      backgroundColor: "#059669",
      color: "#ffffff",
      border: "none",
      borderRadius: "0.375rem",
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "auto",
      transition: "background-color 0.2s ease",
    },
    tableContainer: {
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      overflow: "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#f8fafc",
      color: "#475569",
      fontWeight: "600",
      fontSize: "0.875rem",
      padding: "0.75rem 1rem",
      textAlign: "left",
      borderBottom: "1px solid #e2e8f0",
    },
    td: {
      padding: "1rem",
      borderBottom: "1px solid #e2e8f0",
      color: "#1e293b",
      fontSize: "0.875rem",
    },
    statusBadge: (status) => {
      let bgColor = "#f0fdf4"; // Default light green
      let textColor = "#059669"; // Default green

      if (status === "Invalide") {
        bgColor = "#fef2f2";
        textColor = "#dc2626";
      } else if (status === "En attente de validation") {
        bgColor = "#fff7ed";
        textColor = "#ea580c";
      }

      return {
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: "9999px",
        padding: "0.25rem 0.75rem",
        fontWeight: "500",
        fontSize: "0.75rem",
        display: "inline-block",
      };
    },
    buttonGroup: {
      display: "flex",
      gap: "0.5rem",
    },
    acceptButton: {
      backgroundColor: "#059669",
      color: "#ffffff",
      border: "none",
      borderRadius: "0.375rem",
      padding: "0.5rem 0.75rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    rejectButton: {
      backgroundColor: "#e11d48",
      color: "#ffffff",
      border: "none",
      borderRadius: "0.375rem",
      padding: "0.5rem 0.75rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    loadingState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1rem",
      color: "#475569",
    },
    errorState: {
      backgroundColor: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: "0.5rem",
      padding: "1rem",
      color: "#b91c1c",
    },
  };

  useEffect(() => {
    // Vérifier l'authentification
    if (!ceoService.isLoggedIn()) {
      navigate(ROUTES.LOGIN_CEO);
      return;
    }

    // Charger les suggestions
    fetchSuggestions();
  }, [navigate]);

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Date invalide';
      return date.toLocaleDateString('fr-FR');
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Date invalide';
    }
  };

  // Map suggestion data to a display format
  const mapSuggestionData = (suggestion) => {
    if (!suggestion) return {};
    
    // Get status text based on id
    const getStatusText = (statusId) => {
      switch(statusId) {
        case 1: return 'Valide';
        case 2: return 'Invalide';
        case 3: return 'En attente de validation';
        default: return 'Non spécifié';
      }
    };
    
    return {
      id_suggestion: suggestion.id_ceo_suggestion,
      candidat: suggestion.Candidat?.Tier ? 
        `${suggestion.Candidat.Tier.prenom || ''} ${suggestion.Candidat.Tier.nom || ''}`.trim() : 
        'Non spécifié',
      poste: 'Poste candidat', // This might need to be fetched from elsewhere
      unite: 'Unité RH', // This might need to be fetched from elsewhere
      rh: 'RH', // This would need to be fetched from elsewhere
      date: suggestion.date_suggestion,
      email: suggestion.Candidat?.Tier?.email || 'Non spécifié',
      status: getStatusText(suggestion.id_type_status_suggestion)
    };
  };

  // Fetch suggestions from API
  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await ceoService.getAllSuggestions();
      
      if (response.success) {
        // Map each suggestion to a display format
        const mappedSuggestions = response.data.map(mapSuggestionData);
        setSuggestions(mappedSuggestions);
      } else {
        setError(response.message || "Erreur lors du chargement des suggestions");
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les suggestions
  const filteredSuggestions = suggestions.filter((suggestion) => {
    // Check if properties exist before using them
    const candidatName = suggestion?.candidat || '';
    const suggestionStatus = suggestion?.status || '';
    const suggestionDate = suggestion?.date || '';
    
    return (
      candidatName.toLowerCase().includes((filters.candidat || '').toLowerCase()) &&
      (filters.status === "" || suggestionStatus === filters.status) &&
      (filters.date === "" || suggestionDate.includes(filters.date))
    );
  });

  // Gérer les changements de filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      candidat: "",
      status: "",
      date: "",
    });
  };

  // Gérer la validation d'une suggestion
  const handleAccept = async (suggestionId) => {
    try {
      const response = await ceoService.accepterSuggestion(suggestionId);

      if (response.success) {
        // Mettre à jour l'état local après validation réussie
        setSuggestions(
          suggestions.map((s) => {
            if (s.id_suggestion === suggestionId) {
              return { ...s, status: "Valide" };
            }
            return s;
          })
        );

        // Si le backend renvoie les données du contrat, les afficher
        if (response.data && response.data.contrat) {
          setSelectedSuggestion(response.data.contrat);
          setShowContractModal(true);
        }
      } else {
        alert(`Erreur: ${response.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de la validation de la suggestion:", error);
      alert("Erreur lors de la validation de la suggestion");
    }
  };

  // Gérer le rejet d'une suggestion
  const handleReject = async (suggestionId) => {
    try {
      const response = await ceoService.refuserSuggestion(suggestionId);

      if (response.success) {
        // Mettre à jour l'état local après rejet réussi
        setSuggestions(
          suggestions.map((s) => {
            if (s.id_suggestion === suggestionId) {
              return { ...s, status: "Invalide" };
            }
            return s;
          })
        );
      } else {
        alert(`Erreur: ${response.message}`);
      }
    } catch (error) {
      console.error("Erreur lors du rejet de la suggestion:", error);
      alert("Erreur lors du rejet de la suggestion");
    }
  };

  return (
    <div style={styles.container}>
      <CeoHeader />

      <div style={styles.content}>
        <h1 style={styles.title}>Suggestions de recrutement</h1>

        {/* Section de filtres */}
        <div style={styles.filterSection}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Candidat</label>
            <input
              type="text"
              name="candidat"
              value={filters.candidat}
              onChange={handleFilterChange}
              style={styles.filterInput}
              placeholder="Rechercher..."
            />
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Statut</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              style={styles.filterSelect}
            >
              <option value="">Tous</option>
              <option value="Valide">Validé</option>
              <option value="Invalide">Refusé</option>
              <option value="En attente de validation">En attente</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Date</label>
            <input
              type="text"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              style={styles.filterInput}
              placeholder="AAAA-MM-JJ"
            />
          </div>

          <button
            onClick={resetFilters}
            style={{
              ...styles.filterButton,
              backgroundColor: "#64748b",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#475569")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#64748b")}
          >
            Réinitialiser
          </button>
        </div>

        {loading ? (
          <div style={styles.loadingState}>
            <div
              style={{
                border: "4px solid #f3f4f6",
                borderTop: "4px solid #059669",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                animation: "spin 1s linear infinite",
                marginBottom: "1rem",
              }}
            ></div>
            <p>Chargement des suggestions...</p>
            <style>
              {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
            </style>
          </div>
        ) : error ? (
          <div style={styles.errorState}>
            <p>
              <strong>Erreur:</strong> {error}
            </p>
            <button
              style={styles.acceptButton}
              onClick={() => window.location.reload()}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#047857")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#059669")}
            >
              Réessayer
            </button>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Candidat</th>
                  <th style={styles.th}>Poste</th>
                  <th style={styles.th}>Unité</th>
                  <th style={styles.th}>RH</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuggestions.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{...styles.td, textAlign: "center", padding: "2rem"}}>
                      Aucune suggestion trouvée
                    </td>
                  </tr>
                ) : (
                  filteredSuggestions.map((suggestion) => (
                    <tr key={suggestion?.id_suggestion || 'unknown'}>
                      <td style={styles.td}>{suggestion?.id_suggestion || 'N/A'}</td>
                      <td style={styles.td}>{suggestion?.candidat || 'Non spécifié'}</td>
                      <td style={styles.td}>{suggestion?.poste || 'Non spécifié'}</td>
                      <td style={styles.td}>{suggestion?.unite || 'Non spécifié'}</td>
                      <td style={styles.td}>{suggestion?.rh || 'Non spécifié'}</td>
                      <td style={styles.td}>{formatDate(suggestion?.date)}</td>
                      <td style={styles.td}>
                        <span style={styles.statusBadge(suggestion?.status || '')}>
                          {suggestion?.status || 'Non spécifié'}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {suggestion?.status === "En attente de validation" ? (
                          <div style={styles.buttonGroup}>
                            <button
                              style={styles.acceptButton}
                              onClick={() => handleAccept(suggestion.id_suggestion)}
                              onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#047857")
                              }
                              onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#059669")
                              }
                            >
                              Accepter
                            </button>
                            <button
                              style={styles.rejectButton}
                              onClick={() => handleReject(suggestion.id_suggestion)}
                              onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#be123c")
                              }
                              onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#e11d48")
                              }
                            >
                              Refuser
                            </button>
                          </div>
                        ) : (
                          <span>{suggestion?.status === "Valide" ? "Acceptée" : "Refusée"}</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal pour afficher le contrat lorsqu'une suggestion est acceptée */}
      {showContractModal && (
        <ContractModal
          contract={selectedSuggestion}
          onClose={() => setShowContractModal(false)}
        />
      )}
    </div>
  );
};

export default SuggestionTable;