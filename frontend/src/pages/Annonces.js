import React, { useState, useEffect, useCallback } from "react";
import AnnonceCard from "../components/AnnonceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { SearchBar, FilterSection, Pagination } from "../components";
import { annoncesService } from "../services/annoncesService";
import "../styles/AnnoncesPage.css";

function Annonces() {
  // ===== CONFIGURATION =====
  const USE_TEST_DATA = false; // Utiliser le backend réel
  const ITEMS_PER_PAGE = 3;
  
  // États pour les annonces
  const [allAnnonces, setAllAnnonces] = useState([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // États pour la recherche et les filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    ville: "",
    domaine: "",
    experience_min: "",
    niveau: ""
  });
  
  // États pour l'affichage des sections
  const [showSearch, setShowSearch] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculs pour la pagination
  const totalItems = filteredAnnonces.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAnnonces = filteredAnnonces.slice(startIndex, endIndex);
  
  const loadAnnonces = useCallback(async () => {
    setLoading(true);
    setError("");
    
    try {
        const response = await annoncesService.getAllAnnonces();
        if (response.success && response.data) {
          setAllAnnonces(response.data);
          setFilteredAnnonces(response.data);
        } else {
          throw new Error(response.message || 'Erreur lors du chargement des annonces');
        }
    } catch (err) {
      console.error('Erreur chargement annonces:', err);
      setError(err.message || 'Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  }, [USE_TEST_DATA]);

  useEffect(() => {
    loadAnnonces();
  }, [loadAnnonces]);

  // Fonction de recherche et filtrage
  useEffect(() => {
    let filtered = [...allAnnonces];

    // Recherche par mot-clé
    if (searchTerm) {
      filtered = filtered.filter(annonce =>
        annonce.Poste?.valeur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        annonce.Ville?.valeur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (annonce.ExperienceAnnonces || []).some(exp => 
          exp.Domaine?.valeur?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filtres
    if (filters.ville) {
      filtered = filtered.filter(annonce => annonce.Ville?.valeur === filters.ville);
    }

    if (filters.domaine) {
      filtered = filtered.filter(annonce =>
        (annonce.ExperienceAnnonces || []).some(exp => exp.Domaine?.valeur === filters.domaine)
      );
    }

    if (filters.experience_min) {
      const minExp = parseInt(filters.experience_min);
      filtered = filtered.filter(annonce =>
        (annonce.ExperienceAnnonces || []).some(exp => exp.nombre_annee >= minExp)
      );
    }

    if (filters.niveau) {
      filtered = filtered.filter(annonce =>
        (annonce.NiveauFiliereAnnonces || []).some(niv => niv.Niveau?.valeur === filters.niveau)
      );
    }

    setFilteredAnnonces(filtered);
    setCurrentPage(1);
  }, [allAnnonces, searchTerm, filters]);

  // Gestion des filtres
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Gestion des filtres pour FilterSection (format dropdown)
  const handleFilterSectionChange = (filterKey, values) => {
    // Pour les dropdowns, on prend la première valeur ou vide
    const value = Array.isArray(values) && values.length > 0 ? values[0] : "";
    handleFilterChange(filterKey, value);
  };

  // Préparer les filtres actifs pour FilterSection (format dropdown)
  const prepareActiveFilters = () => {
    const activeFilters = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        activeFilters[key] = [value]; // Convertir en tableau pour FilterSection
      }
    });
    return activeFilters;
  };

  // Préparer les données des filtres pour le composant FilterSection
  const prepareFiltersData = () => {
    const { villes, domaines, niveaux } = getFilterOptions();
    
    return [
      {
        key: "ville",
        name: "Ville",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        ),
        options: villes.map(ville => ({ value: ville, label: ville }))
      },
      {
        key: "domaine",
        name: "Domaine",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ),
        options: domaines.map(domaine => ({ value: domaine, label: domaine }))
      },
      {
        key: "experience_min",
        name: "Expérience",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6"/>
            <path d="M1 12h6m6 0h6"/>
          </svg>
        ),
        options: [
          { value: "0", label: "Débutant" },
          { value: "1", label: "1 an+" },
          { value: "2", label: "2 ans+" },
          { value: "3", label: "3 ans+" },
          { value: "5", label: "5 ans+" }
        ]
      },
      {
        key: "niveau",
        name: "Niveau",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        ),
        options: niveaux.map(niveau => ({ value: niveau, label: niveau }))
      }
    ];
  };

  // Gestion de la pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset des filtres
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      ville: "",
      domaine: "",
      experience_min: "",
      niveau: ""
    });
  };

  // Reset de la recherche seulement
  const resetSearch = () => {
    setSearchTerm("");
  };

  // Extraction des options pour les filtres
  const getFilterOptions = () => {
    const villes = [...new Set(allAnnonces.map(a => a.Ville?.valeur).filter(Boolean))];
    const domaines = [...new Set(allAnnonces.flatMap(a => (a.ExperienceAnnonces || []).map(exp => exp.Domaine?.valeur).filter(Boolean)))];
    const niveaux = [...new Set(allAnnonces.flatMap(a => (a.NiveauFiliereAnnonces || []).map(niv => niv.Niveau?.valeur).filter(Boolean)))];
    
    return { villes, domaines, niveaux };
  };

  const filtersData = prepareFiltersData();
  const activeFilters = prepareActiveFilters();

  if (loading) {
    return (
      <div className="annonces-page">
        <LoadingSpinner message="Chargement des offres d'emploi..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="annonces-page">
        <ErrorMessage
          title="Erreur de chargement"
          message={error}
          onRetry={loadAnnonces}
        />
      </div>
    );
  }

  return (
    <div className="annonces-page">
      <div className="annonces-container">
        <div className="page-header">
          <h1>Offres d'Emploi</h1>
          <p className="page-subtitle">
            {totalItems} poste{totalItems > 1 ? 's' : ''} trouvé{totalItems > 1 ? 's' : ''}
          </p>
        </div>

        {/* Section Recherche et Filtres */}
        <div className="search-filter-section">
          {/* Boutons de contrôle côte à côte */}
          <div className="control-buttons">
            <button 
              className={`control-btn ${showSearch ? 'active' : ''}`}
              onClick={() => setShowSearch(!showSearch)}
              title="Afficher/masquer la recherche"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              Recherche
            </button>
            
            <button 
              className={`control-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
              title="Afficher/masquer les filtres"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
              </svg>
              Filtres
            </button>

            {(searchTerm || Object.values(filters).some(f => f !== "")) && (
              <button 
                onClick={resetFilters}
                className="reset-all-btn"
                title="Réinitialiser tout"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                Réinitialiser tout
              </button>
            )}
          </div>

          {/* Barre de recherche (en dessous des boutons) */}
          {showSearch && (
            <div className="search-section">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClear={resetSearch}
                placeholder="Rechercher par poste, ville, domaine d'expertise..."
                showToggle={false}
                isVisible={true}
                fullWidth={true}
              />
            </div>
          )}

          {/* Section des filtres (en dessous de la recherche) */}
          {showFilters && (
            <div className="filters-section-wrapper">
              <FilterSection
                filters={filtersData}
                activeFilters={activeFilters}
                onFilterChange={handleFilterSectionChange}
                onResetFilters={resetFilters}
                showToggle={false}
                isVisible={true}
              />
            </div>
          )}
        </div>

        {/* Résultats */}
        {filteredAnnonces.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">📭</div>
            <h3>Aucune offre trouvée</h3>
            <p>Aucune offre d'emploi ne correspond à vos critères de recherche.</p>
            <button onClick={resetFilters} className="reset-search-btn">
              Réinitialiser la recherche
            </button>
          </div>
        ) : (
          <>
            {/* Liste des annonces */}
            <div className="annonces-list">
              {currentAnnonces.map((annonce, index) => (
                <div key={annonce.id_annonce || index} className="annonce-item">
                  <AnnonceCard annonce={annonce} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showInfo={true}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Annonces;