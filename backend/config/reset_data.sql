-- reset_data.sql
-- Supprime toutes les données de la base dans l'ordre sûr (enfants -> parents)
-- Utilise DELETE FROM (conserve la structure des tables).
-- Exécuter après avoir chargé le schéma (table.sql) si nécessaire.

BEGIN;

-- 1) Réponses/Envois QCM des candidats (plus profonds)
DELETE FROM reponse_qcm_candidats;
DELETE FROM envoi_qcm_candidats;

-- 2) Réponses modèle QCM et associations QCM
DELETE FROM reponse_qcms;
DELETE FROM qcm_annonces;
DELETE FROM question_qcms;

-- 3) Notes / statuts et entretiens (unité, RH, CEO)
DELETE FROM status_rh_entretiens;
DELETE FROM score_rh_entretiens;
DELETE FROM rh_entretiens;

DELETE FROM status_rh_suggestions;
DELETE FROM rh_suggestions;

DELETE FROM status_ceo_suggestions;
DELETE FROM ceo_suggestions;

DELETE FROM status_unite_entretiens;
DELETE FROM score_unite_entretiens;
DELETE FROM unite_entretiens;

-- 4) Status & historique employés, contrats
DELETE FROM status_employes;
DELETE FROM historique_poste_employes;
DELETE FROM contrat_essais;

-- 5) RH / candidats / candidatures et leurs exigences
DELETE FROM candidats;
DELETE FROM reponse_qcm_candidats; -- idempotent (déjà supprimé plus haut) mais sic

DELETE FROM status_annonces;
DELETE FROM qcm_annonces; -- déjà supprimé mais conservé pour idempotence
DELETE FROM niveau_filiere_annonces;
DELETE FROM langue_annonces;
DELETE FROM qualite_annonces;
DELETE FROM experience_annonces;

-- 6) Associations liées aux tiers (formations, langues, qualités, expérience)
DELETE FROM niveau_filiere_tiers;
DELETE FROM langue_tiers;
DELETE FROM qualite_tiers;
DELETE FROM experience_tiers;

-- 7) Tiers (personnes), employés
DELETE FROM employes;
DELETE FROM tiers;

-- 8) Annonces, postes, unités
DELETE FROM annonces;
DELETE FROM postes;
DELETE FROM unites;

-- 9) Mails
DELETE FROM corps_mails;
DELETE FROM mails;

-- 10) Types de statut (tables de référence)
DELETE FROM type_status_annonces;
DELETE FROM type_status_employes;
DELETE FROM type_status_entretiens;
DELETE FROM type_status_suggestions;

-- 11) Tables de lookup / références
DELETE FROM langue_annonces; -- safe repeat
DELETE FROM langues;
DELETE FROM filieres;
DELETE FROM niveaux;
DELETE FROM qualites;
DELETE FROM domaines;
DELETE FROM villes;
DELETE FROM genres;
DELETE FROM situation_matrimoniales;

-- 12) Singletons et valeurs globales
DELETE FROM delai_entretien;
DELETE FROM delai_qcm;
DELETE FROM score_minimum_qcm;
DELETE FROM score_minimum_entretien;
DELETE FROM pourcentage_minimum_cv;
DELETE FROM adresse_mail;

-- 13) Jours fériés / horaires
DELETE FROM jours_feries;
DELETE FROM horaires_ouvres;

COMMIT;

-- NOTE:
-- - Ce script utilise DELETE FROM dans un ordre déterministe enfants->parents.
-- - Si vous préférez réinitialiser automatiquement les séquences, ajoutez des ALTER SEQUENCE ... RESTART WITH 1 pour chaque sequence.
-- - Pour une suppression plus rapide et atomique vous pouvez utiliser TRUNCATE ... RESTART IDENTITY CASCADE,
--   mais TRUNCATE nécessite généralement des privilèges plus élevés et casse la granularité de l'ordre présenté ici.
