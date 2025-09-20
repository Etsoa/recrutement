import React from 'react';
import '../../styles/CandidatureStep.css';

const SummaryStep = ({ formData, annonceData, errors = {} }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="summary-text">
      <h2>Récapitulatif de votre candidature</h2>
      
      <p>
        <strong>Nom complet :</strong> {formData.nom} {formData.prenom}<br/>
        <strong>Genre :</strong> {formData.genre}<br/>
        <strong>Date de naissance :</strong> {formatDate(formData.date_naissance)}<br/>
        <strong>Situation matrimoniale :</strong> {formData.situation_matrimoniale}<br/>
        <strong>Email :</strong> {formData.email}<br/>
        <strong>Téléphone :</strong> {formData.telephone}<br/>
        <strong>Adresse :</strong> {formData.adresse}, {formData.ville}
      </p>

      {formData.formations && formData.formations.length > 0 && (
        <p>
          <strong>Formation :</strong><br/>
          {formData.formations.map((formation, index) => (
            <span key={index}>
              • {formation.filiere} - Niveaux validés : {formation.niveaux.join(', ')}<br/>
            </span>
          ))}
        </p>
      )}

      {formData.experiences && formData.experiences.length > 0 && (
        <p>
          <strong>Expériences professionnelles :</strong><br/>
          {formData.experiences.map((exp, index) => (
            <span key={index}>
              • {exp.intitule_poste} chez {exp.nom_entreprise} ({exp.duree} {exp.duree > 1 ? 'ans' : 'an'})
              {exp.description_taches && <><br/>&nbsp;&nbsp;Raisons du départ / Réalisations : {exp.description_taches}</>}<br/>
            </span>
          ))}
        </p>
      )}

      {formData.langues && formData.langues.length > 0 && (
        <p>
          <strong>Langues maîtrisées :</strong> {formData.langues.map((langueObj) => langueObj.langue || langueObj).join(', ')}
        </p>
      )}

      {formData.qualites && formData.qualites.length > 0 && (
        <p>
          <strong>Qualités professionnelles :</strong> {formData.qualites.map((qualiteObj) => qualiteObj.qualite || qualiteObj).join(', ')}
        </p>
      )}

      <p>
        <strong>Documents téléchargés :</strong><br/>
        • Photo : {formData.photo ? `${formData.photo.name} (${formatFileSize(formData.photo.size)})` : 'Non fournie'}<br/>
        • CV : {formData.cv ? `${formData.cv.name} (${formatFileSize(formData.cv.size)})` : 'Non fourni (obligatoire)'}
      </p>

      <p>
        <em>Veuillez vérifier que toutes les informations ci-dessus sont exactes avant de soumettre votre candidature. 
        Une fois soumise, vous ne pourrez plus modifier ces informations.</em>
      </p>
    </div>
  );
};

export default SummaryStep;