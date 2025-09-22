-- Genres
INSERT INTO genres (valeur) VALUES ('Homme');
INSERT INTO genres (valeur) VALUES ('Femme');

-- Situation matrimoniale
INSERT INTO situation_matrimoniales (valeur) VALUES ('Celibataire');
INSERT INTO situation_matrimoniales (valeur) VALUES ('Marie');
INSERT INTO situation_matrimoniales (valeur) VALUES ('Divorce');
INSERT INTO situation_matrimoniales (valeur) VALUES ('Veuf');

-- Langues
INSERT INTO langues (valeur) VALUES ('Malgache');
INSERT INTO langues (valeur) VALUES ('Francais');
INSERT INTO langues (valeur) VALUES ('Anglais');
INSERT INTO langues (valeur) VALUES ('Espagnol');
INSERT INTO langues (valeur) VALUES ('Allemand');
INSERT INTO langues (valeur) VALUES ('Italien');

-- Filières
INSERT INTO filieres (valeur) VALUES ('Serie A');
INSERT INTO filieres (valeur) VALUES ('Serie C');
INSERT INTO filieres (valeur) VALUES ('Serie D');
INSERT INTO filieres (valeur) VALUES ('Serie S');
INSERT INTO filieres (valeur) VALUES ('Serie L');
INSERT INTO filieres (valeur) VALUES ('Informatique');
INSERT INTO filieres (valeur) VALUES ('Gestion');
INSERT INTO filieres (valeur) VALUES ('Droit');
INSERT INTO filieres (valeur) VALUES ('Medecine');
INSERT INTO filieres (valeur) VALUES ('Genie Civil');
INSERT INTO filieres (valeur) VALUES ('Economie');
INSERT INTO filieres (valeur) VALUES ('Agronomie');

-- Niveaux
INSERT INTO niveaux (valeur) VALUES ('BEPC');
INSERT INTO niveaux (valeur) VALUES ('BAC');
INSERT INTO niveaux (valeur) VALUES ('Licence');
INSERT INTO niveaux (valeur) VALUES ('Licence Pro');
INSERT INTO niveaux (valeur) VALUES ('Master');
INSERT INTO niveaux (valeur) VALUES ('Doctorat');

-- Qualités
INSERT INTO qualites (valeur) VALUES ('Ponctuel');
INSERT INTO qualites (valeur) VALUES ('Rigoureux');
INSERT INTO qualites (valeur) VALUES ('Autonome');
INSERT INTO qualites (valeur) VALUES ('Esprit d equipe');
INSERT INTO qualites (valeur) VALUES ('Creatif');
INSERT INTO qualites (valeur) VALUES ('Organise');
INSERT INTO qualites (valeur) VALUES ('Communicatif');
INSERT INTO qualites (valeur) VALUES ('Flexible');
INSERT INTO qualites (valeur) VALUES ('Leader');

INSERT INTO domaines (valeur) VALUES ('Hopital');
INSERT INTO domaines (valeur) VALUES ('Banque');
INSERT INTO domaines (valeur) VALUES ('Education');
INSERT INTO domaines (valeur) VALUES ('Administration');
INSERT INTO domaines (valeur) VALUES ('Industrie');
INSERT INTO domaines (valeur) VALUES ('Commerce');
INSERT INTO domaines (valeur) VALUES ('Agriculture');
INSERT INTO domaines (valeur) VALUES ('Informatique');
INSERT INTO domaines (valeur) VALUES ('Transport');

-- Unités
INSERT INTO unites (nom, mot_de_passe) VALUES ('Direction Generale', 'azerty');
INSERT INTO unites (nom, mot_de_passe) VALUES ('Ressources Humaines', 'azerty');
INSERT INTO unites (nom, mot_de_passe) VALUES ('Comptabilite', 'azerty');
INSERT INTO unites (nom, mot_de_passe) VALUES ('Production', 'azerty');
INSERT INTO unites (nom, mot_de_passe) VALUES ('Commercial', 'azerty');

