CREATE VIEW vue_rh AS
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
WHERE u.nom = 'Ressources Humaines';
