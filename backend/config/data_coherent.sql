-- ===============================================
-- DONNeES COHeRENTES - conformes a table.sql
-- Toutes les insertions utilisent les noms de colonnes definis dans table.sql
-- Tous les mot_de_passe dans `unites` sont definis sur 'azerty'
-- ===============================================

-- Lookup: genres
INSERT INTO genres (valeur) VALUES ('Masculin'), ('Feminin');

-- Lookup: situation_matrimoniales
INSERT INTO situation_matrimoniales (valeur) VALUES ('Celibataire'), ('Marie(e)'), ('Divorce(e)'), ('Veuf/Veuve');

-- Lookup: villes
INSERT INTO villes (valeur) VALUES ('Antananarivo'), ('Fianarantsoa'), ('Toamasina'), ('Mahajanga'), ('Toliara'), ('Antsiranana');

-- Lookup: langues
INSERT INTO langues (valeur) VALUES ('Malgache'), ('Français'), ('Anglais'), ('Espagnol'), ('Allemand'), ('Italien'), ('Chinois'), ('Japonais');

-- Lookup: qualites
INSERT INTO qualites (valeur) VALUES ('Ponctuel'), ('Rigoureux'), ('Autonome'), ('Sociable'), ('Creatif'), ('Organise'), ('Determine'), ('Flexible'), ('Leader'), ('Patient');

-- Lookup: niveaux
INSERT INTO niveaux (valeur) VALUES ('BEPC'), ('BAC'), ('Licence'), ('Licence Pro'), ('Master'), ('Doctorat');

-- Lookup: filieres
INSERT INTO filieres (valeur) VALUES ('Serie A'), ('Serie C'), ('Serie D'), ('Litteraire'), ('Sciences'), ('Informatique'), ('Gestion'), ('Medecine'), ('Droit'), ('Ingenierie'), ('economie');

-- Lookup: domaines
INSERT INTO domaines (valeur) VALUES ('Hopital'), ('Banque'), ('ecole'), ('Administration'), ('Commerce'), ('Industrie'), ('Agriculture'), ('Informatique'), ('Transport'), ('Communication');

-- Unites (nom, mot_de_passe) - passwords set to 'azerty'
INSERT INTO unites (nom, mot_de_passe) VALUES
('Direction Generale', 'azerty'),
('Ressources Humaines', 'azerty'),
('Comptabilite', 'azerty'),
('Marketing', 'azerty'),
('Production', 'azerty'),
('Informatique', 'azerty');

-- Postes (valeur, id_unite)
INSERT INTO postes (valeur, id_unite) VALUES
('Directeur General', 1),
('Responsable RH', 2),
('Charge de Recrutement', 2),
('Gestionnaire RH', 2),
('Directeur Comptable', 3),
('Comptable Senior', 3),
('Comptable Junior', 3),
('Comptable', 3),
('Responsable Marketing', 4),
('Charge de Communication', 4),
('Ouvrier', 5),
('Technicien', 5),
('Ingenieur', 5),
('Developpeur', 6),
('Administrateur Système', 6);

-- Types status
INSERT INTO type_status_annonces (valeur) VALUES ('Brouillon'), ('Publiee'), ('Fermee'), ('Annulee');
INSERT INTO type_status_employes (valeur) VALUES ('Actif'), ('Demission'), ('Licencie'), ('Retraite'), ('Conge');
INSERT INTO type_status_entretiens (valeur) VALUES ('Programme'), ('Realise'), ('Annule'), ('Reporte');
INSERT INTO type_status_suggestions (valeur) VALUES ('En attente'), ('Approuve'), ('Refuse');

-- Singleton value tables
INSERT INTO delai_entretien (valeur) VALUES (1);
INSERT INTO delai_qcm (valeur) VALUES (1);
INSERT INTO score_minimum_qcm (valeur) VALUES (15);
INSERT INTO score_minimum_entretien (valeur) VALUES (15);
INSERT INTO pourcentage_minimum_cv (valeur) VALUES (60);

-- Horaires & jours feries
INSERT INTO horaires_ouvres (heure_debut, heure_fin) VALUES ('08:00', '17:00');
INSERT INTO jours_feries (date_ferie, description) VALUES ('2025-01-01','Nouvel An'),('2025-06-26','Fête de l''Independance'),('2025-12-25','Noël');

-- Questions & reponses QCM
INSERT INTO question_qcms (intitule) VALUES ('Quelle est la capitale de Madagascar ?'),('Combien de couleurs a le drapeau malgache ?'),('En quelle annee Madagascar a-t-elle obtenu son independance ?'),('Quel est le nom de la monnaie malgache ?'),('Quelle est la langue officielle de Madagascar ?');

