import React from 'react';
import '../styles/Checkbox.css';

const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  name,
  value,
  disabled = false,
  error,
  className = "",
  size = "medium", // small, medium, large
  variant = "primary" // primary, secondary
}) => {
  const handleChange = (e) => {
    onChange(e.target.checked, name, value);
  };

  return (
    <div className={`checkbox-container ${className} ${error ? 'error' : ''} ${size}`}>
      <label className={`checkbox-label ${disabled ? 'disabled' : ''}`}>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="checkbox-input"
        />
        
        <span className={`checkbox-custom ${variant}`}>
          {checked && (
            <svg 
              className="checkbox-icon" 
              width="12" 
              height="12" 
              fill="currentColor" 
              viewBox="0 0 12 12"
            >
              <path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        
        {label && (
          <span className="checkbox-text">
            {label}
          </span>
        )}
      </label>
      
      {error && (
        <div className="checkbox-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default Checkbox;