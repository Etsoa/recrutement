Table genres {
  id_genre serial [pk]
  valeur varchar(50) [not null]
}

Table situation_matrimoniales {
  id_situation serial [pk]
  valeur varchar(50) [not null]
}

Table langues {
  id_langue serial [pk]
  valeur varchar(50) [not null]
}

Table filieres {
  id_filiere serial [pk]
  valeur varchar(100) [not null]
}

Table niveaux {
  id_niveau serial [pk]
  valeur varchar(100) [not null]
}

Table qualites {
  id_qualite serial [pk]
  valeur varchar(100) [not null]
}

Table domaines {
  id_domaine serial [pk]
  valeur varchar(100) [not null]
}

Table unites {
  id_unite serial [pk]
  nom varchar(100) [not null]
  mot_de_passe varchar(100) [not null]
}

Table postes {
  id_poste serial [pk]
  valeur varchar(100) [not null]
  id_unite int [ref: > unites.id_unite]
}

Table villes {
  id_ville serial [pk]
  valeur varchar(100) [not null]
}

Table question_qcms {
  id_question serial [pk]
  intitule varchar(255) [not null]
}

Table reponse_qcms {
  id_reponse_qcm serial [pk]
  id_question_qcm int [ref: > question_qcms.id_question]
  reponse varchar(255) [not null]
  modalite boolean [not null]
}

Table annonces {
  id_annonce serial [pk]
  id_poste int [ref: > postes.id_poste]
  id_ville int [ref: > villes.id_ville]
  age_min int
  age_max int
  id_genre int [ref: > genres.id_genre]
}

Table qcm_annonces {
  id_qcm_annonce serial [pk]
  id_annonce int [ref: > annonces.id_annonce]
  id_question_qcm int [ref: > question_qcms.id_question]
}

Table type_status_annonces {
  id_type_status serial [pk]
  valeur varchar(50) [not null]
}

Table status_annonce {
  id_status_annonce serial [pk]
  id_annonce int [ref: > annonces.id_annonce]
  id_type_status_annonce int [ref: > type_status_annonces.id_type_status]
  date_changement date [not null]
  id_unite int [ref: > unites.id_unite]
}

Table niveau_filiere_annonces {
  id_niveau_filiere_annonce serial [pk]
  id_annonce int [ref: > annonces.id_annonce]
  id_filiere int [ref: > filieres.id_filiere]
  id_niveau int [ref: > niveaux.id_niveau]
}

Table langue_annonces {
  id_langue_annonce serial [pk]
  id_annonce int [ref: > annonces.id_annonce]
  id_langue int [ref: > langues.id_langue]
}

Table qualite_annonces {
  id_qualite_annonce serial [pk]
  id_annonce int [ref: > annonces.id_annonce]
  id_qualite int [ref: > qualites.id_qualite]
}

Table experience_annonces {
  id_experience_annonce serial [pk]
  id_annonce int [ref: > annonces.id_annonce]
  id_domaine int [ref: > domaines.id_domaine]
  nombre_annee int [not null]
}

Table tiers {
  id_tiers serial [pk]
  nom varchar(100) [not null]
  prenom varchar(100) [not null]
  date_naissance date [not null]
  id_genre int [ref: > genres.id_genre]
  id_situation_matrimoniale int [ref: > situation_matrimoniales.id_situation]
  nombre_enfants int
  contact varchar(50) [not null]
  email varchar(100) [not null]
  cin varchar(50) [not null]
  id_ville int [ref: > villes.id_ville]
  photo varchar(255) [not null]
}

Table niveau_filiere_tiers {
  id_niveau_filiere_tiers serial [pk]
  id_tiers int [ref: > tiers.id_tiers]
  id_filiere int [ref: > filieres.id_filiere]
  id_niveau int [ref: > niveaux.id_niveau]
}

Table langue_tiers {
  id_langue_tiers serial [pk]
  id_tiers int [ref: > tiers.id_tiers]
  id_langue int [ref: > langues.id_langue]
}

Table qualite_tiers {
  id_qualite_tiers serial [pk]
  id_tiers int [ref: > tiers.id_tiers]
  id_qualite int [ref: > qualites.id_qualite]
}

Table experience_tiers {
  id_experience_tiers serial [pk]
  id_tiers int [ref: > tiers.id_tiers]
  id_domaine int [ref: > domaines.id_domaine]
  date_debut date [not null]
  date_fin date
}

Table candidats {
  id_candidat serial [pk]
  id_tiers int [ref: > tiers.id_tiers]
  id_annonce int [ref: > annonces.id_annonce]
  cv varchar(255) [not null]
}

Table type_status_employes {
  id_type_status_employe serial [pk]
  valeur varchar(50) [not null]
}

Table employes {
  id_employe serial [pk]
  id_tiers int [ref: > tiers.id_tiers]
  id_type_status_employe int [ref: > type_status_employes.id_type_status_employe]
  id_poste int [ref: > postes.id_poste]
}

