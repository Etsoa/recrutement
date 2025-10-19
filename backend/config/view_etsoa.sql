-- ==========================================
-- VUES POUR SIMPLIFIER LES REQUÊTES COMPLEXES
-- ==========================================

-- Vue pour les annonces avec toutes leurs informations de base
CREATE OR REPLACE VIEW v_annonces_base AS
SELECT 
    a.id_annonce,
    p.valeur AS poste,
    v.valeur AS ville,
    a.age_min,
    a.age_max,
    g.valeur AS genre,
    u.nom AS unite,
    u.id_unite,
    -- Status actuel de l'annonce
    tsa.valeur AS status,
    sa.date_changement AS date_status
FROM annonces a
JOIN postes p ON a.id_poste = p.id_poste
JOIN villes v ON a.id_ville = v.id_ville
JOIN genres g ON a.id_genre = g.id_genre
JOIN unites u ON p.id_unite = u.id_unite
LEFT JOIN (
    SELECT DISTINCT ON (id_annonce) 
        id_annonce, 
        id_type_status_annonce, 
        date_changement
    FROM status_annonces 
    ORDER BY id_annonce, date_changement DESC
) sa ON a.id_annonce = sa.id_annonce
LEFT JOIN type_status_annonces tsa ON sa.id_type_status_annonce = tsa.id_type_status_annonce;

-- Vue pour les formations requises par annonce
CREATE OR REPLACE VIEW v_annonces_formations AS
SELECT 
    nfa.id_annonce,
    f.valeur AS filiere,
    n.valeur AS niveau,
    f.id_filiere,
    n.id_niveau
FROM niveau_filiere_annonces nfa
JOIN filieres f ON nfa.id_filiere = f.id_filiere
JOIN niveaux n ON nfa.id_niveau = n.id_niveau;

-- Vue pour les langues requises par annonce
CREATE OR REPLACE VIEW v_annonces_langues AS
SELECT 
    la.id_annonce,
    l.valeur AS langue,
    l.id_langue
FROM langue_annonces la
JOIN langues l ON la.id_langue = l.id_langue;

-- Vue pour les qualités requises par annonce
CREATE OR REPLACE VIEW v_annonces_qualites AS
SELECT 
    qa.id_annonce,
    q.valeur AS qualite,
    q.id_qualite
FROM qualite_annonces qa
JOIN qualites q ON qa.id_qualite = q.id_qualite;

-- Vue pour les expériences requises par annonce
CREATE OR REPLACE VIEW v_annonces_experiences AS
SELECT 
    ea.id_annonce,
    d.valeur AS domaine,
    ea.nombre_annee,
    d.id_domaine
FROM experience_annonces ea
JOIN domaines d ON ea.id_domaine = d.id_domaine;

-- Vue complète des annonces avec tous les détails
CREATE OR REPLACE VIEW v_annonces_complete AS
SELECT 
    ab.*,
    COALESCE(
        JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
                'filiere', af.filiere, 
                'niveau', af.niveau,
                'id_filiere', af.id_filiere,
                'id_niveau', af.id_niveau
            )
        ) FILTER (WHERE af.filiere IS NOT NULL), 
        '[]'::json
    ) AS formations_requises,
    COALESCE(
        JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
                'langue', al.langue,
                'id_langue', al.id_langue
            )
        ) FILTER (WHERE al.langue IS NOT NULL), 
        '[]'::json
    ) AS langues_requises,
    COALESCE(
        JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
                'qualite', aq.qualite,
                'id_qualite', aq.id_qualite
            )
        ) FILTER (WHERE aq.qualite IS NOT NULL), 
        '[]'::json
    ) AS qualites_requises,
    COALESCE(
        JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
                'domaine', ae.domaine, 
                'nombre_annee', ae.nombre_annee,
                'id_domaine', ae.id_domaine
            )
        ) FILTER (WHERE ae.domaine IS NOT NULL), 
        '[]'::json
    ) AS experiences_requises
