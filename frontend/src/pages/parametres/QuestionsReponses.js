import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestionsReponses, createQuestionQcm, createReponseQcm } from "../../api/parametreApi";
import Input from "../../components/Input";
import { Button } from "../../components";
import "../../styles/Parametrage.css";
import Header from "../../components/Header";

function QuestionsReponses() {
  const navigate = useNavigate();
  const [donnees, setDonnees] = useState({ questions: [], reponses: [] });
  const [question, setQuestion] = useState("");
  const [reponses, setReponses] = useState([]); // tableau de réponses
  const [newReponse, setNewReponse] = useState("");
  const [newModalite, setNewModalite] = useState(false);
  const [showListe, setShowListe] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQuestionsReponses();
        setDonnees(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const ajouterReponse = () => {
    if (newReponse.trim() === "") return;
    setReponses([...reponses, { texte: newReponse, modalite: newModalite }]);
    setNewReponse("");
    setNewModalite(false);
  };

  const handleQR = async () => {
    try {
      // TODO: appel API pour sauvegarder question + réponses
      console.log("Question :", question);
      console.log("Réponses :", reponses);
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
      alert("Ajout Q/R envoye avec succes");
    } catch (error) {
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <div style={{ width: "50%" }}>
      {/* Formulaire d'ajout */}
      <div className="form-container">
        <h3>➕ Ajout nouvelle question/réponses</h3>
        <Input
          label="Question"
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <Input
            label="Réponse"
            type="text"
            onChange={(e) => setNewReponse(e.target.value)}
            value={newReponse}
          />
          <Input
            label="Modalité (True)"
            type="checkbox"
            onChange={(e) => setNewModalite(e.target.checked)}
            checked={newModalite}
          />
          <Button variant="secondary" onClick={ajouterReponse}>
            Ajouter cette réponse
          </Button>
        </div>

        {/* Liste des réponses ajoutées */}
        <ul>
          {reponses.map((r, index) => (
            <li key={index}>
              {r.texte} — {r.modalite ? "✅ correcte" : "❌ incorrecte"}
            </li>
          ))}
        </ul>

        <Button onClick={handleQR} variant="primary">
          Sauvegarder la Q/R
        </Button>
      </div>

      {/* Section liste des Q/R */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des Q/R ({donnees?.questions?.length || 0})</h3>
          <Button
            onClick={() => setShowListe((prev) => !prev)}
            variant="secondary"
          >
            {showListe ? "Masquer" : "Afficher"}
          </Button>
        </div>

        {showListe && (
          <div className="list-body">
            {donnees?.questions?.length === 0 ? (
              <div className="empty">
                ❌ Aucune question configurée
                <p>Ajoutez votre première question ci-dessus</p>
              </div>
            ) : (
              donnees.questions.map((q) => (
                <div key={q.id_question_qcm} className="list-item">
                  <h4>{q.intitule}</h4>
                  <ul>
                    {donnees.reponses
                      .filter((r) => r.id_question_qcm === q.id_question_qcm)
                      .map((r) => (
                        <li key={r.id_reponse_qcm}>
                          {r.reponse} {r.modalite ? "✅" : "❌"}
                        </li>
                      ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div >
  );
}

export default QuestionsReponses;
