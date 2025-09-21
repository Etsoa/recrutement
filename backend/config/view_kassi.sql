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