INSERT INTO reponse_qcms (id_question_qcm, reponse, modalite) VALUES
(1,'Antananarivo',true),(1,'Fianarantsoa',false),(1,'Toamasina',false),(1,'Mahajanga',false),
(2,'2',false),(2,'3',true),(2,'4',false),(2,'5',false),
(3,'1958',false),(3,'1960',true),(3,'1962',false),(3,'1965',false),
(4,'Ariary',true),(4,'Franc',false),(4,'Euro',false),(4,'Dollar',false),
(5,'Malgache',true),(5,'Français',false),(5,'Anglais',false),(5,'Espagnol',false);

INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) VALUES ('Rakoto', 'Jean', '1985-03-15', 1, 2, 2, '0341234567', 'fetraniaina26@gmail.com', 'AA123456', 1, 'photo1.jpg');
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) VALUES ('Rasoa', 'Marie', '1990-07-22', 2, 1, 0, '0347654321', 'fetraniaina26@gmail.com', 'BB987654', 2, 'photo2.jpg');
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) VALUES ('Rabe', 'Rene', '1985-04-12', 1, 1, 0, '0341234567', 'fetraniaina26@gmail.com', 'AA123456', 1, 'photo1.jpg');
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) VALUES ('Andry', 'Paul', '1988-03-15', 1, 1, 0, '0320000003', 'fetraniaina26@gmail.com', 'CC345678', 3, 'photo3.jpg');
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) VALUES ('Rajao', 'Jacques', '1978-03-15', 1, 1, 0, '0320000003', 'fetraniaina26@gmail.com', 'CC345678', 3, 'photo3.jpg');

-- Langues (bonnes)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES 
(5, 1), -- Malgache
(5, 2), -- Français
(5, 3); -- Anglais

-- Qualites (bonnes)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES 
(5, 1), -- Ponctuel
(5, 2), -- Rigoureux
(5, 6), -- Organise
(5, 3); -- Autonome

-- Formation (correcte)
INSERT INTO niveau_filiere_tiers (id_tiers, id_filiere, id_niveau) VALUES 
(5, 7, 4), -- Licence Pro Gestion
(5, 11, 3); -- Licence economie

-- Experience (appropriee)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES 
(5, 2, '2014-01-01', '2018-12-31'), -- Banque (4 ans)
(5, 4, '2019-01-01', '2024-12-31'); -- Administration (5 ans)

-- Candidat moyen - Hery Rakotomalala (id_tiers = 6)
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) 
VALUES ('Rakotomalala', 'Hery', '1988-11-25', 1, 2, 1, '0342222222', 'fetraniaina26@gmail.com', 'MY456123', 3, 'photo_moyen.jpg');

-- Langues (moyennes)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES 
(6, 1), -- Malgache
(6, 2); -- Français

-- Qualites (moyennes)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES 
(6, 1), -- Ponctuel
(6, 4), -- Sociable
(6, 8); -- Flexible

-- Formation (moyenne)
INSERT INTO niveau_filiere_tiers (id_tiers, id_filiere, id_niveau) VALUES 
(6, 2, 2), -- BAC Serie C
(6, 5, 3); -- Licence Sciences

-- Experience (limitee)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES 
(6, 5, '2012-01-01', '2016-12-31'), -- Commerce (4 ans)
(6, 3, '2017-01-01', '2020-12-31'); -- ecole (3 ans)

-- Candidat faible - Soa Randriamampionona (id_tiers = 7)
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) 
VALUES ('Randriamampionona', 'Soa', '1995-12-10', 2, 1, 0, '0343333333', 'fetraniaina26@gmail.com', 'FA456789', 3, 'photo_faible.jpg');

-- Langues (limitees)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES 
(7, 1); -- Malgache seulement

-- Qualites (limitees)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES 
(7, 5), -- Creatif
(7, 4); -- Sociable

-- Formation (faible)
INSERT INTO niveau_filiere_tiers (id_tiers, id_filiere, id_niveau) VALUES 
(7, 2, 1); -- BEPC Serie C

-- Experience (très limitee)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES 
(7, 9, '2018-01-01', '2020-12-31'); -- Transport (2 ans)