Table status_employes {
  id_status_employe serial [pk]
  id_employe int [ref: > employes.id_employe]
  id_type_status_employe int [ref: > type_status_employes.id_type_status_employe]
  date_changement date [not null]
}

Table historique_poste_employes {
  id_historique_poste_employe serial [pk]
  id_employe int [ref: > employes.id_employe]
  id_poste int [ref: > postes.id_poste]
  date_changement date [not null]
}

Table contrat_essais {
  id_contrat_essai serial [pk]
  id_employe int [ref: > employes.id_employe]
  date_debut date [not null]
  duree int [not null]
}

Table envoi_qcm_candidats {
  id_envoi_qcm_candidat serial [pk]
  id_candidat int [ref: > candidats.id_candidat]
  lien varchar(255) [not null]
  token varchar(255) [not null]
  date_envoi date [not null]
}

Table reponse_qcm_candidats {
  id_reponse_qcm_candidat serial [pk]
  id_envoi_qcm_candidat int [ref: > envoi_qcm_candidats.id_envoi_qcm_candidat]
  id_qcm_annonce int [ref: > qcm_annonces.id_qcm_annonce]
  debut timestamp
  fin timestamp
  duree int
  reponse varchar(255) [not null]
  score int
}

Table type_status_entretiens {
  id_type_status_entretien serial [pk]
  valeur varchar(50) [not null]
}

Table unite_entretiens {
  id_unite_entretien serial [pk]
  id_candidat int [ref: > candidats.id_candidat]
  id_unite int [ref: > unites.id_unite]
  date_entretien date [not null]
  duree int [not null]
}

Table status_unite_entretiens {
  id_status_unite_entretien serial [pk]
  id_unite_entretien int [ref: > unite_entretiens.id_unite_entretien]
  id_type_status_entretien int [ref: > type_status_entretiens.id_type_status_entretien]
  date_changement date [not null]
}

Table score_unite_entretiens {
  id_score_unite_entretien serial [pk]
  id_unite_entretien int [ref: > unite_entretiens.id_unite_entretien]
  score int [not null]
  date_score date [not null]
}

Table type_status_suggestions {
  id_type_status_suggestion serial [pk]
  valeur varchar(50) [not null]
}

Table rh_suggestions {
  id_rh_suggestion serial [pk]
  id_unite_entretien int [ref: > unite_entretiens.id_unite_entretien]
  id_candidat int [ref: > candidats.id_candidat]
  date_suggestion date [not null]
}

Table status_rh_suggestions {
  id_status_rh_suggestion serial [pk]
  id_rh_suggestion int [ref: > rh_suggestions.id_rh_suggestion]
  id_type_status_suggestion int [ref: > type_status_suggestions.id_type_status_suggestion]
  date_changement date [not null]
}

Table rh_entretiens {
  id_rh_entretien serial [pk]
  id_rh_suggestion int [ref: > rh_suggestions.id_rh_suggestion]
  id_candidat int [ref: > candidats.id_candidat]
  date_entretien date [not null]
  duree int [not null]
}

Table status_rh_entretiens {
  id_status_rh_entretien serial [pk]
  id_rh_entretien int [ref: > rh_entretiens.id_rh_entretien]
  id_type_status_entretien int [ref: > type_status_entretiens.id_type_status_entretien]
  date_changement date [not null]
}

Table score_rh_entretiens {
  id_score_rh_entretien serial [pk]
  id_rh_entretien int [ref: > rh_entretiens.id_rh_entretien]
  score int [not null]
  date_score date [not null]
}

Table ceo_suggestions {
  id_ceo_suggestion serial [pk]
  id_rh_entretien int [ref: > rh_entretiens.id_rh_entretien]
  id_candidat int [ref: > candidats.id_candidat]
  id_type_status_suggestion int [ref: > type_status_suggestions.id_type_status_suggestion]
  date_suggestion date [not null]
}

Table status_ceo_suggestions {
  id_status_ceo_suggestion serial [pk]
  id_ceo_suggestion int [ref: > ceo_suggestions.id_ceo_suggestion]
  id_type_status_suggestion int [ref: > type_status_suggestions.id_type_status_suggestion]
  date_changement date [not null]
}

Table mails {
  id_mail serial [pk]
  objet varchar(255) [not null]
  signature varchar(255) [not null]
}

Table corps_mails {
  id_corps_mail serial [pk]
  id_mail int [ref: > mails.id_mail]
  corps text [not null]
}

Table delai_entretien {
  valeur int [pk, not null]
}

Table score_minimum_entretien {
  valeur int [pk, not null]
}

Table delai_qcm {
  valeur int [pk, not null]
}

Table score_minimum_qcm {
  valeur int [pk, not null]
}

Table pourcentage_minimum_cv {
  valeur int [pk, not null]
}

Table adresse_mail {
  valeur varchar(100) [pk, not null]
}
