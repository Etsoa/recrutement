-- 1️⃣ Ajouter le tiers pour le Directeur Général
INSERT INTO tiers (
    nom, prenom, date_naissance, 
    id_genre, 
    id_situation_matrimoniale, 
    nombre_enfants, contact, email, cin, 
    id_ville, 
    photo
) VALUES (
    'Rabe', 'Paul', '1980-03-15', 
    1, 
    2, 
    2, '0321112233', 'paul.rabe@email.com', 'CC987654',
    1, 
    'photo_dg.jpg'
)
RETURNING id_tiers;

-- Supposons que ça retourne id_tiers = 3

-- 2️⃣ Créer l’employé Directeur Général
INSERT INTO employes (id_tiers, id_type_status_employe, id_poste)
VALUES (3, 1, 1)  -- 1 = Actif dans type_status_employes, 1 = Directeur Général dans postes
RETURNING id_employe;

---

INSERT INTO rh_entretiens (id_rh_suggestion, id_candidat, date_entretien, duree)
VALUES (1, 1, '2025-09-19', 45)
RETURNING id_rh_entretien;
-- id_rh_entretien = 1

INSERT INTO ceo_suggestions (id_rh_entretien, id_candidat, id_type_status_suggestion, date_suggestion)
VALUES (1, 1, 1, '2025-09-20')
RETURNING id_ceo_suggestion;
-- id_ceo_suggestion = 1

INSERT INTO status_ceo_suggestions (id_ceo_suggestion, id_type_status_suggestion, date_changement)
VALUES (2, 1, '2025-09-20');
-- Mety mipoaka ito iray ito arakarak'le data sy niseho tam'le id