-- ===============================================
-- VUES SQL POUR LE SYSTÈME DE RECRUTEMENT AXIOM
-- Créé pour supporter les fonctionnalités Unités/RH
-- PostgreSQL Version
-- ===============================================

-- Vue pour les entretiens unité avec détails candidats
DROP VIEW IF EXISTS vue_unite_entretiens_complet CASCADE;

CREATE VIEW vue_unite_entretiens_complet AS
SELECT 
    ue.id_unite_entretien,
    ue.id_candidat,
    ue.id_unite,
    ue.date_entretien,
    ue.duree,
    c.id_tiers,
    t.nom,
    t.prenom,
    t.email,
    t.contact,
    t.date_naissance,
    EXTRACT(YEAR FROM AGE(t.date_naissance)) AS age,
    t.cin,
    c.cv,
    v.valeur AS ville,
    g.valeur AS genre,
    sm.valeur AS situation_matrimoniale,
    a.id_annonce,
    p.valeur AS poste_nom,
    u.nom AS unite_nom,
    (SELECT tse.valeur 
     FROM status_unite_entretiens sue 
     JOIN type_status_entretiens tse ON sue.id_type_status_entretien = tse.id_type_status_entretien
     WHERE sue.id_unite_entretien = ue.id_unite_entretien 
     ORDER BY sue.date_changement DESC 
     LIMIT 1) AS statut_entretien,
    (SELECT score 
     FROM score_unite_entretiens 
     WHERE id_unite_entretien = ue.id_unite_entretien 
     ORDER BY date_score DESC 
     LIMIT 1) AS score
FROM unite_entretiens ue
JOIN candidats c ON ue.id_candidat = c.id_candidat
JOIN tiers t ON c.id_tiers = t.id_tiers
JOIN annonces a ON c.id_annonce = a.id_annonce
JOIN postes p ON a.id_poste = p.id_poste
JOIN unites u ON ue.id_unite = u.id_unite
JOIN villes v ON t.id_ville = v.id_ville
JOIN genres g ON t.id_genre = g.id_genre
JOIN situation_matrimoniales sm ON t.id_situation_matrimoniale = sm.id_situation_matrimoniale;

-- 🔹 Vue pour les candidats éligibles pour suggestion RH
DROP VIEW IF EXISTS vue_candidats_eligibles_rh;
CREATE VIEW vue_candidats_eligibles_rh AS
SELECT 
    vuc.*,
    -- Langues du candidat
    STRING_AGG(DISTINCT l.valeur, ', ') AS langues,
    -- Qualités du candidat
    STRING_AGG(DISTINCT q.valeur, ', ') AS qualites
FROM vue_unite_entretiens_complet vuc
-- Langues
LEFT JOIN langue_tiers lt ON vuc.id_tiers = lt.id_tiers
LEFT JOIN langues l ON lt.id_langue = l.id_langue
-- Qualités
LEFT JOIN qualite_tiers qt ON vuc.id_tiers = qt.id_tiers
LEFT JOIN qualites q ON qt.id_qualite = q.id_qualite
WHERE 
    vuc.statut_entretien = 'Termine' 
    AND vuc.score >= 10
    -- Candidat pas encore suggéré
    AND NOT EXISTS (
        SELECT 1 FROM rh_suggestions rs 
        WHERE rs.id_candidat = vuc.id_candidat 
        AND rs.id_unite_entretien = vuc.id_unite_entretien
    )
GROUP BY 
    vuc.id_unite_entretien, vuc.id_candidat, vuc.id_unite, vuc.date_entretien, 
    vuc.duree, vuc.id_tiers, vuc.nom, vuc.prenom, vuc.email, vuc.contact, 
    vuc.date_naissance, vuc.age, vuc.cin, vuc.cv, vuc.ville, vuc.genre, 
    vuc.situation_matrimoniale, vuc.id_annonce, vuc.poste_nom, vuc.unite_nom, 
    vuc.statut_entretien, vuc.score;

