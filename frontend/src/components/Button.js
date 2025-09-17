import React from 'react';
import '../styles/Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const classNames = [
    'btn',
    `btn--${variant}`,
    size !== 'default' ? `btn--${size}` : '',
    fullWidth ? 'btn--full' : '',
    loading ? 'btn--loading' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