-- Postes
INSERT INTO postes (valeur, id_unite) VALUES ('Directeur General', 1);
INSERT INTO postes (valeur, id_unite) VALUES ('Assistant Direction', 1);
INSERT INTO postes (valeur, id_unite) VALUES ('Secretaire Direction', 1);
INSERT INTO postes (valeur, id_unite) VALUES ('Responsable RH', 2);
INSERT INTO postes (valeur, id_unite) VALUES ('Assistant RH', 2);
INSERT INTO postes (valeur, id_unite) VALUES ('Charge de recrutement', 2);
INSERT INTO postes (valeur, id_unite) VALUES ('Chef Comptable', 3);
INSERT INTO postes (valeur, id_unite) VALUES ('Comptable', 3);
INSERT INTO postes (valeur, id_unite) VALUES ('Assistant Comptable', 3);
INSERT INTO postes (valeur, id_unite) VALUES ('Chef de Production', 4);
INSERT INTO postes (valeur, id_unite) VALUES ('Ouvrier', 4);
INSERT INTO postes (valeur, id_unite) VALUES ('Technicien', 4);
INSERT INTO postes (valeur, id_unite) VALUES ('Responsable Commercial', 5);
INSERT INTO postes (valeur, id_unite) VALUES ('Commercial', 5);
INSERT INTO postes (valeur, id_unite) VALUES ('Assistant Commercial', 5);

-- Villes
INSERT INTO villes (valeur) VALUES ('Antananarivo');
INSERT INTO villes (valeur) VALUES ('Fianarantsoa');
INSERT INTO villes (valeur) VALUES ('Toamasina');
INSERT INTO villes (valeur) VALUES ('Mahajanga');
INSERT INTO villes (valeur) VALUES ('Toliara');
INSERT INTO villes (valeur) VALUES ('Antsiranana');

-- Status annonces et employés
INSERT INTO type_status_annonces (valeur) VALUES ('En cours de demande');
INSERT INTO type_status_annonces (valeur) VALUES ('Publie');
INSERT INTO type_status_annonces (valeur) VALUES ('Non publie');
INSERT INTO type_status_annonces (valeur) VALUES ('Refuse');
INSERT INTO type_status_annonces (valeur) VALUES ('Modifie');

INSERT INTO type_status_employes (valeur) VALUES ('Actif');
INSERT INTO type_status_employes (valeur) VALUES ('Demission');
INSERT INTO type_status_employes (valeur) VALUES ('Renvoi');
INSERT INTO type_status_employes (valeur) VALUES ('Retraite');
INSERT INTO type_status_employes (valeur) VALUES ('Deces');

-- Status entretiens et suggestions
INSERT INTO type_status_entretiens (valeur) VALUES ('A venir');
INSERT INTO type_status_entretiens (valeur) VALUES ('Termine');
INSERT INTO type_status_entretiens (valeur) VALUES ('En attente de validation');
INSERT INTO type_status_suggestions (valeur) VALUES ('Valide');
INSERT INTO type_status_suggestions (valeur) VALUES ('Invalide');
INSERT INTO type_status_suggestions (valeur) VALUES ('En attente de validation');

-- Delais et scores
INSERT INTO delai_entretien (valeur) VALUES (2);
INSERT INTO score_minimum_entretien (valeur) VALUES (10);
INSERT INTO delai_qcm (valeur) VALUES (2);
INSERT INTO score_minimum_qcm (valeur) VALUES (15);
INSERT INTO pourcentage_minimum_cv (valeur) VALUES (75);

-- ANNONCES
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (1, 1, 30, 55, 1, 1);
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (2, 2, 25, 50, 2, 2);
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (4, 1, 28, 45, 1, 4);
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (5, 3, 22, 40, 2, 5);
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (7, 4, 35, 60, 1, 1);
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (10, 5, 25, 45, 2, 2);
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (13, 6, 30, 50, 1, 3);
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (15, 1, 22, 35, 2, 4);
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (16, 2, 24, 38, 1, 5);
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (3, 3, 27, 45, 2, 3);

