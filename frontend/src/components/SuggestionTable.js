// SuggestionTable.js
import React, { useState, useEffect } from "react";
import "../styles/SuggestionTable.css";

const SuggestionTable = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [decisions, setDecisions] = useState({});
  const [loading, setLoading] = useState(true);

  // Charger les suggestions depuis l'API
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/ceo/suggestions-waiting");
        const data = await res.json();
        if (data.success) {
          setSuggestions(data.data);
        }
      } catch (error) {
        console.error("Erreur lors du fetch suggestions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  const handleDecisionChange = (id, field, value) => {
    setDecisions((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleSubmit = (id) => {
    const decision = decisions[id];
    if (!decision || decision.status === "refuser") {
      alert("Suggestion refusée.");
      return;
    }

    if (decision.status === "valider") {
      if (!decision.date_debut || !decision.duree) {
        alert("Date début et durée sont obligatoires pour valider.");
        return;
      }

      // 👉 Ici tu peux envoyer avec fetch/axios vers ton backend
      console.log("Données envoyées :", {
        id_candidat: id,
        date_debut: decision.date_debut,
        duree: decision.duree
      });

      alert("Contrat d’essai validé !");
    }
  };

  if (loading) {
    return <p>Chargement des suggestions...</p>;
  }

  return (
    <div className="suggestion-table-container">
      <table className="suggestion-table">
        <thead>
          <tr>
            <th>Candidat</th>
            <th>Contrat d’essai</th>
            <th>Date début</th>
            <th>Durée (mois)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((s) => {
            const decision = decisions[s.id_candidat] || {};
            return (
              <tr key={s.id_candidat}>
                <td>
                  {s.Candidat.Tier.nom} {s.Candidat.Tier.prenom}
                </td>
                <td>
                  <select
                    value={decision.status || ""}
                    onChange={(e) =>
                      handleDecisionChange(s.id_candidat, "status", e.target.value)
                    }
                  >
                    <option value="">-- Choisir --</option>
                    <option value="valider">Valider</option>
                    <option value="refuser">Refuser</option>
                  </select>
                </td>
                <td>
                  {decision.status === "valider" && (
                    <input
                      type="date"
                      value={decision.date_debut || ""}
                      onChange={(e) =>
                        handleDecisionChange(s.id_candidat, "date_debut", e.target.value)
                      }
                      required
                    />
                  )}
                </td>
                <td>
                  {decision.status === "valider" && (
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={decision.duree || ""}
                      onChange={(e) =>
                        handleDecisionChange(s.id_candidat, "duree", e.target.value)
                      }
                      required
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => handleSubmit(s.id_candidat)}>Envoyer</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SuggestionTable;
