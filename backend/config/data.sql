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


INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) VALUES (1, 1, 30, 55, 1); -- Directeur General, Antananarivo, Homme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) VALUES (2, 2, 25, 50, 2); -- Assistant Direction, Fianarantsoa, Femme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) VALUES (4, 1, 28, 45, 1); -- Responsable RH, Antananarivo, Homme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) VALUES (5, 3, 22, 40, 2); -- Assistant RH, Toamasina, Femme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) VALUES (7, 4, 35, 60, 1); -- Chef Comptable, Mahajanga, Homme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) VALUES (10, 5, 25, 45, 2); -- Ouvrier, Toliara, Femme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) VALUES (13, 6, 30, 50, 1); -- Responsable Commercial, Antsiranana, Homme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) VALUES (15, 1, 22, 35, 2); -- Commercial, Antananarivo, Femme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) VALUES (16, 2, 24, 38, 1); -- Assistant Commercial, Fianarantsoa, Homme
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre) VALUES (3, 3, 27, 45, 2); -- Secretaire Direction, Toamasina, Femme

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
