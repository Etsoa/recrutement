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

INSERT INTO pourcentage_minimum_cv (valeur) VALUES (75);


INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (1, 1, 30, 55, 1, 1); -- Directeur General, Antananarivo, Homme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (2, 2, 25, 50, 2, 2); -- Assistant Direction, Fianarantsoa, Femme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (4, 1, 28, 45, 1, 4); -- Responsable RH, Antananarivo, Homme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (5, 3, 22, 40, 2, 5); -- Assistant RH, Toamasina, Femme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (7, 4, 35, 60, 1, 1); -- Chef Comptable, Mahajanga, Homme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (10, 5, 25, 45, 2, 2); -- Ouvrier, Toliara, Femme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (13, 6, 30, 50, 1, 3); -- Responsable Commercial, Antsiranana, Homme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (15, 1, 22, 35, 2, 4); -- Commercial, Antananarivo, Femme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (16, 2, 24, 38, 1, 5); -- Assistant Commercial, Fianarantsoa, Homme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (3, 3, 27, 45, 2, 3); -- Secretaire Direction, Toamasina, Femme

-- Pour l'annonce 1
INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite)
VALUES 
(1, 1, '2025-09-01', 1),  -- "En cours de demande" par RH
(1, 2, '2025-09-05', 1);  -- "Publie" par Direction Generale

-- Pour l'annonce 2
INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite)
VALUES 
(2, 1, '2025-09-02', 2),  -- "En cours de demande" par RH
(2, 3, '2025-09-06', 2);  -- "Non publie" par Direction Generale

-- Pour l'annonce 3
INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite)
VALUES 
(3, 2, '2025-09-03', 1),  -- "Publie" par RH
(3, 2, '2025-09-07', 1);  -- "Publie" par Direction Generale


-- LANGUES pour annonces
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (1, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (1, 2); -- Français
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (2, 2); -- Français
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (2, 3); -- Anglais
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (3, 1);
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (3, 3);

-- QUALITES pour annonces
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 1); -- Ponctuel
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 4); -- Esprit d equipe
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (2, 3); -- Autonome
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (3, 2); -- Rigoureux

-- EXPERIENCES pour annonces
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (1, 1, 5); -- Hôpital
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (1, 2, 3); -- Banque
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (2, 3, 2); -- Education

-- NIVEAUX/FILIERES pour annonces
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (1, 5, 6); -- Master, Informatique
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (2, 4, 7); -- Licence Pro, Gestion
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (3, 6, 8); -- Doctorat, Droit

-- CANDIDATS
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
VALUES 
('Rakoto', 'Jean', '1985-03-15', 1, 2, 2, '0341234567', 'jean.rakoto@email.com', 'AA123456', 1, 'photo1.jpg'),
('Rasoa', 'Marie', '1990-07-22', 2, 1, 0, '0347654321', 'marie.rasoa@email.com', 'BB987654', 2, 'photo2.jpg');

INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (1, 1, 'cv_jean.pdf');
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (2, 2, 'cv_marie.pdf');

-- LANGUES pour candidats
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (1, 1); -- Malgache
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (1, 2); -- Français
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (2, 2); -- Français
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (2, 3); -- Anglais

-- QUALITES pour candidats
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 1); -- Ponctuel
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 5); -- Creatif
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (2, 3); -- Autonome

-- EXPERIENCES pour candidats
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (1, 1, '2010-01-01', '2015-12-31'); -- Hôpital
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (1, 2, '2016-01-01', '2019-12-31'); -- Banque
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (2, 3, '2012-01-01', '2018-06-30'); -- Education

-- NIVEAUX/FILIERES pour candidats
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (1, 5, 6); -- Master, Informatique
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (2, 4, 7); -- Licence Pro, Gestion

-- -------------------
-- Langues pour annonces
-- -------------------
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (1, 1);
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (1, 2);
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (2, 2);
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (3, 3);

-- -------------------
-- Qualités pour annonces
-- -------------------
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 1);
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 2);
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (2, 3);
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (3, 4);

-- -------------------
-- Expériences pour annonces
-- -------------------
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (1, 1, 10);
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (2, 2, 5);
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (3, 3, 7);

-- -------------------
-- Niveau/Filière pour annonces
-- -------------------
INSERT INTO niveau_filiere_annonces (id_annonce, id_filiere, id_niveau) VALUES (1, 6, 4);
INSERT INTO niveau_filiere_annonces (id_annonce, id_filiere, id_niveau) VALUES (2, 7, 3);
INSERT INTO niveau_filiere_annonces (id_annonce, id_filiere, id_niveau) VALUES (3, 8, 5);

