import React from "react";
import "../styles/CVComp.css";

const CVComp = ({
    // Tokony avadika an'ito ilay par defaut fa juste pour l'instant ireto data feno ireto
    //   langues = [],
    //   experiences = [],
    //   niveau = "",
    //   filiere = "",
    //   age = "",
    //   ville = "",
    //   genre = "",
    //   qualites = []

    langues = ["Français", "Anglais"],
    experiences = [
        {
            poste: "Développeur Web",
            entreprise: "Agence Digitale",
            dateDebut: "2022",
            dateFin: "2024",
            description: "Création de sites web et applications internes."
        }
    ],
    niveau = "Licence",
    filiere = "Informatique",
    age = 25,
    ville = "Antananarivo",
    genre = "Homme",
    qualites = ["Autonome", "Curieux", "Rigoureux"]
}) => {
    return (
        <div className="cvcomp-container fade-in">
            {/* En-tête */}
            <header className="cvcomp-header">
                <h1 className="cvcomp-title">Curriculum Vitae</h1>
                <p className="cvcomp-subtitle">
                    {filiere && niveau ? `${niveau} en ${filiere}` : filiere || niveau}
                </p>
            </header>

            {/* Infos personnelles */}
            <section className="cvcomp-section">
                <h2 className="cvcomp-section-title">Informations personnelles</h2>
                <div className="cvcomp-info-grid">
                    {age && (
                        <div className="cvcomp-info-item">
                            <span className="cvcomp-label">Âge :</span>
                            <span className="cvcomp-value">{age} ans</span>
                        </div>
                    )}
                    {ville && (
                        <div className="cvcomp-info-item">
                            <span className="cvcomp-label">Ville :</span>
                            <span className="cvcomp-value">{ville}</span>
                        </div>
                    )}
                    {genre && (
                        <div className="cvcomp-info-item">
                            <span className="cvcomp-label">Genre :</span>
                            <span className="cvcomp-value">{genre}</span>
                        </div>
                    )}
                </div>
            </section>

            {/* Langues */}
            {langues.length > 0 && (
                <section className="cvcomp-section">
                    <h2 className="cvcomp-section-title">Langues</h2>
                    <div className="cvcomp-tags">
                        {langues.map((langue, i) => (
                            <span key={i} className="cvcomp-tag">
                                {langue}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Qualités */}
            {qualites.length > 0 && (
                <section className="cvcomp-section">
                    <h2 className="cvcomp-section-title">Qualités</h2>
                    <div className="cvcomp-tags">
                        {qualites.map((q, i) => (
                            <span key={i} className="cvcomp-tag">
                                {q}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Expériences */}
            {experiences.length > 0 && (
                <section className="cvcomp-section">
                    <h2 className="cvcomp-section-title">Expériences professionnelles</h2>
                    <div className="cvcomp-experiences">
                        {experiences.map((exp, i) => (
                            <div key={i} className="cvcomp-experience-item">
                                <h3 className="cvcomp-experience-poste">{exp.poste}</h3>
                                <p className="cvcomp-experience-company">{exp.entreprise}</p>
                                <p className="cvcomp-experience-period">
                                    {exp.dateDebut} – {exp.dateFin || "Présent"}
                                </p>
                                {exp.description && (
                                    <p className="cvcomp-experience-description">
                                        {exp.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default CVComp;
