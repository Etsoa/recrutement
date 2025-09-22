import React, { useState, useEffect } from "react";
import { annoncesBackOfficeService } from '../../services';
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import QCM from "../../components/QCM";
import Button from '../../components/Button'

function AnnonceQCM() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return; // sécurité
            try {
                const response = await annoncesBackOfficeService.getDetailsQR(id);
                setDetail(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <Button onClick={() => navigate(-1)} >
                Retour {id}
            </Button>
            <QCM formData={detail} />
        </div>
    );
}

export default AnnonceQCM;
