import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsReponses } from "../api/parametreApi";
import { getQCMAnnonce, createQcmAnnonce } from "../api/annonceApi";
import { Button, Header } from "../components";
import "../styles/Parametrage.css";

function QCM() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allQuestions, setAllQuestions] = useState([]); 
  const [selectedQuestions, setSelectedQuestions] = useState([]); 
  const [donnees, setDonnees] = useState([]); // liste des qcms liés à l'annonce

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQuestionsReponses();
        setAllQuestions(response.data.questions || []);

        const qcmResponse = await getQCMAnnonce(id);
        if (qcmResponse.success) {
          const data = Array.isArray(qcmResponse.data)
            ? qcmResponse.data
            : [qcmResponse.data];
          setDonnees(data);
          // pré-sélection des questions déjà associées
          setSelectedQuestions(data.map((q) => q.id_question_qcm));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleCheckboxChange = (id_question) => {
    if (selectedQuestions.includes(id_question)) {
      setSelectedQuestions(selectedQuestions.filter((qid) => qid !== id_question));
    } else {
      setSelectedQuestions([...selectedQuestions, id_question]);
    }
  };

  const handleAjoutQuestion = async () => {
    try {
      const questionsPayload = selectedQuestions.map((item) => ({
        id_annonce: parseInt(id),
        id_question_qcm: parseInt(item),
      }));

      for (let q of questionsPayload) {
        await createQcmAnnonce(q);
      }

      alert("QCM ajouté avec succès !");
      console.log("Payload envoyé :", questionsPayload);

      // Recharge après ajout
      const qcmResponse = await getQCMAnnonce(id);
      const data = Array.isArray(qcmResponse.data)
        ? qcmResponse.data
        : [qcmResponse.data];
      setDonnees(data);
      setSelectedQuestions([]);

    } catch (error) {
      console.error("Erreur lors de l'ajout du QCM :", error);
      alert("Erreur lors de l'ajout du QCM");
    }
  };

  return (
    <div>
      <Header />
      <Button variant="primary" onClick={() => navigate(-1)}>
        Retour
      </Button>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        Créer le QCM de l'annonce n°{id}
      </h1>

      <main
        className="App-main"
        style={{ padding: "20px", justifyContent: "center", display: "flex" }}
      >
        <div style={{ width: "50%" }}>
          {/* Liste des questions à ajouter */}
          <div>
            <label>Questions à ajouter</label>
            <div
              style={{
                flexWrap: "wrap",
                gap: "10px",
                maxHeight: "150px",
                overflowY: "scroll",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {allQuestions.map((item) => (
                <label
                  key={item.id_question_qcm}
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="checkbox"
                    value={item.id_question_qcm}
                    checked={selectedQuestions.includes(item.id_question_qcm)}
                    onChange={() => handleCheckboxChange(item.id_question_qcm)}
                  />
                  {item.intitule}
                </label>
              ))}
            </div>
          </div>

          <Button variant="primary" onClick={handleAjoutQuestion} style={{ marginTop: "20px" }}>
            Ajouter la question à l'annonce
          </Button>

          {/* Liste des questions déjà attachées */}
          <div style={{ marginTop: "50px" }}>
            <h3>Liste des questions de l'annonce ({donnees.length})</h3>
            <div
              style={{
                maxHeight: "300px",
                overflowY: "scroll",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {donnees.map((q, index) => {
                // retrouver le texte de la question dans allQuestions
                const questionDetail = allQuestions.find(
                  (qq) => qq.id_question_qcm === q.id_question_qcm
                );
                return (
                  <div
                    key={q.id_qcm_annonce}
                    style={{ marginBottom: "10px", padding: "10px", borderBottom: "1px solid #eee" }}
                  >
                    <strong>Q{index + 1}:</strong> {questionDetail?.intitule || "Question inconnue"}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QCM;
