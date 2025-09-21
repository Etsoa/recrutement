import React from 'react';
import '../styles/Input.css';

// Composant Input principal
export const Input = ({
  label,
  error,
  help,
  required = false,
  className = '',
  onChange,
  name,
  value,
  ...props
}) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  const inputClasses = [
    'form-input',
    hasError ? 'form-input--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleChange = (e) => {
    if (onChange) {
      // Nouvelle signature: onChange(value, fieldName)
      onChange(e.target.value, name);
    }
  };

  return (
    <div className="form-group">
      {label && (
        <label 
          htmlFor={inputId}
          className={`form-label ${required ? 'form-label--required' : ''}`}
        >
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        name={name}
        value={value}
        onChange={handleChange}
        className={inputClasses}
        {...props}
      />
      
      {error && (
        <div className="form-error">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          {error}
        </div>
      )}
      
      {help && !error && (
        <div className="form-help">{help}</div>
      )}
    </div>
  );
};

export default Input;