-- Candidat technique - Aina Rasolofonirina (id_tiers = 8)
INSERT INTO tiers (nom, prenom, date_naissance, id_genre, id_situation_matrimoniale, nombre_enfants, contact, email, cin, id_ville, photo) 
VALUES ('Rasolofonirina', 'Aina', '1987-04-08', 2, 2, 2, '0345555555', 'fetraniaina26@gmail.com', 'TE789456', 1, 'photo_technique.jpg');

-- Langues (techniques)
INSERT INTO langue_tiers (id_tiers, id_langue) VALUES 
(8, 1), -- Malgache
(8, 2), -- Français
(8, 3); -- Anglais

-- Qualites (techniques)
INSERT INTO qualite_tiers (id_tiers, id_qualite) VALUES 
(8, 2), -- Rigoureux
(8, 3), -- Autonome
(8, 5), -- Creatif
(8, 8); -- Flexible

-- Formation (technique)
INSERT INTO niveau_filiere_tiers (id_tiers, id_filiere, id_niveau) VALUES 
(8, 6, 3), -- Licence Informatique
(8, 6, 4); -- Licence Pro Informatique

-- Experience (technique)
INSERT INTO experience_tiers (id_tiers, id_domaine, date_debut, date_fin) VALUES 
(8, 8, '2010-01-01', '2018-12-31'), -- Informatique (8 ans)
(8, 6, '2019-01-01', '2024-12-31'); -- Industrie (5 ans)

-- ===============================================
-- 4. ANNONCES D'EMPLOI (avec exigences coherentes)
-- ===============================================

-- Annonce 1 : Comptable Junior (Unite Comptabilite)
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) 
VALUES (7, 1, 22, 35, NULL, 3); -- Pas de restriction de genre

INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) 
VALUES (1, 2, '2025-01-01', 3); -- Publiee

-- Exigences annonce 1
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (1, 1), (1, 2); -- Malgache, Français
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (1, 1), (1, 2), (1, 6); -- Ponctuel, Rigoureux, Organise
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (1, 2, 2), (1, 4, 1); -- 2 ans Banque, 1 an Administration
INSERT INTO niveau_filiere_annonces (id_annonce, id_filiere, id_niveau) VALUES (1, 7, 3), (1, 7, 4); -- Licence ou Licence Pro Gestion
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (1, 1), (1, 2), (1, 3); -- Questions culture generale

-- Annonce 2 : Developpeur (Unite Informatique)
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) 
VALUES (14, 1, 25, 40, NULL, 6);

INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) 
VALUES (2, 2, '2025-01-05', 6); -- Publiee

-- Exigences annonce 2
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (2, 1), (2, 2), (2, 3); -- Malgache, Français, Anglais
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (2, 2), (2, 3), (2, 5), (2, 8); -- Rigoureux, Autonome, Creatif, Flexible
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (2, 8, 3); -- 3 ans Informatique
INSERT INTO niveau_filiere_annonces (id_annonce, id_filiere, id_niveau) VALUES (2, 6, 3), (2, 6, 4); -- Licence ou Licence Pro Informatique
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (2, 1), (2, 4), (2, 5); -- Questions generales

-- Annonce 3 : Responsable Marketing (Unite Marketing)
INSERT INTO annonces (id_poste, id_ville, age_min, age_max, id_genre, id_unite) 
VALUES (9, 1, 28, 45, NULL, 4);

INSERT INTO status_annonces (id_annonce, id_type_status_annonce, date_changement, id_unite) 
VALUES (3, 2, '2025-01-10', 4); -- Publiee

-- Exigences annonce 3
INSERT INTO langue_annonces (id_annonce, id_langue) VALUES (3, 1), (3, 2), (3, 3), (3, 4); -- Multilingue
INSERT INTO qualite_annonces (id_annonce, id_qualite) VALUES (3, 4), (3, 5), (3, 6), (3, 9); -- Sociable, Creatif, Organise, Leader
INSERT INTO experience_annonces (id_annonce, id_domaine, nombre_annee) VALUES (3, 5, 5), (3, 10, 3); -- 5 ans Commerce, 3 ans Communication
INSERT INTO niveau_filiere_annonces (id_annonce, id_filiere, id_niveau) VALUES (3, 5, 5), (3, 10, 5); -- Master Sciences ou Ingenierie
INSERT INTO qcm_annonces (id_annonce, id_question_qcm) VALUES (3, 1), (3, 2), (3, 3), (3, 4); -- Toutes questions

-- ===============================================
-- 5. CANDIDATURES (associations logiques)
-- ===============================================

-- Candidatures pour Comptable Junior (Annonce 1)
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES 
(4, 1, 'cv_paul_andry_comptable.pdf'),    -- Excellent candidat
(5, 1, 'cv_miora_comptable.pdf'),         -- Bon candidat
(6, 1, 'cv_hery_comptable.pdf');          -- Candidat moyen

-- Candidatures pour Developpeur (Annonce 2)
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES 
(4, 2, 'cv_paul_andry_dev.pdf'),          -- Excellent candidat (polyvalent)
(8, 2, 'cv_aina_dev.pdf'),                -- Candidat technique (specialise)
(7, 2, 'cv_soa_dev.pdf');                 -- Candidat faible (inadequat)

-- Candidatures pour Responsable Marketing (Annonce 3)
INSERT INTO candidats (id_tiers, id_annonce, cv) VALUES 
(4, 3, 'cv_paul_andry_marketing.pdf'),    -- Excellent candidat (polyvalent)
(6, 3, 'cv_hery_marketing.pdf');          -- Candidat moyen

-- ===============================================
-- 6. PROCESSUS DE RECRUTEMENT COMPLET
-- ===============================================

-- -- Envoi de QCM aux candidats (pour annonce 1 - Comptable)
-- INSERT INTO envoi_qcm_candidats (id_candidat, token, date_envoi) VALUES 
-- (1, 'TOKEN123ABC', '2025-01-15'),  -- Paul Andry
-- (2, 'TOKEN456DEF', '2025-01-15'),  -- Miora
-- (3, 'TOKEN789GHI', '2025-01-15');  -- Hery

-- -- Reponses QCM candidats (scores differencies)
-- -- Paul Andry (excellent) - Score parfait 9/9
-- INSERT INTO reponse_qcm_candidats (id_candidat, id_reponse_qcm, est_selectionnee) VALUES 
-- (1, 1, true),   -- Antananarivo (correct)
-- (1, 6, true),   -- 3 couleurs (correct)  
-- (1, 8, true);   -- 1960 (correct)

-- -- Miora (bon) - Score correct 7/9
-- INSERT INTO reponse_qcm_candidats (id_candidat, id_reponse_qcm, est_selectionnee) VALUES 
-- (2, 1, true),   -- Antananarivo (correct)
-- (2, 6, true),   -- 3 couleurs (correct)
-- (2, 7, true);   -- 1958 (incorrect - perd 3 points)

-- -- Hery (moyen) - Score limite 6/9
-- INSERT INTO reponse_qcm_candidats (id_candidat, id_reponse_qcm, est_selectionnee) VALUES 
-- (3, 1, true),   -- Antananarivo (correct)
-- (3, 5, true),   -- 2 couleurs (incorrect - perd 1 point)
-- (3, 7, true);   -- 1958 (incorrect - perd 3 points)

-- -- Suggestions RH (basees sur scores QCM)
-- INSERT INTO rh_suggestions (id_candidat, id_type_status_suggestion, date_suggestion) VALUES 
-- (1, 1, '2025-01-16'),  -- Paul Andry recommande
-- (2, 1, '2025-01-16');  -- Miora recommandee
-- -- Hery pas recommande (score trop bas)

-- -- Status des suggestions RH
-- INSERT INTO status_rh_suggestions (id_rh_suggestion, id_type_status_suggestion, date_changement) VALUES 
-- (1, 2, '2025-01-17'),  -- Paul approuve pour entretien
-- (2, 2, '2025-01-17');  -- Miora approuvee pour entretien

-- -- Entretiens unite
-- INSERT INTO unite_entretiens (id_candidat, date_entretien, duree) VALUES 
-- (1, '2025-01-20 09:00:00', 60),  -- Paul Andry
-- (2, '2025-01-20 14:00:00', 45);  -- Miora

-- -- Status entretiens unite
-- INSERT INTO status_unite_entretiens (id_unite_entretien, id_type_status_entretien, date_changement) VALUES 
-- (1, 2, '2025-01-20'),  -- Paul entretien realise
-- (2, 2, '2025-01-20');  -- Miora entretien realise

-- -- Scores entretiens unite
-- INSERT INTO score_unite_entretiens (id_unite_entretien, score) VALUES 
-- (1, 18),  -- Paul excellent score
-- (2, 15);  -- Miora score minimum

-- -- Entretiens RH (suite aux entretiens unite)
-- INSERT INTO rh_entretiens (id_rh_suggestion, id_candidat, date_entretien, duree) VALUES 
-- (1, 1, '2025-01-22 10:00:00', 45),  -- Paul Andry
-- (2, 2, '2025-01-22 15:00:00', 30);  -- Miora

