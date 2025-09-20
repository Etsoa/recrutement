import React from 'react';
import '../styles/FilterSection.css';

const FilterSection = ({
  filters,
  activeFilters = {},
  onFilterChange,
  onResetFilters,
  showToggle = false,
  isVisible = true,
  onToggleVisibility,
  className = '',
  ...props
}) => {
  const handleDropdownChange = (filterKey, value) => {
    // Pour les dropdowns, on envoie un tableau avec la valeur ou un tableau vide
    const newValues = value && value !== "" ? [value] : [];
    onFilterChange(filterKey, newValues);
  };

  const handleResetAll = () => {
    if (onResetFilters) {
      onResetFilters();
    }
  };

  const removeActiveFilter = (filterKey, value) => {
    // Pour les dropdowns, on remet à vide
    onFilterChange(filterKey, []);
  };

  // Compter les filtres actifs
  const getActiveFilterTags = () => {
    const tags = [];
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        const filterGroup = filters.find(f => f.key === key);
        if (filterGroup) {
          values.forEach(value => {
            tags.push({
              key,
              value,
              label: `${filterGroup.name}: ${value}`
            });
          });
        }
      }
    });
    return tags;
  };

  const activeFilterTags = getActiveFilterTags();
  const hasActiveFilters = activeFilterTags.length > 0;

  return (
    <div className={`filter-section-container ${className}`} {...props}>
      <div className="filter-controls-bar">
        {showToggle && (
          <button
            className={`control-btn ${isVisible ? 'active' : ''}`}
            onClick={onToggleVisibility}
            type="button"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            </svg>
            Filtres
          </button>
        )}
        
        {hasActiveFilters && (
          <button
            className="reset-all-btn"
            onClick={handleResetAll}
            type="button"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            Tout réinitialiser
          </button>
        )}
      </div>

      {isVisible && (
        <div className="filters-section">
          <div className="filters-grid">
            {filters.map((filterGroup) => (
              <div key={filterGroup.key} className="filter-group">
                <h4 className="filter-group-title">
                  {filterGroup.icon && (
                    <span className="filter-group-icon">
                      {filterGroup.icon}
                    </span>
                  )}
                  {filterGroup.name}
                </h4>
                
                <div className="filter-options">
                  <select
                    value={(activeFilters[filterGroup.key] || [])[0] || ""}
                    onChange={(e) => handleDropdownChange(filterGroup.key, e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Tous les {filterGroup.name.toLowerCase()}s</option>
                    {filterGroup.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                        {option.count && ` (${option.count})`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Tags des filtres actifs */}
          {hasActiveFilters && (
            <div className="active-filters">
              <span className="active-filters-label">Filtres actifs :</span>
              <div className="filter-tags">
                {activeFilterTags.map((tag, index) => (
                  <div key={`${tag.key}-${tag.value}-${index}`} className="filter-tag">
                    {tag.label}
                    <button
                      onClick={() => removeActiveFilter(tag.key, tag.value)}
                      type="button"
                      aria-label={`Supprimer le filtre ${tag.label}`}
                    >
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSection;