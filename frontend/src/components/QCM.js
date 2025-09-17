import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Annonce.css";
import Button from './Button'

function QCM({ formData }) {
    const navigate = useNavigate();

    return (
        <div className="qcm-container" style={{width: "90%", maxWidth: "900px", margin: "40px auto", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.07)", padding: "32px"}}>
            <h2 style={{fontSize: "2rem", color: "#222", marginBottom: "24px", borderBottom: "2px solid #2ecc40", paddingBottom: "12px"}}>{formData.titre}</h2>
            {formData.questions.map((q) => (
                <div key={q.id_question} className="qcm-question-block" style={{marginBottom: "32px", padding: "24px", borderRadius: "12px", background: "#f8fdf8", boxShadow: "0 2px 8px rgba(46,204,64,0.05)"}}>
                    <h3 style={{fontSize: "1.2rem", color: "#000000ff", marginBottom: "16px"}}>{q.question}</h3>
                    <ul style={{listStyle: "none", padding: 0}}>
                        {q.reponses.map((r) => (
                            <li key={r.id_reponse} style={{marginBottom: "10px", padding: "10px 18px", borderRadius: "8px", background: r.correcte ? "#eafbe7" : "#f5f5f5", color: r.correcte ? "#2ecc40" : "#222", fontWeight: r.correcte ? "bold" : "normal", boxShadow: r.correcte ? "0 1px 4px rgba(46,204,64,0.08)" : "none"}}>
                                {r.reponse} {r.correcte && <span style={{marginLeft: "8px", fontSize: "0.95em", color: "#27ae60", fontWeight: "bold"}}>✔ Correcte</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default QCM;