-- STATUS ANNONCES
INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) VALUES (1, 1, '2025-09-01', 1);
INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) VALUES (1, 2, '2025-09-05', 1);
INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) VALUES (2, 1, '2025-09-02', 2);
INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) VALUES (2, 3, '2025-09-06', 2);
INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) VALUES (3, 2, '2025-09-03', 1);
INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) VALUES (3, 2, '2025-09-07', 1);

-- LANGUES POUR ANNONCES
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (1, 1);
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (1, 2);
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (2, 2);
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (2, 3);
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (3, 1);
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (3, 3);

-- QUALITES POUR ANNONCES
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 1);
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 2);
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 4);
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (2, 3);
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (3, 2);
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (3, 4);

-- EXPERIENCES POUR ANNONCES
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (1, 1, 5);
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (1, 1, 10);
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (1, 2, 3);
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (2, 2, 5);
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (2, 3, 2);
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (3, 3, 7);

-- NIVEAUX/FILIERES POUR ANNONCES
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (1, 4, 6);
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (1, 5, 6);
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (2, 3, 7);
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (2, 4, 7);
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (3, 5, 8);
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (3, 6, 8);

-- TIERS (CANDIDATS)
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) VALUES ('Rakoto', 'Jean', '1985-03-15', 1, 2, 2, '0341234567', 'fetraniaina26@gmail.com', 'AA123456', 1, 'photo1.jpg');
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) VALUES ('Rasoa', 'Marie', '1990-07-22', 2, 1, 0, '0347654321', 'fetraniaina26@gmail.com', 'BB987654', 2, 'photo2.jpg');
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) VALUES ('Rabe', 'Jean', '1985-04-12', 1, 1, 0, '0341234567', 'fetraniaina26@gmail.com', 'AA123456', 1, 'photo1.jpg');
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) VALUES ('Andry', 'Paul', '1988-03-15', 1, 1, 0, '0320000003', 'fetraniaina26@gmail.com', 'CC345678', 3, 'photo3.jpg');

-- CANDIDATS
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (1, 1, 'cv_jean_rakoto.pdf');
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (2, 2, 'cv_marie_rasoa.pdf');
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (3, 1, 'cv_jean_rabe.pdf');
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (3, 3, 'cv_jean_rabe_2.pdf');
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (4, 3, 'cv_paul_andry.pdf');

-- LANGUES POUR CANDIDATS
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (1, 1);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (1, 2);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (1, 3);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (2, 2);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (2, 3);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (2, 4);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (3, 1);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (3, 3);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (4, 1);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (4, 3);

-- QUALITES POUR CANDIDATS
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 1);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 2);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 4);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 5);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (2, 2);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (2, 3);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (2, 4);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (2, 5);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (3, 1);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (3, 4);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (4, 1);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (4, 5);

-- EXPERIENCES POUR CANDIDATS
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (1, 1, '2010-01-01', '2015-12-31');
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (1, 1, '2015-01-01', '2018-12-31');
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (1, 2, '2016-01-01', '2019-12-31');
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (1, 2, '2019-01-01', '2021-12-31');
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (2, 2, '2012-06-01', '2018-08-31');
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (2, 3, '2012-01-01', '2018-06-30');
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (2, 3, '2014-06-01', '2018-06-01');
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (4, 1, '2010-01-01', '2015-01-01');

-- NIVEAUX/FILIERES POUR CANDIDATS
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (1, 2, 1);
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (1, 4, 6);
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (1, 5, 6);
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (2, 2, 2);
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (2, 3, 7);
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (2, 4, 7);
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (3, 4, 6);
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (4, 5, 6);

-- EMPLOYES
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste) VALUES (4, 1, 1);

-- STATUS EMPLOYES
INSERT INTO status_employes (id_employe, id_type_status_employe, date_changement) VALUES (1, 1, '2020-01-01');