FROM v_annonces_base ab
LEFT JOIN v_annonces_formations af ON ab.id_annonce = af.id_annonce
LEFT JOIN v_annonces_langues al ON ab.id_annonce = al.id_annonce
LEFT JOIN v_annonces_qualites aq ON ab.id_annonce = aq.id_annonce
LEFT JOIN v_annonces_experiences ae ON ab.id_annonce = ae.id_annonce
GROUP BY 
    ab.id_annonce, ab.poste, ab.ville, ab.age_min, ab.age_max, 
    ab.genre, ab.unite, ab.id_unite, ab.status, ab.date_status;

-- Vue pour les tiers avec toutes leurs informations
CREATE OR REPLACE VIEW v_tiers_complete AS
SELECT 
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
    -- Formations du tiers
    COALESCE(
        JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
                'filiere', f.valeur, 
                'niveau', n.valeur,
                'id_filiere', f.id_filiere,
                'id_niveau', n.id_niveau
            )
        ) FILTER (WHERE f.valeur IS NOT NULL), 
        '[]'::json
    ) AS formations,
    -- Langues du tiers
    COALESCE(
        JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
                'langue', l.valeur,
                'id_langue', l.id_langue
            )
        ) FILTER (WHERE l.valeur IS NOT NULL), 
        '[]'::json
    ) AS langues,
    -- Qualités du tiers
    COALESCE(
        JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
                'qualite', q.valeur,
                'id_qualite', q.id_qualite
            )
        ) FILTER (WHERE q.valeur IS NOT NULL), 
        '[]'::json
    ) AS qualites,
    -- Expériences du tiers
    COALESCE(
        JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
                'domaine', d.valeur, 
                'date_debut', et.date_debut,
                'date_fin', et.date_fin,
                'nombre_annee', CASE 
                    WHEN et.date_fin IS NOT NULL THEN 
                        EXTRACT(YEAR FROM et.date_fin) - EXTRACT(YEAR FROM et.date_debut)
                    ELSE 
                        EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM et.date_debut)
                END,
                'id_domaine', d.id_domaine
            )
        ) FILTER (WHERE d.valeur IS NOT NULL), 
        '[]'::json
    ) AS experiences
FROM tiers t
JOIN genres g ON t.id_genre = g.id_genre
JOIN situation_matrimoniales sm ON t.id_situation_matrimoniale = sm.id_situation
JOIN villes v ON t.id_ville = v.id_ville
LEFT JOIN niveau_filiere_tiers nft ON t.id_tiers = nft.id_tiers
LEFT JOIN filieres f ON nft.id_filiere = f.id_filiere
LEFT JOIN niveaux n ON nft.id_niveau = n.id_niveau
LEFT JOIN langue_tiers lt ON t.id_tiers = lt.id_tiers
LEFT JOIN langues l ON lt.id_langue = l.id_langue
LEFT JOIN qualite_tiers qt ON t.id_tiers = qt.id_tiers
LEFT JOIN qualites q ON qt.id_qualite = q.id_qualite
LEFT JOIN experience_tiers et ON t.id_tiers = et.id_tiers
LEFT JOIN domaines d ON et.id_domaine = d.id_domaine
GROUP BY 
    t.id_tiers, t.nom, t.prenom, t.date_naissance, t.nombre_enfants,
    t.contact, t.email, t.cin, t.photo, g.valeur, sm.valeur, v.valeur;

-- Vue pour les candidats avec informations complètes
CREATE OR REPLACE VIEW v_candidats_complete AS
SELECT 
    c.id_candidat,
    c.cv,
    tc.*,
    ab.poste,
    ab.unite,
    ab.ville AS ville_annonce,
    ab.status AS status_annonce
FROM candidats c
JOIN v_tiers_complete tc ON c.id_tiers = tc.id_tiers
JOIN v_annonces_base ab ON c.id_annonce = ab.id_annonce;

-- Vue pour les questions QCM avec leurs réponses
CREATE OR REPLACE VIEW v_questions_qcm_complete AS
SELECT 
    qq.id_question_qcm,
    qq.intitule,
    JSON_AGG(
        JSONB_BUILD_OBJECT(
            'id_reponse_qcm', rq.id_reponse_qcm,
            'reponse', rq.reponse,
            'modalite', rq.modalite
        ) ORDER BY rq.id_reponse_qcm
    ) AS reponses
