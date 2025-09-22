INSERT INTO genres (valeur) VALUES ('Homme');
INSERT INTO genres (valeur) VALUES ('Femme');

INSERT INTO situation_matrimoniales (valeur) VALUES ('Celibataire');
INSERT INTO situation_matrimoniales (valeur) VALUES ('Marie(e)');
INSERT INTO situation_matrimoniales (valeur) VALUES ('Divorce(e)');
INSERT INTO situation_matrimoniales (valeur) VALUES ('Veuf(ve)');

INSERT INTO langues (valeur) VALUES ('Malgache');
INSERT INTO langues (valeur) VALUES ('Français');
INSERT INTO langues (valeur) VALUES ('Anglais');
INSERT INTO langues (valeur) VALUES ('Espagnol');
INSERT INTO langues (valeur) VALUES ('Allemand');
INSERT INTO langues (valeur) VALUES ('Italien');

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
INSERT INTO filieres (valeur) VALUES ('economie');
INSERT INTO filieres (valeur) VALUES ('Agronomie');

INSERT INTO niveaux (valeur) VALUES ('BEPC');
INSERT INTO niveaux (valeur) VALUES ('BAC');
INSERT INTO niveaux (valeur) VALUES ('Licence');
INSERT INTO niveaux (valeur) VALUES ('Licence Pro');
INSERT INTO niveaux (valeur) VALUES ('Master');
INSERT INTO niveaux (valeur) VALUES ('Doctorat');

INSERT INTO qualites (valeur) VALUES ('Ponctuel');
INSERT INTO qualites (valeur) VALUES ('Rigoureux');
INSERT INTO qualites (valeur) VALUES ('Autonome');
INSERT INTO qualites (valeur) VALUES ('Esprit d equipe');
INSERT INTO qualites (valeur) VALUES ('Creatif');
INSERT INTO qualites (valeur) VALUES ('Organise');
INSERT INTO qualites (valeur) VALUES ('Communicatif');
INSERT INTO qualites (valeur) VALUES ('Flexible');
INSERT INTO qualites (valeur) VALUES ('Leader');

INSERT INTO domaines (valeur) VALUES ('Hôpital');
INSERT INTO domaines (valeur) VALUES ('Banque');
INSERT INTO domaines (valeur) VALUES ('education');
INSERT INTO domaines (valeur) VALUES ('Administration');
INSERT INTO domaines (valeur) VALUES ('Industrie');
INSERT INTO domaines (valeur) VALUES ('Commerce');
INSERT INTO domaines (valeur) VALUES ('Agriculture');
INSERT INTO domaines (valeur) VALUES ('Informatique');
INSERT INTO domaines (valeur) VALUES ('Transport');

INSERT INTO unites (nom, mot_de_passe) VALUES ('Direction Generale', 'azerty');
INSERT INTO unites (nom, mot_de_passe) VALUES ('Ressources Humaines', 'azerty');
INSERT INTO unites (nom, mot_de_passe) VALUES ('Comptabilite', 'azerty');
INSERT INTO unites (nom, mot_de_passe) VALUES ('Production', 'azerty');
INSERT INTO unites (nom, mot_de_passe) VALUES ('Commercial', 'azerty');

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

INSERT INTO villes (valeur) VALUES ('Antananarivo');
INSERT INTO villes (valeur) VALUES ('Fianarantsoa');
INSERT INTO villes (valeur) VALUES ('Toamasina');
INSERT INTO villes (valeur) VALUES ('Mahajanga');
INSERT INTO villes (valeur) VALUES ('Toliara');
INSERT INTO villes (valeur) VALUES ('Antsiranana');

INSERT INTO type_status_annonces (valeur) VALUES ('En cours de demande');
INSERT INTO type_status_annonces (valeur) VALUES ('Publie');
INSERT INTO type_status_annonces (valeur) VALUES ('Non publie');

INSERT INTO type_status_employes (valeur) VALUES ('Actif');
INSERT INTO type_status_employes (valeur) VALUES ('Demission');
INSERT INTO type_status_employes (valeur) VALUES ('Renvoi');
INSERT INTO type_status_employes (valeur) VALUES ('Retraite');
INSERT INTO type_status_employes (valeur) VALUES ('Deces ');
INSERT INTO type_status_employes (valeur) VALUES ('En contrat d''essai'); -- Vaovao be ito

