import React from "react";
import { useNavigate } from '../router/useNavigateHelper';
import "../styles/Annonce.css";
import Button from './Button'

function Historique({ formData }) {
    const navigate = useNavigate();

    return (
       <div className="historique-table" style={{margin: "30px auto", width: "90%", maxWidth: "1200px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", background: "#fff", overflow: "hidden"}}>
                <div className="historique-header" style={{display: "flex", background: "#f5f5f5", fontWeight: "bold", padding: "16px 0"}}>
                    <div style={{flex: 2, paddingLeft: "24px"}}>Poste</div>
                    <div style={{flex: 1}}>Statut</div>
                    <div style={{flex: 1}}>Unité</div>
                    <div style={{flex: 1}}>Date</div>
                </div>
                {formData.map((item) => (
                    <div key={item.id_status_annonce} className="historique-row" style={{display: "flex", borderBottom: "1px solid #eee", alignItems: "center", padding: "14px 0"}}>
                        <div style={{flex: 2, paddingLeft: "24px", color: "#222"}}>{item.poste}</div>
                        <div style={{flex: 1, color: item.type_status === "Publié" ? "#2ecc40" : item.type_status === "En cours de demande" ? "#f39c12" : "#888"}}>{item.type_status}</div>
                        <div style={{flex: 1, color: "#555"}}>{item.unite_nom}</div>
                        <div style={{flex: 1, color: "#888"}}>{item.date_changement}</div>
                    </div>
                ))}
            </div>
    );
}

export default Historique;