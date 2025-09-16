import React from "react";
import "../styles/QCM.css";

function Annonce({ formData, showDetails, setShowDetails }) {
  return (
    <main className="annonce-main">
      <div className="annonce-container">
        <header className="annonce-header">
          <h1 className="page-title">Offres d'emploi</h1>
          <p className="page-subtitle">Découvrez nos opportunités de carrière</p>
        </header>

        <article className="annonce-card">
          <div className="annonce-card-header">
            <h2 className="job-title">{formData.post}</h2>
            <span className="job-location">{formData.ville}</span>
          </div>

          <div className="annonce-summary">
            <div className="summary-item">
              <span className="summary-label">Tranche d'âge</span>
              <span className="summary-value">{formData.ageMin} - {formData.ageMax} ans</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Profil recherché</span>
              <span className="summary-value">{formData.genre}</span>
            </div>
          </div>

          <div className={`annonce-details ${showDetails ? 'show' : ''}`}>
            <div className="details-section">
              <h3 className="section-title">Langues</h3>
              <div className="simple-list">
                {formData.langues.join(" • ")}
              </div>
            </div>

            <div className="details-section">
              <h3 className="section-title">Qualités recherchées</h3>
              <div className="simple-list">
                {formData.qualites.join(" • ")}
              </div>
            </div>

            {formData.experiences && formData.experiences.length > 0 && (
              <div className="details-section">
                <h3 className="section-title">Expériences requises</h3>
                <div className="experience-list">
                  {formData.experiences.map((exp, index) => (
                    <div key={index} className="experience-item">
                      <div className="experience-role">{exp.poste}</div>
                      <div className="experience-duration">{exp.duree}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="details-section">
              <h3 className="section-title">Formation</h3>
              <div className="education-info">
                <div className="education-item">
                  <span className="education-label">Filières :</span>
                  <span className="education-value">{formData.filiere.join(", ")}</span>
                </div>
                <div className="education-item">
                  <span className="education-label">Niveaux :</span>
                  <span className="education-value">{formData.niveau.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>

          <footer className="annonce-footer">
            <button 
              className="toggle-details-btn"
              onClick={() => setShowDetails(!showDetails)}
              aria-expanded={showDetails}
            >
              {showDetails ? "Masquer les détails" : "Voir plus de détails"}
            </button>
          </footer>
        </article>
      </div>
    </main>
  );
}

export default Annonce;