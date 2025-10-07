import React, { useState, useEffect } from "react";
import { useNavigate } from '../../../router/useNavigateHelper';
import { getQuestionsReponses, createQuestionQcm, createReponseQcm } from "../../../api/parametreApi";

function QuestionsReponses() {
  const navigate = useNavigate();
  const [donnees, setDonnees] = useState({ questions: [], reponses: [] });
  const [question, setQuestion] = useState("");
  const [reponses, setReponses] = useState([]); // tableau de réponses
  const [newReponse, setNewReponse] = useState("");
  const [newModalite, setNewModalite] = useState(false);
  const [showListe, setShowListe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [unite, setUnite] = useState(localStorage.getItem('unite'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQuestionsReponses(unite.id_unite);
        setDonnees(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const ajouterReponse = () => {
    if (newReponse.trim() === "") {
      alert("Veuillez saisir une réponse");
      return;
    }
    setReponses([...reponses, { texte: newReponse, modalite: newModalite }]);
    setNewReponse("");
    setNewModalite(false);
  };

  const supprimerReponse = (index) => {
    setReponses(reponses.filter((_, i) => i !== index));
  };

  const handleQR = async () => {
    if (!question.trim()) {
      alert("Veuillez saisir une question");
      return;
    }
    if (reponses.length === 0) {
      alert("Veuillez ajouter au moins une réponse");
      return;
    }

    try {
      setLoading(true);
      const dataQuestion = {
        intitule: question
      };
      const responseQuestion = await createQuestionQcm(dataQuestion);
      if (responseQuestion.success) {
        const id_question_qcm = responseQuestion.data.id_question_qcm;
        for (const rep of reponses) {
          const dataReponse = {
            reponse: rep.texte,
            modalite: rep.modalite,
            id_question_qcm: id_question_qcm
          };
          await createReponseQcm(dataReponse);
        }
      }
      setDonnees(await getQuestionsReponses().then(res => res.data));
      setQuestion("");
      setReponses([]);
      alert("Question/Réponses ajoutées avec succès");
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Erreur serveur";
      alert("Erreur serveur : " + msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleList = () => {
    setShowListe(prev => !prev);
  };

  return (
    <>
      <div className="parametrage-unite__section-header">
        <h3 className="parametrage-unite__section-title">Questions & Réponses QCM</h3>
        <button 
          className="parametrage-unite__toggle-btn"
          onClick={toggleList}
        >
          {showListe ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showListe && (
        <div className="parametrage-unite__section-content">
          {/* Colonne gauche - Formulaire d'ajout */}
          <div className="parametrage-unite__form-column">
            <h4 className="parametrage-unite__form-title">
              Créer une question QCM
            </h4>
            
            <div className="parametrage-unite__form-group">
              <label className="parametrage-unite__label parametrage-unite__label--required">
                Question
              </label>
              <input
                type="text"
                className="parametrage-unite__input"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex: Quelle est la capitale de la France ?"
              />
            </div>

            <div className="parametrage-unite__form-group">
              <label className="parametrage-unite__label">
                Ajouter une réponse
              </label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="text"
                  className="parametrage-unite__input"
                  value={newReponse}
                  onChange={(e) => setNewReponse(e.target.value)}
                  placeholder="Saisir une réponse..."
                  style={{ flex: 1 }}
                />
                <label style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.875rem" }}>
                  <input
                    type="checkbox"
                    checked={newModalite}
                    onChange={(e) => setNewModalite(e.target.checked)}
                  />
                  Correcte
                </label>
                <button 
                  type="button"
                  className="parametrage-unite__btn parametrage-unite__btn--secondary"
                  onClick={ajouterReponse}
                  style={{ fontSize: "0.875rem", padding: "0.4rem 0.8rem" }}
                >
                  Ajouter
                </button>
              </div>
            </div>

            {/* Liste des réponses en cours de création */}
            {reponses.length > 0 && (
              <div className="parametrage-unite__form-group">
                <label className="parametrage-unite__label">
                  Réponses ajoutées ({reponses.length})
                </label>
                <div style={{ 
                  background: "#f8f9fa", 
                  border: "1px solid #dee2e6", 
                  borderRadius: "0.375rem", 
                  padding: "0.75rem",
                  maxHeight: "150px",
                  overflowY: "auto"
                }}>
                  {reponses.map((r, index) => (
                    <div key={index} style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      padding: "0.25rem 0",
                      borderBottom: index < reponses.length - 1 ? "1px solid #e9ecef" : "none"
                    }}>
                      <span style={{ fontSize: "0.875rem" }}>
                        {r.texte} {r.modalite ? "✅" : "❌"}
                      </span>
                      <button 
                        type="button"
                        onClick={() => supprimerReponse(index)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#dc3545",
                          cursor: "pointer",
                          fontSize: "0.875rem"
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              className="parametrage-unite__btn parametrage-unite__btn--primary"
              onClick={handleQR}
              disabled={loading || !question.trim() || reponses.length === 0}
            >
              {loading ? (
                <>
                  <span className="parametrage-unite__spinner"></span>
                  Traitement...
                </>
              ) : "Sauvegarder Q/R"}
            </button>
          </div>

          {/* Colonne droite - Liste */}
          <div className="parametrage-unite__list-column">
            <div className="parametrage-unite__list-header">
              <h4 className="parametrage-unite__list-title">Questions configurées</h4>
              <span className="parametrage-unite__list-count">
                {donnees?.questions?.length || 0}
              </span>
            </div>

            <div className="parametrage-unite__list-body">
              {!donnees?.questions || donnees.questions.length === 0 ? (
                <div className="parametrage-unite__empty">
                  <div className="parametrage-unite__empty-icon">❓</div>
                  <p className="parametrage-unite__empty-text">
                    Aucune question configurée.<br/>
                    Créez votre première question QCM.
                  </p>
                </div>
              ) : (
                donnees.questions.map((q) => (
                  <div key={q.id_question_qcm} className="parametrage-unite__list-item">
                    <div className="parametrage-unite__item-content">
                      <h5 className="parametrage-unite__item-title">{q.intitule}</h5>
                      <div style={{ marginTop: "0.5rem" }}>
                        {donnees.reponses
                          .filter((r) => r.id_question_qcm === q.id_question_qcm)
                          .map((r) => (
                            <div key={r.id_reponse_qcm} style={{
                              fontSize: "0.875rem",
                              padding: "0.2rem 0",
                              color: "#6c757d"
                            }}>
                              {r.reponse} {r.modalite ? "✅" : "❌"}
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="parametrage-unite__item-actions">
                      <button 
                        className="parametrage-unite__action-btn"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionsReponses;
