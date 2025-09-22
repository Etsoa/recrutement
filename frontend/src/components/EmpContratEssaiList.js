// EmpContratEssaiTable.js
import React, { useEffect, useState } from "react";
import "../styles/EmpContratEssaiList.css";

const API_BASE = "http://localhost:5000/api/ceo";

const EmpContratEssaiTable = () => {
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);
  // editing[id_employe] = true/false : si on affiche le formulaire inline
  const [editing, setEditing] = useState({});
  // formValues[id_employe] = { date_debut: "", duree: "" }
  const [formValues, setFormValues] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const res = await fetch(`${API_BASE}/emp-contrat-essai`);
        const json = await res.json();
        if (json && json.success) {
          setEmployes(Array.isArray(json.data) ? json.data : []);
        } else {
          setEmployes([]);
        }
      } catch (err) {
        console.error("fetch emp-contrat-essai error:", err);
        setEmployes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployes();
  }, []);

  const toggleEdit = (id) => {
    setEditing((prev) => ({ ...prev, [id]: !prev[id] }));
    // init form values if opening
    if (!editing[id]) {
      setFormValues((prev) => ({
        ...prev,
        [id]: { date_debut: "", duree: "" },
      }));
    }
  };

  const handleChange = (id, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value },
    }));
  };

  const handleCancel = (id) => {
    setEditing((prev) => ({ ...prev, [id]: false }));
    setFormValues((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleValider = async (emp) => {
    const id_employe = emp.id_employe;
    const values = formValues[id_employe] || {};
    const date_debut = values.date_debut;
    const duree = parseInt(values.duree, 10);

    if (!date_debut) {
      alert("Veuillez choisir une date de début.");
      return;
    }
    if (!duree || duree < 1 || duree > 6) {
      alert("Veuillez entrer une durée entre 1 et 6 mois.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/renouveler-contrat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_employe, date_debut, duree }),
      });
    } catch (err) {
      console.error("Erreur renouveler-contrat:", err);
      alert("Erreur réseau lors du renouvellement.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="loading">Chargement des employés en contrat d'essai...</p>;
  }

  return (
    <div className="emp-contrat-table-container">
      <h2 className="table-title">Employés en contrat d’essai</h2>

      <div className="table-scroll-container">
        <table className="emp-contrat-table">
          <thead>
            <tr>
              <th>NOM</th>
              <th>PRÉNOM</th>
              <th>NB CONTRATS</th>
              <th>Dernier contrat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employes.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  Aucun employé trouvé
                </td>
              </tr>
            ) : (
              employes.map((emp) => {
                const contrats = Array.isArray(emp.ContratEssais) ? emp.ContratEssais : [];
                const lastContrat = contrats.length > 0 ? contrats[contrats.length - 1] : null;
                const canRenew = contrats.length < 2;

                return (
                  <tr key={emp.id_employe}>
                    <td>{emp.nom}</td>
                    <td>{emp.prenom}</td>
                    <td>{contrats.length}</td>
                    <td>
                      {lastContrat
                        ? `${lastContrat.date_debut} — ${lastContrat.duree} mois`
                        : "-"}
                    </td>
                    <td className="action-cell">
                      {canRenew ? (
                        <>
                          {!editing[emp.id_employe] ? (
                            <button
                              className="btn-renew"
                              onClick={() => toggleEdit(emp.id_employe)}
                            >
                              Renouveler contrat
                            </button>
                          ) : (
                            <div className="renew-inline">
                              <input
                                type="date"
                                value={formValues[emp.id_employe]?.date_debut || ""}
                                onChange={(e) =>
                                  handleChange(emp.id_employe, "date_debut", e.target.value)
                                }
                                className="input-date"
                              />
                              <input
                                type="number"
                                min="1"
                                max="6"
                                value={formValues[emp.id_employe]?.duree || ""}
                                onChange={(e) =>
                                  handleChange(emp.id_employe, "duree", e.target.value)
                                }
                                className="input-number"
                                placeholder="Durée (mois)"
                              />
                              <button
                                className="btn-validate"
                                onClick={() => handleValider(emp)}
                                disabled={submitting}
                              >
                                Valider
                              </button>
                              <button
                                className="btn-cancel"
                                onClick={() => handleCancel(emp.id_employe)}
                                disabled={submitting}
                              >
                                Annuler
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="limit-reached">Max renouvellements atteints</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpContratEssaiTable;
