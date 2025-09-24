import React from 'react';
import HeaderCeo from './HeaderCeo';
import Footer from './Footer';
import '../styles/Layout.css';

const LayoutCeo = ({ children, withSidebar = false, sidebar = null }) => {
  return (
    <div className="layout">
      <HeaderCeo />
      
      <main className="layout__main">
        {withSidebar ? (
          <div className="layout--sidebar">
            {sidebar && (
              <aside className="sidebar">
                <div className="sidebar__content">
                  {sidebar}
                </div>
              </aside>
            )}
            <div className="layout__content">
              {children}
            </div>
          </div>
        ) : (
          <div className="layout__content">
            {children}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LayoutCeo;