-- QUESTIONS QCM
INSERT INTO question_qcms (intitule) VALUES ('Quelle est la capitale de Madagascar');
INSERT INTO question_qcms (intitule) VALUES ('Quelle est la couleur du drapeau francais');
INSERT INTO question_qcms (intitule) VALUES ('Quelle est la couleur du ciel');

-- REPONSES QCM
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (1, 'Antananarivo', TRUE);
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (1, 'Fianarantsoa', FALSE);
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (1, 'Toamasina', FALSE);
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (2, 'Bleu blanc rouge', TRUE);
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (2, 'Rouge blanc bleu', FALSE);
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (2, 'Vert blanc rouge', FALSE);
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (3, 'Bleu', TRUE);
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (3, 'Vert', FALSE);

-- QCM POUR ANNONCES
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (1, 1);
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (1, 2);
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (1, 3);
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (2, 1);
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (2, 3);

-- ENVOIS QCM
INSERT INTO envoi_qcm_candidats (id_candidat, lien, token, date_envoi) VALUES (1, 'https://qcm.exemple.com/annonce/1/jean', 'token-jean-001', '2025-09-21');

-- REPONSES QCM CANDIDATS
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, reponse, score) VALUES (1, 1, '2025-09-21 09:00:00', '2025-09-21 09:02:00', 120, 'Antananarivo', 100);
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, reponse, score) VALUES (1, 2, '2025-09-21 09:03:00', '2025-09-21 09:05:30', 150, 'Bleu blanc rouge', 100);

-- ENTRETIENS
INSERT INTO unite_entretiens (id_candidat, id_unite, date_entretien, duree) VALUES (1, 1, '2025-09-22', 60);
INSERT INTO unite_entretiens (id_candidat, id_unite, date_entretien, duree) VALUES (2, 2, '2025-09-23', 45);

-- SCORES ENTRETIENS
INSERT INTO score_unite_entretiens (id_unite_entretien, score, date_score) VALUES (1, 85, '2025-09-22');


INSERT INTO adresse_mail (valeur, mot_de_passe) VALUES ('tsikyrakotonirina20@gmail.com', 'youh xjbi yvwx xeil');


WITH new_mail AS (
  INSERT INTO mails (objet, signature)
  VALUES (
    'Envoi de QCM pour votre recrutement auprès de notre annonce',
    'Axiom — Service Recrutement'
  )
  RETURNING id_mail
)
INSERT INTO corps_mails (id_mail, corps)
SELECT id_mail, $$
Madame, Monsieur,

Au nom de l'entreprise Axiom, nous vous remercions pour l'intérêt porté à notre offre et pour votre candidature. Nous vous souhaitons la bienvenue dans la première étape de notre processus de recrutement.
$$ FROM new_mail
UNION ALL
SELECT id_mail, $$
Veuillez compléter le questionnaire (QCM) prévu dans le cadre du processus de recrutement. Le lien vers le QCM vous sera communiqué séparément par notre service ; merci de suivre attentivement les instructions et de remplir l'ensemble des sections demandées pour que votre dossier soit pris en compte.
$$ FROM new_mail
UNION ALL
SELECT id_mail, $$
Règles du QCM :
- Entrez le token qui vous sera communiqué par notre équipe avant de démarrer le QCM.
- Ne quittez pas la page durant la passation : toute déconnexion ou fermeture de la session entraînera l’attribution d’un score de 0 pour cette tentative.
- Certaines questions acceptent plusieurs réponses : lisez attentivement les consignes de chaque question.
- Si vous obtenez la note minimale requise, vous recevrez ensuite un courriel de confirmation contenant les informations pour un entretien technique.
$$ FROM new_mail
UNION ALL
SELECT id_mail, $$
Nous vous remercions pour votre participation et pour le temps consacré à ce test. Pour toute question, n'hésitez pas à contacter le service recrutement d'Axiom.

Cordialement,
Axiom — Service Recrutement
$$ FROM new_mail;


