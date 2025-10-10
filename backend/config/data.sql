-- DONNÉES INITIALES POUR GESTION ENTREPRISE
-- ===============================================

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

-- LANGUES POUR TOUTES LES ANNONCES (1-10)
-- Annonce 1 : Directeur Général
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (1, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (1, 2); -- Français
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (1, 3); -- Anglais

-- Annonce 2 : Assistant Direction
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (2, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (2, 2); -- Français

-- Annonce 3 : Responsable RH
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (3, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (3, 2); -- Français
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (3, 3); -- Anglais

-- Annonce 4 : Assistant RH
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (4, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (4, 2); -- Français

-- Annonce 5 : Chef Comptable
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (5, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (5, 2); -- Français

-- Annonce 6 : Chef de Production
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (6, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (6, 2); -- Français

-- Annonce 7 : Responsable Commercial
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (7, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (7, 2); -- Français
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (7, 3); -- Anglais

-- Annonce 8 : Assistant Commercial
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (8, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (8, 2); -- Français

-- Annonce 9 : Assistant Commercial (autre)
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (9, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (9, 2); -- Français

-- Annonce 10 : Secrétaire Direction
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (10, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (10, 2); -- Français

-- QUALITES POUR TOUTES LES ANNONCES (1-10)
-- Annonce 1 : Directeur Général
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 2); -- Rigoureux
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 6); -- Organisé
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 9); -- Leader
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 7); -- Communicatif

-- Annonce 2 : Assistant Direction
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (2, 1); -- Ponctuel
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (2, 6); -- Organisé
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (2, 4); -- Esprit d'équipe

-- Annonce 3 : Responsable RH
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (3, 2); -- Rigoureux
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (3, 7); -- Communicatif
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (3, 4); -- Esprit d'équipe

-- Annonce 4 : Assistant RH
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (4, 1); -- Ponctuel
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (4, 3); -- Autonome
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (4, 7); -- Communicatif

-- Annonce 5 : Chef Comptable
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (5, 1); -- Ponctuel
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (5, 2); -- Rigoureux
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (5, 6); -- Organisé

-- Annonce 6 : Chef de Production
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (6, 2); -- Rigoureux
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (6, 9); -- Leader
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (6, 4); -- Esprit d'équipe

-- Annonce 7 : Responsable Commercial
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (7, 7); -- Communicatif
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (7, 5); -- Créatif
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (7, 9); -- Leader

-- Annonce 8 : Assistant Commercial
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (8, 7); -- Communicatif
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (8, 3); -- Autonome
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (8, 8); -- Flexible

-- Annonce 9 : Assistant Commercial (autre)
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (9, 7); -- Communicatif
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (9, 1); -- Ponctuel
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (9, 4); -- Esprit d'équipe

-- Annonce 10 : Secrétaire Direction
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (10, 1); -- Ponctuel
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (10, 6); -- Organisé
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (10, 7); -- Communicatif

-- EXPERIENCES POUR TOUTES LES ANNONCES (1-10)
-- Annonce 1 : Directeur Général
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (1, 4, 10); -- Administration 10 ans
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (1, 6, 5); -- Commerce 5 ans

-- Annonce 2 : Assistant Direction
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (2, 4, 3); -- Administration 3 ans

-- Annonce 3 : Responsable RH
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (3, 4, 7); -- Administration 7 ans
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (3, 3, 2); -- Éducation 2 ans

-- Annonce 4 : Assistant RH
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (4, 4, 2); -- Administration 2 ans

-- Annonce 5 : Chef Comptable
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (5, 2, 8); -- Banque 8 ans
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (5, 4, 3); -- Administration 3 ans

-- Annonce 6 : Chef de Production
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (6, 5, 10); -- Industrie 10 ans

-- Annonce 7 : Responsable Commercial
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (7, 6, 7); -- Commerce 7 ans
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (7, 2, 3); -- Banque 3 ans

-- Annonce 8 : Assistant Commercial
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (8, 6, 3); -- Commerce 3 ans

-- Annonce 9 : Assistant Commercial (autre)
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (9, 6, 2); -- Commerce 2 ans

-- Annonce 10 : Secrétaire Direction
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (10, 4, 3); -- Administration 3 ans

-- NIVEAUX/FILIERES POUR TOUTES LES ANNONCES (1-10)
-- Annonce 1 : Directeur Général
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (1, 5, 7); -- Master Gestion
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (1, 6, 11); -- Doctorat Économie

-- Annonce 2 : Assistant Direction
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (2, 3, 7); -- Licence Gestion
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (2, 4, 7); -- Licence Pro Gestion

-- Annonce 3 : Responsable RH
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (3, 5, 7); -- Master Gestion
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (3, 5, 8); -- Master Droit

-- Annonce 4 : Assistant RH
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (4, 3, 7); -- Licence Gestion
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (4, 4, 7); -- Licence Pro Gestion

-- Annonce 5 : Chef Comptable
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (5, 5, 7); -- Master Gestion
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (5, 5, 11); -- Master Économie

-- Annonce 6 : Chef de Production
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (6, 4, 10); -- Licence Pro Génie Civil
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (6, 5, 10); -- Master Génie Civil

-- Annonce 7 : Responsable Commercial
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (7, 4, 7); -- Licence Pro Gestion
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (7, 5, 6); -- Master Commerce

-- Annonce 8 : Assistant Commercial
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (8, 3, 7); -- Licence Gestion
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (8, 2, 1); -- BAC Série A

-- Annonce 9 : Assistant Commercial (autre)
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (9, 3, 7); -- Licence Gestion
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (9, 2, 3); -- BAC Série D

-- Annonce 10 : Secrétaire Direction
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (10, 2, 5); -- BAC Série L
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (10, 3, 7); -- Licence Gestion

-- TIERS (CANDIDATS) - Tous avec email fetraniaina26@gmail.com
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

-- LANGUES POUR TOUS LES CANDIDATS (différentes des annonces)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (1, 1); -- Jean Rakoto - Malgache
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (1, 2); -- Jean Rakoto - Français
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (1, 4); -- Jean Rakoto - Espagnol (différent des annonces)

INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (2, 1); -- Marie Rasoa - Malgache
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (2, 5); -- Marie Rasoa - Allemand (différent des annonces)

INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (3, 2); -- Jean Rabe - Français
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (3, 6); -- Jean Rabe - Italien (différent des annonces)

INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (4, 1); -- Paul Andry - Malgache
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (4, 2); -- Paul Andry - Français
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (4, 3); -- Paul Andry - Anglais

-- QUALITES POUR TOUS LES CANDIDATS (différentes des annonces)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 5); -- Jean Rakoto - Créatif (différent des annonces)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 8); -- Jean Rakoto - Flexible
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (1, 3); -- Jean Rakoto - Autonome

INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (2, 8); -- Marie Rasoa - Flexible (différent des annonces)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (2, 1); -- Marie Rasoa - Ponctuel

INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (3, 9); -- Jean Rabe - Leader (différent des annonces)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (3, 5); -- Jean Rabe - Créatif

INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (4, 3); -- Paul Andry - Autonome
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (4, 8); -- Paul Andry - Flexible (différent des annonces)

-- EXPERIENCES POUR TOUS LES CANDIDATS (différentes de celles demandées dans les annonces)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (1, 7, '2010-01-01', '2015-12-31'); -- Jean Rakoto - Agriculture (différent)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (1, 8, '2016-01-01', '2020-12-31'); -- Jean Rakoto - Informatique (différent)

INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (2, 9, '2012-06-01', '2018-08-31'); -- Marie Rasoa - Transport (différent)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (2, 1, '2019-01-01', '2022-12-31'); -- Marie Rasoa - Hôpital (différent)

INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (3, 8, '2015-01-01', '2020-06-30'); -- Jean Rabe - Informatique (différent)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (3, 7, '2021-01-01', '2024-12-31'); -- Jean Rabe - Agriculture (différent)

INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (4, 9, '2010-01-01', '2018-01-01'); -- Paul Andry - Transport (différent)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (4, 1, '2018-06-01', '2023-12-31'); -- Paul Andry - Hôpital (différent)

-- NIVEAUX/FILIERES POUR TOUS LES CANDIDATS (différents des annonces)
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (1, 2, 2); -- Jean Rakoto - BAC Série C (niveau plus bas)
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (1, 3, 12); -- Jean Rakoto - Licence Agronomie (filière différente)

INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (2, 1, 3); -- Marie Rasoa - BEPC Série D (niveau insuffisant)
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (2, 2, 9); -- Marie Rasoa - BAC Médecine (filière différente)

INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (3, 3, 6); -- Jean Rabe - Licence Informatique (filière différente)
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (3, 4, 12); -- Jean Rabe - Licence Pro Agronomie (différent)

INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (4, 4, 6); -- Paul Andry - Licence Pro Informatique (différent)
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (4, 5, 9); -- Paul Andry - Master Médecine (différent)

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

-- ADRESSE MAIL
INSERT INTO adresse_mail (valeur, mot_de_passe) VALUES ('tsikyrakotonirina20@gmail.com', 'youh xjbi yvwx xeil');

-- EMPLOYES SUPPLEMENTAIRES
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste) VALUES (3, 1, 4);

-- JOURS FERIES
INSERT INTO jours_feries (date_ferie, description) VALUES
('2025-01-01', 'Nouvel An'),
('2025-05-01', 'Fête du Travail'),
('2025-12-25', 'Noël');

-- HORAIRES OUVRES
INSERT INTO horaires_ouvres (heure_debut, heure_fin) VALUES
('08:00', '12:00'),
('13:00', '16:00');

-- 🔹 1. TIERS RH - Responsable des Ressources Humaines
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) 
VALUES ('Rasoamalala', 'Hery', '1980-03-15', 1, 2, 2, '0341111111', 'fetraniaina26@gmail.com', 'RH123456', 1, 'photo_hery_rh.jpg');

-- Employé RH (id_tiers = 5 car on a déjà 4 tiers dans les données précédentes)
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste) VALUES (5, 1, 4); -- Poste 4 = Responsable RH

-- Status employé RH
INSERT INTO status_employes (id_employe, id_type_status_employe, date_changement) VALUES (2, 1, '2022-01-15');

-- Compétences RH - Langues (différentes des annonces)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (5, 1); -- Malgache
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (5, 5); -- Allemand (différent)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (5, 6); -- Italien (différent)

-- Compétences RH - Qualités (différentes des annonces)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (5, 5); -- Créatif (différent)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (5, 8); -- Flexible (différent)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (5, 3); -- Autonome (différent)

-- Formation RH (différente)
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (5, 4, 8); -- Licence Pro Droit (différent)

-- Expérience RH (différente)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (5, 3, '2015-01-01', '2021-12-31'); -- Éducation (différent)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (5, 8, '2022-01-01', '2024-12-31'); -- Informatique (différent)

-- 🔹 2. TIERS CEO - Directeur Général
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) 
VALUES ('Rakotomalala', 'Andry', '1975-08-22', 1, 2, 3, '0342222222', 'fetraniaina26@gmail.com', 'CEO789123', 1, 'photo_andry_ceo.jpg');

