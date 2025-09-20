CREATE OR REPLACE VIEW vue_ceo AS
SELECT 
       e.id_employe,
       t.nom,
       t.prenom,
       t.email,
       p.id_poste,
       p.valeur AS poste,
       u.id_unite,
       u.nom AS unite,
       u.mot_de_passe,
       tse.id_type_status_employe AS id_type_status_employe,
       tse.valeur AS type_status_employe
FROM employes e
JOIN type_status_employes tse ON e.id_type_status_employe = tse.id_type_status_employe
JOIN tiers t ON e.id_tiers = t.id_tiers
JOIN postes p ON e.id_poste = p.id_poste
JOIN unites u ON p.id_unite = u.id_unite
WHERE 
u.nom = 'Direction Generale';
