import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from '../../router/useNavigateHelper';
import { parametresService, annoncesBackOfficeService } from "../../services";
import { Button } from "../../components";
import "../../styles/QCM.css";

function QCM() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allQuestions, setAllQuestions] = useState([]); 
  const [selectedQuestions, setSelectedQuestions] = useState([]); 
  const [donnees, setDonnees] = useState([]); // liste des qcms liés à l'annonce
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [search, setSearch] = useState('');

  const bankRef = useRef(null);
  const attachedRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await parametresService.getQuestionsReponses();
        setAllQuestions(response.data.questions || []);

        const qcmResponse = await annoncesBackOfficeService.getQCMAnnonce(id);
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
        setMessage({ type: 'error', text: "Erreur lors du chargement des questions" });
      } finally {
        setLoading(false);
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

  const existingQuestionIds = useMemo(() => new Set((donnees || []).map(d => d.id_question_qcm)), [donnees]);

  const filteredQuestions = useMemo(() => {
    if (!search) return allQuestions;
    const s = search.toLowerCase();
    return allQuestions.filter(q => (q.intitule || '').toLowerCase().includes(s));
  }, [allQuestions, search]);

  const toggleSelectAll = () => {
    const ids = filteredQuestions.map(q => q.id_question_qcm);
    const allSelected = ids.every(idq => selectedQuestions.includes(idq));
    if (allSelected) {
      // unselect all from filtered
      setSelectedQuestions(selectedQuestions.filter(idq => !ids.includes(idq)));
    } else {
      // add all filtered
      const union = new Set([...selectedQuestions, ...ids]);
      setSelectedQuestions(Array.from(union));
    }
  };

  const clearSelection = () => setSelectedQuestions([]);

  const handleAjoutQuestion = async () => {
    try {
      // n'ajouter que les nouvelles questions non encore liées
      const newIds = selectedQuestions.filter(qid => !existingQuestionIds.has(qid));
      if (newIds.length === 0) {
        setMessage({ type: 'info', text: 'Aucune nouvelle question à ajouter.' });
        return;
      }

      const questionsPayload = newIds.map((item) => ({
        id_annonce: parseInt(id),
        id_question_qcm: parseInt(item),
      }));

      for (let q of questionsPayload) {
        await annoncesBackOfficeService.createQcmAnnonce(q);
      }

      setMessage({ type: 'success', text: 'Questions ajoutées avec succès.' });

      // Recharge après ajout
      const qcmResponse = await annoncesBackOfficeService.getQCMAnnonce(id);
      const data = Array.isArray(qcmResponse.data)
        ? qcmResponse.data
        : [qcmResponse.data];
      setDonnees(data);
      setSelectedQuestions([]);

    } catch (error) {
      console.error("Erreur lors de l'ajout du QCM :", error);
      setMessage({ type: 'error', text: "Erreur lors de l'ajout du QCM" });
    }
  };

  return (
    <div className="qcm-page">
      <div className="qcm-header qcm-header--bar">
        <div className="qcm-header__left">
          <Button variant="primary" onClick={() => navigate(-1)}>Retour</Button>
        </div>
        <h1 className="qcm-title qcm-header__title">Créer le QCM de l'annonce n°{id}</h1>
        <div className="qcm-header__right">
          <button className="qcm-btn qcm-btn--ghost" onClick={() => bankRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Banque</button>
          <button className="qcm-btn qcm-btn--ghost" onClick={() => attachedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Attachées</button>
        </div>
      </div>

      {message.text && (
        <div className={`qcm-message qcm-message--${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="qcm-content">
        <section className="qcm-card" ref={bankRef}>
          <div className="qcm-card__header">
            <h2 className="qcm-card__title">Banque de questions</h2>
            <div className="qcm-tools">
              <input
                className="qcm-input"
                placeholder="Rechercher une question..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="qcm-actions-inline">
                <button className="qcm-btn qcm-btn--secondary" onClick={toggleSelectAll} disabled={loading || filteredQuestions.length === 0}>
                  Sélectionner tout
                </button>
                <button className="qcm-btn qcm-btn--ghost" onClick={clearSelection} disabled={selectedQuestions.length === 0}>
                  Effacer sélection
                </button>
              </div>
            </div>
          </div>

          <div className="qcm-counter">
            <span>{filteredQuestions.length} questions</span>
            <span>•</span>
            <span>{selectedQuestions.length} sélectionnée(s)</span>
          </div>

          <div className="qcm-list">
            {loading ? (
              <div className="qcm-skeleton-list">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div className="qcm-skeleton-item" key={i} />
                ))}
              </div>
            ) : (
              filteredQuestions.map((item) => (
                <label key={item.id_question_qcm} className="qcm-list-item">
                  <input
                    type="checkbox"
                    value={item.id_question_qcm}
                    checked={selectedQuestions.includes(item.id_question_qcm)}
                    onChange={() => handleCheckboxChange(item.id_question_qcm)}
                  />
                  <span className="qcm-question-text">{item.intitule}</span>
                </label>
              ))
            )}
          </div>

          {selectedQuestions.length > 0 && (
            <div className="qcm-chips">
              {selectedQuestions.map((qid) => {
                const q = allQuestions.find(qq => qq.id_question_qcm === qid);
                return (
                  <span className="qcm-chip" key={qid} title={q?.intitule || ''}>
                    {q?.intitule || `#${qid}`}
                  </span>
                );
              })}
            </div>
          )}

          <div className="qcm-card__footer">
            <button className="qcm-btn qcm-btn--primary" onClick={handleAjoutQuestion} disabled={loading || selectedQuestions.length === 0}>
              Ajouter la sélection à l'annonce
            </button>
          </div>
        </section>

  <section className="qcm-card" ref={attachedRef}>
          <div className="qcm-card__header">
            <h2 className="qcm-card__title">Questions de l'annonce</h2>
            <div className="qcm-counter"><span>{donnees.length}</span> question(s)</div>
          </div>
          <div className="qcm-attached-list">
            {loading ? (
              <div className="qcm-skeleton-list">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="qcm-skeleton-item" key={i} />
                ))}
              </div>
            ) : donnees.length === 0 ? (
              <div className="qcm-empty">Aucune question n'est encore attachée à cette annonce.</div>
            ) : (
              donnees.map((q, index) => {
                const questionDetail = allQuestions.find(
                  (qq) => qq.id_question_qcm === q.id_question_qcm
                );
                return (
                  <div className="qcm-attached-item" key={q.id_qcm_annonce}>
                    <div className="qcm-attached-index">Q{index + 1}</div>
                    <div className="qcm-attached-text">{questionDetail?.intitule || "Question inconnue"}</div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default QCM;