-- Employé CEO (id_tiers = 6)
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste) VALUES (6, 1, 1); -- Poste 1 = Directeur Général

-- Status employé CEO
INSERT INTO status_employes (id_employe, id_type_status_employe, date_changement) VALUES (3, 1, '2020-01-01');

-- Compétences CEO - Langues (partiellement différentes)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (6, 1); -- Malgache
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (6, 5); -- Allemand (différent)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (6, 6); -- Italien (différent)

-- Compétences CEO - Qualités (différentes)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (6, 5); -- Créatif (différent)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (6, 8); -- Flexible (différent)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (6, 1); -- Ponctuel (différent)

-- Formation CEO (différente)
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (6, 5, 9); -- Master Médecine (différent)

-- Expérience CEO (différente)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (6, 1, '2010-01-01', '2019-12-31'); -- Hôpital (différent)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (6, 7, '2005-01-01', '2009-12-31'); -- Agriculture (différent)

-- 🔹 3. ANCIEN EMPLOYÉ avec MAUVAISES COMPÉTENCES candidat à 2 annonces
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) 
VALUES ('Randriamampionona', 'Soa', '1988-12-10', 2, 3, 1, '0343333333', 'fetraniaina26@gmail.com', 'ANC456789', 2, 'photo_soa_ancien.jpg');

