+CREATE TABLE genres (
    id_genre SERIAL PRIMARY KEY,
    valeur VARCHAR(50) NOT NULL
);

CREATE TABLE situations_matrimoniales (
    id_situation SERIAL PRIMARY KEY,
    valeur VARCHAR(50) NOT NULL
);

CREATE TABLE langues (
    id_langue SERIAL PRIMARY KEY,
    valeur VARCHAR(50) NOT NULL
);

CREATE TABLE filieres (
    id_filiere SERIAL PRIMARY KEY,
    valeur VARCHAR(100) NOT NULL
);

CREATE TABLE niveaux (
    id_niveau SERIAL PRIMARY KEY,
    valeur VARCHAR(100) NOT NULL
);

CREATE TABLE qualites (
    id_qualite SERIAL PRIMARY KEY,
    valeur VARCHAR(100) NOT NULL
);

CREATE TABLE domaines (
    id_domaine SERIAL PRIMARY KEY,
    valeur VARCHAR(100) NOT NULL
);

CREATE TABLE unites (
    id_unite SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    motdepasse VARCHAR(100) NOT NULL
);

CREATE TABLE postes (
    id_poste SERIAL PRIMARY KEY,
    valeur VARCHAR(100) NOT NULL,
    id_unite INTEGER REFERENCES unites(id_unite) ON DELETE CASCADE
);

CREATE TABLE villes (
    id_ville SERIAL PRIMARY KEY,
    valeur VARCHAR(100) NOT NULL
);

CREATE TABLE question_qcms (
    id_question SERIAL PRIMARY KEY,
    intitule VARCHAR(255) NOT NULL
);

CREATE TABLE reponse_qcms (
    id_reponse_qcm SERIAL PRIMARY KEY,
    id_question_qcm INTEGER REFERENCES question_qcms(id_question) ON DELETE CASCADE,
    reponse VARCHAR(255) NOT NULL,
    modalite BOOLEAN NOT NULL
);

CREATE TABLE annonces (
    id_annonce SERIAL PRIMARY KEY,
    id_poste INTEGER REFERENCES postes(id_poste) ON DELETE CASCADE,
    id_ville INTEGER REFERENCES villes(id_ville) ON DELETE CASCADE,
    age_min INTEGER,
    age_max INTEGER,
    id_genre INTEGER REFERENCES genres(id_genre) ON DELETE CASCADE
);

CREATE TABLE qcm_annonces (
    id_qcm_annonce SERIAL PRIMARY KEY,
    id_annonce INTEGER REFERENCES annonces(id_annonce) ON DELETE CASCADE,
    id_question_qcm INTEGER REFERENCES question_qcms(id_question) ON DELETE CASCADE
);

CREATE TABLE type_status_annonces (
    id_type_status SERIAL PRIMARY KEY,
    valeur VARCHAR(50) NOT NULL
);

CREATE TABLE status_annonce (
    id_status_annonce SERIAL PRIMARY KEY,
    id_annonce INTEGER REFERENCES annonces(id_annonce) ON DELETE CASCADE,
    id_type_status_annonce INTEGER REFERENCES type_status_annonces(id_type_status) ON DELETE CASCADE,
    date_changement DATE NOT NULL,
    id_unite INTEGER REFERENCES unites(id_unite) ON DELETE CASCADE
);

CREATE TABLE niveau_filiere_annonces (
    id_niveau_filiere_annonce SERIAL PRIMARY KEY,
    id_annonce INTEGER REFERENCES annonces(id_annonce) ON DELETE CASCADE,
    id_filiere INTEGER REFERENCES filieres(id_filiere) ON DELETE CASCADE,
    id_niveau INTEGER REFERENCES niveaux(id_niveau) ON DELETE CASCADE
);

CREATE TABLE langue_annonces (
    id_langue_annonce SERIAL PRIMARY KEY,
    id_annonce INTEGER REFERENCES annonces(id_annonce) ON DELETE CASCADE,
    id_langue INTEGER REFERENCES langues(id_langue) ON DELETE CASCADE
);

CREATE TABLE qualite_annonces (
    id_qualite_annonce SERIAL PRIMARY KEY,
    id_annonce INTEGER REFERENCES annonces(id_annonce) ON DELETE CASCADE,
    id_qualite INTEGER REFERENCES qualites(id_qualite) ON DELETE CASCADE
);

CREATE TABLE experience_annonce (
    id_experience_annonce SERIAL PRIMARY KEY,
    id_annonce INTEGER REFERENCES annonces(id_annonce) ON DELETE CASCADE,
    id_domaine INTEGER REFERENCES domaines(id_domaine) ON DELETE CASCADE,
    nombre_annee INTEGER NOT NULL
);