INSERT INTO type_status_entretiens (valeur) VALUES ('A venir');
INSERT INTO type_status_entretiens (valeur) VALUES ('Termine');
INSERT INTO type_status_entretiens (valeur) VALUES ('En attente de validation');

INSERT INTO type_status_suggestions (valeur) VALUES ('Valide');
INSERT INTO type_status_suggestions (valeur) VALUES ('Invalide');
INSERT INTO type_status_suggestions (valeur) VALUES ('En attente de validation');

INSERT INTO delai_entretien (valeur) VALUES (2);

INSERT INTO score_minimum_entretien (valeur) VALUES (10);

INSERT INTO delai_qcm (valeur) VALUES (2);

INSERT INTO score_minimum_qcm (valeur) VALUES (15);

INSERT INTO pourcentage_minimum_cv (valeur) VALUES (10);

-- ANNONCES ET LEURS RELATIONS

-- Questions QCM
INSERT INTO question_qcms (intitule) VALUES 
('Quelle est la différence entre recrutement et sélection ?'),
('Comment évaluez-vous les compétences d''un candidat ?'),
('Quels sont les outils de gestion RH que vous connaissez ?'),
('Qu''est-ce qu''un bilan comptable ?'),
('Comment calculez-vous la TVA ?'),
('Quels sont les principes de base de la comptabilité ?'),
('Qu''est-ce qu''une stratégie commerciale ?'),
('Comment fidélisez-vous un client ?');

-- Réponses pour les questions QCM
-- Question 1: Quelle est la différence entre recrutement et sélection ?
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES
(1, 'Le recrutement attire les candidats, la sélection les évalue', true),
(1, 'Il n''y a aucune différence', false),
(1, 'La sélection attire les candidats, le recrutement les évalue', false),
(1, 'Ce sont deux processus identiques', false);

-- Question 2: Comment évaluez-vous les compétences d'un candidat ?
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES
(2, 'Par des tests techniques et entretiens comportementaux', true),
(2, 'Uniquement par le CV', false),
(2, 'Par des références uniquement', false),
(2, 'Par l''apparence physique', false);

-- Question 3: Quels sont les outils de gestion RH que vous connaissez ?
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES
(3, 'SIRH, logiciels de paie, plateformes de recrutement', true),
(3, 'Uniquement Excel', false),
(3, 'Seulement les outils gratuits', false),
(3, 'Aucun outil spécifique', false);

-- Question 4: Qu'est-ce qu'un bilan comptable ?
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES
(4, 'Un document qui présente la situation financière à un moment donné', true),
(4, 'Un rapport mensuel des ventes', false),
(4, 'La liste des employés', false),
(4, 'Un planning de travail', false);

-- Question 5: Comment calculez-vous la TVA ?
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES
(5, 'Prix HT × Taux de TVA', true),
(5, 'Prix TTC - Prix HT', false),
(5, 'Prix TTC × Taux de TVA', false),
(5, 'Prix HT + Taux de TVA', false);

-- Question 6: Quels sont les principes de base de la comptabilité ?
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES
(6, 'Partie double, prudence, continuité d''exploitation', true),
(6, 'Simplicité et rapidité', false),
(6, 'Estimation et approximation', false),
(6, 'Créativité comptable', false);

-- Question 7: Qu'est-ce qu'une stratégie commerciale ?
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES
(7, 'Un plan d''actions pour atteindre les objectifs de vente', true),
(7, 'Une méthode de réduction des coûts', false),
(7, 'Un système de gestion des stocks', false),
(7, 'Une technique de recrutement', false);

-- Question 8: Comment fidélisez-vous un client ?
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES
(8, 'Service de qualité, écoute, programmes de fidélité', true),
(8, 'En baissant toujours les prix', false),
(8, 'En ignorant ses réclamations', false),
(8, 'En ne communiquant jamais avec lui', false);

-- Annonce 1: Responsable RH
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) 
VALUES (4, 1, 25, 35, 1); -- Responsable RH à Antananarivo, 25-35 ans, Homme

INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) 
VALUES (1, 2, CURRENT_DATE, 2); -- Statut "Publié" par l'unité RH

INSERT INTO niveau_filiere_annonces (id_annonce, id_filiere, id_niveau) VALUES 
(1, 7, 4), -- Gestion + Licence Pro
(1, 8, 3); -- Droit + Licence