-- Ancien employé (DÉMISSION) - id_tiers = 7
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste) VALUES (7, 2, 11); -- Poste 11 = Ouvrier, Status 2 = Démission

-- Status employé (démission)
INSERT INTO status_employes (id_employe, id_type_status_employe, date_changement) VALUES (4, 1, '2023-01-01'); -- Actif d'abord
INSERT INTO status_employes (id_employe, id_type_status_employe, date_changement) VALUES (4, 2, '2024-06-15'); -- Puis démission

-- MAUVAISES Compétences - Langues limitées (très différentes)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (7, 6); -- Seulement Italien (inadéquat)

-- MAUVAISES Compétences - Qualités inadaptées (très différentes)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (7, 5); -- Créatif seulement (inadéquat)

-- Formation inadéquate (très différente)
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (7, 1, 2); -- BEPC Série C (niveau bas, différent)

-- Expérience limitée et inadéquate (très différente)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (7, 9, '2023-01-01', '2024-06-15'); -- Transport seulement (différent)

-- Candidature 1 : Poste Comptable (inadéquat)
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (7, 7, 'cv_soa_comptabilite.pdf'); -- Annonce 7 = poste comptabilité

-- Candidature 2 : Poste Commercial (inadéquat)
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (7, 9, 'cv_soa_commercial.pdf'); -- Annonce 9 = poste commercial

