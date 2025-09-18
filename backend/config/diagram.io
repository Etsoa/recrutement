Table genres {
  id_genre SERIAL [pk]
  valeur VARCHAR(50) [not null]
}

Table situation_matrimoniales {
  id_situation SERIAL [pk]
  valeur VARCHAR(50) [not null]
}

Table langues {
  id_langue SERIAL [pk]
  valeur VARCHAR(50) [not null]
}

Table filieres {
  id_filiere SERIAL [pk]
  valeur VARCHAR(100) [not null]
}

Table niveaux {
  id_niveau SERIAL [pk]
  valeur VARCHAR(100) [not null]
}

Table qualites {
  id_qualite SERIAL [pk]
  valeur VARCHAR(100) [not null]
}

Table domaines {
  id_domaine SERIAL [pk]
  valeur VARCHAR(100) [not null]
}

Table unites {
  id_unite SERIAL [pk]
  nom VARCHAR(100) [not null]
  motdepasse VARCHAR(100) [not null]
}

Table postes {
  id_poste SERIAL [pk]
  valeur VARCHAR(100) [not null]
  id_unite INTEGER [ref: > unites.id_unite]
}

Table villes {
  id_ville SERIAL [pk]
  valeur VARCHAR(100) [not null]
}

Table question_qcms {
  id_question SERIAL [pk]
  intitule VARCHAR(255) [not null]
}

Table reponse_qcms {
  id_reponse_qcm SERIAL [pk]
  id_question_qcm INTEGER [ref: > question_qcms.id_question]
  reponse VARCHAR(255) [not null]
  modalite BOOLEAN [not null]
}

Table annonces {
  id_annonce SERIAL [pk]
  id_poste INTEGER [ref: > postes.id_poste]
  id_ville INTEGER [ref: > villes.id_ville]
  age_min INTEGER
  age_max INTEGER
  id_genre INTEGER [ref: > genres.id_genre]
}

Table qcm_annonces {
  id_qcm_annonce SERIAL [pk]
  id_annonce INTEGER [ref: > annonces.id_annonce]
  id_question_qcm INTEGER [ref: > question_qcms.id_question]
}

Table type_status_annonces {
  id_type_status SERIAL [pk]
  valeur VARCHAR(50) [not null]
}

Table status_annonces {
  id_status_annonce SERIAL [pk]
  id_annonce INTEGER [ref: > annonces.id_annonce]
  id_type_status_annonce INTEGER [ref: > type_status_annonces.id_type_status]
  date_changement DATE [not null]
  id_unite INTEGER [ref: > unites.id_unite]
}

Table niveau_filiere_annonces {
  id_niveau_filiere_annonce SERIAL [pk]
  id_annonce INTEGER [ref: > annonces.id_annonce]
  id_filiere INTEGER [ref: > filieres.id_filiere]
  id_niveau INTEGER [ref: > niveaux.id_niveau]
}

Table langue_annonces {
  id_langue_annonce SERIAL [pk]
  id_annonce INTEGER [ref: > annonces.id_annonce]
  id_langue INTEGER [ref: > langues.id_langue]
}

Table qualite_annonces {
  id_qualite_annonce SERIAL [pk]
  id_annonce INTEGER [ref: > annonces.id_annonce]
  id_qualite INTEGER [ref: > qualites.id_qualite]
}

Table experience_annonce {
  id_experience_annonce SERIAL [pk]
  id_annonce INTEGER [ref: > annonces.id_annonce]
  id_domaine INTEGER [ref: > domaines.id_domaine]
  nombre_annee INTEGER [not null]
}

Table tiers {
  id_tiers SERIAL [pk]
  nom VARCHAR(100) [not null]
  prenom VARCHAR(100) [not null]
  date_naissance DATE [not null]
  id_genre INTEGER [ref: > genres.id_genre]
  id_situation_matrimoniale INTEGER [ref: > situation_matrimoniales.id_situation]
  nombre_enfants INTEGER
  contact VARCHAR(50) [not null]
  email VARCHAR(100) [not null]
  cin VARCHAR(50) [not null]
  id_ville INTEGER [ref: > villes.id_ville]
  photo VARCHAR(255) [not null]
}

Table niveau_filiere_tiers {
  id_niveau_filiere_tiers SERIAL [pk]
  id_tiers INTEGER [ref: > tiers.id_tiers]
  id_filiere INTEGER [ref: > filieres.id_filiere]
  id_niveau INTEGER [ref: > niveaux.id_niveau]
}

Table langue_tiers {
  id_langue_tiers SERIAL [pk]
  id_tiers INTEGER [ref: > tiers.id_tiers]
  id_langue INTEGER [ref: > langues.id_langue]
}

Table qualite_tiers {
  id_qualite_tiers SERIAL [pk]
  id_tiers INTEGER [ref: > tiers.id_tiers]
  id_qualite INTEGER [ref: > qualites.id_qualite]
}

Table experience_tiers {
  id_experience_tiers SERIAL [pk]
  id_tiers INTEGER [ref: > tiers.id_tiers]
  id_domaine INTEGER [ref: > domaines.id_domaine]
  nombre_annee INTEGER [not null]
}

Table candidats {
  id_candidat SERIAL [pk]
  id_tiers INTEGER [ref: > tiers.id_tiers]
  id_annonce INTEGER [ref: > annonces.id_annonce]
  cv VARCHAR(255) [not null]
}

Table type_status_employes {
  id_type_status_employe SERIAL [pk]
  valeur VARCHAR(50) [not null]
}

