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


-- Tiers #4 : Candidat femme
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
VALUES ('Randria', 'Marie', '1995-07-21', 2, 1, 0, '0345566778', 'marie.randria@email.com', 'DD112233', 1, 'photo_marie.jpg')
RETURNING id_tiers; -- id_tiers = 4

-- Tiers #5 : Employé Comptable
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo)
VALUES ('Rasoanaivo', 'Joseph', '1988-11-10', 1, 2, 3, '0334455667', 'joseph.rasoanaivo@email.com', 'EE334455', 3, 'photo_joseph.jpg')
RETURNING id_tiers; -- id_tiers = 5

-- Employé Comptable (poste 8 = Comptable, status 1 = Actif)
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste)
VALUES (5, 1, 8)
RETURNING id_employe; -- id_employe = 2

-- Annonce #2 : Poste de Commercial à Toamasina
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre)
VALUES (14, 3, 22, 35, NULL) -- 14 = Commercial, 3 = Toamasina
RETURNING id_annonce; -- id_annonce = 2

-- Candidat #2 : Marie (tiers 4) postule pour l’annonce #2
INSERT INTO candidats (id_tiers, id_annonce, cv)
VALUES (4, 2, 'cv_marie.pdf')
RETURNING id_candidat; -- id_candidat = 2

-- Entretien RH pour Marie
INSERT INTO unite_entretiens (id_candidat, id_unite, date_entretien, duree)
VALUES (2, 2, '2025-09-26', 50) -- 2 = Ressources Humaines
RETURNING id_unite_entretien; -- id_unite_entretien = 2

-- Statut de l’entretien (Terminé)
INSERT INTO status_unite_entretiens (id_unite_entretien, id_type_status_entretien, date_changement)
VALUES (2, 2, '2025-09-26');

-- Suggestion RH pour Marie
INSERT INTO rh_suggestions (id_unite_entretien, id_candidat, date_suggestion)
VALUES (2, 2, '2025-09-26')
RETURNING id_rh_suggestion; -- id_rh_suggestion = 2

-- Validation de la suggestion RH
INSERT INTO status_rh_suggestions (id_rh_suggestion, id_type_status_suggestion, date_changement)
VALUES (2, 1, '2025-09-26'); -- 1 = Valide

-- Entretien RH validé
INSERT INTO rh_entretiens (id_rh_suggestion, id_candidat, date_entretien, duree)
VALUES (2, 2, '2025-09-27', 60)
RETURNING id_rh_entretien; -- id_rh_entretien = 2

-- Score à l’entretien RH
INSERT INTO score_rh_entretiens (id_rh_entretien, score, date_score)
VALUES (2, 17, '2025-09-27');

-- CEO reçoit la suggestion
INSERT INTO ceo_suggestions (id_rh_entretien, id_candidat, id_type_status_suggestion, date_suggestion)
VALUES (2, 2, 1, '2025-09-28')
RETURNING id_ceo_suggestion; -- id_ceo_suggestion = 2

-- Statut validé par le CEO
INSERT INTO status_ceo_suggestions (id_ceo_suggestion, id_type_status_suggestion, date_changement)
VALUES (2, 1, '2025-09-28');

