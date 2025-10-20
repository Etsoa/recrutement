-- ===============================================
-- DONNEES POUR ENVOI QCM ET REPONSES QCM
-- Pour les candidats NON ENCORE EMPLOYES
-- ===============================================

-- Note: Les id_candidat correspondent aux candidats de data_coherent.sql qui ne sont pas encore employes
-- id_candidat=1 (Paul Andry, id_tiers=4) est deja employe, donc exclu
-- Les candidats non employes sont:
-- id_candidat=2 (Miora, id_tiers=5) - Annonce 1 (Comptable Junior)
-- id_candidat=3 (Hery, id_tiers=6) - Annonce 1 (Comptable Junior)
-- id_candidat=5 (Aina, id_tiers=8) - Annonce 2 (Developpeur)
-- id_candidat=6 (Soa, id_tiers=7) - Annonce 2 (Developpeur)   
-- id_candidat=7 (Hery, id_tiers=6) - Annonce 3 (Responsable Marketing)

-- ===============================================
-- 1. ENVOI QCM CANDIDATS
-- ===============================================

-- Candidat 2 - Miora (Bon candidat pour Comptable Junior)
INSERT INTO envoi_qcm_candidats (id_candidat, lien, token, date_envoi) 
VALUES (2, 'http://localhost:3000/qcm/TOKEN456DEF', 'TOKEN456DEF', '2025-01-15 10:00:00');

-- Candidat 3 - Hery (Candidat moyen pour Comptable Junior)
INSERT INTO envoi_qcm_candidats (id_candidat, lien, token, date_envoi) 
VALUES (3, 'http://localhost:3000/qcm/TOKEN789GHI', 'TOKEN789GHI', '2025-01-15 10:30:00');

-- Candidat 5 - Aina (Candidat technique pour Developpeur)
INSERT INTO envoi_qcm_candidats (id_candidat, lien, token, date_envoi) 
VALUES (5, 'http://localhost:3000/qcm/TOKENAINA123', 'TOKENAINA123', '2025-01-16 09:00:00');

-- Candidat 6 - Soa (Candidat faible pour Developpeur)
INSERT INTO envoi_qcm_candidats (id_candidat, lien, token, date_envoi) 
VALUES (6, 'http://localhost:3000/qcm/TOKENSOA456', 'TOKENSOA456', '2025-01-16 09:30:00');

-- Candidat 7 - Hery (Candidat moyen pour Responsable Marketing)
INSERT INTO envoi_qcm_candidats (id_candidat, lien, token, date_envoi) 
VALUES (7, 'http://localhost:3000/qcm/TOKENHERYMKT', 'TOKENHERYMKT', '2025-01-17 10:00:00');

-- ===============================================
-- 2. REPONSES QCM CANDIDATS
-- ===============================================

-- Note: La structure reponse_qcm_candidats dans table.sql est:
-- id_reponse_qcm_candidat, id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score

-- Les id_qcm_annonce correspondent aux questions affectees aux annonces dans data_coherent:
-- Annonce 1 (Comptable Junior): questions 1, 2, 3 -> id_qcm_annonce 1, 2, 3
-- Annonce 2 (Developpeur): questions 1, 4, 5 -> id_qcm_annonce 4, 5, 6
-- Annonce 3 (Responsable Marketing): questions 1, 2, 3, 4 -> id_qcm_annonce 7, 8, 9, 10

-- Système de scoring:
-- - Chaque question correcte = +3 points
-- - Chaque question incorrecte = -1 point
-- - Question non repondue = 0 point
-- Score minimum requis = 15 points (selon data_coherent)

-- -----------------------------------------------
-- Candidat 2 - Miora (Bon candidat pour Comptable Junior)
-- Annonce 1 a 3 questions (id_qcm_annonce 1, 2, 3)
-- Score: 2 bonnes (6 points), 1 mauvaise (-1 point) = 5 points sur 9 possibles
-- Durée QCM: 15 minutes
-- -----------------------------------------------

-- Question 1: Capitale de Madagascar - CORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (1, 1, '2025-01-15 14:00:00', '2025-01-15 14:15:00', 15, 3);

-- Question 2: Couleurs du drapeau - CORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (1, 2, '2025-01-15 14:00:00', '2025-01-15 14:15:00', 15, 3);

-- Question 3: Annee d'independance - INCORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (1, 3, '2025-01-15 14:00:00', '2025-01-15 14:15:00', 15, -1);

-- Score total Miora: 5 points (en dessous du minimum de 15)