INSERT INTO langue_annonces (id_annonce, id_langue) VALUES 
(1, 1), -- Malgache
(1, 2), -- Français
(1, 3); -- Anglais

INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES 
(1, 1), -- Ponctuel
(1, 2), -- Rigoureux
(1, 4), -- Esprit d'équipe
(1, 7); -- Communicatif

INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES 
(1, 4, 3), -- Administration - 3 ans
(1, 2, 2); -- Banque - 2 ans

INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES 
(1, 1),
(1, 2),
(1, 3);

-- Annonce 2: Chef Comptable
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) 
VALUES (7, 1, 28, 40, 2); -- Chef Comptable à Antananarivo, 28-40 ans, Femme

INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) 
VALUES (2, 2, CURRENT_DATE, 3); -- Statut "Publié" par l'unité Comptabilité

INSERT INTO niveau_filiere_annonces (id_annonce, id_filiere, id_niveau) VALUES 
(2, 7, 5), -- Gestion + Master
(2, 11, 4); -- Économie + Licence Pro

INSERT INTO langue_annonces (id_annonce, id_langue) VALUES 
(2, 1), -- Malgache
(2, 2); -- Français

INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES 
(2, 1), -- Ponctuel
(2, 2), -- Rigoureux
(2, 3), -- Autonome
(2, 6); -- Organisé

INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES 
(2, 2, 5), -- Banque - 5 ans
(2, 4, 3); -- Administration - 3 ans

INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES 
(2, 4),
(2, 5),
(2, 6);

-- Annonce 3: Commercial
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) 
VALUES (14, 2, 23, 30, 1); -- Commercial à Fianarantsoa, 23-30 ans, Homme

INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) 
VALUES (3, 2, CURRENT_DATE, 5); -- Statut "Publié" par l'unité Commercial

INSERT INTO niveau_filiere_annonces (id_annonce, id_filiere, id_niveau) VALUES 
(3, 7, 3), -- Gestion + Licence
(3, 6, 2); -- Commerce + BAC

INSERT INTO langue_annonces (id_annonce, id_langue) VALUES 
(3, 1), -- Malgache
(3, 2), -- Français
(3, 3); -- Anglais

INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES 
(3, 7), -- Communicatif
(3, 5), -- Créatif
(3, 8), -- Flexible
(3, 9); -- Leader

INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES 
(3, 6, 2); -- Commerce - 2 ans

INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES 
(3, 7),
(3, 8);

-- Annonce 4: Technicien (non publiée)
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) 
VALUES (12, 3, 20, 35, 1); -- Technicien à Toamasina, 20-35 ans, Homme

INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) 
VALUES (4, 1, CURRENT_DATE, 4); -- Statut "En cours de demande" par l'unité Production

INSERT INTO niveau_filiere_annonces (id_annonce, id_filiere, id_niveau) VALUES 
(4, 10, 3), -- Génie Civil + Licence
(4, 6, 4); -- Informatique + Licence Pro

INSERT INTO langue_annonces (id_annonce, id_langue) VALUES 
(4, 1), -- Malgache
(4, 2); -- Français

INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES 
(4, 2), -- Rigoureux
(4, 3), -- Autonome
(4, 1); -- Ponctuel

INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES 
(4, 5, 1), -- Industrie - 1 an
(4, 8, 2); -- Informatique - 2 ans
INSERT INTO pourcentage_minimum_cv (valeur) VALUES (75);


-- 1️⃣ Tiers pour l'employé
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
VALUES ('Rakoto', 'Jean', '1990-01-01', 1, 1, 0, '0341234567', 'jean.rakoto@email.com', 'AA123456', 1, 'photo.jpg')
RETURNING id_tiers;
-- id_tiers = 1

-- 2️⃣ Employé
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste)
VALUES (1, 1, 4)
RETURNING id_employe;
-- id_employe = 1

-- 3️⃣ Tiers pour le candidat
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
VALUES ('Andrian', 'Hery', '1992-05-12', 1, 1, 0, '0349876543', 'hery.andrian@email.com', 'BB654321', 2, 'photo2.jpg')
RETURNING id_tiers;
-- id_tiers = 2

-- 4️⃣ Créer l’annonce (obligatoire pour le candidat)
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre)
VALUES (1, 2, 20, 40, 1)
RETURNING id_annonce;
-- id_annonce = 1

