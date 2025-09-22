import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import Question from '../components/Question';
import Timer from '../components/Timer';
import { qcmService } from '../services/qcmService';
import '../styles/QCMPage.css';

const QCMPage = () => {
  const [searchParams] = useSearchParams();
  const { token: urlToken } = useParams(); // Token depuis l'URL (/qcm/:token)
  const navigate = useNavigate();
  
  // États du composant
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Ref pour éviter les problèmes de closure
  const currentQuestionRef = useRef(currentQuestionIndex);
  
  // Mettre à jour le ref à chaque changement
  useEffect(() => {
    currentQuestionRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);
  
  // Récupération des paramètres
  const queryToken = searchParams.get('token'); // Token depuis query parameter (?token=...)
  const token = urlToken || queryToken; // Priorité au token dans l'URL
  
  // État pour les données QCM
  const [qcmData, setQcmData] = useState(null);
  const [candidatInfo, setCandidatInfo] = useState(null);
  
  // Charger les données QCM depuis l'API
  useEffect(() => {
    const loadQcmData = async () => {
      try {
        setLoading(true);
        
        if (token) {
          // Si on a un token, utiliser getQcmWithToken pour récupérer toutes les infos
          const response = await qcmService.getQcmWithToken(token);
          
          if (response.success) {
            setQcmData(response.data.qcm);
            setCandidatInfo({
              id_candidat: response.data.id_candidat,
              id_annonce: response.data.id_annonce,
              candidat: response.data.candidat,
              id_envoi_qcm_candidat: response.data.id_envoi_qcm_candidat
            });
          } else {
            setError(response.message);
          }
        } else {
          // Fallback : utiliser l'annonce 1 par défaut
          const response = await qcmService.getQcmByAnnonce(1);
          
          if (response.success) {
            setQcmData(response.data);
          } else {
            setError(response.message);
          }
        }
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement du QCM');
      } finally {
        setLoading(false);
      }
    };
    
    loadQcmData();
  }, [token, urlToken, queryToken]);

  const currentQuestion = qcmData?.questions[currentQuestionIndex];
  const totalQuestions = qcmData?.questions.length || 0;

  // Réinitialiser les états quand on change de question (hook au bon endroit)
  useEffect(() => {
    console.log('Question changée vers:', currentQuestionIndex + 1, '/', totalQuestions);
    
    // Reset avec un délai pour éviter les conflits
    const timer = setTimeout(() => {
      setIsTimeUp(false);
      setIsTransitioning(false);
      console.log('États reset pour question:', currentQuestionIndex + 1);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, totalQuestions]);

  // ...existing code...

  // Gérer les réponses
  const handleAnswerChange = (questionId, selectedAnswers) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedAnswers
    }));
  };

  // Gérer le temps écoulé
  const handleTimeUp = () => {
    const questionAtTimeout = currentQuestionRef.current;
    console.log('Timer terminé pour question:', questionAtTimeout + 1, '- currentQuestionIndex actuel:', currentQuestionIndex + 1);
    
    if (isTimeUp || isTransitioning || isCompleted) {
      console.log('Timer ignoré - états:', { isTimeUp, isTransitioning, isCompleted });
      return;
    }
    
    setIsTimeUp(true);
    
    // Passer automatiquement à la question suivante après 1.5 secondes
    setTimeout(() => {
      if (!isCompleted) { 
        const currentQuestion = currentQuestionRef.current;
        console.log('Auto-passage depuis question:', currentQuestion + 1, 'vers:', currentQuestion + 2);
        
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestionIndex(currentQuestion + 1);
        } else {
          console.log('Dernière question, terminer le QCM');
          handleSubmit();
        }
      }
    }, 1500);
  };

  // Valider et passer à la question suivante (clic manuel uniquement)
  const handleValidate = () => {
    if (isTransitioning || isTimeUp || isCompleted) return; // Protection contre les clics multiples
    
    console.log('Clic manuel sur bouton pour question:', currentQuestionIndex + 1);
    setIsTransitioning(true);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      // Passer à la question suivante
      setCurrentQuestionIndex(prev => prev + 1);
      
      // Réinitialiser la transition après un court délai
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    } else {
      // Dernière question, terminer le QCM
      handleSubmit();
    }
  };

  // Soumettre le QCM
  const handleSubmit = async () => {
    const endTime = Date.now();
    const duration = Math.floor((endTime - startTime) / 1000);
    
    console.log('QCM terminé:', {
      token,
      answers,
      duration,
      totalQuestions,
      candidatInfo
    });
    
    // Soumettre les réponses si on a un token
    if (token) {
      try {
        const response = await qcmService.submitQcmResponses(token, answers, duration);
        if (response.success) {
          console.log('Réponses soumises avec succès');
        } else {
          console.error('Erreur lors de la soumission:', response.message);
        }
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        // On continue quand même vers la page de completion
      }
    }
    
    setIsCompleted(true);
  };

  // Gestion des erreurs et du loading

  if (loading) {
    return (
      <div className="qcm-page">
        <div className="qcm-center">
          <h2>Chargement du QCM...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="qcm-page">
        <div className="qcm-center">
          <h2>Erreur</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="btn">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // Vérification de sécurité - seulement si pas d'erreur
  if (!currentQuestion) {
    return (
      <div className="qcm-page">
        <div className="qcm-center">
          <h2>Erreur</h2>
          <p>Question non trouvée</p>
          <button onClick={() => navigate('/')} className="btn btn--outline">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // Page de completion
  if (isCompleted) {
    return (
      <div className="qcm-completed">
        <div className="completion-card">
          <div className="completion-icon">
            <svg width="80" height="80" fill="#22c55e" viewBox="0 0 24 24">
              <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
            </svg>
          </div>
          
          <h2>Merci !</h2>
          <p>Merci d'avoir participé à ce QCM.</p>
          
          <div className="thank-you-message">
            <p>Vos réponses ont été enregistrées avec succès.</p>
            <p>Nous vous recontacterons prochainement concernant la suite du processus de recrutement.</p>
          </div>
          
          <button 
            onClick={() => navigate('/')} 
            className="btn btn--outline btn--lg"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // Page principale du QCM
  return (
    <div className="qcm-page">
      {/* Container centré */}
      <div className="qcm-container">
        {/* Header avec info et timer */}
        <div className="qcm-header">
          <h1>{qcmData?.titre}</h1>
          
          <div className="qcm-meta">
            <span>Question {currentQuestionIndex + 1} sur {totalQuestions}</span>
            <Timer
              duration={qcmData?.duree_par_question}
              onTimeUp={handleTimeUp}
              autoStart={true}
              key={`timer-${currentQuestionIndex}`}
            />
          </div>
        </div>

        {/* Zone de contenu principal */}
        <div className="qcm-content">
          {/* Overlay temps écoulé */}
          {isTimeUp && (
            <div className="time-up-overlay">
              <div className="time-up-message">
                <h3>Temps écoulé</h3>
              </div>
            </div>
          )}
          
          {/* Question */}
          <div className="question-section">
            <Question
              questionNumber={currentQuestionIndex + 1}
              question={currentQuestion?.question}
              options={currentQuestion?.reponses?.map(rep => ({
                id: rep.id,
                text: rep.texte
              })) || []}
              selectedAnswers={answers[currentQuestion?.id] || []}
              onChange={(selectedAnswers) => 
                handleAnswerChange(currentQuestion?.id, selectedAnswers)
              }
              disabled={isTimeUp}
            />
          </div>

          {/* Action section */}
          <div className="action-section">
            <button
              onClick={handleValidate}
              className="btn btn--outline btn--lg"
              disabled={isTimeUp || isTransitioning}
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Suivant' : 'Terminer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QCMPage;