FROM question_qcms qq
JOIN reponse_qcms rq ON qq.id_question_qcm = rq.id_question_qcm
GROUP BY qq.id_question_qcm, qq.intitule;

-- Vue pour les QCM d'une annonce spécifique
CREATE OR REPLACE VIEW v_qcm_par_annonce AS
SELECT 
    qa.id_annonce,
    qc.id_question_qcm,
    qc.intitule,
    qc.reponses
FROM qcm_annonces qa
JOIN v_questions_qcm_complete qc ON qa.id_question_qcm = qc.id_question_qcm;

-- Vue pour l'envoi de QCM avec informations candidat
CREATE OR REPLACE VIEW v_envoi_qcm_complete AS
SELECT
    eqc.id_envoi_qcm_candidat,
    eqc.lien,
    eqc.token,
    eqc.date_envoi,
    cc.nom,
    cc.prenom,
    cc.email,
    cc.poste,
    c.id_annonce,
    cc.id_candidat
FROM envoi_qcm_candidats eqc
JOIN candidats c ON eqc.id_candidat = c.id_candidat
JOIN v_candidats_complete cc ON eqc.id_candidat = cc.id_candidat;-- Vue pour les résultats QCM
CREATE OR REPLACE VIEW v_resultats_qcm AS
SELECT 
    rqc.id_reponse_qcm_candidat,
    eqc.token,
    cc.nom,
    cc.prenom,
    cc.email,
    cc.poste,
    cc.id_candidat,
    rqc.debut,
    rqc.fin,
    rqc.duree,
    rqc.score,
    COUNT(*) AS total_questions,
    AVG(CASE WHEN rqc.score > 0 THEN 1 ELSE 0 END) * 100 AS pourcentage_reussite
FROM reponse_qcm_candidats rqc
JOIN envoi_qcm_candidats eqc ON rqc.id_envoi_qcm_candidat = eqc.id_envoi_qcm_candidat
JOIN v_candidats_complete cc ON eqc.id_candidat = cc.id_candidat
GROUP BY 
    rqc.id_reponse_qcm_candidat, eqc.token, cc.nom, cc.prenom, 
    cc.email, cc.poste, cc.id_candidat, rqc.debut, rqc.fin, 
    rqc.duree, rqc.score;

-- Vue pour les paramètres système
CREATE OR REPLACE VIEW v_parametres_systeme AS
SELECT 
    'delai_entretien' AS parametre,
    valeur::text AS valeur
FROM delai_entretien
UNION ALL
SELECT 
    'score_minimum_entretien' AS parametre,
    valeur::text AS valeur
FROM score_minimum_entretien
UNION ALL
SELECT 
    'delai_qcm' AS parametre,
    valeur::text AS valeur
FROM delai_qcm
UNION ALL
SELECT 
    'score_minimum_qcm' AS parametre,
    valeur::text AS valeur
FROM score_minimum_qcm
UNION ALL
SELECT 
    'pourcentage_minimum_cv' AS parametre,
    valeur::text AS valeur
FROM pourcentage_minimum_cv
UNION ALL
SELECT 
    'adresse_mail' AS parametre,
    valeur::text AS valeur
FROM adresse_mail;

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_annonces_status ON status_annonces(id_annonce, date_changement DESC);
CREATE INDEX IF NOT EXISTS idx_tiers_cin ON tiers(cin);
CREATE INDEX IF NOT EXISTS idx_candidats_annonce ON candidats(id_annonce);
CREATE INDEX IF NOT EXISTS idx_envoi_qcm_token ON envoi_qcm_candidats(token);

-- Vue pour les jours fériés et horaires ouvrés
CREATE OR REPLACE VIEW v_horaires_travail AS
SELECT 
    jf.date_ferie,
    jf.description AS description_ferie,
    ho.heure_debut,
    ho.heure_fin
FROM jours_feries jf
CROSS JOIN horaires_ouvres ho;
