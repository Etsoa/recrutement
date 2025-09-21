-- Genres
INSERT INTO genres (valeur) VALUES ('Homme');
INSERT INTO genres (valeur) VALUES ('Femme');

-- Situation matrimoniale
INSERT INTO situation_matrimoniales (valeur) VALUES ('Celibataire');
INSERT INTO situation_matrimoniales (valeur) VALUES ('Marie(e)');
INSERT INTO situation_matrimoniales (valeur) VALUES ('Divorce(e)');
INSERT INTO situation_matrimoniales (valeur) VALUES ('Veuf(ve)');

-- Langues
INSERT INTO langues (valeur) VALUES ('Malgache');
INSERT INTO langues (valeur) VALUES ('Français');
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
INSERT INTO filieres (valeur) VALUES ('economie');
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

-- Domaines
INSERT INTO domaines (valeur) VALUES ('Hôpital');
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
INSERT INTO type_status_employes (valeur) VALUES ('Actif');
INSERT INTO type_status_employes (valeur) VALUES ('Demission');
INSERT INTO type_status_employes (valeur) VALUES ('Renvoi');
INSERT INTO type_status_employes (valeur) VALUES ('Retraite');
INSERT INTO type_status_employes (valeur) VALUES ('Deces ');

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
