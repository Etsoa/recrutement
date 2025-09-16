import React from 'react';
import '../styles/CV.css';

const CV = ({
  // Informations personnelles
  nom = '',
  prenom = '',
  dateNaissance = '',
  cin = '',
  email = '',
  contact = '',
  ville = '',
  photo = null,
  genre = '',
  nombreEnfants = 0,
  situationMatrimoniale = '',
  
  // Informations professionnelles
  passifEntreprises = [],
  langues = [],
  qualites = [],
  experiences = [],
  filiere = '',
  niveau = '',
  
  // Props optionnelles pour l'affichage
  showQRCode = false,
  isEditable = false
}) => {
  
  const getInitials = () => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="cv-container">
      {/* En-tête avec photo et informations principales */}
      <header className="cv-header">
        <div className="cv-photo-container">
          {photo ? (
            <img src={photo} alt={`${prenom} ${nom}`} className="cv-photo" />
          ) : (
            <div className="cv-photo cv-photo--placeholder">
              {getInitials()}
            </div>
          )}
        </div>
        
        <div className="cv-identity">
          <h1 className="cv-name">{prenom} {nom}</h1>
          <p className="cv-title">{filiere} - {niveau}</p>
          
          <div className="cv-contact">
            {email && (
              <div className="cv-contact-item">
                <svg className="cv-contact-icon" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>{email}</span>
              </div>
            )}
            
            {contact && (
              <div className="cv-contact-item">
                <svg className="cv-contact-icon" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>{contact}</span>
              </div>
            )}
            
            {ville && (
              <div className="cv-contact-item">
                <svg className="cv-contact-icon" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{ville}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenu principal en deux colonnes */}
      <div className="cv-content">
        {/* Sidebar - Informations personnelles */}
        <aside className="cv-sidebar">
          {/* Informations personnelles */}
          <section className="cv-section">
            <h2 className="cv-section-title">
              <svg className="cv-section-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Informations personnelles
            </h2>
            
            <div className="cv-info-grid">
              <div className="cv-info-item">
                <span className="cv-info-label">Date de naissance</span>
                <span className="cv-info-value">{formatDate(dateNaissance)}</span>
              </div>
              
              <div className="cv-info-item">
                <span className="cv-info-label">CIN</span>
                <span className="cv-info-value">{cin}</span>
              </div>
              
              <div className="cv-info-item">
                <span className="cv-info-label">Genre</span>
                <span className="cv-info-value">{genre}</span>
              </div>
              
              <div className="cv-info-item">
                <span className="cv-info-label">Situation</span>
                <span className="cv-info-value">{situationMatrimoniale}</span>
              </div>
              
              {nombreEnfants > 0 && (
                <div className="cv-info-item">
                  <span className="cv-info-label">Enfants</span>
                  <span className="cv-info-value">{nombreEnfants}</span>
                </div>
              )}
            </div>
          </section>

          {/* Langues */}
          {langues.length > 0 && (
            <section className="cv-section">
              <h2 className="cv-section-title">
                <svg className="cv-section-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
                </svg>
                Langues
              </h2>
              
              <div className="cv-tags">
                {langues.map((langue, index) => (
                  <span key={index} className="cv-tag">
                    {langue}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Qualités */}
          {qualites.length > 0 && (
            <section className="cv-section">
              <h2 className="cv-section-title">
                <svg className="cv-section-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                Qualités
              </h2>
              
              <div className="cv-tags">
                {qualites.map((qualite, index) => (
                  <span key={index} className="cv-tag">
                    {qualite}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Formation */}
          {(filiere || niveau) && (
            <section className="cv-section">
              <h2 className="cv-section-title">
                <svg className="cv-section-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
                Formation
              </h2>
              
              <div className="cv-education">
                <div className="cv-education-level">{niveau}</div>
                <div className="cv-education-field">{filiere}</div>
              </div>
            </section>
          )}
        </aside>

        {/* Contenu principal */}
        <main className="cv-main">
          {/* Expériences */}
          {experiences.length > 0 && (
            <section className="cv-section">
              <h2 className="cv-section-title">
                <svg className="cv-section-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-2.5l-1.5-1.5h-5L9.5 6H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H7V8h2.5l1.5-1.5h5L17.5 8H20v10z"/>
                </svg>
                Expériences professionnelles
              </h2>
              
              {experiences.map((exp, index) => (
                <div key={index} className="cv-experience-item">
                  <div className="cv-experience-header">
                    <div>
                      <h3 className="cv-experience-title">{exp.poste}</h3>
                      <p className="cv-experience-company">{exp.entreprise}</p>
                    </div>
                    <div className="cv-experience-period">
                      {exp.dateDebut} - {exp.dateFin}
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="cv-experience-description">{exp.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Passif entreprises */}
          {passifEntreprises.length > 0 && (
            <section className="cv-section">
              <h2 className="cv-section-title">
                <svg className="cv-section-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                </svg>
                Historique professionnel
              </h2>
              
              {passifEntreprises.map((passif, index) => (
                <div key={index} className="cv-experience-item">
                  <div className="cv-experience-header">
                    <div>
                      <h3 className="cv-experience-title">{passif.poste}</h3>
                      <p className="cv-experience-company">{passif.entreprise}</p>
                    </div>
                    <div className="cv-experience-period">
                      Quitté le {formatDate(passif.dateQuite)}
                    </div>
                  </div>
                  
                  {passif.raisonQuite && (
                    <p className="cv-experience-reason">
                      Raison de départ: {passif.raisonQuite}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default CV;