-- 5️⃣ Candidat
INSERT INTO candidats (id_tiers, id_annonce, cv)
VALUES (2, 1, 'cv_hery.pdf')
RETURNING id_candidat;
-- id_candidat = 1

-- 6️⃣ Entretien pour l’unité RH
INSERT INTO unite_entretiens (id_candidat, id_unite, date_entretien, duree)
VALUES (1, 2, '2025-09-25', 60)
RETURNING id_unite_entretien;
-- id_unite_entretien = 1

-- 7️⃣ Suggestion RH
INSERT INTO rh_suggestions (id_unite_entretien, id_candidat, date_suggestion)
VALUES (1, 1, '2025-09-18')
RETURNING id_rh_suggestion;
-- id_rh_suggestion = 1

-- 8️⃣ Statut de la suggestion RH
INSERT INTO status_rh_suggestions (id_rh_suggestion, id_type_status_suggestion, date_changement)
VALUES (1, 1, '2025-09-18');


-- -- Tiers #4 : Candidat femme
-- INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
-- VALUES ('Randria', 'Marie', '1995-07-21', 2, 1, 0, '0345566778', 'marie.randria@email.com', 'DD112233', 1, 'photo_marie.jpg')
-- RETURNING id_tiers; -- id_tiers = 4

-- -- Tiers #5 : Employé Comptable
-- INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
-- VALUES ('Rasoanaivo', 'Joseph', '1988-11-10', 1, 2, 3, '0334455667', 'joseph.rasoanaivo@email.com', 'EE334455', 3, 'photo_joseph.jpg')
-- RETURNING id_tiers; -- id_tiers = 5

-- -- Employé Comptable (poste 8 = Comptable, status 1 = Actif)
-- INSERT INTO employes (id_tiers, id_type_status_employe, id_poste)
-- VALUES (5, 1, 8)
-- RETURNING id_employe; -- id_employe = 2

-- -- Annonce #2 : Poste de Commercial à Toamasina
-- INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre)
-- VALUES (14, 3, 22, 35, NULL) -- 14 = Commercial, 3 = Toamasina
-- RETURNING id_annonce; -- id_annonce = 2

-- -- Candidat #2 : Marie (tiers 4) postule pour l’annonce #2
-- INSERT INTO candidats (id_tiers, id_annonce, cv)
-- VALUES (4, 2, 'cv_marie.pdf')
-- RETURNING id_candidat; -- id_candidat = 2

-- -- Entretien RH pour Marie
-- INSERT INTO unite_entretiens (id_candidat, id_unite, date_entretien, duree)
-- VALUES (2, 2, '2025-09-26', 50) -- 2 = Ressources Humaines
-- RETURNING id_unite_entretien; -- id_unite_entretien = 2

-- -- Statut de l’entretien (Terminé)
-- INSERT INTO status_unite_entretiens (id_unite_entretien, id_type_status_entretien, date_changement)
-- VALUES (2, 2, '2025-09-26');

-- -- Suggestion RH pour Marie
-- INSERT INTO rh_suggestions (id_unite_entretien, id_candidat, date_suggestion)
-- VALUES (2, 2, '2025-09-26')
-- RETURNING id_rh_suggestion; -- id_rh_suggestion = 2

-- -- Validation de la suggestion RH
-- INSERT INTO status_rh_suggestions (id_rh_suggestion, id_type_status_suggestion, date_changement)
-- VALUES (2, 1, '2025-09-26'); -- 1 = Valide

-- -- Entretien RH validé
-- INSERT INTO rh_entretiens (id_rh_suggestion, id_candidat, date_entretien, duree)
-- VALUES (2, 2, '2025-09-27', 60)
-- RETURNING id_rh_entretien; -- id_rh_entretien = 2

-- -- Score à l’entretien RH
-- INSERT INTO score_rh_entretiens (id_rh_entretien, score, date_score)
-- VALUES (2, 17, '2025-09-27');

-- -- CEO reçoit la suggestion
-- INSERT INTO ceo_suggestions (id_rh_entretien, id_candidat, id_type_status_suggestion, date_suggestion)
-- VALUES (2, 2, 1, '2025-09-28')
-- RETURNING id_ceo_suggestion; -- id_ceo_suggestion = 2

-- -- Statut validé par le CEO
-- INSERT INTO status_ceo_suggestions (id_ceo_suggestion, id_type_status_suggestion, date_changement)
-- VALUES (2, 1, '2025-09-28');

