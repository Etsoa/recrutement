import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/TokenUsedPage.css';

const TokenUsedPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [qcmInfo, setQcmInfo] = useState(null);
  const [loading, setLoading] = useState(false); // Changé à false par défaut

  useEffect(() => {
    // Optionnel: essayer de récupérer les informations du QCM complété
    const fetchQcmInfo = async () => {
      if (!token) return;
      
      setLoading(true);
      try {
        const response = await axios.post('/api/token-info/qcm/token-info', {
          token
        }, {
          timeout: 3000 // Timeout court de 3 secondes
        });

        if (response.data && response.data.success) {
          setQcmInfo(response.data.data);
        }
      } catch (error) {
        // Gestion silencieuse - l'application fonctionne sans ces infos
        console.warn('Informations supplémentaires non disponibles (backend arrêté)');
        setQcmInfo(null);
      } finally {
        setLoading(false);
      }
    };

    // Démarrer la récupération mais ne pas bloquer l'affichage
    fetchQcmInfo();
  }, [token]);

  return (
    <div className="token-used-container">
      <h1>Token Déjà Utilisé</h1>
      <p>Ce QCM a déjà été complété.</p>
    </div>
  );
};

export default TokenUsedPage;