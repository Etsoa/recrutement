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

-- Lava lesy ity vue iray ity
CREATE OR REPLACE VIEW vue_ceo_employes AS
SELECT 
       e.id_employe,

       t.id_tiers,
       t.nom,
       t.prenom,
       t.date_naissance,
       t.nombre_enfants,
       t.contact,
       t.email,
       t.cin,
       t.photo,
       
       t.id_genre,
       g.valeur AS genre,
       
       t.id_situation_matrimoniale,
       sm.valeur AS situation_matrimoniale,
       
       t.id_ville,
       v.valeur AS ville,

       e.id_type_status_employe,
       tse.valeur AS type_status_employe,

       e.id_poste,
       p.valeur AS poste,

       p.id_unite,
       u.nom AS unite
FROM employes e
JOIN tiers t ON e.id_tiers = t.id_tiers
JOIN genres g ON t.id_genre = g.id_genre
JOIN situation_matrimoniales sm ON t.id_situation_matrimoniale = sm.id_situation
JOIN villes v ON t.id_ville = v.id_ville
JOIN type_status_employes tse ON e.id_type_status_employe = tse.id_type_status_employe
JOIN postes p ON e.id_poste = p.id_poste
JOIN unites u ON p.id_unite = u.id_unite;
