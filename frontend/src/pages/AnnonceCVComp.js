import React from "react";
import CVComp from "../components/CVComp";
import AnnonceComp from "../components/AnnonceComp";
import "../styles/AnnonceCVComp.css";

const AnnonceCVComp = ({ annonceData, cvData }) => {
  return (
    <div className="annoncecv-container">
      {/* Colonne gauche : Annonce */}
      <div className="annoncecv-left">
        <AnnonceComp {...annonceData} />
      </div>

      {/* Colonne droite : CV */}
      <div className="annoncecv-right">
        <CVComp {...cvData} />
      </div>
    </div>
  );
};

export default AnnonceCVComp;
