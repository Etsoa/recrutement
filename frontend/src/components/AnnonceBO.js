import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLanguesByAnnonce } from "../api/annonceApi";
import "../styles/Annonce.css";
import Button from './Button'

function Annonce({ annonce, showDetails, setShowDetails }) {
    const navigate = useNavigate();
    const [langue, setLangue] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLanguesByAnnonce(annonce.id_annonce);
                setLangue(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [annonce]);

    return (
        <main className="annonce-main">
            <div className="annonce-container">

                <article className="annonce-card">
                    <div className="annonce-content">
                        <h2 className="job-title">{annonce.poste}</h2>
                        <p className="job-location">Nous recherchons un(e) candidat(e) basé(e) à {annonce.ville}</p>

                        <div className="job-info">
                            <p>L'âge requis pour ce poste est compris entre <span>{annonce.age_min}</span>et <span>{annonce.age_max}</span> ans.</p>
                            <p> Le poste est ouvert aux personnes de genre <span>{annonce.genre}</span></p>
                        </div>
                    </div>

                    <div className={`annonce-details ${showDetails ? 'show' : ''}`}>
                        <div className="details-text">
                            {/* <p><strong>Langues :</strong> {langue.data.join(", ")}</p> */}
                            {/* <p><strong>Qualités :</strong> {formData.qualites.join(", ")}</p> */}

                            {/* {formData.experiences && formData.experiences.length > 0 && (
                                <div className="experiences">
                                    <p><strong>Expériences :</strong></p>
                                    {formData.experiences.map((exp, index) => (
                                        <p key={index} className="exp-item">
                                            {exp.poste} - {exp.entreprise} ({exp.duree})
                                        </p>
                                    ))}
                                </div>
                            )} */}

                            {/* <p><strong>Formation :</strong> {formData.filiere.join(", ")}</p> */}
                            {/* <p><strong>Niveau :</strong> {formData.niveau.join(", ")}</p> */}
                        </div>
                    </div>

                    <div className="annonce-actions">
                        <Button
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? "Masquer les details" : "Voir les details"}
                        </Button>
                        <div className="spacer">
                        <Button onClick={() => navigate(`/detailQCM/?id=${annonce.id_annonce}`)}>
                            QCM
                        </Button>         
                        <Button onClick={() => navigate(`/historique/?id=${annonce.id_annonce}`)}>
                        Historique
                        </Button>
                        </div>
                    </div> 
                </article>
            </div>
        </main>
    );
}

export default Annonce;