import React from 'react';
import '../styles/Loader.css';

const Loader = ({
  type = 'default',
  size = 'default',
  text = 'Chargement en cours...',
  showText = true,
}) => {
  const loaderClasses = [
    'loader',
    type !== 'default' ? `loader--${type}` : '',
    size !== 'default' ? `loader--${size}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={type === 'overlay' ? 'loader--overlay' : 'loader-container'}>
      <div className={loaderClasses}>
        <div className="loader__circle" />
        {showText && type !== 'inline' && type !== 'button' && (
          <div className="loader__text">{text}</div>
        )}
      </div>
    </div>
  );
};

export default Loader;