-- 🔹 Vue pour les suggestions RH avec détails complets
DROP VIEW IF EXISTS vue_suggestions_rh_complet;
CREATE VIEW vue_suggestions_rh_complet AS
SELECT 
    rs.id_rh_suggestion,
    rs.id_unite_entretien,
    rs.id_candidat,
    rs.date_suggestion,
    -- Informations candidat
    t.nom AS nom_candidat,
    t.prenom AS prenom_candidat,
    t.email AS email_candidat,
    t.contact AS contact_candidat,
    c.cv,
    -- Informations localisation
    v.valeur AS ville,
    g.valeur AS genre,
    EXTRACT(YEAR FROM AGE(t.date_naissance)) AS age,
    -- Informations poste/unité
    p.valeur AS poste_nom,
    u.nom AS unite_nom,
    -- Détails entretien unité
    ue.date_entretien AS date_entretien_unite,
    ue.duree AS duree_entretien,
    (SELECT score 
     FROM score_unite_entretiens 
     WHERE id_unite_entretien = ue.id_unite_entretien 
     ORDER BY date_score DESC 
     LIMIT 1) AS score_unite,
    -- Statut suggestion (dernier statut)
    (SELECT tss.valeur 
     FROM status_rh_suggestions srs 
     JOIN type_status_suggestions tss ON srs.id_type_status_suggestion = tss.id_type_status_suggestion
     WHERE srs.id_rh_suggestion = rs.id_rh_suggestion 
     ORDER BY srs.date_changement DESC 
     LIMIT 1) AS status,
    -- Date du dernier changement de statut
    (SELECT srs.date_changement 
     FROM status_rh_suggestions srs 
     WHERE srs.id_rh_suggestion = rs.id_rh_suggestion 
     ORDER BY srs.date_changement DESC 
     LIMIT 1) AS date_changement_status,
    -- Informations entretien RH (s'il existe)
    re.date_entretien AS date_entretien_rh,
    (SELECT score 
     FROM score_rh_entretiens 
     WHERE id_rh_entretien = re.id_rh_entretien 
     ORDER BY date_score DESC 
     LIMIT 1) AS score_rh,
    (SELECT tse.valeur 
     FROM status_rh_entretiens sre 
     JOIN type_status_entretiens tse ON sre.id_type_status_entretien = tse.id_type_status_entretien
     WHERE sre.id_rh_entretien = re.id_rh_entretien 
     ORDER BY sre.date_changement DESC 
     LIMIT 1) AS statut_entretien_rh
FROM rh_suggestions rs
JOIN unite_entretiens ue ON rs.id_unite_entretien = ue.id_unite_entretien
JOIN candidats c ON rs.id_candidat = c.id_candidat
JOIN tiers t ON c.id_tiers = t.id_tiers
JOIN annonces a ON c.id_annonce = a.id_annonce
JOIN postes p ON a.id_poste = p.id_poste
JOIN unites u ON ue.id_unite = u.id_unite
JOIN villes v ON t.id_ville = v.id_ville
JOIN genres g ON t.id_genre = g.id_genre
LEFT JOIN rh_entretiens re ON rs.id_rh_suggestion = re.id_rh_suggestion;

-- 🔹 Vue pour les entretiens RH avec détails candidats (similaire à unite)
DROP VIEW IF EXISTS vue_rh_entretiens_complet;
CREATE VIEW vue_rh_entretiens_complet AS
SELECT 
    re.id_rh_entretien,
    re.id_rh_suggestion,
    re.id_candidat,
    re.date_entretien,
    re.duree,
    -- Informations candidat
    t.nom AS nom_candidat,
    t.prenom AS prenom_candidat,
    t.email,
    t.contact,
    c.cv,
    -- Informations localisation
    v.valeur AS ville,
    g.valeur AS genre,
    EXTRACT(YEAR FROM AGE(t.date_naissance)) AS age,
    -- Informations poste
    p.valeur AS poste_nom,
    -- Statut entretien RH (dernier statut)
    (SELECT tse.valeur 
     FROM status_rh_entretiens sre 
     JOIN type_status_entretiens tse ON sre.id_type_status_entretien = tse.id_type_status_entretien
     WHERE sre.id_rh_entretien = re.id_rh_entretien 
     ORDER BY sre.date_changement DESC 
     LIMIT 1) AS statut_entretien,
    -- Score entretien RH (s'il existe)
    (SELECT score 
     FROM score_rh_entretiens 
     WHERE id_rh_entretien = re.id_rh_entretien 
     ORDER BY date_score DESC 
     LIMIT 1) AS score,
    -- Informations sur l'entretien unité précédent
    ue.date_entretien AS date_entretien_unite,
    (SELECT score 
     FROM score_unite_entretiens 
     WHERE id_unite_entretien = rs.id_unite_entretien 
     ORDER BY date_score DESC 
     LIMIT 1) AS score_unite
FROM rh_entretiens re
JOIN rh_suggestions rs ON re.id_rh_suggestion = rs.id_rh_suggestion
JOIN unite_entretiens ue ON rs.id_unite_entretien = ue.id_unite_entretien
JOIN candidats c ON re.id_candidat = c.id_candidat
JOIN tiers t ON c.id_tiers = t.id_tiers
JOIN annonces a ON c.id_annonce = a.id_annonce
JOIN postes p ON a.id_poste = p.id_poste
JOIN villes v ON t.id_ville = v.id_ville
JOIN genres g ON t.id_genre = g.id_genre;

-- 🔹 Vue pour les candidats éligibles pour suggestion CEO
DROP VIEW IF EXISTS vue_candidats_eligibles_ceo;
CREATE VIEW vue_candidats_eligibles_ceo AS
SELECT 
    vrc.*
FROM vue_rh_entretiens_complet vrc
WHERE 
    vrc.statut_entretien = 'Termine' 
    AND vrc.score >= 15
    -- Candidat pas encore suggéré au CEO
    AND NOT EXISTS (
        SELECT 1 FROM ceo_suggestions cs 
        WHERE cs.id_candidat = vrc.id_candidat 
        AND cs.id_rh_entretien = vrc.id_rh_entretien
    );

-- 🔹 Vue pour les suggestions CEO avec détails complets
DROP VIEW IF EXISTS vue_suggestions_ceo_complet;
CREATE VIEW vue_suggestions_ceo_complet AS
SELECT 
    cs.id_ceo_suggestion,
    cs.id_rh_entretien,
    cs.id_candidat,
    cs.date_suggestion,
    -- Informations candidat
    t.nom AS nom_candidat,
    t.prenom AS prenom_candidat,
    t.email AS email_candidat,
    t.contact AS contact_candidat,
    c.cv,
    -- Informations localisation
    v.valeur AS ville,
    g.valeur AS genre,
    EXTRACT(YEAR FROM AGE(t.date_naissance)) AS age,
    -- Informations poste
    p.valeur AS poste_nom,
    -- Statut suggestion CEO (dernier statut)
    (SELECT tss.valeur 
     FROM status_ceo_suggestions scs 
     JOIN type_status_suggestions tss ON scs.id_type_status_suggestion = tss.id_type_status_suggestion
     WHERE scs.id_ceo_suggestion = cs.id_ceo_suggestion 
     ORDER BY scs.date_changement DESC 
     LIMIT 1) AS status,
    -- Date du dernier changement de statut
    (SELECT scs.date_changement 
     FROM status_ceo_suggestions scs 
     WHERE scs.id_ceo_suggestion = cs.id_ceo_suggestion 
     ORDER BY scs.date_changement DESC 
     LIMIT 1) AS date_changement_status,
    -- Scores des entretiens précédents
    (SELECT score 
     FROM score_unite_entretiens 
     WHERE id_unite_entretien = rs.id_unite_entretien 
     ORDER BY date_score DESC 
     LIMIT 1) AS score_unite,
    (SELECT score 
     FROM score_rh_entretiens 
     WHERE id_rh_entretien = re.id_rh_entretien 
     ORDER BY date_score DESC 
     LIMIT 1) AS score_rh,
    -- Dates des entretiens précédents
    ue.date_entretien AS date_entretien_unite,
    re.date_entretien AS date_entretien_rh
FROM ceo_suggestions cs
JOIN rh_entretiens re ON cs.id_rh_entretien = re.id_rh_entretien
JOIN rh_suggestions rs ON re.id_rh_suggestion = rs.id_rh_suggestion
JOIN unite_entretiens ue ON rs.id_unite_entretien = ue.id_unite_entretien
JOIN candidats c ON cs.id_candidat = c.id_candidat
JOIN tiers t ON c.id_tiers = t.id_tiers
JOIN annonces a ON c.id_annonce = a.id_annonce
JOIN postes p ON a.id_poste = p.id_poste
JOIN villes v ON t.id_ville = v.id_ville
JOIN genres g ON t.id_genre = g.id_genre;

-- 🔹 Indexes pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_unite_entretiens_date ON unite_entretiens(date_entretien);
CREATE INDEX IF NOT EXISTS idx_rh_entretiens_date ON rh_entretiens(date_entretien);
CREATE INDEX IF NOT EXISTS idx_rh_suggestions_candidat ON rh_suggestions(id_candidat);
CREATE INDEX IF NOT EXISTS idx_ceo_suggestions_candidat ON ceo_suggestions(id_candidat);
CREATE INDEX IF NOT EXISTS idx_score_unite_entretiens ON score_unite_entretiens(id_unite_entretien);
CREATE INDEX IF NOT EXISTS idx_score_rh_entretiens ON score_rh_entretiens(id_rh_entretien);

-- ===============================================
-- FIN DES VUES TSIKY
-- ===============================================