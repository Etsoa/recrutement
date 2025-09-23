import React from 'react';
import HeaderCeo from './HeaderCeo';

const LayoutCeo = ({ children }) => {
  return (
    <div className="layout-ceo">
      <HeaderCeo />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default LayoutCeo;