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
