import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Historique from "../components/Historique";
import Button from '../components/Button'

function Historiques() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        "unites": [
            { "id_unite": 1, "nom": "Unité Centrale", "motdepasse": "hash123" },
            { "id_unite": 2, "nom": "Service Marketing", "motdepasse": "hash456" }
        ],
        "type_status_annonces": [
            { "id_type_status": 1, "valeur": "Brouillon" },
            { "id_type_status": 2, "valeur": "Publié" },
            { "id_type_status": 3, "valeur": "Archivé" }
        ],
        "annonces": [
            { "id_annonce": 1, "titre": "Vente Appartement T3" },
            { "id_annonce": 2, "titre": "Stage Développeur React" }
        ],
        "status_annonce": [
            {
                "id_status_annonce": 1,
                "id_annonce": 1,
                "annonce_titre": "Vente Appartement T3",
                "id_type_status_annonce": 2,
                "type_status": "Publié",
                "date_changement": "2025-09-15",
                "id_unite": 1,
                "unite_nom": "Unité Centrale"
            },
            {
                "id_status_annonce": 2,
                "id_annonce": 2,
                "annonce_titre": "Stage Développeur React",
                "id_type_status_annonce": 1,
                "type_status": "Brouillon",
                "date_changement": "2025-09-10",
                "id_unite": 2,
                "unite_nom": "Service Marketing"
            }
        ]
    }
    );

    return (
        <div>
            <Header />
            <Button onClick={() => navigate(`/annonces`)}>
                Retour
            </Button>
            <Historique formData={formData} />
        </div>
    );
}

export default Historiques;
