import React from 'react';
import '../styles/QCMLayout.css';

const QCMLayout = ({ children }) => {
  return (
    <div className="qcm-layout">
      {children}
    </div>
  );
};

export default QCMLayout;