-- 🔹 4. BON CANDIDAT pour poste Comptabilité
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) 
VALUES ('Andrianarivelo', 'Miora', '1992-06-18', 2, 1, 0, '0344444444', 'fetraniaina26@gmail.com', 'BON123789', 1, 'photo_miora_bon.jpg');

-- BONNES Compétences - Langues (différentes mais utiles)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (8, 1); -- Malgache
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (8, 4); -- Espagnol (différent)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES (8, 6); -- Italien (différent)

-- BONNES Compétences - Qualités (différentes mais adaptées)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (8, 3); -- Autonome (différent)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (8, 5); -- Créatif (différent)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES (8, 8); -- Flexible (différent)

-- Formation différente mais solide
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (8, 3, 11); -- Licence Économie (différent)
INSERT INTO niveau_filiere_tiers (id_tiers, id_niveau, id_filiere) VALUES (8, 4, 6); -- Licence Pro Informatique (différent)

-- Expérience différente
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (8, 8, '2018-01-01', '2022-12-31'); -- Informatique (différent)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES (8, 1, '2023-01-01', '2024-12-31'); -- Hôpital (différent)

-- Candidature pour poste Comptabilité (annonce 7 - unité Comptabilité)
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (8, 7, 'cv_miora_comptable_excellent.pdf');

-- Nouvelle annonce pour poste Comptable (unité Comptabilité = 3)
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) VALUES (8, 1, 25, 40, 2, 3); -- Poste 8 = Comptable, Unité 3 = Comptabilité

-- Status de la nouvelle annonce
INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) VALUES (11, 2, '2025-01-15', 3); -- Annonce 11 publiée

-- Exigences pour la nouvelle annonce comptabilité
-- Langues requises
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (11, 1); -- Malgache
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (11, 2); -- Français

-- Qualités requises
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (11, 1); -- Ponctuel
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (11, 2); -- Rigoureux
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (11, 6); -- Organisé

-- Expériences requises
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (11, 2, 3); -- 3 ans en Banque
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (11, 4, 2); -- 2 ans en Administration

-- Formation requise
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (11, 4, 7); -- Licence Pro Gestion minimum
INSERT INTO niveau_filiere_annonces (id_annonce, id_niveau, id_filiere) VALUES (11, 5, 7); -- Master Gestion préféré

-- QCM pour l'annonce comptabilité
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (11, 1); -- Question capitale
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (11, 2); -- Question drapeau

-- Candidature du bon candidat à cette nouvelle annonce aussi
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES (8, 11, 'cv_miora_nouvelle_annonce.pdf');

-- ===============================================
-- MAILS ET CORPS MAILS (EN DERNIER)
-- ===============================================

