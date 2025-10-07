-- Création de la vue v_candidats manquante
-- Compatible avec le modèle Sequelize existant

DROP VIEW IF EXISTS v_candidats CASCADE;

CREATE VIEW v_candidats AS
SELECT 
    c.id_candidat,
    c.id_tiers,
    c.id_annonce,
    c.cv,
    
    -- Informations du tiers
    t.nom,
    t.prenom,
    t.date_naissance,
    EXTRACT(YEAR FROM AGE(t.date_naissance)) AS age,
    t.nombre_enfants,
    t.contact,
    t.email,
    t.cin,
    t.photo,
    
    -- Genre
    g.valeur AS genre,
    
    -- Situation matrimoniale  
    sm.valeur AS situation_matrimoniale,
    
    -- Ville
    v.valeur AS ville,
    
    -- Informations de l'annonce
    a.age_min,
    a.age_max,
    a.id_unite,
    
    -- Poste
    p.valeur AS poste,
    
    -- Unité
    u.nom AS unite_nom

FROM candidats c
JOIN tiers t ON c.id_tiers = t.id_tiers
JOIN genres g ON t.id_genre = g.id_genre
JOIN situation_matrimoniales sm ON t.id_situation_matrimoniale = sm.id_situation_matrimoniale
JOIN villes v ON t.id_ville = v.id_ville
JOIN annonces a ON c.id_annonce = a.id_annonce
JOIN postes p ON a.id_poste = p.id_poste
JOIN unites u ON a.id_unite = u.id_unite;

-- Restaurer l'ancienne configuration du modèle