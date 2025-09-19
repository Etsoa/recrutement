import React from "react";
import "../styles/AnnonceComp.css";

const AnnonceComp = ({
    // Tokony avadika an'ito ilay par defaut fa juste pour l'instant ireto data feno ireto
    //   titre = "",
    //   entreprise = "",
    //   lieu = "",
    //   typeContrat = "",
    //   salaire = "",
    //   description = "",
    //   missions = [],
    //   competences = [],
    //   datePublication = ""

    titre = "Développeur Full Stack",
    entreprise = "Tech Solutions",
    lieu = "Antananarivo",
    typeContrat = "CDI",
    salaire = "2 500 000 Ar / mois",
    description = "Nous recherchons un développeur passionné...",
    missions = [
        "Développer et maintenir des applications web",
        "Collaborer avec l'équipe produit et design",
        "Assurer la qualité et la sécurité du code"
    ],
    competences = ["JavaScript", "React", "Node.js", "SQL"],
    datePublication = "15 septembre 2025"
}) => {
    return (
        <div className="annonce-container fade-in">
            {/* En-tête annonce */}
            <header className="annonce-header">
                <h1 className="annonce-title">{titre || "Titre du poste"}</h1>
                {entreprise && <p className="annonce-entreprise">{entreprise}</p>}
                <div className="annonce-meta">
                    {lieu && <span>{lieu}</span>}
                    {typeContrat && <span>{typeContrat}</span>}
                    {salaire && <span>{salaire}</span>}
                    {datePublication && (
                        <span className="annonce-date">Publié le {datePublication}</span>
                    )}
                </div>
            </header>

            {/* Description */}
            {description && (
                <section className="annonce-section">
                    <h2 className="annonce-section-title">Description</h2>
                    <p className="annonce-description">{description}</p>
                </section>
            )}

            {/* Missions */}
            {missions.length > 0 && (
                <section className="annonce-section">
                    <h2 className="annonce-section-title">Missions</h2>
                    <ul className="annonce-list">
                        {missions.map((mission, i) => (
                            <li key={i} className="annonce-list-item">
                                {mission}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Compétences */}
            {competences.length > 0 && (
                <section className="annonce-section">
                    <h2 className="annonce-section-title">Compétences requises</h2>
                    <div className="annonce-tags">
                        {competences.map((c, i) => (
                            <span key={i} className="annonce-tag">
                                {c}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default AnnonceComp;
