import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import QCM from "../components/QCM";
import Button from '../components/Button'

function AnnonceQCM() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        "id_annonce": 1,
        "titre": "Annonce 1",
        "questions": [
            {
                "id_question": 1,
                "question": "Quelle est la capitale de la France ?",
                "reponses": [
                    { "id_reponse": 1, "reponse": "Paris", "correcte": true },
                    { "id_reponse": 2, "reponse": "Londres", "correcte": false },
                    { "id_reponse": 3, "reponse": "Berlin", "correcte": false }
                ]
            },
            {
                "id_question": 2,
                "question": "2 + 2 = ?",
                "reponses": [
                    { "id_reponse": 4, "reponse": "3", "correcte": false },
                    { "id_reponse": 5, "reponse": "4", "correcte": true },
                    { "id_reponse": 6, "reponse": "5", "correcte": false }
                ]
            }
        ]
    });

    return (
        <div>
            <Header />
            <Button onClick={() => navigate(`/annonces`)}>
                Retour
            </Button>
            <QCM formData={formData} />
        </div>
    );
}

export default AnnonceQCM;