Table employes {
  id_employe SERIAL [pk]
  id_tiers INTEGER [ref: > tiers.id_tiers]
  id_type_status_employe INTEGER [ref: > type_status_employes.id_type_status_employe]
  id_poste INTEGER [ref: > postes.id_poste]
}

Table status_employes {
  id_status_employe SERIAL [pk]
  id_employe INTEGER [ref: > employes.id_employe]
  id_type_status_employe INTEGER [ref: > type_status_employes.id_type_status_employe]
  date_changement DATE [not null]
}

Table historique_poste_employes {
  id_historique_poste_employe SERIAL [pk]
  id_employe INTEGER [ref: > employes.id_employe]
  id_poste INTEGER [ref: > postes.id_poste]
  date_changement DATE [not null]
}

Table contrat_essais {
  id_contrat_essai SERIAL [pk]
  id_employe INTEGER [ref: > employes.id_employe]
  date_debut DATE [not null]
  duree INTEGER [not null]
}

Table envoi_qcm_candidats {
  id_envoi_qcm_candidat SERIAL [pk]
  id_candidat INTEGER [ref: > candidats.id_candidat]
  lien VARCHAR(255) [not null]
  token VARCHAR(255) [not null]
  date_envoi DATE [not null]
}

Table reponse_qcm_candidats {
  id_reponse_qcm_candidat SERIAL [pk]
  id_envoi_qcm_candidat INTEGER [ref: > envoi_qcm_candidats.id_envoi_qcm_candidat]
  id_qcm_annonce INTEGER [ref: > qcm_annonces.id_qcm_annonce]
  debut TIMESTAMP
  fin TIMESTAMP
  duree INTEGER
  reponse VARCHAR(255) [not null]
  score INTEGER
}

Table type_status_entretiens {
  id_type_status_entretien SERIAL [pk]
  valeur VARCHAR(50) [not null]
}

Table unite_entretiens {
  id_unite_entretien SERIAL [pk]
  id_candidat INTEGER [ref: > candidats.id_candidat]
  id_unite INTEGER [ref: > unites.id_unite]
  date_entretien DATE [not null]
  duree INTEGER [not null]
}

Table status_unite_entretiens {
  id_status_unite_entretien SERIAL [pk]
  id_unite_entretien INTEGER [ref: > unite_entretiens.id_unite_entretien]
  id_type_status_entretien INTEGER [ref: > type_status_entretiens.id_type_status_entretien]
  date_changement DATE [not null]
}

Table score_unite_entretiens {
  id_score_unite_entretien SERIAL [pk]
  id_unite_entretien INTEGER [ref: > unite_entretiens.id_unite_entretien]
  score INTEGER [not null]
  date_score DATE [not null]
}

Table type_status_suggestions {
  id SERIAL [pk]
  valeur VARCHAR(50) [not null]
}

Table rh_suggestions {
  id_rh_suggestion SERIAL [pk]
  id_unite_entretien INTEGER [ref: > unite_entretiens.id_unite_entretien]
  id_candidat INTEGER [ref: > candidats.id_candidat]
  date_suggestion DATE [not null]
}

Table status_rh_suggestions {
  id_status_rh_suggestion SERIAL [pk]
  id_rh_suggestion INTEGER [ref: > rh_suggestions.id_rh_suggestion]
  id_type_status_suggestion INTEGER [ref: > type_status_suggestions.id]
  date_changement DATE [not null]
}

Table rh_entretiens {
  id_rh_entretien SERIAL [pk]
  id_rh_suggestion INTEGER [ref: > rh_suggestions.id_rh_suggestion]
  id_candidat INTEGER [ref: > candidats.id_candidat]
  date_entretien DATE [not null]
  duree INTEGER [not null]
}

Table status_rh_entretiens {
  id_status_rh_entretien SERIAL [pk]
  id_rh_entretien INTEGER [ref: > rh_entretiens.id_rh_entretien]
  id_type_status_entretien INTEGER [ref: > type_status_entretiens.id_type_status_entretien]
  date_changement DATE [not null]
}

Table score_rh_entretiens {
  id_score_rh_entretien SERIAL [pk]
  id_rh_entretien INTEGER [ref: > rh_entretiens.id_rh_entretien]
  score INTEGER [not null]
  date_score DATE [not null]
}

Table ceo_suggestions {
  id_ceo_suggestion SERIAL [pk]
  id_rh_entretien INTEGER [ref: > rh_entretiens.id_rh_entretien]
  id_candidat INTEGER [ref: > candidats.id_candidat]
  date_suggestion DATE [not null]
}

Table status_ceo_suggestions {
  id_status_ceo_suggestion SERIAL [pk]
  id_ceo_suggestion INTEGER [ref: > ceo_suggestions.id_ceo_suggestion]
  id_type_status_suggestion INTEGER [ref: > type_status_suggestions.id]
  date_changement DATE [not null]
}

Table mails {
  id_mail SERIAL [pk]
  objet VARCHAR(255) [not null]
  signature VARCHAR(255) [not null]
}

Table corps_mails {
  id_corps_mail SERIAL [pk]
  id_mail INTEGER [ref: > mails.id_mail]
  corps TEXT [not null]
}

Table delai_entretien {
  valeur INTEGER [pk, not null]
}

Table score_minimum_entretien {
  valeur INTEGER [pk, not null]
}

Table delai_qcm {
  valeur INTEGER [pk, not null]
}

Table score_minimum_qcm {
  valeur INTEGER [pk, not null]
}

Table pourcentage_minimum_cv {
  valeur INTEGER [pk, not null]
}
