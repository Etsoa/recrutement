CREATE OR REPLACE VIEW vue_rh AS
SELECT 
       e.id_employe,
       t.email,
       t.nom,
       t.prenom,
       p.id_poste,
       p.valeur AS poste,
       u.id_unite,
       u.nom AS unite,
       u.mot_de_passe
FROM employes e
JOIN tiers t ON e.id_tiers = t.id_tiers
JOIN postes p ON e.id_poste = p.id_poste
JOIN unites u ON p.id_unite = u.id_unite
WHERE u.nom = 'Ressources Humaines'
  AND p.valeur = 'Responsable RH';


CREATE OR REPLACE VIEW rh_entretiens_view AS
WITH last_scores AS (
    SELECT DISTINCT ON (id_rh_entretien)
        id_rh_entretien,
        score,
        date_score
    FROM score_rh_entretiens
    ORDER BY id_rh_entretien, date_score DESC
)
SELECT
    r.id_rh_entretien,
    r.date_entretien,
    r.duree,
    c.id_candidat,
    t.nom AS nom_candidat,
    t.prenom AS prenom_candidat,
    rh.id_rh_suggestion,
    rh.id_unite_entretien,
    rh.date_suggestion,
    s.id_type_status_entretien,
    tse.valeur AS statut,
    s.date_changement AS status_date,
    ls.score AS dernier_score,
    ls.date_score AS date_dernier_score
FROM rh_entretiens r
JOIN candidats c ON r.id_candidat = c.id_candidat
JOIN tiers t ON c.id_tiers = t.id_tiers
LEFT JOIN status_rh_entretiens s ON r.id_rh_entretien = s.id_rh_entretien
LEFT JOIN type_status_entretiens tse ON s.id_type_status_entretien = tse.id_type_status_entretien
LEFT JOIN rh_suggestions rh ON r.id_rh_suggestion = rh.id_rh_suggestion
LEFT JOIN last_scores ls ON r.id_rh_entretien = ls.id_rh_entretien;

CREATE OR REPLACE VIEW ceo_suggestions_view AS
SELECT 
    cs.id_ceo_suggestion,
    cs.id_rh_entretien,
    cs.id_candidat,
    t.nom AS nom_candidat,
    t.prenom AS prenom_candidat,
    cs.date_suggestion,
    ts.id_type_status_suggestion,
    ts.valeur AS statut,
    scs.date_changement AS statut_date
FROM ceo_suggestions cs
JOIN candidats c ON cs.id_candidat = c.id_candidat
JOIN tiers t ON c.id_tiers = t.id_tiers
LEFT JOIN status_ceo_suggestions scs ON cs.id_ceo_suggestion = scs.id_ceo_suggestion
LEFT JOIN type_status_suggestions ts ON scs.id_type_status_suggestion = ts.id_type_status_suggestion;
