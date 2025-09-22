CREATE OR REPLACE VIEW view_annonces_complet AS
SELECT 
    a.id_annonce,
    a.age_min,
    a.age_max,
    g.valeur AS genre,
    v.valeur AS ville,
    p.valeur AS poste,
    u.nom AS unite,
    u.mot_de_passe AS unite_mdp
FROM annonces a
LEFT JOIN genres g ON a.id_genre = g.id_genre
LEFT JOIN villes v ON a.id_ville = v.id_ville
LEFT JOIN postes p ON a.id_poste = p.id_poste
LEFT JOIN unites u ON p.id_unite = u.id_unite;

CREATE OR REPLACE VIEW vue_annonces_complete AS
SELECT 
    a.id_annonce,
    p.valeur AS poste,
    v.valeur AS ville,
    a.age_min,
    a.age_max,
    g.valeur AS genre,
    tsa.valeur AS type_status,
    sa.date_changement,
    u.nom AS unite_nom,
    -- Regrouper filieres/niveaux
    STRING_AGG(DISTINCT f.valeur || ' (' || n.valeur || ')', ', ') AS filieres_niveaux,
    -- Regrouper langues
    STRING_AGG(DISTINCT l.valeur, ', ') AS langues,
    -- Regrouper qualites
    STRING_AGG(DISTINCT q.valeur, ', ') AS qualites,
    -- Regrouper expériences
    STRING_AGG(DISTINCT d.valeur || ' (' || ea.nombre_annee || ' ans)', ', ') AS experiences
FROM annonces a
LEFT JOIN postes p ON p.id_poste = a.id_poste
LEFT JOIN villes v ON v.id_ville = a.id_ville
LEFT JOIN genres g ON g.id_genre = a.id_genre
LEFT JOIN status_annonce sa ON sa.id_annonce = a.id_annonce
LEFT JOIN type_status_annonces tsa ON tsa.id_type_status = sa.id_type_status_annonce
LEFT JOIN unites u ON u.id_unite = sa.id_unite
LEFT JOIN niveau_filiere_annonces nfa ON nfa.id_annonce = a.id_annonce
LEFT JOIN filieres f ON f.id_filiere = nfa.id_filiere
LEFT JOIN niveaux n ON n.id_niveau = nfa.id_niveau
LEFT JOIN langue_annonces la ON la.id_annonce = a.id_annonce
LEFT JOIN langues l ON l.id_langue = la.id_langue
LEFT JOIN qualite_annonces qa ON qa.id_annonce = a.id_annonce
LEFT JOIN qualites q ON q.id_qualite = qa.id_qualite
LEFT JOIN experience_annonce ea ON ea.id_annonce = a.id_annonce
LEFT JOIN domaines d ON d.id_domaine = ea.id_domaine
GROUP BY a.id_annonce, p.valeur, v.valeur, a.age_min, a.age_max, g.valeur, tsa.valeur, sa.date_changement, u.nom;

CREATE OR REPLACE VIEW vue_status_annonces AS
SELECT 
    sa.id_status_annonce,
    sa.date_changement,
    -- Info annonce
    a.id_annonce,
    p.valeur AS poste,
    v.valeur AS ville,
    a.age_min,
    a.age_max,
    g.valeur AS genre,
    -- Type status
    tsa.valeur AS type_status,
    -- Unite
    u.nom AS unite_nom
FROM status_annonce sa
LEFT JOIN annonces a ON a.id_annonce = sa.id_annonce
LEFT JOIN postes p ON p.id_poste = a.id_poste
LEFT JOIN villes v ON v.id_ville = a.id_ville
LEFT JOIN genres g ON g.id_genre = a.id_genre
LEFT JOIN type_status_annonces tsa ON tsa.id_type_status = sa.id_type_status_annonce
LEFT JOIN unites u ON u.id_unite = sa.id_unite;

CREATE OR REPLACE VIEW vue_detail_qcm AS
SELECT 
    a.id_annonce,
    qa.id_qcm_annonce,
    q.id_question_qcm,
    q.intitule AS question,
    r.id_reponse_qcm,
    r.reponse,
    r.modalite
FROM annonces a
JOIN qcm_annonces qa ON qa.id_annonce = a.id_annonce
JOIN question_qcms q ON q.id_question_qcm = qa.id_question_qcm
LEFT JOIN reponse_qcms r ON r.id_question_qcm = q.id_question_qcm
ORDER BY a.id_annonce, q.id_question_qcm, r.id_reponse_qcm;


-- new 
CREATE OR REPLACE VIEW view_candidats_details AS
SELECT 
    c.id_candidat,
    c.id_annonce,
    t.id_tiers,
    t.nom,
    t.prenom,
    t.date_naissance,
    EXTRACT(YEAR FROM AGE(NOW(), t.date_naissance)) AS age,
    t.id_genre,
    t.id_ville,
    lt.id_langue,
    et.id_domaine,
    n.valeur AS niveau,
    EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) AS experience_annees
FROM candidats c
LEFT JOIN tiers t ON c.id_tiers = t.id_tiers
LEFT JOIN langue_tiers lt ON t.id_tiers = lt.id_tiers
LEFT JOIN experience_tiers et ON t.id_tiers = et.id_tiers
LEFT JOIN niveau_filiere_tiers nft ON t.id_tiers = nft.id_tiers
LEFT JOIN niveaux n ON nft.id_niveau = n.id_niveau;


CREATE OR REPLACE VIEW v_candidats AS
SELECT
    c.id_candidat,
    t.id_tiers,
    t.nom,
    t.prenom,
    t.date_naissance,
    EXTRACT(YEAR FROM AGE(t.date_naissance)) AS age,
    g.valeur AS genre,
    sm.valeur AS situation_matrimoniale,
    t.nombre_enfants,
    t.contact,
    t.email,
    t.cin,
    v.valeur AS ville,
    t.photo,
    c.cv,
    c.id_annonce
FROM candidats c
JOIN tiers t ON c.id_tiers = t.id_tiers
LEFT JOIN genres g ON t.id_genre = g.id_genre
LEFT JOIN situation_matrimoniales sm ON t.id_situation_matrimoniale = sm.id_situation
LEFT JOIN villes v ON t.id_ville = v.id_ville;