CREATE TABLE tiers (
    id_tiers SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    id_genre INTEGER REFERENCES genres(id_genre) ON DELETE CASCADE,
    id_situation_matrimoniale INTEGER REFERENCES situations_matrimoniales(id_situation) ON DELETE CASCADE,
    nombre_enfants INTEGER,
    contact VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cin VARCHAR(50) NOT NULL,
    id_ville INTEGER REFERENCES villes(id_ville) ON DELETE CASCADE,
    photo VARCHAR(255) NOT NULL
);

CREATE TABLE niveau_filiere_tiers (
    id_niveau_filiere_tiers SERIAL PRIMARY KEY,
    id_tiers INTEGER REFERENCES tiers(id_tiers) ON DELETE CASCADE,
    id_filiere INTEGER REFERENCES filieres(id_filiere) ON DELETE CASCADE,
    id_niveau INTEGER REFERENCES niveaux(id_niveau) ON DELETE CASCADE
);

CREATE TABLE langue_tiers (
    id_langue_tiers SERIAL PRIMARY KEY,
    id_tiers INTEGER REFERENCES tiers(id_tiers) ON DELETE CASCADE,
    id_langue INTEGER REFERENCES langues(id_langue) ON DELETE CASCADE
);

CREATE TABLE qualite_tiers (
    id_qualite_tiers SERIAL PRIMARY KEY,
    id_tiers INTEGER REFERENCES tiers(id_tiers) ON DELETE CASCADE,
    id_qualite INTEGER REFERENCES qualites(id_qualite) ON DELETE CASCADE
);

CREATE TABLE experience_tiers (
    id_experience_tiers SERIAL PRIMARY KEY,
    id_tiers INTEGER REFERENCES tiers(id_tiers) ON DELETE CASCADE,
    id_domaine INTEGER REFERENCES domaines(id_domaine) ON DELETE CASCADE,
    nombre_annee INTEGER NOT NULL
);

CREATE TABLE candidats (
    id_candidat SERIAL PRIMARY KEY,
    id_tiers INTEGER REFERENCES tiers(id_tiers) ON DELETE CASCADE,
    id_annonce INTEGER REFERENCES annonces(id_annonce) ON DELETE CASCADE,
    cv VARCHAR(255) NOT NULL
);

CREATE TABLE type_status_employes (
    id_type_status_employe SERIAL PRIMARY KEY,
    valeur VARCHAR(50) NOT NULL
);

CREATE TABLE employes (
    id_employe SERIAL PRIMARY KEY,
    id_tiers INTEGER REFERENCES tiers(id_tiers) ON DELETE CASCADE,
    id_type_status_employe INTEGER REFERENCES type_status_employes(id_type_status_employe) ON DELETE CASCADE,
    id_poste INTEGER REFERENCES postes(id_poste) ON DELETE CASCADE
);

CREATE TABLE status_employes (
    id_status_employe SERIAL PRIMARY KEY,
    id_employe INTEGER REFERENCES employes(id_employe) ON DELETE CASCADE,
    id_type_status_employe INTEGER REFERENCES type_status_employes(id_type_status_employe) ON DELETE CASCADE,
    date_changement DATE NOT NULL
);

CREATE TABLE historique_poste_employes (
    id_historique_poste_employe SERIAL PRIMARY KEY,
    id_employe INTEGER REFERENCES employes(id_employe) ON DELETE CASCADE,
    id_poste INTEGER REFERENCES postes(id_poste) ON DELETE CASCADE,
    date_changement DATE NOT NULL
);

CREATE TABLE contrat_essais (
    id_contrat_essai SERIAL PRIMARY KEY,
    id_employe INTEGER REFERENCES employes(id_employe) ON DELETE CASCADE,
    date_debut DATE NOT NULL,
    duree INTEGER NOT NULL
);

CREATE TABLE envoi_qcm_candidats (
    id_envoi_qcm_candidat SERIAL PRIMARY KEY,
    id_candidat INTEGER REFERENCES candidats(id_candidat) ON DELETE CASCADE,
    lien VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    date_envoi DATE NOT NULL
);

CREATE TABLE reponse_qcm_candidats (
    id_reponse_qcm_candidat SERIAL PRIMARY KEY,
    id_envoi_qcm_candidat INTEGER REFERENCES envoi_qcm_candidats(id_envoi_qcm_candidat) ON DELETE CASCADE,
    id_qcm_annonce INTEGER REFERENCES qcm_annonces(id_qcm_annonce) ON DELETE CASCADE,
    debut TIMESTAMP,
    fin TIMESTAMP,
    duree INTEGER,
    score INTEGER
);

