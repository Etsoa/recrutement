-- Drop views in reverse dependency order
DROP VIEW IF EXISTS v_horaires_travail;
DROP VIEW IF EXISTS v_parametres_systeme;
DROP VIEW IF EXISTS v_resultats_qcm;
DROP VIEW IF EXISTS v_envoi_qcm_complete;
DROP VIEW IF EXISTS v_qcm_par_annonce;
DROP VIEW IF EXISTS v_questions_qcm_complete;
DROP VIEW IF EXISTS v_candidats_complete;
DROP VIEW IF EXISTS v_tiers_complete;
DROP VIEW IF EXISTS v_annonces_complete;
DROP VIEW IF EXISTS v_annonces_experiences;
DROP VIEW IF EXISTS v_annonces_qualites;
DROP VIEW IF EXISTS v_annonces_langues;
DROP VIEW IF EXISTS v_annonces_formations;
DROP VIEW IF EXISTS v_annonces_base;