-- -----------------------------------------------
-- Candidat 3 - Hery (Candidat moyen pour Comptable Junior)
-- Annonce 1 a 3 questions (id_qcm_annonce 1, 2, 3)
-- Score: 1 bonne (3 points), 2 mauvaises (-2 points) = 1 point sur 9 possibles
-- Durée QCM: 20 minutes
-- -----------------------------------------------

-- Question 1: Capitale de Madagascar - CORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (2, 1, '2025-01-15 15:00:00', '2025-01-15 15:20:00', 20, 3);

-- Question 2: Couleurs du drapeau - INCORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (2, 2, '2025-01-15 15:00:00', '2025-01-15 15:20:00', 20, -1);

-- Question 3: Annee d'independance - INCORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (2, 3, '2025-01-15 15:00:00', '2025-01-15 15:20:00', 20, -1);

-- Score total Hery: 1 point (en dessous du minimum de 15)

-- -----------------------------------------------
-- Candidat 5 - Aina (Candidat technique pour Developpeur)
-- Annonce 2 a 3 questions (id_qcm_annonce 4, 5, 6)
-- Score: 3 bonnes (9 points) = 9 points sur 9 possibles
-- Durée QCM: 12 minutes
-- -----------------------------------------------

-- Question 1: Capitale de Madagascar - CORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (3, 4, '2025-01-16 11:00:00', '2025-01-16 11:12:00', 12, 3);

-- Question 4: Monnaie malgache - CORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (3, 5, '2025-01-16 11:00:00', '2025-01-16 11:12:00', 12, 3);

-- Question 5: Langue officielle - CORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (3, 6, '2025-01-16 11:00:00', '2025-01-16 11:12:00', 12, 3);

-- Score total Aina: 9 points (en dessous du minimum de 15)

-- -----------------------------------------------
-- Candidat 6 - Soa (Candidat faible pour Developpeur)
-- Annonce 2 a 3 questions (id_qcm_annonce 4, 5, 6)
-- Score: 0 bonne, 3 mauvaises (-3 points) = -3 points
-- Durée QCM: 25 minutes
-- -----------------------------------------------

-- Question 1: Capitale de Madagascar - INCORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (4, 4, '2025-01-16 13:00:00', '2025-01-16 13:25:00', 25, -1);

-- Question 4: Monnaie malgache - INCORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (4, 5, '2025-01-16 13:00:00', '2025-01-16 13:25:00', 25, -1);

-- Question 5: Langue officielle - INCORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (4, 6, '2025-01-16 13:00:00', '2025-01-16 13:25:00', 25, -1);

-- Score total Soa: -3 points (en dessous du minimum de 15)

-- -----------------------------------------------
-- Candidat 7 - Hery pour Marketing (Candidat moyen)
-- Annonce 3 a 4 questions (id_qcm_annonce 7, 8, 9, 10)
-- Score: 2 bonnes (6 points), 2 mauvaises (-2 points) = 4 points sur 12 possibles
-- Durée QCM: 18 minutes
-- -----------------------------------------------

-- Question 1: Capitale de Madagascar - CORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (5, 7, '2025-01-17 14:00:00', '2025-01-17 14:18:00', 18, 3);

-- Question 2: Couleurs du drapeau - INCORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (5, 8, '2025-01-17 14:00:00', '2025-01-17 14:18:00', 18, -1);

-- Question 3: Annee d'independance - CORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (5, 9, '2025-01-17 14:00:00', '2025-01-17 14:18:00', 18, 3);

-- Question 4: Monnaie malgache - INCORRECTE
INSERT INTO reponse_qcm_candidats (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, score) 
VALUES (5, 10, '2025-01-17 14:00:00', '2025-01-17 14:18:00', 18, -1);

-- Score total Hery (Marketing): 4 points (en dessous du minimum de 15)

-- ===============================================
-- RESUME DES SCORES
-- ===============================================
-- Candidat 2 - Miora (Comptable):        5 points  / 9  possible (55.6%) - ECHEC
-- Candidat 3 - Hery (Comptable):         1 point   / 9  possible (11.1%) - ECHEC
-- Candidat 5 - Aina (Developpeur):       9 points  / 9  possible (100%)  - ECHEC (score minimum = 15)
-- Candidat 6 - Soa (Developpeur):       -3 points  / 9  possible (-33%)  - ECHEC
-- Candidat 7 - Hery (Marketing):         4 points  / 12 possible (33.3%) - ECHEC
--
-- Note: Tous les candidats echouent car le score minimum requis est 15 points
-- mais les annonces n'ont que 3-4 questions (max 9-12 points possibles)
-- Cela suggere soit:
-- 1. Le score minimum devrait etre plus bas (ex: 6-9 points)
-- 2. Ou il faut plus de questions par annonce pour atteindre 15 points minimum
-- ===============================================