-- -------------------
-- Candidats et Tiers
-- -------------------
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
VALUES 
('Rabe', 'Jean', '1985-04-12', 1, 1, 0, '0341234567', 'jean.rabe@mail.com', 'AA123456', 1, 'photo1.jpg'),
('Rakoto', 'Marie', '1990-08-22', 2, 2, 2, '0349876543', 'marie.rakoto@mail.com', 'BB987654', 2, 'photo2.jpg');

INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (1, 1, 'cv_jean.pdf');
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (2, 2, 'cv_marie.pdf');

-- -------------------
-- Langues candidats
-- -------------------
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (1, 1);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (1, 3);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (2, 2);
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (2, 4);

-- -------------------
-- Qualités candidats
-- -------------------
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 1);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 4);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (2, 2);
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (2, 5);

-- -------------------
-- Expériences candidats
-- -------------------
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (1, 1, '2010-01-01', '2015-12-31');
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (2, 2, '2012-06-01', '2018-08-31');

-- -------------------
-- Niveau/Filière candidats
-- -------------------
INSERT INTO niveau_filiere_tiers (id_tiers, id_filiere, id_niveau) VALUES (1, 6, 4);
INSERT INTO niveau_filiere_tiers (id_tiers, id_filiere, id_niveau) VALUES (2, 7, 3);

-- TIERS (candidats)
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
VALUES 
('Rakoto','Jean','1990-05-12',1,1,0,'0320000001','jean.rakoto@email.com','AA123456','1','photo1.jpg'),
('Rasoa','Marie','1992-08-20',2,2,1,'0320000002','marie.rasoa@email.com','BB234567','2','photo2.jpg'),
('Andry','Paul','1988-03-15',1,1,0,'0320000003','paul.andry@email.com','CC345678','3','photo3.jpg');

-- CANDIDATS
INSERT INTO candidats (id_tiers, id_annonce, cv)
VALUES
(1,1,'cv_jean.pdf'),
(2,2,'cv_marie.pdf'),
(3,3,'cv_paul.pdf'),
(1,3,'cv_jean2.pdf'); -- Jean a postulé aussi à l'annonce 3

-- LANGUE_TIERS
INSERT INTO langue_tiers (id_tiers, id_langue)
VALUES
(1,1),(1,2),(2,2),(2,3),(3,1),(3,3);

-- QUALITE_TIERS
INSERT INTO qualite_tiers (id_tiers, id_qualite)
VALUES
(1,1),(1,2),(2,3),(2,4),(3,1),(3,5);

-- NIVEAU_FILIERE_TIERS
INSERT INTO niveau_filiere_tiers (id_tiers, id_filiere, id_niveau)
VALUES
(1,6,4),(1,1,2),(2,7,3),(2,2,2),(3,6,5);

-- EXPERIENCE_TIERS
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin)
VALUES
(1,1,'2015-01-01','2018-12-31'),
(1,2,'2019-01-01','2021-12-31'),
(2,3,'2014-06-01','2018-06-01'),
(3,1,'2010-01-01','2015-01-01');

-- EMPLOYES
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste)
VALUES
(3,1,1); -- Paul est employé comme Directeur Général (id_poste =1) et actif

-- STATUS_EMPLOYES
INSERT INTO status_employes (id_employe, id_type_status_employe, date_changement)
VALUES
(1,1,'2020-01-01');

-- QCM et réponses
INSERT INTO question_qcms (intitule)
VALUES 
('Quelle est la capitale de Madagascar ?'),
('Quelle est la couleur du drapeau français ?');

INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite)
VALUES
(1,'Antananarivo',true),
(1,'Fianarantsoa',false),
(1,'Toamasina',false),
(2,'Bleu, blanc, rouge',true),
(2,'Rouge, blanc, bleu',false),
(2,'Vert, blanc, rouge',false);

-- QCM_ANNONCES
INSERT INTO qcm_annonces (id_annonce, id_question_qcm)
VALUES
(1,1),
(1,2),
(2,1);


-- -------------------
-- QCM pour annonces
-- -------------------
INSERT INTO question_qcms (intitule) VALUES ('Quelle est la capitale de Madagascar ?');
INSERT INTO question_qcms (intitule) VALUES ('Quelle est la couleur du ciel ?');

INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (1, 'Antananarivo', TRUE);
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (1, 'Fianarantsoa', FALSE);
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (2, 'Bleu', TRUE);
INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES (2, 'Vert', FALSE);

INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (1, 1);
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (1, 2);
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (2, 2);
