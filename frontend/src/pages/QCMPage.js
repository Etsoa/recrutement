import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import Timer from '../components/Timer';
import api from '../services/api';
import '../styles/QCMPage.css';

const QCMPage = () => {
  const { token } = useParams(); // Récupérer le token depuis l'URL
  const navigate = useNavigate();
  
  // États du composant
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Données QCM depuis l'API
  const [qcmData, setQcmData] = useState(null);
  const [candidatInfo, setCandidatInfo] = useState(null);
  
  // Ref pour éviter les problèmes de closure
  const currentQuestionRef = useRef(currentQuestionIndex);
  
  // Mettre à jour le ref à chaque changement
  useEffect(() => {
    currentQuestionRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  // Réinitialiser les états quand on change de question
  useEffect(() => {
    if (qcmData && qcmData.questions) {
      console.log('Question changée vers:', currentQuestionIndex + 1, '/', qcmData.questions.length);
      
      // Reset avec un délai pour éviter les conflits
      const timer = setTimeout(() => {
        setIsTimeUp(false);
        setIsTransitioning(false);
        console.log('États reset pour question:', currentQuestionIndex + 1);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, qcmData]);

  // Gérer la fermeture de page (le token est déjà marqué comme utilisé côté serveur)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isCompleted && qcmData) {
        // Avertir l'utilisateur qu'il va perdre sa progression
        const message = 'Attention : Si vous quittez maintenant, ce lien QCM ne sera plus réutilisable et vous ne pourrez pas le refaire.';
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    // Ajouter l'event listener seulement si le QCM est chargé
    if (qcmData && !isCompleted) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      console.log('Protection contre fermeture accidentelle activée');
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [qcmData, isCompleted]);
  
  // Charger les données QCM au montage du composant
  useEffect(() => {
    const loadQcmData = async () => {
      if (!token) {
        setError('Token QCM manquant');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        console.log('Chargement des questions QCM avec token:', token);
        
        const response = await api.post('/qcm/questions', { token });
        
        if (response.data.success) {
          const { questions, candidat, id_envoi_qcm_candidat } = response.data.data;
          
          setQcmData({
            id: id_envoi_qcm_candidat,
            titre: `QCM pour le poste de ${candidat.poste}`,
            duree_par_question: 30, // 30 secondes par question par défaut
            questions: questions.map((q, index) => ({
              id: q.id_question,
              question: q.question,
              reponses: q.reponses.map(r => ({
                id: r.id.toString(),
                texte: r.texte,
                valeur: false // Ne pas exposer la bonne réponse
              }))
            }))
          });
          
          setCandidatInfo(candidat);
          setError(null);
        } else {
          // Gérer les erreurs spécifiques du serveur
          const errorCode = response.data.error_code;
          let errorMessage = response.data.message || 'Erreur lors du chargement du QCM';
          
          switch (errorCode) {
            case 'TOKEN_ALREADY_USED':
              // Rediriger vers la page spécialisée pour token déjà utilisé
              navigate(`/qcm-completed/${token}`);
              return;
            case 'TOKEN_EXPIRED':
              errorMessage = '⏰ Ce lien QCM a expiré. Contactez l\'équipe RH pour un nouveau lien.';
              break;
            case 'TOKEN_INVALID':
              errorMessage = '❌ Ce lien QCM est invalide ou corrompu.';
              break;
            case 'TOKEN_NOT_FOUND':
              errorMessage = '🔍 Ce lien QCM n\'existe pas dans notre système.';
              break;
            case 'CANDIDAT_NOT_FOUND':
              errorMessage = '👤 Candidature associée introuvable.';
              break;
          }
          
          setError(errorMessage);
        }
      } catch (err) {
        console.error('Erreur chargement QCM:', err);
        
        // Gérer les erreurs HTTP spécifiques
        if (err.response?.status === 409) {
          // Token déjà utilisé - rediriger vers la page spécialisée
          navigate(`/qcm-completed/${token}`);
          return;
        } else if (err.response?.status === 410) {
          setError('⏰ Ce lien QCM a expiré. Contactez l\'équipe RH pour un nouveau lien.');
        } else if (err.response?.status === 404) {
          setError('🔍 Ce lien QCM n\'existe pas ou a été supprimé.');
        } else {
          setError(
            err.response?.data?.message || 
            '❌ Erreur lors du chargement du QCM. Vérifiez que le lien est valide.'
          );
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadQcmData();
  }, [token]);

  // Affichage du loading
  if (loading) {
    return (
      <div className="qcm-page">
        <div className="qcm-center">
          <h2>Chargement du QCM...</h2>
          <p>Veuillez patienter pendant le chargement des questions.</p>
        </div>
      </div>
    );
  }

  // Affichage des erreurs
  if (error) {
    return (
      <div className="qcm-page">
        <div className="qcm-center">
          <h2>Erreur</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="btn btn--outline">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // Vérifier que les données QCM sont chargées
  if (!qcmData || !qcmData.questions || qcmData.questions.length === 0) {
    return (
      <div className="qcm-page">
        <div className="qcm-center">
          <h2>Aucune question trouvée</h2>
          <p>Ce QCM ne contient pas de questions ou a expiré.</p>
          <button onClick={() => navigate('/')} className="btn btn--outline">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = qcmData.questions[currentQuestionIndex];
  const totalQuestions = qcmData.questions.length;

  // Vérification de sécurité
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
    // Protection contre les soumissions multiples
    if (loading || isCompleted) {
      console.log('Soumission ignorée - en cours ou déjà complété');
      return;
    }
    
    const endTime = Date.now();
    const startTimeISO = new Date(startTime).toISOString();
    const endTimeISO = new Date(endTime).toISOString();
    
    // Préparer les réponses pour l'API
    const reponses = Object.entries(answers).map(([questionId, selectedAnswers]) => {
      // selectedAnswers est un tableau, on prend le premier élément
      const selectedId = Array.isArray(selectedAnswers) ? selectedAnswers[0] : selectedAnswers;
      
      return {
        id_question: parseInt(questionId),
        id_reponse_selectionnee: parseInt(selectedId)
      };
    });
    
    try {
      setLoading(true);
      console.log('Soumission QCM avec protection unique:', {
        token,
        reponses,
        debut: startTimeISO,
        fin: endTimeISO
      });
      
      const response = await api.post('/qcm/reponses', {
        token,
        reponses,
        debut: startTimeISO,
        fin: endTimeISO
      });
      
      if (response.data.success) {
        console.log('QCM soumis avec succès:', response.data.data);
        setIsCompleted(true);
      } else {
        // Gérer les erreurs de soumission spécifiques
        const errorCode = response.data.error_code;
        let errorMessage = response.data.message || 'Erreur lors de la soumission';
        
        if (errorCode === 'TOKEN_ALREADY_USED') {
          errorMessage = '⚠️ Ce QCM a déjà été soumis. Vous ne pouvez pas le refaire.';
        }
        
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Erreur soumission QCM:', err);
      
      // Gérer les erreurs HTTP spécifiques pour la soumission
      if (err.response?.status === 409) {
        setError('⚠️ Ce QCM a déjà été soumis. Vous ne pouvez pas le refaire.');
      } else if (err.response?.status === 410) {
        setError('⏰ Ce lien QCM a expiré pendant la soumission.');
      } else {
        setError(
          err.response?.data?.message || 
          '❌ Erreur lors de la soumission du QCM. Veuillez réessayer.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

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
          <h1>{qcmData.titre}</h1>
          <div className="qcm-meta">
            <span>Question {currentQuestionIndex + 1} sur {totalQuestions}</span>
            <Timer
              duration={qcmData.duree_par_question}
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
              question={currentQuestion.question}
              options={currentQuestion.reponses.map(rep => ({
                id: rep.id,
                text: rep.texte
              }))}
              selectedAnswers={answers[currentQuestion.id] || []}
              onChange={(selectedAnswers) => 
                handleAnswerChange(currentQuestion.id, selectedAnswers)
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