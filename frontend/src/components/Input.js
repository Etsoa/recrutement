import React from 'react';
import '../styles/Input.css';

// Composant Input principal
export const Input = ({
  label,
  error,
  help,
  required = false,
  className = '',
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

// Composant Textarea
export const Textarea = ({
  label,
  error,
  help,
  required = false,
  className = '',
  ...props
}) => {
  const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  const textareaClasses = [
    'form-textarea',
    hasError ? 'form-textarea--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="form-group">
      {label && (
        <label 
          htmlFor={textareaId}
          className={`form-label ${required ? 'form-label--required' : ''}`}
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className={textareaClasses}
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

// Composant Select
export const Select = ({
  label,
  error,
  help,
  required = false,
  options = [],
  placeholder = 'Sélectionner une option',
  className = '',
  ...props
}) => {
  const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  const selectClasses = [
    'form-select',
    hasError ? 'form-select--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="form-group">
      {label && (
        <label 
          htmlFor={selectId}
          className={`form-label ${required ? 'form-label--required' : ''}`}
        >
          {label}
        </label>
      )}
      
      <select
        id={selectId}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option 
            key={option.value || index} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
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

// Composant SearchInput
export const SearchInput = ({
  label,
  error,
  help,
  onClear,
  value = '',
  placeholder = 'Rechercher...',
  className = '',
  ...props
}) => {
  const searchId = props.id || `search-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  const showClear = value && onClear;
  
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={searchId} className="form-label">
          {label}
        </label>
      )}
      
      <div className="search-input">
        <svg 
          className="search-input__icon" 
          width="16" 
          height="16" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        
        <input
          id={searchId}
          type="search"
          className={`search-input__field ${hasError ? 'form-input--error' : ''} ${className}`}
          placeholder={placeholder}
          value={value}
          {...props}
        />
        
        {showClear && (
          <button
            type="button"
            className="search-input__clear"
            onClick={onClear}
            title="Effacer"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        )}
      </div>
      
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
