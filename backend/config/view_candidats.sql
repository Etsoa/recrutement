-- Vue pour les candidats avec informations complètes
-- Conforme au schéma de table.sql

CREATE OR REPLACE VIEW v_candidats AS
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
JOIN situation_matrimoniales sm ON t.id_situation_matrimoniale = sm.id_situation
JOIN villes v ON t.id_ville = v.id_ville
JOIN annonces a ON c.id_annonce = a.id_annonce
JOIN postes p ON a.id_poste = p.id_poste
JOIN unites u ON a.id_unite = u.id_unite;

-- Vue pour les détails candidats avec langues, qualités, expériences
CREATE OR REPLACE VIEW view_candidats_details AS
SELECT 
    c.id_candidat,
    c.id_annonce,
    c.id_tiers,
    t.nom,
    t.prenom,
    t.date_naissance,
    EXTRACT(YEAR FROM AGE(t.date_naissance)) AS age,
    t.id_genre,
    t.id_ville,
    
    -- Langues (ID pour jointure)
    lt.id_langue,
    
    -- Domaines d'expérience (ID pour jointure)
    et.id_domaine,
    
    -- Niveau d'éducation
    n.valeur AS niveau,
    
    -- Années d'expérience calculées
    EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) AS experience_annees

FROM candidats c
JOIN tiers t ON c.id_tiers = t.id_tiers
LEFT JOIN langue_tiers lt ON t.id_tiers = lt.id_tiers
LEFT JOIN experience_tiers et ON t.id_tiers = et.id_tiers
LEFT JOIN niveau_filiere_tiers nft ON t.id_tiers = nft.id_tiers
LEFT JOIN niveaux n ON nft.id_niveau = n.id_niveau;