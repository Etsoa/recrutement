import React from "react";
import "../styles/Annonce.css";

function Annonce({ formData, showDetails, setShowDetails }) {
    return (
        <main className="annonce-main">
            <div className="annonce-container">


                <article className="annonce-card">
                    <div className="annonce-content">
                        <h2 className="job-title">{formData.post}</h2>
                        <p className="job-location">Nous recherchons un(e) candidat(e) basé(e) à {formData.ville}</p>

                        <div className="job-info">
                            <p>L'âge requis pour ce poste est compris entre <span>{formData.ageMin}</span>et <span>{formData.ageMax}</span> ans.</p>
                            <p> Le poste est ouvert aux personnes de genre <span>{formData.genre}</span></p>
                        </div>
                    </div>

                    <div className={`annonce-details ${showDetails ? 'show' : ''}`}>
                        <div className="details-text">
                            <p><strong>Langues :</strong> {formData.langues.join(", ")}</p>
                            <p><strong>Qualités :</strong> {formData.qualites.join(", ")}</p>

                            {formData.experiences && formData.experiences.length > 0 && (
                                <div className="experiences">
                                    <p><strong>Expériences :</strong></p>
                                    {formData.experiences.map((exp, index) => (
                                        <p key={index} className="exp-item">
                                            {exp.poste} - {exp.entreprise} ({exp.duree})
                                        </p>
                                    ))}
                                </div>
                            )}

                            <p><strong>Formation :</strong> {formData.filiere.join(", ")}</p>
                            <p><strong>Niveau :</strong> {formData.niveau.join(", ")}</p>
                        </div>
                    </div>

                    <div className="annonce-actions">
                        <button
                            className="toggle-btn"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? "Masquer les details" : "Voir les details"}
                        </button>
                        <div className="spacer">
                        <button className="apply-btn">Historique</button>
                        <button className="apply-btn">QCM</button>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}

export default Annonce;