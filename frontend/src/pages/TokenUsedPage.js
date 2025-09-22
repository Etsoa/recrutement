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
    <div className="token-used-page">
      <div className="token-used-container">
        <div className="token-used-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="2"/>
            <path d="m9 12 2 2 4-4" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1>QCM Déjà Complété</h1>
        
        <div className="token-used-message">
          <p>
            <strong>Ce questionnaire a déjà été complété.</strong>
          </p>
          <p>
            Pour des raisons de sécurité et d'équité, chaque lien QCM ne peut être utilisé qu'une seule fois.
            Votre questionnaire a été soumis avec succès et ne peut plus être modifié.
          </p>
        </div>

        {loading ? (
          <div className="loading-info">
            <p>Chargement des informations...</p>
          </div>
        ) : qcmInfo && qcmInfo.qcm_info ? (
          <div className="qcm-completion-info">
            <h3>Informations de votre QCM :</h3>
            <div className="qcm-stats">
              <div className="stat-item">
                <span className="stat-label">Candidat :</span>
                <span className="stat-value">
                  {qcmInfo.candidat.prenom} {qcmInfo.candidat.nom}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Poste :</span>
                <span className="stat-value">{qcmInfo.candidat.poste}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Score obtenu :</span>
                <span className="stat-value score">
                  {qcmInfo.qcm_info.score_sur_20}/20 ({qcmInfo.qcm_info.pourcentage}%)
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Date de completion :</span>
                <span className="stat-value">
                  {new Date(qcmInfo.qcm_info.date_completion).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              {qcmInfo.qcm_info.duree_totale && (
                <div className="stat-item">
                  <span className="stat-label">Durée totale :</span>
                  <span className="stat-value">{qcmInfo.qcm_info.duree_totale} minutes</span>
                </div>
              )}
            </div>
          </div>
        ) : null}

        <div className="token-info">
          <h3>Informations importantes :</h3>
          <ul>
            <li>
              <span className="icon">✅</span>
              Vos réponses ont été enregistrées avec succès
            </li>
            <li>
              <span className="icon">🔒</span>
              Le lien est désormais désactivé pour préserver l'intégrité du processus
            </li>
            <li>
              <span className="icon">📧</span>
              Vous serez contacté par email pour les prochaines étapes
            </li>
            <li>
              <span className="icon">🤔</span>
              En cas de problème technique, contactez notre équipe RH
            </li>
          </ul>
        </div>

        <div className="token-actions">
          <button 
            onClick={() => navigate('/')} 
            className="btn btn--primary"
          >
            Retour à l'accueil
          </button>
          
          <div className="contact-info">
            <p>
              <strong>Besoin d'aide ?</strong><br />
              Si vous pensez qu'il s'agit d'une erreur ou si vous rencontrez des difficultés,
              n'hésitez pas à contacter notre équipe de recrutement.
            </p>
          </div>
        </div>

        {token && (
          <div className="token-details">
            <small>Référence du lien : {token.substring(0, 8)}...</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenUsedPage;