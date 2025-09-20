import React from 'react';
import '../styles/Dropdown.css';

const Dropdown = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder = "Sélectionner...",
  name,
  required = false,
  error,
  disabled = false,
  className = "",
  icon
}) => {
  return (
    <div className={`dropdown-container ${className} ${error ? 'error' : ''}`}>
      {label && (
        <label className="dropdown-label" htmlFor={name}>
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      
      <div className="dropdown-wrapper">
        {icon && (
          <div className="dropdown-icon">
            {icon}
          </div>
        )}
        
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value, name)}
          required={required}
          disabled={disabled}
          className={`dropdown-select ${icon ? 'with-icon' : ''}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="dropdown-arrow">
          <svg width="12" height="8" fill="currentColor" viewBox="0 0 12 8">
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {error && (
        <div className="dropdown-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default Dropdown;