import React from 'react';
import Header from './HeaderUnite';
import Footer from './Footer';
import '../styles/Layout.css';

// Layout principal avec Header et Footer
const LayoutUnite = ({ children, withSidebar = false, sidebar = null }) => {
  return (
    <div className="layout">
      <Header />
      
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

// Composant Container pour centrer le contenu
export const Container = ({ 
  children, 
  size = 'xl', 
  fluid = false,
  className = '',
  ...props 
}) => {
  const containerClasses = [
    'container',
    fluid ? 'container--fluid' : `container--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

// Composant Section pour l'espacement vertical
export const Section = ({ 
  children, 
  size = 'default',
  className = '',
  ...props 
}) => {
  const sectionClasses = [
    'section',
    size !== 'default' ? `section--${size}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses} {...props}>
      {children}
    </section>
  );
};

// Composant Grid responsive
export const Grid = ({ 
  children, 
  columns = 'auto', 
  gap = 'lg',
  className = '',
  ...props 
}) => {
  const gridClasses = [
    'grid',
    columns !== 'auto' ? `grid--${columns}` : 'grid--auto',
    `gap--${gap}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
};

// Composant Flex pour la mise en page flexbox
export const Flex = ({ 
  children, 
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  wrap = false,
  gap = 'md',
  className = '',
  ...props 
}) => {
  const flexClasses = [
    'flex',
    direction === 'column' ? 'flex--column' : '',
    wrap ? 'flex--wrap' : '',
    align !== 'stretch' ? `flex--align-${align}` : '',
    justify !== 'flex-start' ? `flex--${justify}` : '',
    `gap--${gap}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={flexClasses} {...props}>
      {children}
    </div>
  );
};

export default LayoutUnite;
