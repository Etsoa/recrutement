import React from 'react';
import '../styles/FilterSection.css';

const FilterSection = ({
  filters,
  activeFilters = {},
  onFilterChange,
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


        </div>
      )}
    </div>
  );
};

export default FilterSection;