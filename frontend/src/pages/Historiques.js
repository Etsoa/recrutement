import React, { useState, useEffect } from "react";
import { getDetailsHistorique } from '../api/annonceApi';
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Historique from "../components/Historique";
import Button from '../components/Button';

function Historiques() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id'); // récupère "50" depuis ?id=50
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return; // sécurité
            try {
                const response = await getDetailsHistorique(id);
                setDetail(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <Header />
            <Button onClick={() => navigate(-1)}>
                Retour
            </Button>
            <Historique formData={detail} />
        </div>
    );
}

export default Historiques;
