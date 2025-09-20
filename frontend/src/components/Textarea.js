import React, { useState } from 'react';
import '../styles/Textarea.css';

const Textarea = ({ 
  label, 
  value, 
  onChange, 
  name,
  placeholder = "",
  required = false,
  disabled = false,
  error,
  helperText,
  className = "",
  rows = 4,
  maxLength,
  showCharCount = true,
  resize = true, // true, false, "vertical", "horizontal"
  autoResize = false
}) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    onChange(e.target.value, name);
  };

  const getResizeClass = () => {
    if (!resize) return 'no-resize';
    if (resize === "vertical") return 'resize-vertical';
    if (resize === "horizontal") return 'resize-horizontal';
    return 'resize-both';
  };

  return (
    <div className={`textarea-container ${className} ${error ? 'error' : ''}`}>
      {label && (
        <label className="textarea-label" htmlFor={name}>
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      
      <div className={`textarea-wrapper ${focused ? 'focused' : ''}`}>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`textarea-field ${getResizeClass()} ${autoResize ? 'auto-resize' : ''}`}
          style={autoResize ? { 
            minHeight: `${rows * 1.5}em`,
            height: 'auto'
          } : {}}
        />
      </div>
      
      {(helperText || (showCharCount && maxLength)) && (
        <div className="textarea-helper">
          {helperText && (
            <span className="helper-text">{helperText}</span>
          )}
          {showCharCount && maxLength && (
            <span className={`char-count ${value?.length > maxLength * 0.9 ? 'warning' : ''} ${value?.length >= maxLength ? 'error' : ''}`}>
              {value?.length || 0}/{maxLength}
            </span>
          )}
        </div>
      )}
      
      {error && (
        <div className="textarea-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default Textarea;