CREATE TABLE type_status_entretiens (
    id_type_status_entretien SERIAL PRIMARY KEY,
    valeur VARCHAR(50) NOT NULL
);

CREATE TABLE unite_entretiens (
    id_unite_entretien SERIAL PRIMARY KEY,
    id_candidat INTEGER REFERENCES candidats(id_candidat) ON DELETE CASCADE,
    id_unite INTEGER REFERENCES unites(id_unite) ON DELETE CASCADE,
    date_entretien DATE NOT NULL,
    duree INTEGER NOT NULL
);

CREATE TABLE status_unite_entretiens (
    id_status_unite_entretien SERIAL PRIMARY KEY,
    id_unite_entretien INTEGER REFERENCES unite_entretiens(id_unite_entretien) ON DELETE CASCADE,
    id_type_status_entretien INTEGER REFERENCES type_status_entretiens(id_type_status_entretien) ON DELETE CASCADE,
    date_changement DATE NOT NULL
);

CREATE TABLE rh_entretien (
    id_rh_entretien SERIAL PRIMARY KEY,
    id_unite_entretien INTEGER REFERENCES unite_entretiens(id_unite_entretien) ON DELETE CASCADE,
    id_candidat INTEGER REFERENCES candidats(id_candidat) ON DELETE CASCADE,
    date_entretien DATE NOT NULL,
    duree INTEGER NOT NULL
);

CREATE TABLE status_rh_entretien (
    id_status_rh_entretien SERIAL PRIMARY KEY,
    id_rh_entretien INTEGER REFERENCES rh_entretien(id_rh_entretien) ON DELETE CASCADE,
    id_type_status_entretien INTEGER REFERENCES type_status_entretiens(id_type_status_entretien) ON DELETE CASCADE,
    date_changement DATE NOT NULL
);

CREATE TABLE score_unite_entretiens (
    id_score_unite_entretien SERIAL PRIMARY KEY,
    id_unite_entretien INTEGER REFERENCES unite_entretiens(id_unite_entretien) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    date_score DATE NOT NULL
);

CREATE TABLE score_rh_entretiens (
    id_score_rh_entretien SERIAL PRIMARY KEY,
    id_rh_entretien INTEGER REFERENCES rh_entretien(id_rh_entretien) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    date_score DATE NOT NULL
);

CREATE TABLE type_status_suggestions (
    id SERIAL PRIMARY KEY,
    valeur VARCHAR(50) NOT NULL
);

CREATE TABLE rh_suggestions (
    id_rh_suggestion SERIAL PRIMARY KEY,
    id_unite INTEGER REFERENCES unites(id_unite) ON DELETE CASCADE,
    id_candidat INTEGER REFERENCES candidats(id_candidat) ON DELETE CASCADE,
    id_type_status_suggestion INTEGER REFERENCES type_status_suggestions(id) ON DELETE CASCADE,
    date_suggestion DATE NOT NULL
);

CREATE TABLE ceo_suggestions (
    id_ceo_suggestion SERIAL PRIMARY KEY,
    id_rh_suggestion INTEGER REFERENCES rh_suggestions(id_rh_suggestion) ON DELETE CASCADE,
    id_candidat INTEGER REFERENCES candidats(id_candidat) ON DELETE CASCADE,
    id_type_status_suggestion INTEGER REFERENCES type_status_suggestions(id) ON DELETE CASCADE,
    date_suggestion DATE NOT NULL
);

CREATE TABLE mails (
    id_mail SERIAL PRIMARY KEY,
    objet VARCHAR(255) NOT NULL,
    signature VARCHAR(255) NOT NULL
);

CREATE TABLE corps_mails (
    id_corps_mail SERIAL PRIMARY KEY,
    id_mail INTEGER REFERENCES mails(id_mail) ON DELETE CASCADE,
    corps TEXT NOT NULL
);

CREATE TABLE delai_entretien (
    valeur INTEGER PRIMARY KEY NOT NULL
);

CREATE TABLE score_minimum_entretien (
    valeur INTEGER PRIMARY KEY NOT NULL
);

CREATE TABLE delai_qcm (
    valeur INTEGER PRIMARY KEY NOT NULL
);

CREATE TABLE score_minimum_qcm (
    valeur INTEGER PRIMARY KEY NOT NULL
);

CREATE TABLE pourcentage_minimum_cv (
    valeur INTEGER PRIMARY KEY NOT NULL
);