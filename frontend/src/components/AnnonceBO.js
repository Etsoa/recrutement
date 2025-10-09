import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDetailsAnnonceById } from "../api/annonceApi";
import "../styles/Annonce.css";
import Button from './Button'

function Annonce({ annonce }) {
    const navigate = useNavigate();
    const [detail, setDetail] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDetailsAnnonceById(annonce.id_annonce);
                setDetail(response.data);
                //       const languesArray = response.langues.map(l => `Langue ${l.id_langue}`);
                // setLangue(languesArray);
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
                            <p><strong>Langues :</strong>  {detail.langues}</p>
                            <p><strong>Qualités :</strong> {detail.qualites}</p>

                            {/* Expériences */}
                            {detail.experiences && detail.experiences !== "" && (
                                <div className="experiences">
                                    <p><strong>Expériences :</strong></p>
                                    {detail.experiences.split(', ').map((exp, index) => (
                                        <p key={index} className="exp-item">{exp}</p>
                                    ))}
                                </div>
                            )}

                            {/* Filières et niveaux */}
                            {detail.filieres_niveaux && detail.filieres_niveaux !== "" && (
                                <div className="formations">
                                    <p><strong>Formation :</strong></p>
                                    {detail.filieres_niveaux.split(', ').map((fn, index) => (
                                        <p key={index}>{fn}</p>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>

                    <div className="annonce-actions">
                        <Button
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? "Masquer les details" : "Voir les details"}
                        </Button>
                        <div className="spacer">
                            <Button
                                style={{
                                    backgroundColor: "white",
                                    border: "1px solid black",
                                    color: detail.type_status === "En cours de demande" || detail.type_status === "Refusé" ? "orange" : "#176c2fff"
                                }} >
                                {detail.type_status || "Statut inconnu"}
                            </Button>

                            {(detail.type_status === "En cours de demande" || detail.type_status === "Refusé") && (
                                <Button
                                    onClick={() => navigate(`/back-office/updateAnnonce/?update=${annonce.id_annonce}`)}>
                                    ✏️
                                </Button>
                            )}
                            <Button onClick={() => navigate(`/back-office/detailQCM/${annonce.id_annonce}`)}>
                                QCM
                            </Button>
                            <Button onClick={() => navigate(`/back-office/historique/?id=${annonce.id_annonce}`)}>
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