-- -- Status entretiens RH
-- INSERT INTO status_rh_entretiens (id_rh_entretien, id_type_status_entretien, date_changement) VALUES 
-- (1, 2, '2025-01-22'),  -- Paul entretien RH realise
-- (2, 2, '2025-01-22');  -- Miora entretien RH realise

-- -- Scores entretiens RH
-- INSERT INTO score_rh_entretiens (id_rh_entretien, score) VALUES 
-- (1, 19),  -- Paul excellent score RH
-- (2, 16);  -- Miora bon score RH

-- -- Suggestions CEO (finales)
-- INSERT INTO ceo_suggestions (id_rh_entretien, id_candidat, id_type_status_suggestion, date_suggestion) VALUES 
-- (1, 1, 1, '2025-01-23'),  -- Paul recommande au CEO
-- (2, 2, 1, '2025-01-23');  -- Miora recommandee au CEO

-- -- Status suggestions CEO
-- INSERT INTO status_ceo_suggestions (id_ceo_suggestion, id_type_status_suggestion, date_changement) VALUES 
-- (1, 2, '2025-01-24'),  -- Paul approuve par CEO
-- (2, 3, '2025-01-24');  -- Miora refusee par CEO (un seul poste)

-- ===============================================
-- 7. EMBAUCHE ET CONTRATS
-- ===============================================

-- Paul Andry est embauche comme Comptable Junior
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste) VALUES (4, 1, 7);

-- Status employe Paul
INSERT INTO status_employes (id_employe, id_type_status_employe, date_changement) VALUES 
(1, 1, '2025-02-01'); -- Actif a partir du 1er fevrier

-- Contrat d'essai Paul
INSERT INTO contrat_essais (id_employe, date_debut, duree) VALUES 
(1, '2025-02-01', 3); -- 3 mois d'essai

-- Historique du poste
INSERT INTO historique_poste_employes (id_employe, id_poste, date_changement) VALUES 
(1, 7, '2025-02-01'); -- Poste actuel sans date de fin

-- ===============================================
-- 8. MAILS ET COMMUNICATIONS
-- ===============================================

-- Adresses mail pour notifications
INSERT INTO adresse_mail (valeur, mot_de_passe) VALUES ('tsikyrakotonirina20@gmail.com', 'youh xjbi yvwx xeil');

-- Templates de mails
INSERT INTO mails (objet, signature) VALUES 
('Convocation QCM - Processus de recrutement Axiom', 'Axiom — Service Recrutement'),
('Convocation entretien technique - Axiom', 'Axiom — Service Recrutement'),
('Convocation entretien RH - Axiom', 'Axiom — Service Recrutement'),
('Decision finale de recrutement - Axiom', 'Axiom — Direction Generale');

-- Corps des mails
INSERT INTO corps_mails (id_mail, corps) VALUES 
-- Mail QCM
(1, 'Madame, Monsieur, Nous vous remercions pour votre candidature a notre offre d''emploi.'),
(1, 'Vous êtes convie(e) a passer un questionnaire de culture generale (QCM) dans le cadre de notre processus de recrutement.'),
(1, 'Modalites : Connectez-vous avec le token fourni, ne quittez pas la page pendant le test, respectez le delai imparti.'),
(1, 'En cas de reussite, vous serez contacte(e) pour un entretien technique. Cordialement.'),

-- Mail entretien technique
(2, 'Felicitations ! Vous avez reussi le QCM avec un score de {{score}}/{{total}}.'),
(2, 'Vous êtes convie(e) a un entretien technique le {{date}} a {{heure}} dans nos locaux.'),
(2, 'Merci de vous presenter avec votre CV a jour et en tenue correcte.'),
(2, 'L''entretien sera mene par l''equipe de l''unite concernee.'),

-- Mail entretien RH
(3, 'Suite a votre entretien technique, vous êtes convie(e) a un entretien RH.'),
(3, 'Rendez-vous le {{date}} a {{heure}} avec le service des Ressources Humaines.'),
(3, 'Cet entretien permettra d''evaluer votre adequation avec notre culture d''entreprise.'),
(3, 'Merci de confirmer votre presence par retour de mail.'),

-- Mail decision finale
(4, 'Nous avons le plaisir de vous informer de la decision concernant votre candidature.'),
(4, '{{decision}} : {{message_personnalise}}'),
(4, 'Nous vous remercions pour l''interêt porte a notre entreprise.'),
(4, 'En cas d''embauche, vous recevrez votre contrat par courrier separe.');
