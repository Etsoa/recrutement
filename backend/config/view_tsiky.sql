CREATE OR REPLACE VIEW v_annonces_complet AS
SELECT 
    a.id_annonce,
    a.age_min,
    a.age_max,

    -- Liens vers les tables de référence
    p.nom_poste,
    v.nom_ville,
    g.nom_genre,

    -- Status (peut y avoir plusieurs, on prend le plus récent via subquery ou aggregation si besoin)
    sa.id_status_annonce,
    sa.date_changement AS status_date,
    tsa.nom_type_status_annonce,
    u.nom_unite,

    -- QCM
    qa.id_qcm_annonce,
    qq.intitule_question,

    -- Niveau, filière
    nfa.id_niveau_filiere_annonce,
    f.nom_filiere,
    n.nom_niveau,

    -- Langues
    la.id_langue_annonce,
    l.nom_langue,

    -- Qualités
    qa2.id_qualite_annonce,
    q.nom_qualite,

    -- Expérience
    ea.id_experience_annonce,
    d.nom_domaine,
    ea.nombre_annee
FROM annonces a
LEFT JOIN postes p ON a.id_poste = p.id_poste
LEFT JOIN villes v ON a.id_ville = v.id_ville
LEFT JOIN genres g ON a.id_genre = g.id_genre

LEFT JOIN status_annonces sa ON sa.id_annonce = a.id_annonce
LEFT JOIN type_status_annonces tsa ON sa.id_type_status_annonce = tsa.id_type_status
LEFT JOIN unites u ON sa.id_unite = u.id_unite

LEFT JOIN qcm_annonces qa ON qa.id_annonce = a.id_annonce
LEFT JOIN question_qcms qq ON qa.id_question_qcm = qq.id_question

LEFT JOIN niveau_filiere_annonces nfa ON nfa.id_annonce = a.id_annonce
LEFT JOIN filieres f ON nfa.id_filiere = f.id_filiere
LEFT JOIN niveaux n ON nfa.id_niveau = n.id_niveau

LEFT JOIN langue_annonces la ON la.id_annonce = a.id_annonce
LEFT JOIN langues l ON la.id_langue = l.id_langue

LEFT JOIN qualite_annonces qa2 ON qa2.id_annonce = a.id_annonce
LEFT JOIN qualites q ON qa2.id_qualite = q.id_qualite

LEFT JOIN experience_annonce ea ON ea.id_annonce = a.id_annonce
LEFT JOIN domaines d ON ea.id_domaine = d.id_domaine;




CREATE OR REPLACE VIEW v_candidats_complet AS
SELECT 
    -- Identité du tiers
    t.id_tiers,
    t.nom,
    t.prenom,
    t.date_naissance,
    g.nom_genre,
    sm.valeur AS situation_matrimoniale,
    t.nombre_enfants,
    t.contact,
    t.email,
    t.cin,
    v.nom_ville,
    t.photo,

    -- Filière et niveau
    f.nom_filiere,
    n.nom_niveau,

    -- Langues (concaténation possible)
    l.nom_langue,

    -- Qualités
    q.nom_qualite,

    -- Expériences
    d.nom_domaine,
    et.nombre_annee AS experience_annee,

    -- Candidature
    c.id_candidat,
    c.cv,
    a.id_annonce,

    -- Entretiens unité et score
    ue.id_unite_entretien,
    u.nom_unite,
    ue.date_entretien AS date_entretien_unite,
    sue.score AS score_unite,
    sue.date_score,

    -- Suggestions RH
    rs.id_rh_suggestion,
    rs.date_suggestion,
    trs.valeur AS status_suggestion,
    srs.date_changement AS date_status_suggestion

FROM tiers t
LEFT JOIN genres g ON t.id_genre = g.id_genre
LEFT JOIN situation_matrimoniales sm ON t.id_situation_matrimoniale = sm.id_situation
LEFT JOIN villes v ON t.id_ville = v.id_ville

LEFT JOIN niveau_filiere_tiers nft ON t.id_tiers = nft.id_tiers
LEFT JOIN filieres f ON nft.id_filiere = f.id_filiere
LEFT JOIN niveaux n ON nft.id_niveau = n.id_niveau

LEFT JOIN langue_tiers lt ON t.id_tiers = lt.id_tiers
LEFT JOIN langues l ON lt.id_langue = l.id_langue

LEFT JOIN qualite_tiers qt ON t.id_tiers = qt.id_tiers
LEFT JOIN qualites q ON qt.id_qualite = q.id_qualite

LEFT JOIN experience_tiers et ON t.id_tiers = et.id_tiers
LEFT JOIN domaines d ON et.id_domaine = d.id_domaine

LEFT JOIN candidats c ON t.id_tiers = c.id_tiers
LEFT JOIN annonces a ON c.id_annonce = a.id_annonce

LEFT JOIN unite_entretiens ue ON c.id_candidat = ue.id_candidat
LEFT JOIN unites u ON ue.id_unite = u.id_unite
LEFT JOIN score_unite_entretiens sue ON ue.id_unite_entretien = sue.id_unite_entretien

LEFT JOIN rh_suggestions rs ON ue.id_unite_entretien = rs.id_unite_entretien
LEFT JOIN status_rh_suggestions srs ON rs.id_rh_suggestion = srs.id_rh_suggestion
LEFT JOIN type_status_suggestions trs ON srs.id_type_status_suggestion = trs.id;