WITH new_mail AS (
  INSERT INTO mails (objet, signature)
  VALUES (
    'Entretien avec unité au sein de l''entreprise Axiom',
    'Axiom — Service Recrutement'
  )
  RETURNING id_mail
)
INSERT INTO corps_mails (id_mail, corps)
SELECT id_mail, $$
Félicitations !

Vous êtes accédé(e) à l'étape suivante de notre processus de recrutement. Vous avez obtenu au QCM le score de : {{score}}.
$$ FROM new_mail
UNION ALL
SELECT id_mail, $$
Vous allez, dans le cadre de cette candidature, rencontrer l'unité en charge du poste pour un entretien technique qui se tiendra le {{date_entretien}} à {{heure}} dans les locaux de {{unite}}.
$$ FROM new_mail
UNION ALL
SELECT id_mail, $$
Veuillez ne pas être en retard, portez une tenue correcte et présentez-vous préparé(e) (CV à jour, pièces demandées, éventuellement supports pertinents).
$$ FROM new_mail
UNION ALL
SELECT id_mail, $$
En cas de nécessité de report, nous vous contacterons par e-mail pour proposer une nouvelle date. Merci de vérifier régulièrement votre boîte de réception (y compris le dossier spam).
$$ FROM new_mail;
-- 🔹 Tiers employé
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
VALUES ('Rakoto', 'Jean', '1990-01-01', 1, 1, 0, '0341234567', 'jean.rakoto@email.com', 'AA123456', 1, 'photo.jpg')
RETURNING id_tiers;

-- 🔹 Employé
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste)
VALUES (1, 1, 4)
RETURNING id_employe;

-- 🔹 Tiers candidat
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
VALUES ('Andrian', 'Hery', '1992-05-12', 1, 1, 0, '0349876543', 'hery.andrian@email.com', 'BB654321', 2, 'photo2.jpg')
RETURNING id_tiers;

-- 🔹 Annonce
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre)
VALUES (1, 2, 20, 40, 1)
RETURNING id_annonce;

-- 🔹 Candidat
INSERT INTO candidats (id_tiers, id_annonce, cv)
VALUES (2, 1, 'cv_hery.pdf')
RETURNING id_candidat;

-- 🔹 Entretien unité RH avec heure précise
INSERT INTO unite_entretiens (id_candidat, id_unite, date_entretien, duree)
VALUES (1, 2, '2025-09-25 09:30:00', 60)
RETURNING id_unite_entretien;

-- 🔹 Suggestion RH avec timestamp
INSERT INTO rh_suggestions (id_unite_entretien, id_candidat, date_suggestion)
VALUES (1, 1, '2025-09-18 10:00:00')
RETURNING id_rh_suggestion;

-- 🔹 Entretien RH avec timestamp
INSERT INTO rh_entretiens (id_rh_suggestion, id_candidat, date_entretien, duree)
VALUES (1, 1, '2025-09-19 14:00:00', 60)
RETURNING id_rh_entretien;

-- 🔹 Statut suggestion RH avec timestamp
INSERT INTO status_rh_suggestions (id_rh_suggestion, id_type_status_suggestion, date_changement)
VALUES (1, 1, '2025-09-18 15:00:00');

-- 🔹 Suggestion CEO avec timestamp
INSERT INTO ceo_suggestions (id_rh_entretien, id_candidat, id_type_status_suggestion, date_suggestion)
VALUES (1, 1, 1, '2025-09-19 16:00:00')
RETURNING id_ceo_suggestion;

-- 🔹 Statut suggestion CEO avec timestamp
INSERT INTO status_ceo_suggestions (id_ceo_suggestion, id_type_status_suggestion, date_changement)
VALUES (1, 1, '2025-09-19 17:00:00');

INSERT INTO jours_feries (date_ferie, description) VALUES
('2025-01-01', 'Nouvel An'),
('2025-05-01', 'Fête du Travail'),
('2025-12-25', 'Noël');

INSERT INTO horaires_ouvres (heure_debut, heure_fin) VALUES
('08:00', '12:00'),
('13:00', '16:00');
