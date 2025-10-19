\c postgres
DROP DATABASE IF EXISTS gestion_entreprise;
CREATE DATABASE gestion_entreprise;
\c gestion_entreprise

-- Se connecter à postgres
\c postgres;

-- Supprimer la base si elle existe et la recréer
DROP DATABASE IF EXISTS gestion_entreprise;
CREATE DATABASE gestion_entreprise;

-- Se connecter à la nouvelle base
\c gestion_entreprise;

-- Exécuter les scripts dans l'ordre
\i C:/Users/erant/Documents/S5/recrutement/backend/config/table.sql
\i C:/Users/erant/Documents/S5/recrutement/backend/config/data.sql
\i C:/Users/erant/Documents/S5/recrutement/backend/config/view_etsoa.sql