-- Mail pour QCM
INSERT INTO mails (objet, signature) VALUES ('Envoi de QCM pour votre recrutement auprès de notre annonce', 'Axiom — Service Recrutement');

-- Corps du mail QCM (id_mail = 1)
INSERT INTO corps_mails (id_mail, corps) VALUES 
(1, 'Madame, Monsieur, Au nom de l''entreprise Axiom, nous vous remercions pour l''intérêt porté à notre offre et pour votre candidature. Nous vous souhaitons la bienvenue dans la première étape de notre processus de recrutement.'),
(1, 'Veuillez compléter le questionnaire (QCM) prévu dans le cadre du processus de recrutement. Le lien vers le QCM vous sera communiqué séparément par notre service ; merci de suivre attentivement les instructions et de remplir l''ensemble des sections demandées pour que votre dossier soit pris en compte.'),
(1, 'Règles du QCM : - Entrez le token qui vous sera communiqué par notre équipe avant de démarrer le QCM. - Ne quittez pas la page durant la passation : toute déconnexion ou fermeture de la session entraînera l''attribution d''un score de 0 pour cette tentative. - Certaines questions acceptent plusieurs réponses : lisez attentivement les consignes de chaque question. - Si vous obtenez la note minimale requise, vous recevrez ensuite un courriel de confirmation contenant les informations pour un entretien technique.'),
(1, 'Nous vous remercions pour votre participation et pour le temps consacré à ce test. Pour toute question, n''hésitez pas à contacter le service recrutement d''Axiom. Cordialement, Axiom — Service Recrutement');

-- Mail pour entretien unité  
INSERT INTO mails (objet, signature) VALUES ('Entretien avec unité au sein de l''entreprise Axiom', 'Axiom — Service Recrutement');

-- Corps du mail entretien (id_mail = 2)
INSERT INTO corps_mails (id_mail, corps) VALUES 
(2, 'Félicitations ! Vous êtes accédé(e) à l''étape suivante de notre processus de recrutement. Vous avez obtenu au QCM le score de : {{score}}.'),
(2, 'Vous allez, dans le cadre de cette candidature, rencontrer l''unité en charge du poste pour un entretien technique qui se tiendra le {{date_entretien}} à {{heure}} dans les locaux de {{unite}}.'),
(2, 'Veuillez ne pas être en retard, portez une tenue correcte et présentez-vous préparé(e) (CV à jour, pièces demandées, éventuellement supports pertinents).'),
(2, 'En cas de nécessité de report, nous vous contacterons par e-mail pour proposer une nouvelle date. Merci de vérifier régulièrement votre boîte de réception (y compris le dossier spam).');

-- 1️⃣ Ajouter le tiers pour le Directeur Général
INSERT INTO tiers (
    nom, prenom, date_naissance, 
    id_genre, 
    id_situation_matrimoniale, 
    nombre_enfants, contact, email, cin, 
    id_ville, 
    photo
) VALUES (
    'Rabe', 'Paul', '1980-03-15', 
    1, 
    2, 
    2, '0321112233', 'fetraniaina26@gmail.com', 'CC987654',
    1, 
    'photo_dg.jpg'
)
RETURNING id_tiers;

-- Supposons que ça retourne id_tiers = 3

-- 2️⃣ Créer l’employé Directeur Général
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste)
VALUES (3, 1, 1)  -- 1 = Actif dans type_status_employes, 1 = Directeur Général dans postes
RETURNING id_employe;

---

INSERT INTO rh_entretiens (id_rh_suggestion, id_candidat, date_entretien, duree)
VALUES (1, 1, '2025-09-19', 45)
RETURNING id_rh_entretien;
-- id_rh_entretien = 1

INSERT INTO ceo_suggestions (id_rh_entretien, id_candidat, id_type_status_suggestion, date_suggestion)
VALUES (1, 1, 1, '2025-09-20')
RETURNING id_ceo_suggestion;
-- id_ceo_suggestion = 1

-- WARNING !!!
INSERT INTO status_ceo_suggestions (id_ceo_suggestion, id_type_status_suggestion, date_changement)
VALUES (1, 3, '2025-09-20');
-- Mety mipoaka ito iray ito arakarak'le data sy niseho tam'le id